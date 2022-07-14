let time = 24;
let dayMoment = undefined;
let sky = undefined;
let timeToEat = undefined;

if (time >= 6 && time < 14) {
  dayMoment = "morning.";
} else if (time >= 14 && time < 19) {
  dayMoment = "afternoon.";
} else if (time >= 19 && time < 23) {
  dayMoment = "evening.";
} else if (time >= 23 || time < 6) {
  dayMoment = "night.";
}

function runIfStatement() {
  if (time >= 6 && time < 14) {
    dayMoment = "morning.";
  } else if (time >= 14 && time < 19) {
    dayMoment = "afternoon.";
  } else if (time >= 19 && time < 23) {
    dayMoment = "evening.";
  } else if (time >= 23 || time < 6) {
    dayMoment = "night.";
  }
}

function testDayMoment() {
  const times = {
    "morning.": [],
    "afternoon.": [],
    "evening.": [],
    "night.": [],
  };

  for (let i = 0; i < 24; i++) {
    time = i;
    runIfStatement();
    times[dayMoment].push(i);
  }
  console.log("times: ", times);
}
testDayMoment();

if (dayMoment === "morning.") {
  sky = "slightly cloudy with a bright sun.";
} else if (dayMoment === "afternoon.") {
  sky = "cloudy and dark. It's raining.";
} else if (dayMoment === "evening.") {
  sky = "clear. The sun is gone.";
} else if (dayMoment === "night.") {
  sky = "completely dark. The moon shines alone.";
}

if (time >= 12 && time < 14) {
  timeToEat = true;
}
if (time >= 19 && time < 21) {
  timeToEat = true;
}

function descriptionByMe() {
  console.log("It's " + dayMoment + " The sky is " + sky);
}
function descriptionByMom() {
  console.log("It's " + dayMoment + " The sky is " + sky);
  if (timeToEat) {
    console.log("It's also time to eat, I'll call the kids.");
  }
}

descriptionByMe();
console.log(sky);
console.log(dayMoment);

function maxProfitDays(stockPrices) {
  const maxNumber = Math.max(...stockPrices);
  const minNumber = Math.min(...stockPrices);

  const maxNumberIndex = stockPrices.findIndex(
    (element) => element === maxNumber
  );
  const minNumberIndex = stockPrices.findIndex(
    (element) => element === minNumber
  );

  console.log(stockPrices);
  console.log([minNumberIndex, maxNumberIndex]);
  return [minNumberIndex, maxNumberIndex];
}

// Leave this so we can test your code:
maxProfitDays([1, 2, 3]);
