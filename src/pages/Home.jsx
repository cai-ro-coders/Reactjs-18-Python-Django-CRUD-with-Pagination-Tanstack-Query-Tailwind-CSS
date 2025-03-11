import { useQuery } from "@tanstack/react-query"; //npm i @tanstack/react-query tanstack com/query/latest/docs/framework/react/installation
import { getCustomerList } from "../api/customer";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom" 
import CustomerList from "../pages/CustomerList";

export default function Home() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page"));
    //console.log(page)
 
    const currentPage = Number(page) || 1;
    //const currentPage = 1;
 
    const { isLoading, data, isError,  error } = useQuery({
        queryKey: ["customers", currentPage],
        queryFn: () => getCustomerList(currentPage)
    });

    if (isLoading) return "Loading...";
    if (isError) return `Error: ${error.message}`;

    const totalPages = Math.ceil(Number(data.totalpage) / Number(data.perpage));
    //console.log(totalPages);
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
        <div className="flex items-center justify-between gap-1 mb-5 pl-10 pr-10">
            <h1 className="text-4xl font-bold">Reactjs 18 Python Django CRUD (Create, Read, Update and Delete) with Pagination | Tanstack Query Tailwind CSS</h1>
        </div> 
        <div className="overflow-x-auto pt-10">
            <div className="mb-2 w-full text-right">
                <a
                href="/create"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Add New
                </a>
            </div>
            <CustomerList customerlist={data.customerlist} />
            <div className="flex items-center justify-between my-5">
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    </div>
  );
}