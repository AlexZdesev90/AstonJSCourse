const compareButton = document.querySelector('.compare_btn');
const addRivalsButton = document.querySelector('.add_rivals');
const infoButton = document.querySelector('.info_button');


const contentCompare = document.querySelector('.content_compare');

const civilianButton = document.querySelector('.civilian');
const sportButton = document.querySelector('.sport');
const militaryButton = document.querySelector('.military');

civilianButton.addEventListener('click', createCivilianCar);
sportButton.addEventListener('click', createSportCar);
militaryButton.addEventListener('click', createMilitaryCar);
compareButton.addEventListener('click', compareHandlier);
addRivalsButton.addEventListener('click', addRivalsHandlier);
infoButton.addEventListener('click', getInfo);

const content = document.querySelector('.content');

class Automobile {
  helpier(prop) {
    if (this.points === 1) {
      alert('У вас не осталось распределяемых очков');
      const btnProperty = document.querySelectorAll('.btn_property');
      btnProperty.forEach((el) => (el.disabled = true));
    } else {
      this[prop]++;
      this.points--;
    }
  }

  updateProperty(property) {
    switch (property) {
      case 'fuel':
        this.helpier('fuel');
        return;
      case 'lowFuelConsumption':
        this.helpier('lowFuelConsumption');
        return;
      case 'durability':
        this.helpier('durability');
        return;
      case 'speed':
        this.helpier('speed');
        return;
    }
  }
}

function addRivalsHandlier() {
  addRivals();
}

function updateRivalsStat(number, rivals) {
  for (let i = 0; i < rivals.length; i++) {
    switch (number) {
      case 1:
        rivals[i].fuel += 2;
        continue;
      case 2:
        rivals[i].lowFuelConsumption += 2;
        continue;
      case 3:
        rivals[i].durability += 2;
        continue;
      case 4:
        rivals[i].speed += 2;
        continue;
      default:
        break;
    }
  }
  cars.push(...rivals);
}

function getInfo() {
  alert(`
  1) Выберите машину.
  2) Добавьте распределяемые очки (всего доступно 2).
  3) После добавьте сопереников (кнопка "Add rival").
  4) После этого у вас разблокируется кнопка compare, где вы сможете увидеть статистику.
  `);
}

function convert(cars) {
  let powerReserve = [];
  let totalSpeed = [];
  let totalDurability = [];

  const power = cars.map(
    (el) => (el = (5 + el.fuel) * 200 + (5 + el.fuel) * 0.1 * 200 * el.lowFuelConsumption),
  );
  powerReserve.push(power[0], power[1], power[2], power[3]);
  const speed = cars.map((el) => (el = 10 + el.speed * 0.05 * 10));
  totalSpeed.push(speed[0], speed[1], speed[2], speed[3]);
  const durab = cars.map((el) => (el = 100 + el.durability * 0.1 * 100));
  totalDurability.push(durab[0], durab[1], durab[2], durab[3]);
  return [powerReserve, totalSpeed, totalDurability];
}

function paintСompeting(cars) {
  let [powerReserve, totalSpeed, totalDurability] = convert(cars);
  let maxPowerReserve = 0;
  for (let i = 0; i < powerReserve.length; i++) {
    maxPowerReserve = Math.max(powerReserve[i], maxPowerReserve);
  }
  let maxTotalSpeed = 0;
  for (let i = 0; i < totalSpeed.length; i++) {
    maxTotalSpeed = Math.max(totalSpeed[i], maxTotalSpeed);
  }
  let maxtotalDurability = 0;
  for (let i = 0; i < totalDurability.length; i++) {
    maxtotalDurability = Math.max(totalDurability[i], maxtotalDurability);
  }
  for (let i = 0; i < cars.length; i++) {
    contentCompare.innerHTML += `
      <div class='content_compare_wrapper'>
        <p>${i === 0 ? 'Your Car' : 'Rival ' + i}</p>
        <div>${
          powerReserve[i] === maxPowerReserve
            ? '100%'
            : ((powerReserve[i] / maxPowerReserve) * 100).toFixed(1) + ' %'
        }</div>
        <div>${
          totalSpeed[i] === maxTotalSpeed
            ? '100%'
            : ((totalSpeed[i] / maxTotalSpeed) * 100).toFixed(1) + ' %'
        }</div>
        <div>${
          totalDurability[i] === maxtotalDurability
            ? '100%'
            : ((totalDurability[i] / maxtotalDurability) * 100).toFixed(1) + ' %'
        }</div>
      <div>
      `;
  }
}

