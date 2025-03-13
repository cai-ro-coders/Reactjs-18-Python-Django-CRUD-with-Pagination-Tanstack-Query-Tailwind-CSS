export async function getCustomerList(page) {
  const response = await fetch(`http://127.0.0.1:5000/api/customerpagination/${page}/3`);
  //const response = await fetch("http://127.0.0.1:5000/api/customer/");
  const data = await response.json();
  //console.log(data);
  return {
    customerlist: data.customers,
    totalpage: data.total, 
    perpage: data.per_page
  }
}

export async function fetchCustomer(id) {
  const response = await fetch("http://127.0.0.1:5000/api/customer/"+id);
  const data = await response.json();
  console.log(data);
  return {
    getcustomer: data
  }
}

export async function createCustomer(newCustomer) {
  const response = await fetch("http://127.0.0.1:5000/api/customer", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCustomer)
  });
  console.log(response);
  return response.json()
}

export async function updateCustomer(updatedCustomer) {
  const response = await fetch(`http://127.0.0.1:5000/api/customer/${updatedCustomer.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedCustomer)
  });
  console.log(response)
  return response.json()
}

export async function deleteCustomer(id) {
  const response = await fetch(`http://127.0.0.1:5000/api/customer/${id}`, {
    method: "DELETE",
  });
  return response.json()
}