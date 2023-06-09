import {useState,useEffect} from 'react';
import '../styles/customer.css';
import axios from "axios";
import  {Link}  from "react-router-dom";
function Transactions(props) {
    const [done, setDone] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => setDone(res.data))
      .catch((err) => console.log(err));
  }, []);
    return (
        <>
        <div>
             <div >
             <table className='customers_table'>
        <tr className='headings'>
          <th>Serial number</th>
          <th>Name</th>
          <th>Account number</th>
          <th>Balance</th>
        </tr>
        {
            done.map((item,i)=>{
                return (
                    <tr key={i} className='values'>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.acc_number}</td>
              <td>{item.balance}</td>
            </tr>

                )
            })
        }
        
        </table>
        </div>
        </div>
        </>
    );
}

export default Transactions;