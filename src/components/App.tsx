import { create } from 'ipfs-http-client';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import DVideo from "../abis/DVideo.json";
import './App.css';
import Main from './Main';
import Navbar from './Navbar';

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

declare global {
  interface Window {
    ethereum?: any; 
    web3?: any; 
  }
};

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true); 
  const [account, setAccount] = useState<string>("");
  const [dVideo, setDVideo] = useState<any>(null); // State for DVideo contract
  const [videoAmounts, setVideoAmounts] = useState<number>(0); // State for video amounts
  const [videos, setVideos] = useState<any[]>([]); // State for videos
  const [buffer, setBuffer] = useState<Uint8Array>();

  useEffect(() => {
    const initialSetup = async () => {
      try {
        await loadWeb3();
        await loadBlockchainData();
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
    const web3 = window.web3;
    //Load accounts
    const loadedAccounts = await web3.eth.getAccounts();
    console.log("loadedAccounts", loadedAccounts)
    setAccount(loadedAccounts[0]);

    //Get network ID
    const networkId = await web3.eth.net.getId();

    //Get network data
    const networkData = DVideo.networks[networkId]

    //Check if net data exists, then
    if (networkData) {
      // Assign dvideo contract to a variable
      const dVideoContract = new web3.eth.Contract(DVideo.abi, networkData.address);
       //Add dvideo to the state
      setDVideo(dVideoContract);

      //Check videoAmounts  
      const videoCount = await dVideoContract.methods.videoCount().call();
       //Add videAmounts to the state
      setVideoAmounts(parseInt(videoCount))

      //Iterate throught videos and add them to the state (by newest)
      for (let i = videoCount; i >= 1; i--) {
        const video = await dVideoContract.methods.videos(i).call();
        setVideos(prev => [...prev, video])
      }
    } else {
      //If network data doesn't exisits, log error
      const errorMsg = "DVideo contract not deployed to detected network."
      console.error(errorMsg)
      window.alert(errorMsg)
    }
    setLoading(false);   
  };

  const captureFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const uint8Array = new Uint8Array(reader.result as ArrayBuffer);
      setBuffer(uint8Array)
    }
  };

  const uploadVideo = (title: string): void => {
    console.log("Uploading file to IPFS...", {videoTitle: title})
    ipfs.add(buffer)
  };

  const changeVideo = (hash: string, title: string): void => {
    
  };

  return (
    <div>
      <Navbar account={account} />
      {loading ? (
        <div id="loader" className="text-center mt-5">
          <p>Loading...</p>
        </div>
      ) : <Main 
            videos={videos} 
            captureFile={captureFile} 
            uploadVideo={uploadVideo} 
            changeVideo={changeVideo}
          />}
    </div>
  );
};

export default App;
