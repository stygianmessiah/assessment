// Module to test each impression pixel. Returning data whether the requests worked or errored out since we want a count of both

const superagent = require("superagent");

exports.trackerTester = (tracker) => {
  return new Promise((resolve, reject) => {
    superagent.get(tracker.impression_pixel_json).end((err, res) => {
      if (err) {
        return resolve({
          tactic: tracker.tactic,
          url: tracker.impression_pixel_json,
          status: err.status,
        });
      } else {
        resolve({
          tactic: tracker.tactic,
          url: tracker.impression_pixel_json,
          status: res.status,
        });
      }
    });
  });
};
