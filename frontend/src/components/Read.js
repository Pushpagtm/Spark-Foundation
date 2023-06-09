import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/read.css';
function Read(props) {
    const {id}=useParams();
    const[customer,setCustomer]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8000/read/'+id)
        .then(res=>
            {
                setCustomer(res.data[0]);
            })
        .catch(err=>console.log(err))
    },[])
    
    return (
        <div className='box'>
     
            <div className='innerbox'>
             <div className="item">
              <img
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=""
                className="itemImg"
              />
              
              <div className="details">
                <h1 className="itemTitle">{customer.name}</h1>
                
                <div className="detailItem">
                  <span className="itemKey">Account Number:</span>
                  <span className="itemValue">{customer.acc_number}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Balance:</span>
                  <span className="itemValue">{customer.balance}</span>
                </div>
                <Link to='/customer' className='link'>Back</Link>
              
              </div>
            </div>
            </div>
           
           
        </div>
    );
}

export default Read;