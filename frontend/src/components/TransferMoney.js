import React from "react";
import "../styles/transfer.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TransferMoney(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customers,setCustomers]=useState([]);
  const [sender,setSender]= useState("");
  const [receiver,setReceiver]= useState("");
  const [bal,setBal]= useState("");
  let correct=true;
  let senderBalance=0;
  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const transfers=()=>{

      // console.log("Sender",sender);
      // console.log("Receiver",receiver);
      // console.log("Balance",bal);
      // if(sender==="" || receiver===""){
      //   correct=false;
      //   setSender("");
      //   setReceiver("");
      //   setBal("");
      //   return(alert('Enter all Details.'))
      // }
      // if(bal===""){
      //   correct=false;
  
      //   return(alert('Please Enter Amount.'))}
      //   for(const val of customers)
      //   {
      //     if(val.name===sender){
      //       senderBalance=val.balance;
      //     }
      //   }
  
      //   console.log("Sender balance",senderBalance);
      //   if(senderBalance-bal<0){
      //     correct=false;
      //     setSender("");
      //     setReceiver("");
      //     setBal("");
      //     return(alert('Not enough balance'))}
  
      //   if(correct===true){
  
      axios.post("http://localhost:8000/transaction",{
        sender:sender,
        receiver:receiver,
        balance:bal
      }).then(()=>{
        console.log("Success");
      }).catch((err)=>{
        console.log(err.message)
      })
  
      // axios.put("http://localhost:8000/update",{
      //   balance:bal,
      //   receiver:receiver
      // }).then((response)=>{
      //   setCustomers(
      //     customers.map((val)=>{
      //       return val.name===receiver?
      //       {
      //         id:val.id,
      //         name:val.name,
            
      //         balance:parseInt(bal)+parseInt(val.balance),
      //       }
      //       :val.name===sender?
      //       {
      //         id:val.id,
      //         name:val.name,
      //         balance:parseInt(val.balance)-parseInt(bal),
      //       }
      //       :val;
      //     })
      //   );
  
      //   alert("Successful Transaction");
      
      //   setSender("");
      //   setReceiver("");
      //   setBal("");
      // });
    // }
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
          <input  placeholder="Rs." onChange={(e)=>{setBal(e.target.value)}} value={bal}/>
          <button className="submitBtn" type="button" onClick={()=>transfers()} >
        
          Send</button>
         
        </form>
      </div>
    </>
  );
}

export default TransferMoney;
