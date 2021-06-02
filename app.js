// Main app

const { checkUrl } = require("./utils/trackerCheck");
const csvFilePath = `./tl_tactic_reduced.csv`;

(async () => {
  try {
    await checkUrl(csvFilePath);
  } catch (err) {
    console.log(err);
  }
})();
