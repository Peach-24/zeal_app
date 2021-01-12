const setChallengeDates = (index, groupStartDate, frequency) => {
  const frequencyTable = {
    daily: 86400000,
    weekly: 604800000,
  };
  groupStartDate.setHours(0, 0, 0, 0);
  const startMs =
    groupStartDate.getTime() + index * frequencyTable[frequency.toLowerCase()];
  const startDate = new Date(startMs).toISOString();
  const baseDate = new Date(startMs);
  const endMs = baseDate.getTime() + frequencyTable[frequency.toLowerCase()];
  const endDate = new Date(endMs).toISOString();

  const challenge = {
    startDate,
    endDate,
  };
  return challenge;
};

module.exports = { setChallengeDates };
