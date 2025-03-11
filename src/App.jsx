import { Route, Routes } from "react-router-dom" //npm i react-router-dom
import Home from "./pages/Home"
import Create from "./pages/Create"
import Read from "./pages/Read"
import EditCustomer from "./pages/EditCustomer"

function App() { 
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create/" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/edit/:id" element={<EditCustomer />} />
    </Routes>
  )
}
  
export default App