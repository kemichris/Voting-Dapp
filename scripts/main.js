const connectWalletBtn = document.getElementById("connect-wallet");
const proposalsInput = document.querySelectorAll(".input");
const voteNow = document.getElementById("vote-now");
const checkResult = document.getElementById("check-resutl");

// Contract address and ABI
const contractAddress = "0xd1C1Fb0e6c13F57DAC02dB44dba82c557cb12DC3";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "voter",
				"type": "address"
			}
		],
		"name": "giveRightToVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "proposalNames",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposal_",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "authenticator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "name",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "vote",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "anyVotes",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winningName",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "winningName_",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winningProposal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "winningProposal_",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// connecting wallet button  
connectWalletBtn.addEventListener("click", ()=> {
    connectWallet();
});


// voting select  section 
proposalsInput[0].addEventListener("click", ()=> {
    proposalsInput[0].checked = true;
    proposalsInput[1].checked = false;
    proposalsInput[2].checked = false;
    proposalsInput[3].checked = false;
    proposalsInput[4].checked = false;
    proposalsInput[5].checked = false;
});
proposalsInput[1].addEventListener("click", ()=> {
    proposalsInput[0].checked = false;
    proposalsInput[1].checked = true;
    proposalsInput[2].checked = false;
    proposalsInput[3].checked = false;
    proposalsInput[4].checked = false;
    proposalsInput[5].checked = false;
});
proposalsInput[2].addEventListener("click", ()=> {
    proposalsInput[0].checked = false;
    proposalsInput[1].checked = false;
    proposalsInput[2].checked = true;
    proposalsInput[3].checked = false;
    proposalsInput[4].checked = false;
    proposalsInput[5].checked = false;
});
proposalsInput[3].addEventListener("click", ()=> {
    proposalsInput[0].checked = false;
    proposalsInput[1].checked = false;
    proposalsInput[2].checked = false;
    proposalsInput[3].checked = true;
    proposalsInput[4].checked = false;
    proposalsInput[5].checked = false;
});
proposalsInput[4].addEventListener("click", ()=> {
    proposalsInput[0].checked = false;
    proposalsInput[1].checked = false;
    proposalsInput[2].checked = false;
    proposalsInput[3].checked = false;
    proposalsInput[4].checked = true;
    proposalsInput[5].checked = false;
});
proposalsInput[5].addEventListener("click", ()=> {
    proposalsInput[0].checked = false;
    proposalsInput[1].checked = false;
    proposalsInput[2].checked = false;
    proposalsInput[3].checked = false;
    proposalsInput[4].checked = false;
    proposalsInput[5].checked = true;
});



// voting 

voteNow.addEventListener("click", ()=>{
    if (proposalsInput[0].checked) {
        voteProposal(0)
    } else if(proposalsInput[1].checked) {
        voteProposal(1)
    } else if(proposalsInput[2].checked) {
        voteProposal(2)
    }else if(proposalsInput[3].checked) {
        voteProposal(3)
    }else if(proposalsInput[4].checked) {
        voteProposal(4)
    }else if(proposalsInput[5].ch5ecked) {
        voteProposal(5)
    }
})

// winning proposal 
checkResult.addEventListener("click", resultCheckName);



// function to Connect the wallet to the contract
async function connectWallet() {
  try {
    // Request access to the user's MetaMask account
    await window.ethereum.enable();

    // Create a new instance of ethers with the provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the signer (connected account)
    const signer = provider.getSigner();

    // Print the connected account address
    const connectedAddress = await signer.getAddress();
    console.log('Connected with account:', connectedAddress);

    connectWalletBtn.innerHTML = connectedAddress.slice(0,4) + "..";

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Use the contract methods
    const result = await contract.someMethod();
    console.log('Contract method result:', result);

    // You can also send transactions to the contract
    // const tx = await contract.someMethod();
    // await tx.wait();
  } catch (error) {
    console.log('Error connecting wallet:', error);
  }
}

async function voteProposal (proposal_Id) {
    // Prompt the user to connect their MetaMask wallet
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Get the provider from the MetaMask injected into the browser
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the connected signer (account)
    const signer = provider.getSigner();

    // Create an instance of the contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Proposal ID for voting
    const proposalID = proposal_Id; // Replace with the desired proposal ID

    // Call the vote function
    contract.vote(proposalID)
    .then((transaction) => {
      return transaction.wait();
    })
    .then((receipt) => {
      alert('Vote transaction successful:' + receipt);
    })
    .catch((error) => {
      console.error('Vote transaction failed:', error);
    });
}

async function resultCheck() {
    // Check if the browser has MetaMask installed
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Create an instance of the contract
    const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
  
    // Call the winningProposal function
    contract.winningProposal()
      .then((winningProposal) => {
        alert('Winning Proposal:'+ winningProposal);
      })
      .catch((error) => {
        console.error('Error calling winningProposal:', error);
      });
  } else {
    console.error('MetaMask is not installed');
  }  

}

async function resultCheckName() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Create an instance of the contract
    const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

    // Call the winningProposal function
    const winningProposalIndex = await contract.winningProposal();
  
    // Call the name property on the proposals array using the winning proposal index
    const winningProposal = await contract.proposals(winningProposalIndex);
  
    // Convert the hex-encoded name to a human-readable format
    const winningName = ethers.utils.parseBytes32String(winningProposal.name);
  
    // Show the winning name in an alert
    alert('Winning Name: ' + winningName);

  }
  











