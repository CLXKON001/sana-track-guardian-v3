import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
    console.log("🚀 Starting SanaTrack deployment to BlockDAG testnet...\n");

    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Check deployer balance
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH\n");

    // Deploy the SanaTrack contract
    console.log("📋 Deploying SanaTrack contract...");
    const SanaTrack = await ethers.getContractFactory("SanaTrack");
    const sanaTrack = await SanaTrack.deploy();
    
    await sanaTrack.waitForDeployment();
    const contractAddress = await sanaTrack.getAddress();

    console.log("✅ SanaTrack deployed successfully!");
    console.log("📍 Contract Address:", contractAddress);
    console.log("🔗 BlockDAG Testnet Explorer:", `https://explorer.blockdag.network/address/${contractAddress}`);
    console.log("\n" + "=".repeat(60));
    console.log("🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!");
    console.log("=".repeat(60));
    
    // Save deployment info
    const deploymentInfo = {
        contractAddress: contractAddress,
        network: "blockdag_testnet",
        deployer: deployer.address,
        deployedAt: new Date().toISOString(),
        explorerUrl: `https://explorer.blockdag.network/address/${contractAddress}`
    };
    
    console.log("\n📝 Deployment Summary:");
    console.log(JSON.stringify(deploymentInfo, null, 2));
    
    return deploymentInfo;
}

// Handle deployment
main()
    .then((result) => {
        console.log("\n🎯 Ready to integrate with your frontend!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("\n❌ Deployment failed:");
        console.error(error);
        process.exit(1);
    });
