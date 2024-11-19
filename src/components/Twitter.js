import React, { useState } from "react";
import { ethers } from "ethers";
import { twitterAddress } from "../contractABI/TwitterAddress";
import {twitterABI} from "../contractABI/TwitterABI";

function App() {

    const {ethereum} = window;

    const [isConnected, setIsConnected] = useState(false);
    const [value1, setValue1] = useState("");
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");

    const connectMetamask = async() => {
        let accounts;
        if (window.ethereum !== "undefined") {
            accounts = await ethereum.request({ method: "eth_requestAccounts"});
            console.log(accounts[0]);
            setValue1(accounts[0]);
          }
        console.log("Ci sono caro");
        const provider =new ethers.BrowserProvider(window.ethereum);
        console.log("Ci sono caro");
        const signer = await provider.getSigner();
        console.log("Ci sono caro");
        const contract = new ethers.Contract(twitterAddress, twitterABI, signer);
        console.log("ho fatto smock");
        const bol = await contract.existAccoutF();
        console.log("BOOLEANO:       ", bol);
        if(!bol){
            contract.createAccount();
            console.log("account creato con successo");
            console.log("sono nel bol");
        }
        await returnPost();
        setIsConnected(true);
    };

    const createPost = async (e) => {
        e.preventDefault(); // Previene il reload della pagina
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(twitterAddress, twitterABI, signer);
        
        const tx = await contract.createPost(newPost); // Assicura che il nuovo post sia creato nello smart contract
        // Aspetta la conferma della transazione
        const receipt = await tx.wait();
        console.log("Transazione confermata:", receipt);
        
        
        await returnPost(); // Aggiorna la lista dei post
        setNewPost(""); // Resetta il campo di input
    };
    
    
    const returnPost = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(twitterAddress, twitterABI, signer);

        const ps = await contract.getPost();
        setPosts(ps);
    }

    return (
        <div className="app-container">
            <h1>Twitt Dapp</h1>
        {!isConnected ? ( 
            <button className="connect-button" onClick={connectMetamask}>
            Connect Metamask
            </button>
        ) : (
            <div className="form-container">
            <p>{value1}</p>
            <form onSubmit={createPost}>
                <textarea
                className="post-input"
                placeholder="Write your Twitt..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                ></textarea>
                <button type="submit" className="submit-button">
                Post
                </button>
            </form>
            <div className="posts-container">
                {posts.length > 0 ? (
                    posts.map((post, index) =>(
                        <div key={index} className="post">
                            {post}
                        </div>
                ))
            ):(
                <p>No post yet!</p>
            )}

            </div>
            </div>
        )}
        </div>
    );
    }

    export default App;
