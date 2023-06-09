import React, { useEffect, useState } from "react";
import "../styles/customer.css";
import axios from "axios";
import  {Link}  from "react-router-dom";
function Customer(props) {
  const [done, setDone] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => setDone(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div >
        <div className="newbtn"><Link to='/newcustomer'><button>Add Customer </button></Link></div>
             <table className='customers_table'>
        <tr className='headings'>
          <th>Serial number</th>
          <th>Name</th>
          <th>Account number</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
        {
            done.map((item,i)=>{
                return (
                    <tr key={i} className='values'>
            
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.acc_number}</td>
              <td>{item.balance}</td>
              <td className="action">
              <Link  to={`/read/${item.id}`} className="link">View</Link>
              {/* <Link to={`/moneyTransfer/${item.id}`} className="link" >Transfer</Link> */}
            
              </td>
            </tr>

                )
            })
        }
       
        </table>
        </div>
    </>
  );
}

export default Customer;
