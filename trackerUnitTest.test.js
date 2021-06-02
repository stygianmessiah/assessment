const { trackerTester } = require("./utils/trackerTester");
const { impressionArrayCreator } = require("./utils/impArrayCreator");
// const csvFilePath = `./tl_tactic_reduced.csv`;

const tracker = {
  tactic: "abc123",
  impression_pixel_json: "https://www.google.com",
};
const logs = [
  {
    tactic_id: "333304",
    impression_pixel_json:
      '["https:\\/\\/ad.doubleclick.net\\/ddm\\/ad\\/N7676.791086DOUBLECLICKTECH.COM\\/B9352239.127304136;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?","https:\\/\\/secure-gl.imrworldwide.com\\/cgi-bin\\/m?ci=nlsnci304&am=3&at=view&rt=banner&st=image&ca=nlsn32514&cr=crtve&pc=dcbm_plc0001&ce=dcbm&r=[timestamp]"]',
  },
  {
    tactic_id: "337773",
    impression_pixel_json:
      '["https:\\/\\/ad.doubleclick.net\\/ddm\\/trackimp\\/N2724.1852769TRIPLELIFT.COM\\/B9457112.128485014;dc_trk_aid=301461699;dc_trk_cid=66292004;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?","http:\\/\\/tags.bluekai.com\\/site\\/32051?limit=1"]',
  },
];

test("gets URL status", async () => {
  const res = await trackerTester(tracker);
  expect(res).toStrictEqual({
    tactic: "abc123",
    url: "https://www.google.com",
    status: 200,
  });
});

test("test array creator", () => {
  const impArray = impressionArrayCreator(logs);
  expect(impArray).toHaveLength(4);
  expect(impArray[0]).toHaveProperty("impression_pixel_json");
  expect(Array.isArray(impArray)).toBe(true);
});
