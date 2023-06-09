import React from 'react';
import '../styles/home.css';
import Service from '../components/Service';

function Home(props) {
    return (
        <div>
        <div className='container'>
        <div className="left">
                <div className="title">
                    <h2>The Spark Bank Limited</h2>
                </div>
                <div className="desc">
                    <p>Spark Bank is commonly used as a sample bank in scenarios that involve showcasing the implementation of banking functionalities.Spark Bank may include features like customer accounts, transactions, balances.</p>
                </div>
                <button className='start-btn'>
                    <a href="/customer">
                        Get Started
                    </a>
                </button>
            </div>
            
            


        </div>
        <Service/>
       
       
        </div>
    );
}

export default Home;