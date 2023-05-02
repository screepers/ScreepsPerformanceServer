import fs from "fs";
import minimist from "minimist";
import Helper from "./helper.js";

const argv = minimist(process.argv.slice(2));

export default async function DbImporter(casePath) {
  // eslint-disable-next-line no-param-reassign
  if (argv.casePath) casePath = argv.casePath;

  try {
    const caseData = JSON.parse(fs.readFileSync(casePath));

    console.log("Started writing");
    await Helper.executeList(caseData);
    console.log("Finished writing");
  } catch (error) {
    console.error(error);
  }
}
