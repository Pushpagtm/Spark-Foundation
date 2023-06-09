import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Customer from "./components/Customer";
import Transactions from "./components/Transactions";
import TransferMoney from "./components/TransferMoney";

import Footer from "./components/Footer";
import Home from "./components/Home";
import { CustomerData } from "./components/CustomerData";
import NewCustomer from "./components/NewCustomer";
import Read from "./components/Read";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
        <Route path="/"  element={<Home/>} />
          <Route path="/customer" element={<Customer/>} CustomerData={CustomerData} />
          <Route path="/transaction" element={<Transactions />} />
          <Route path="/moneyTransfer" element={<TransferMoney/>}  />
          <Route path="/newcustomer" element={<NewCustomer/>} />
          <Route path="/read/:id" element={<Read/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
