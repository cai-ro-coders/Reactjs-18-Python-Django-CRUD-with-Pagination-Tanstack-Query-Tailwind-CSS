import { HiChevronLeft, HiChevronRight } from "react-icons/hi"; //npm install react-icons --save npmjs com/package/react-icons
import clsx from "clsx"; //npm i clsx npmjs com/package/clsx
import { useSearchParams, useLocation } from "react-router-dom" 

export const generatePagination = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
   
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }
  
  if (currentPage >= totalPages - 2) {
    return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
  }
  
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

const Paginationnumber = ({ totalPages }) => {
  let location = useLocation(); 
  console.log(location);
  const { hash, pathname, search } = location;
  //console.log(pathname);

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  //console.log(currentPage); 2

  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber) => {
      const params = searchParams;
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
  };

  const PaginationNumber = ({
      page,
      href,
      position,
      isActive,
  }) => {
      const className = clsx(
          "flex h-10 w-10 items-center justify-center text-sm border",
          {
              "rounded-l-sm": position === "first" || position === "single",
              "rounded-r-sm": position === "last" || position === "single",
              "z-10 bg-blue-700 border-blue-500 text-white bg-blue-700": isActive,
              "hover:bg-blue-700": !isActive && position !== "middle",
              "text-gray-300 pointer-events-none": position === "middle",
          }
      );

      return isActive && position === "middle" ? (
          <div className={className}>{page}</div>
      ) : (
          <a href={href} className={className}>
              {page}
          </a>
      );
  };

  const PaginationArrow = ({ href, direction, isDisabled }) => {
      const className = clsx(
          "flex h-10 w-10 items-center justify-center text-sm border",
          {
              "pointer-events-none text-blue-300": isDisabled,
              "hover:bg-blue-700": !isDisabled,
              "mr-2": direction === "left",
              "ml-2": direction === "right",
          }
      );

      const icon =
        direction === "left" ? (
          <HiChevronLeft size={20} />
        ) : (
          <HiChevronRight size={20} />
        );

    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <a href={href} className={className}>
        {icon}
      </a>
    );
  };

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />
      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={index}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page} 
            />
          );
        })}
      </div>
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
};

export default Paginationnumber;