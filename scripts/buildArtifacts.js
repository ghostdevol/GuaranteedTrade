const fs = require("fs");
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
                console.log(`Copied ${f} to build/`);
            }
        }
    }

    console.log("All artifacts built!");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
