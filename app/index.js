// Elements
const wheel = document.querySelector('#wheel');
const timer = document.querySelector('#timer');

// Wheel props
const wheelParts = 15;
const wheelPartsArray = [];
const wheelSections = 1500 / wheelParts;
const wheelStart = 8 * 1500;

for (let i = 0; i < wheelParts; i++) {
  wheelPartsArray.push(i * wheelSections);
}

// Delays
const delatSpin = 12000;
const delayClosest = 2000;
const delayRestart = 10000;
const delayBetween = 1000;

const delay = (time, update = false) => {
  update && updateTimer(time);
  return new Promise((resolve) => setTimeout(resolve, time));
};

const updateTimer = async (time) => {
  for (let i = 0; i < time / 1000; i++) {
    const secondsLeft = (time - i * 1000) / 1000;
    timer.innerHTML = secondsLeft;
    await delay(1000);
  }
  timer.innerHTML = 0;
};

const spinWheel = async (position, speed) => {
  wheel.style.transition = `${speed}ms cubic-bezier(0.2, 0, 0.03, 1)`;
  wheel.style.backgroundPositionX = `${position}px`;
  await delay(speed + delayBetween);
};

const spinToRandom = async () => {
  const wheelRandom = Math.random() * 1500;
  await spinWheel(wheelRandom, delatSpin);
  spinToClosest(wheelRandom);
};

const spinToClosest = async (wheelRandom) => {
  const closest = wheelPartsArray.reduce((prev, curr) => {
    return Math.abs(curr - wheelRandom) < Math.abs(prev - wheelRandom) ? curr : prev;
  });

  await spinWheel(closest, delayClosest);
  restartWheel(closest);
};

const restartWheel = async (closest) => {
  await spinWheel(closest + wheelStart, 0);
  await delay(delayRestart, true);
  spinToRandom();
};

const initialStart = async () => {
  await spinWheel(wheelStart, 0);
  spinToRandom();
};

initialStart();

// Bug wheel go to front if in middle? Change random between to test every case
