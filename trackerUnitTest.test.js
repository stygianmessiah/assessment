const { trackerTester } = require("./utils/trackerTester");
const csvFilePath = `./tl_tactic_reduced.csv`;

const tracker = {
  tactic: "abc123",
  impression_pixel_json: "https://www.google.com",
};
test("gets URL status", async () => {
  const res = await trackerTester(tracker);
  expect(res).toStrictEqual({
    tactic: "abc123",
    url: "https://www.google.com",
    status: 200,
  });
});
