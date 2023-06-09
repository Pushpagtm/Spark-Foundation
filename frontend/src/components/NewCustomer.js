import React, { useState } from 'react';
import '../styles/newcustomer.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function NewCustomer(props) {
    const[values,setValues]=useState({
        name:'',
        acc_number:'',
        balance:''
    });
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/customers',values)
        .then(res=>
            {
            navigate('/customer')}
            )
        .catch(err=>console.log(err))
    }
    return (
        <div className='box'>
            <form onSubmit={handleSubmit}>
                <input type='text'  placeholder='Enter Customer name'onChange={(e)=>setValues({...values,name:e.target.value})}/>
                <input type='number'  placeholder='Enter Account number'onChange={(e)=>setValues({...values,acc_number:e.target.value})}/>
                <input type='number'  placeholder='Enter customer balance'/>
                <button type='submit'onChange={(e)=>setValues({...values,balance:e.target.value})}>Submit</button>

            </form>
       

    </div>
    );
}

export default NewCustomer;