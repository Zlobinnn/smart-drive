const hre = require("hardhat");

async function main() {
    console.log("hre.ethers:", hre.ethers);
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const Contract = await hre.ethers.getContractFactory("CarRental");
    const contract = await Contract.deploy();
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });