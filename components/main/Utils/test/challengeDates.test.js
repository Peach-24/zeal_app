const { setChallengeDates } = require("../challengesDates");

describe("setChallengeDates", () => {
  test("return object with startDate and endDate", () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    expect(setChallengeDates(0, d, "Daily")).toEqual({
      startDate: "2021-01-12T00:00:00.000Z",
      endDate: "2021-01-13T00:00:00.000Z",
    });
  });
  test("return object with startDate and endDate", () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    expect(setChallengeDates(0, d, "Weekly")).toEqual({
      startDate: "2021-01-12T00:00:00.000Z",
      endDate: "2021-01-19T00:00:00.000Z",
    });
  });
  test("return object with startDate and endDate", () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    expect(setChallengeDates(1, d, "Daily")).toEqual({
      startDate: "2021-01-13T00:00:00.000Z",
      endDate: "2021-01-14T00:00:00.000Z",
    });
  });
});
