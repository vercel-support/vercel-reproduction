const engagementRange = new Map([
  [5000, "5,60%"],
  [20000, "2,43"],
  [100000, "2,15%"],
  [1000000, "2,05%"],
  [Infinity, "1,97%"],
]);

const followerRange = new Map([
  [1000, "52.35%"],
  [10000, "37.41%"],
  [50000, "7.58%"],
  [100000, "1.2%"],
  [Infinity, "0.32%"],
]);

function getRange(follower, range) {
  for (const key of range.keys()) {
    if (follower < key) return [key, range.get(key)];
  }
}

function analysis(follower) {
  return {
    engagementZone: getRange(follower, engagementRange),
    followerZone: getRange(follower, followerRange),
  };
}

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const hours = [
  "00:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
];

const formatArray = (array, type, sortType) => {
  if (array.length == 0) return {};
  const result = [...array]
    .map((item, index) => {
      return {
        prop: type === "day" ? weekdays[index] : hours[index],
        amount: item,
      };
    })
    .sort((a, b) => b[sortType] - a[sortType]);
  return result;
};

module.exports = { analysis, formatArray };
