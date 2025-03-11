export async function getCustomerList(page) {
  const response = await fetch(`http://localhost:8000/api/customers/?page=${page}`);
  //const response = await fetch("http://localhost:8000/api/customers/");
  const data = await response.json();
  //console.log(data);
  return {
    customerlist: data.results,  //customerlist: data,
    totalpage: data.count,
    perpage: 3
  }
}

export async function fetchCustomer(id) {
  const response = await fetch(`http://localhost:8000/api/customers/${id}/`);
  const data = await response.json();
  //console.log(data);
  return {
    getcustomer: data
  }
}

export async function createCustomer(newCustomer) {
  const response = await fetch("http://localhost:8000/api/customers/", {
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
  const response = await fetch(`http://localhost:8000/api/customers/${updatedCustomer.id}/`, {
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
  const response = await fetch(`http://localhost:8000/api/customers/${id}/`, {
    method: "DELETE",
  });
  return response.json()
}