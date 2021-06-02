// Module to create the main array of impressions to test

exports.impressionArrayCreator = (logs) => {
  const impTrackerArray = [];
  for (let log of logs) {
    let pixels = log.impression_pixel_json;

    if (pixels === "NULL" || JSON.parse(pixels).length < 1) continue;
    if (JSON.parse(pixels).length > 1) {
      JSON.parse(pixels).forEach((pixel) => {
        impTrackerArray.push({
          tactic: log.tactic_id,
          impression_pixel_json: pixel,
        });
      });
    } else {
      impTrackerArray.push({
        tactic: log.tactic_id,
        impression_pixel_json: JSON.parse(pixels)[0],
      });
    }
  }
  console.log(`Total number of URLs to check: ${impTrackerArray.length}`);
  return impTrackerArray;
};
