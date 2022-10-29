const wheel = document.querySelector('#wheel');

const wheelParts = 15;
const wheelPartsArray = [];
const wheelSections = 1500 / wheelParts;
const wheelRandom = Math.random() * 1500;

for (let i = 0; i < wheelParts; i++) {
  wheelPartsArray.push(i * wheelSections);
}

const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const spinToRandom = async () => {
  wheel.style.backgroundPositionX = `${wheelRandom}px`;
  await delay(3000);
  spinToClosest();
};

const spinToClosest = () => {
  const closest = wheelPartsArray.reduce((prev, curr) => {
    return Math.abs(curr - wheelRandom) < Math.abs(prev - wheelRandom) ? curr : prev;
  });

  wheel.style.backgroundPositionX = `${closest}px`;
};

spinToRandom();
