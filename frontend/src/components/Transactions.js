import {useState,useEffect} from 'react';
import '../styles/customer.css';
import axios from "axios";
function Transactions(props) {
    const [transaction, setTransaction] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:8000/transfer")
      .then((res) => setTransaction(res.data))
      .catch((err) => console.log(err));
  }, []);
    return (
        <>
    <div className='customers' >
       <table className='customers_table'>
        <tr className='headings'>
          <th>Serial number</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Balance</th>
        </tr>
        {
            transaction.map((item,i)=>{
                return (
                    <tr key={i} className='values'>
              <td>{item.id}</td>
              <td>{item.sender}</td>
              <td>{item.receiver}</td>
              <td>{item.amount}</td>
            </tr>

                )
            })
        }
        
        </table>
        </div>
        </>
    );
}

export default Transactions;