import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCustomer } from "../api/customer"
import UserForm from "../components/UserForm"
import {useNavigate} from 'react-router-dom'

const Create = () => {
  const queryClient = useQueryClient();
 
  const navigate = useNavigate()

  const createCustomerMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers']});
      console.log("success!");
      navigate('/')
    }
  });
 
  const handleAddPost = (customer) => {
    createCustomerMutation.mutate({
      ...customer
    })
  }
 
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
        <div className="max-w-md mx-auto mt-5">
        <h1 className="text-2xl text-center mb-2">Add New Customer</h1>
        <UserForm onSubmit={handleAddPost} initialValue={{}} />
        </div>
    </div>
  )
}
 
export default Create