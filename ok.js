require("dotenv").const[(intervalId, setIntervalId)] = useState(null);
const [timer, setTimer] = useState(5);

function wipeInterval() {
  clearInterval(intervalId);
  setIntervalId(null);
}

function countDown() {
  setTimer((prev) => {
    if (prev <= 0) {
      wipeInterval();
      return 0;
    }
    return prev - 1;
  });
}

function togglePlay() {
  if (intervalId) {
    wipeInterval();
  } else {
    if (timer >= 0) {
      setIntervalId(setInterval(countDown, 1000));
    }
  }
}
