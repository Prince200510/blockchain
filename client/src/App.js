import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SimpleStorage from './contracts/SimpleStorage.json'; 
import './App.css';
function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);

          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const networkId = await web3.eth.net.getId();
          console.log('Detected Network ID:', networkId);

          const deployedNetwork = SimpleStorage.networks[networkId];
          if (deployedNetwork) {
            const contract = new web3.eth.Contract(
              SimpleStorage.abi,
              deployedNetwork.address
            );
            setContract(contract);

            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);

            const totalValue = await contract.methods.getCount().call();
            setTotal(Number(totalValue));
          } else {
            setError('Smart contract not deployed to the detected network.');
          }
        } else {
          setError('Ethereum browser extension not detected.');
        }
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
      }
    };

    loadBlockchainData();
  }, []);

  const handleIncrement = async () => {
    if (contract) {
      try {
        await contract.methods.setCountIncrement().send({ from: account });
        const totalValue = await contract.methods.getCount().call();
        console.log('Updated Total Value (Increment):', totalValue); 
        setTotal(Number(totalValue));
      } catch (err) {
        setError(`An error occurred during increment: ${err.message}`);
      }
    } else {
      setError('Contract not found.');
    }
  };
  const handleDecrement = async () => {
    if (contract) {
      try {
        await contract.methods.setCountDecrement().send({ from: account });
        const totalValue = await contract.methods.getCount().call();
        console.log('Updated Total Value (Decrement):', totalValue); 
        setTotal(Number(totalValue));
      } catch (err) {
        setError(`An error occurred during decrement: ${err.message}`);
      }
    } else {
      setError('Contract not found.');
    }
  };

  return (
    <div className="App">
        <div class="parent-container">
          <div class="child-container">
            <h1>Blockchain Technology - Simple Increment & Decrement</h1><hr></hr>
            <div class="operation">
              <div class="sub-operation">
                <p>Account: <span>{account || "Account Not found !!! please connect to blockchain technology"}</span></p>
                <p>Total Value: <span>{total}</span></p>
              </div>
            </div>
            <div class="buttons">
              <button onClick={handleIncrement}>Increment</button>
              <button onClick={handleDecrement}>Decrement</button>
            </div>
            <hr></hr>
            <footer>
              <p>© Prince Maurya - <a href="mailto:princemaurya8879@gmail.com">Contact Me</a></p>
            </footer>
          </div>
        </div>
    </div>
  );
}

export default App;
