import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Main from './Main';
import Web3 from 'web3';
import { create } from 'ipfs-http-client';
import './App.css';

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

const App = () => {
  const [loading, setLoading] = useState(true); 
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const initialSetup = async () => {
      try {
        await loadWeb3();
        await loadBlockchainData();
        setLoading(false); 
      } catch (error) {
        console.error('Error loading blockchain data:', error);
      }
    };

    initialSetup();
  }, []);

  const loadWeb3 = async () => {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    } catch (error) {
      console.error('Error loading web3:', error);
    }
  };
  
  
  
  const loadBlockchainData = async () => {
    const web3 = window.web3
    //Load accounts
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    setAccounts(accounts)

    //Get network ID
    const networkId = await web3.eth.net.getId()
    //Get network data
  
    //Check if net data exists, then
      //Assign dvideo contract to a variable
      //Add dvideo to the state

      //Check videoAmounts
      //Add videAmounts to the state

      //Iterate throught videos and add them to the state (by newest)


      //Set latest video and it's title to view as default 
      //Set loading state to false

      //If network data doesn't exisits, log error
  };

  // Get video
  const captureFile = event => {
    // Implementation
  };

  // Upload video
  const uploadVideo = title => {
    // Implementation
  };

  // Change Video
  const changeVideo = (hash, title) => {
    // Implementation
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div id="loader" className="text-center mt-5">
          <p>Loading...</p>
        </div>
      ) : (
        <Main />
      )}
    </div>
  );
};

export default App;
