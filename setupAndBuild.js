const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// 1️⃣ Create folder structure
const folders = ["contracts", "scripts", "build", ".github/workflows"];
folders.forEach(f => ensureDir(f));

// 2️⃣ Create placeholder contract
const contractPath = path.join("contracts", "GuaranteedTrade.sol");
if (!fs.existsSync(contractPath)) {
    fs.writeFileSync(contractPath, `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GuaranteedTrade {
    // Your contract code goes here
}
`);
    console.log("Created contracts/GuaranteedTrade.sol");
}

// 3️⃣ Create placeholder simulate script
const simulatePath = path.join("scripts", "simulateDispute.js");
if (!fs.existsSync(simulatePath)) {
    fs.writeFileSync(simulatePath, `// Simulate dispute scenario
console.log("Replace with your simulation JS code");
`);
    console.log("Created scripts/simulateDispute.js");
}

// 4️⃣ Create package.json
const packageJsonPath = path.join("package.json");
if (!fs.existsSync(packageJsonPath)) {
    fs.writeFileSync(packageJsonPath, `{
  "name": "guaranteed-trade",
  "version": "1.0.0",
  "scripts": {
    "build": "npx hardhat compile && node scripts/buildArtifacts.js",
    "simulate": "npx hardhat run scripts/simulateDispute.js --network hardhat"
  },
  "devDependencies": {
    "ethers": "^6.0.0",
    "hardhat": "^2.16.0",
    "@nomiclabs/hardhat-ethers": "^3.1.0"
  }
}
`);
    console.log("Created package.json");
}

// 5️⃣ Create hardhat.config.js
const configPath = path.join("hardhat.config.js");
if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, `require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "hardhat",
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    tests: "./test",
  },
  networks: {
    hardhat: {},
    testnet: {
      url: process.env.RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
`);
    console.log("Created hardhat.config.js");
}

// 6️⃣ Create buildArtifacts.js
const buildArtifactsPath = path.join("scripts", "buildArtifacts.js");
if (!fs.existsSync(buildArtifactsPath)) {
    fs.writeFileSync(buildArtifactsPath, `const fs = require("fs");
const path = require("path");

async function main() {
    const artifactsDir = path.join(__dirname, "..", "artifacts", "contracts");
    const buildDir = path.join(__dirname, "..", "build");

    if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);

    const contracts = fs.readdirSync(artifactsDir);

    for (const file of contracts) {
        const contractPath = path.join(artifactsDir, file);
        const files = fs.readdirSync(contractPath);

        for (const f of files) {
            if (f.endsWith(".json")) {
                const src = path.join(contractPath, f);
                const dest = path.join(buildDir, f);
                fs.copyFileSync(src, dest);
                console.log(\`Copied \${f} to build/\`);
            }
        }
    }

    console.log("All artifacts built!");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
`);
    console.log("Created scripts/buildArtifacts.js");
}

// 7️⃣ Install dependencies and build
console.log("Installing npm dependencies...");
execSync("npm install", { stdio: "inherit" });

console.log("Compiling contracts...");
execSync("npx hardhat compile", { stdio: "inherit" });

console.log("Building artifacts...");
execSync("node scripts/buildArtifacts.js", { stdio: "inherit" });

console.log("✅ Project setup and build complete!");
