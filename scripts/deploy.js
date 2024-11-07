async function main() {
  const [deployer] = await ethers.getSigners(); // Get the deployer account

  console.log("Deploying contracts with the account:", deployer.address);

  const RunToEarnToken = await ethers.getContractFactory("RunToEarnToken");
  const token = await RunToEarnToken.deploy(); // No parameters needed

  await token.deployed();
  console.log("RunToEarnToken deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
