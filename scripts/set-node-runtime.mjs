#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const [, , projectPathArg = ".", nodeVersionArg = "20"] = process.argv;

const projectPath = path.resolve(projectPathArg);
const packageJsonPath = path.join(projectPath, "package.json");
const packageLockPath = path.join(projectPath, "package-lock.json");
const nvmrcPath = path.join(projectPath, ".nvmrc");

const engineNodeVersion = nodeVersionArg.startsWith(">=")
  ? nodeVersionArg
  : `>=${nodeVersionArg.includes(".") ? nodeVersionArg : "20.9.0"}`;

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

if (!existsSync(packageJsonPath)) {
  console.error(`No package.json found in ${projectPath}`);
  process.exit(1);
}

const packageJson = readJson(packageJsonPath);
packageJson.engines = {
  ...(packageJson.engines ?? {}),
  node: engineNodeVersion,
  npm: packageJson.engines?.npm ?? ">=10",
};
writeJson(packageJsonPath, packageJson);

if (existsSync(packageLockPath)) {
  const packageLock = readJson(packageLockPath);
  if (packageLock.packages?.[""]) {
    packageLock.packages[""].engines = {
      ...(packageLock.packages[""].engines ?? {}),
      node: engineNodeVersion,
      npm: packageLock.packages[""].engines?.npm ?? ">=10",
    };
    writeJson(packageLockPath, packageLock);
  }
}

writeFileSync(nvmrcPath, `${nodeVersionArg.replace(/^>=/, "").split(".")[0]}\n`);

console.log(`Updated Node runtime config in ${projectPath}`);
console.log(`- package.json engines.node: ${engineNodeVersion}`);
if (existsSync(packageLockPath)) {
  console.log("- package-lock.json root engines synced");
}
console.log(`- .nvmrc: ${nodeVersionArg.replace(/^>=/, "").split(".")[0]}`);
