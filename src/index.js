import './style.css';

//To change the color of a square, move your mouse over it
let squares = document.querySelectorAll('div.gridSquare');
squares.forEach(div => div.addEventListener('mouseover', colorTrail, {}));

//Resetting / clearing the grid
let reset = document.querySelector('#reset');
reset.addEventListener('click', changeGridSize);

//Changing the grid size
const gridSizeButtons = document.querySelectorAll('#size');
gridSizeButtons.forEach(btn => btn.addEventListener('click', newSize));

function newSize() {
  size = this.className;
  changeGridSize();
}
let grid = document.querySelector('.grid');

function changeGridSize() {
  let num = size ** 2;

  //delete any previous children
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  //add new rows for a new grid
  let new_row = document.createElement('div');
  new_row.setAttribute('class', 'row');
  for (let i = 0; i < num; i++) {
    if (i % size === 0) {
      new_row = document.createElement('div');
      new_row.setAttribute('class', 'row');
      grid.appendChild(new_row);
    }
    let new_div = document.createElement('div');
    new_div.setAttribute('class', 'gridSquare');
    new_div.textContent = '.';
    new_row.appendChild(new_div);
  }
  //updating the squares variable with the squares in the new grid
  squares = document.querySelectorAll('div.gridSquare');
  squares.forEach(div => div.addEventListener('mouseover', colorTrail, {}));
}

// The starting grid is 'medium-sized'
let size = 9;
changeGridSize();

//downloading content
let downloadImg = event => {
  event.preventDefault();
  html2canvas(grid).then(canvas => {
    document.body.appendChild(canvas);
  });
};
let downloadIcon = document.getElementById('downloadIcon');
downloadIcon.addEventListener('click', downloadImg);

//Initializing some values / dictionary objects for color change calculations**
let color = '#3D5588FF'; //default color is blue
let colorDict = {
  Blue: '#3D5588FF',
  Yellow: '#FFE800FF',
  Pink: '#FF48B0FF',
  Red: '#F15060FF',
  Teal: '#00838A',
};
let satDict = {
  twenty: '33',
  forty: '66',
  sixty: '99',
  eighty: 'CC',
  hundred: 'FF',
}; //saturation dictionary
let val = 'FF';

//Changes the color with your mouse
function colorTrail() {
  if (this.style.background == '') {
    // if there is no color there add it
    this.style.background = color;
    this.setAttribute('colorID', color);
  } else {
    // otherwise blend the current color ('color')with what's there
    let existingColor = this.getAttribute('colorID');
    let val2 = existingColor.slice(-2);
    let mixedColor = '#';
    for (let i = 0; i < 3; i++) {
      //from programming-idioms.org
      let sub1 = color.substring(1 + 2 * i, 3 + 2 * i);
      let sub2 = existingColor.substring(1 + 2 * i, 3 + 2 * i);
      let v1 = parseInt(sub1, 16);
      let v2 = parseInt(sub2, 16);
      let v = Math.floor((v1 + v2) / 2);
      let sub = v.toString(16).toUpperCase();
      let padsub = ('0' + sub).slice(-2);
      mixedColor += padsub;
    }
    //this takes the average of the values, which is then added to the new blended color
    let newVal = Math.round((hexToDec(val) + hexToDec(val2)) / 2)
      .toString(16)
      .toUpperCase();
    mixedColor += newVal;
    this.style.background = mixedColor;
    this.setAttribute('colorID', mixedColor);
  }
}
function hexToDec(hexString) {
  return parseInt(hexString, 16);
}
//Change the color via the color(hue) buttons
const colors = document.querySelectorAll('.color');
colors.forEach(risocolor => risocolor.addEventListener('click', changeColor));

//Change the color via the saturation buttons
let saturationButtons = document.querySelectorAll('#saturation');
saturationButtons.forEach(saturation =>
  saturation.addEventListener('click', changeMouseSaturation)
);

//Change the saturation of the color
function changeMouseSaturation() {
  color = this.getAttribute('colorID');
  val = color.slice(-2);
}
//changes the hue of the color, keeping the saturation that you've chosen
function changeColor() {
  let colorChoice = this.textContent;
  color = colorDict[String(colorChoice)].slice(0, 7) + val;
  saturationGridChange(color);
}
//changes the value of the grid options for saturation when you change the hue
function saturationGridChange(color) {
  for (let i = 0; i < saturationButtons.length; i++) {
    let element = saturationButtons[i];
    let colorID = color.slice(0, 7) + satDict[element.className];
    element.style.backgroundColor = colorID;
    element.setAttribute('colorID', colorID);
  }
}

//running this initially on it's own so that the buttons work
saturationGridChange(color);
