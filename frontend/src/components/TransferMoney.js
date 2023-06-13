import React from "react";
import "../styles/transfer.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function TransferMoney(props) {
  const [customers,setCustomers]=useState([]);
  const [sender,setSender]= useState("");
  const [receiver,setReceiver]= useState("");
  const [bal,setBal]= useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const transfers=()=>{

      axios.post("http://localhost:8000/transaction",{
        sender:sender,
        receiver:receiver,
        balance:bal
      }).then(()=>{
        Swal.fire({
          title: "Money Transfer Sucessful",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        console.log("Success");
      }).catch((err)=>{
        
        console.log(err.message)
      })
  
      console.log("======sender,reciver",sender,receiver)
  };
  return (
    <>
      <div className="box">
        <form>
          <h2>Transfer Money</h2>
          <p>Transfer from:</p>
          <select name="senders" id="senders" value={sender} onChange={(e)=>{setSender(e.target.value)}}>
              <option value=""></option>
              {
                customers.map((val,key)=>{
                                return (
                                  <option value={val.id} id={val.id} key={key}>{val.name}</option>
                                )
                              })

              }
            </select>
         
          <p>Transfer To:</p>
          <select name="receivers" id="receivers" value={receiver} onChange={(e)=>{setReceiver(e.target.value)}} required>
              <option value=""></option>
              {
                customers.map((val,key)=>{
                          return (val.name===sender?
                              "":
                              <option id={val.id} value={val.id} key={key}>{val.name}</option>
                            )
                          })
              }
              </select>
         
          <label>Amount</label>
          <input type="number" placeholder="Rs." onChange={(e)=>{setBal(e.target.value)}} value={bal}/>
          <Link to='/customer'><button className="submitBtn" type="button" onClick={()=>transfers()} >
        
        Send</button></Link>
         
        </form>
      </div>
    </>
  );
}

export default TransferMoney;
