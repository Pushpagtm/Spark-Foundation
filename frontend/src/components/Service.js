import React from 'react';
import '../styles/service.css';
import { BsFillFilePersonFill } from 'react-icons/bs';
import {BiTransfer} from 'react-icons/bi';
import {FcMoneyTransfer} from 'react-icons/fc';
function Service({Data}) {
     const ServiceData=[
        {
            icon: <BsFillFilePersonFill size={80}/>,
            title:'Customers',
            button:'View Customers',
            link:'/customer'
        },
        {
            icon:<FcMoneyTransfer size={80}/>,
            title:'Transfer Money',
            button:'Transfer Your money',
            link:'/moneyTransfer'
        },
        {
            icon:<BiTransfer size={80}/>,
            title:'Transactions',
            button:'All transactions',
            link:'/transaction'
        }
    ]
    return (
        <div className='services-boxes'>
      <div className="main-title">
        OUR SERVICES
      </div>
      <div className="container-1">
        {
            ServiceData && ServiceData.map((data)=>{
                return(
                    <div className="card">
                  <i>{data.icon}</i>
                    <div className="service-name">{data.title}</div>
                    
                    <a href={data.link}>
                      <button>{data.button}</button>
                    </a>
                  </div>

                )
         

            })
        }
  
      </div>
    </div>
    );
}

export default Service;