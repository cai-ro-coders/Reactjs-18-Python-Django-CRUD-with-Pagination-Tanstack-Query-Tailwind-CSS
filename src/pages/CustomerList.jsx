import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; //npm i @tanstack/react-query 
import { deleteCustomer } from "../api/customer";

const CustomerList = ({ customerlist }) => { 
    const queryClient = useQueryClient();

    const deleteCustomerMutation = useMutation({
      mutationFn: deleteCustomer,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['customers']});
      }
    });
 
    const handleDelete = (id) => {
      deleteCustomerMutation.mutate(id)
    }

  return (
    <>
        <table className="table table-zebra">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th className="py-3 px-6">ID</th>
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {customerlist.map((item) => (
                    <tr key={item.id} className="bg-white border-b text-black">
                        <td className="py-3 px-6">
                        {item.id}
                        </td>
                        <td className="py-3 px-6">{item.name}</td>   
                        <td className="py-3 px-6">{item.email}</td>
                        <td className="flex justify-center gap-1 py-3">
                            <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                href={`/read/${item.id}`}>Read</a> 
                              
                            <a className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                                href={`/edit/${item.id}/`}>
                                Edit
                            </a>
                            <button onClick={() => handleDelete(item.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  );
};
 
export default CustomerList;