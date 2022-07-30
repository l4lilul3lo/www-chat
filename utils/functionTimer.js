const { performance } = require("perf_hooks");

function callFunctionAndTime(fnction, argsArray, n) {
  let totalTime = 0;
  for (let i = 0; i < n; i++) {
    const startTime = performance.now();
    fnction.apply(null, argsArray);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    totalTime += timeTaken;
    console.log(
      "\x1b[32m",
      `${fnction.name} ${i}:`,
      "\x1b[0m",
      "\x1b[36m",
      `${timeTaken.toFixed(3)}ms`,
      "\x1b[0m"
    );
  }
  console.log(
    "\x1b[35m",
    `total time: `,
    "\x1b[0m",
    "\x1b[33m",
    `${totalTime.toFixed(3)}ms`,
    "\x1b[0m"
  );
  const averageTime = totalTime / n;
  return { totalTime, averageTime };
}

module.exports = { callFunctionAndTime };
