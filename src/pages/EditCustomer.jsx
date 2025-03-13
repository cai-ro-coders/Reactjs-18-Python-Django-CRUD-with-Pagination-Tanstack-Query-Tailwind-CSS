import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCustomer, updateCustomer } from "../api/customer";
import UserForm from "../components/UserForm"
 
const EditCustomer = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        isLoading,
        isError,
        data: customer,
        error,
    } = useQuery({
        queryKey: ["customers", id],
        queryFn: () => fetchCustomer(id),
    });
    //console.log(customer);

    const updateUserMutation = useMutation({
        mutationFn: updateCustomer,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['customers']});
        navigate("/")
        }
    })
    
    if (isLoading) return "loading...";
    if (isError) return `Error: ${error.message}`;
    
    const handleSubmit = (updatedCustomer) => {
        updateUserMutation.mutate({id, ...updatedCustomer})
    }
    
 
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
        <div className="overflow-x-auto py-10">
            <h1>{customer.getcustomer.customer.name}</h1>
            <UserForm onSubmit={handleSubmit} initialValue={customer.getcustomer.customer} />
        </div>
    </div>
  )
}
 
export default EditCustomer