function addRivals() {
  const rivals = [new Civilian(), new Sport(), new Military()];
  const propertyNumber = Math.round(Math.random() * 4);
  updateRivalsStat(propertyNumber, rivals);
  addRivalsButton.disabled = true;
  compareButton.disabled = false;
}

class Civilian extends Automobile {
  constructor() {
    super();
    this.fuel = 2;
    this.lowFuelConsumption = 2;
    this.durability = 2;
    this.speed = 4;
    this.name = 'Unknown Car';
    this.points = 2;
  }
}

class Sport extends Automobile {
  constructor() {
    super();
    this.fuel = 2;
    this.lowFuelConsumption = 1;
    this.durability = 1;
    this.speed = 6;
    this.name = 'Unknown Car';
    this.points = 2;
  }
}

class Military extends Automobile {
  constructor() {
    super();
    this.fuel = 2;
    this.lowFuelConsumption = 2;
    this.durability = 4;
    this.speed = 2;
    this.name = 'Unknown Car';
    this.points = 2;
  }
}

const cars = [];

function carPainterHandlier(car) {
  document.querySelectorAll('.btn_choice').forEach((el) => {
    el.disabled = true;
    el.innerHTML = 'DISABLED';
  });
  paint(car);
  cars.push(car);
}

function createCivilianCar() {
  const civilianCar = new Civilian();
  carPainterHandlier(civilianCar);
}

function createSportCar() {
  const sportCar = new Sport();
  carPainterHandlier(sportCar);
}

function createMilitaryCar() {
  const militaryCar = new Military();
  carPainterHandlier(militaryCar);
}

function paint(obj) {
  const powerReserve = (5 + obj.fuel) * 200 + (5 + obj.fuel) * 0.1 * 200 * obj.lowFuelConsumption;
  const carContainer = document.createElement('div');
  carContainer.innerHTML = `
    <div class='info'>
    <h3 class='text_upgrate'>You have <span class='points'>${obj.points}</span> points for upgrate</h3>
    <p class='car_name'>Your car!</p>
    <div class='property_block fuel'>${obj.fuel} - Fuel (default)<button class='upFuel btn_property'>+</button></div>
    <div class='property_block fcons'>${obj.lowFuelConsumption} - FCons (default)<button class='upLowFuelConsumption btn_property' >+</button></div>
    <div class='property_block durab'>${obj.durability} - Durab (default)<button class='upDurability btn_property' >+</button></div>
    <div class='property_block speed'>${obj.speed} - Speed (default)<button class='upSpeed btn_property' >+</button></div>
    <div class='default'>DEFAULT power reserve: ${powerReserve}</div>
    </div>
  `;
  
  content.append(carContainer);
  const upFuels = document.querySelectorAll('.upFuel');
  const upFuelConsumption = document.querySelectorAll('.upLowFuelConsumption');
  const upDurability = document.querySelectorAll('.upDurability');
  const upSpeed = document.querySelectorAll('.upSpeed');

  upFuels.forEach((el) => el.addEventListener('click', () => upFuelHandlier(obj)));
  upFuelConsumption.forEach((el) =>
    el.addEventListener('click', () => upFuelConsumptionHandlier(obj)),
  );
  upDurability.forEach((el) => el.addEventListener('click', () => upDurabilityHandlier(obj)));
  upSpeed.forEach((el) => el.addEventListener('click', () => upSpeedHandlier(obj)));
}

function changePoint() {
  document.querySelector('.points').innerHTML -= 1;
}

function upFuelHandlier(obj) {
  obj.updateProperty('fuel');
  changePoint();
}
function upFuelConsumptionHandlier(obj) {
  obj.updateProperty('lowFuelConsumption');
  changePoint();
}
function upDurabilityHandlier(obj) {
  obj.updateProperty('durability');
  changePoint();
}
function upSpeedHandlier(obj) {
  obj.updateProperty('speed');
  changePoint();
}

function compareHandlier() {
  paintСompeting(cars);
  compareButton.disabled = true;
}
