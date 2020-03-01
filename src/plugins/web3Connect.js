import Web3Connect from "web3connect";
import Portis from "@portis/web3";
import Torus from "@toruslabs/torus-embed";
 
export default new Web3Connect.Core({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    portis: {
      package: Portis, // required
      options: {
        id: "PORTIS_ID" // required
      }
    },
    torus: {
      package: Torus, // required
      options: {
        enableLogging: false, // optional
        buttonPosition: "bottom-left", // optional
        buildEnv: "production", // optional
        showTorusButton: true // optional
      }
    },
  }
});
/* 
// subscribe to connect
web3Connect.on("connect", (provider) => {
  const web3 = new Web3(provider); // add provider to web3
});
 
// subscribe to close
web3Connect.on("close", () => {
  console.log("Web3Connect Modal Closed"); // modal has closed
});
 
web3Connect.toggleModal(); // open modal on button click

*/