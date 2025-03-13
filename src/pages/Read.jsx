import { useQuery } from "@tanstack/react-query"; //npm i @tanstack/react-query
import { useNavigate, useParams } from "react-router-dom";
import { fetchCustomer } from "../api/customer";
 
const Read = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    //console.log(id);
    const {
        isLoading,
        isError,
        data: customer,
        error,
    } = useQuery({
        queryKey: ["customers", id],
        queryFn: () => fetchCustomer(id),
    });
    
    if (isLoading) return "loading...";
    if (isError) return `Error: ${error.message}`;
 
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
        <div className="overflow-x-auto py-10">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => navigate("/")}>back to list customer</button>
        <h1>{customer.getcustomer.customer.name}</h1>
        <p>{customer.getcustomer.customer.email}</p>
        </div>
    </div>
  )
}
 
export default Read