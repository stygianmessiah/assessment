//Main impression tracker check module + csv reader

const fs = require("fs");
const papa = require("papaparse");

const { impressionArrayCreator } = require(`./impArrayCreator`);
const { trackerTester } = require(`./trackerTester`);

exports.checkUrl = async (csvFilePath) => {
  //Reading and parsing the CSV
  let logs = [];
  const csvFile = fs.readFileSync(csvFilePath);
  const csvData = csvFile.toString();
  await papa.parse(csvData, {
    header: true,
    complete: (results) => {
      console.log(`Number of logs parsed: ${results.data.length}`);
      logs = results.data;
    },
  });

  // Creating a main tracker array list
  const impTrackerArray = impressionArrayCreator(logs);

  // Testing each tracker in the main array and returning promises
  trackerPromises = impTrackerArray.map((tracker) => trackerTester(tracker));
  const trackerAnalysis = await Promise.all(trackerPromises);

  //Formating results and output
  const badTrackers = trackerAnalysis.filter(
    (res) => res.status >= 400 || res.status === undefined
  );

  console.log(`Bad trackers are:`);
  console.log(badTrackers);
  console.log(`No. of bad trackers: ${badTrackers.length}`);
  console.log(
    `No. of good trackers: ${trackerAnalysis.length - badTrackers.length}`
  );
};
