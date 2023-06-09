import React from 'react';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';
import logo from '../image/logo.png';
function Navbar(props) {
    return (
        <>
        <nav>
             <div className="img-div">
                <a href="/">
                    <img src={logo} alt="Bank Logo" className='bank_logo' />
                </a>
            </div>
            <div className='pages'>
                <ul className="lists">
                <li className='list-1'><Link to='/'>Home</Link></li>
                    <li className='list-1'><Link to='/customer'> Accounts</Link></li>
                    <li className='list-1'><Link to='/moneyTransfer'> Transfer money</Link></li>
                 
                    <li className='list-3'><Link to='/transaction'>Transactions</Link></li>
                </ul>
            </div>
        </nav>
        {/* <Home/> */}
        </>
    );
}

export default Navbar;