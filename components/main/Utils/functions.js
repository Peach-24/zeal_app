// USED IN PROFILE PAGE

export const formatJoinDate = (timestamp) => {
  let date = Date(timestamp);
  let splitArr = date.split(" ");
  const trimArr = splitArr.slice(1, 4);
  return trimArr.join("/");
};

export const createGroupsString = (arr) => {
  let finalStr = "";
  arr.forEach((group) => {
    finalStr += `📸 ${group}\n`;
  });
  return finalStr;
};

// USED IN ...
