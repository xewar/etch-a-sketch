// The starting grid is 'medium-sized'
let size = 9;

let num = size**2;
const grid = document.querySelector('.grid');
let new_row = document.createElement('div');
new_row.setAttribute('class','row');
for (let i = 0; i < num; i++) {
    if (i % size === 0) {
        new_row = document.createElement('div');
        new_row.setAttribute('class','row');
        grid.appendChild(new_row);
    }
    let new_div = document.createElement('div');
    new_div.setAttribute('class','gridSquare');
    new_div.textContent = ".";
    new_row.appendChild(new_div);
}

//To change the color of a square, move your mouse over it
let squares = document.querySelectorAll('div.gridSquare')
squares.forEach(div => div.addEventListener('mouseover', colorTrail, {
}));


//resetting grid
let reset = document.querySelector('#reset');
reset.addEventListener('click',changeGridSize);


//changing the grid size 
const gridSizeButtons = document.querySelectorAll('#size');
gridSizeButtons.forEach(btn => btn.addEventListener('click', newSize));

function newSize(e){
    size = this.className
    changeGridSize()
}
function changeGridSize(e){
    let num = size**2;
    let grid = document.querySelector('.grid');

    //delete any previous children
    while (grid.firstChild){
        grid.removeChild(grid.firstChild)
    }

    //add new rows for a new grid
    let new_row = document.createElement('div');
    new_row.setAttribute('class','row');
    for (let i = 0; i < num; i++) {
        if (i % size === 0) {
            new_row = document.createElement('div');
            new_row.setAttribute('class','row');
            grid.appendChild(new_row);
        }
        let new_div = document.createElement('div');
        new_div.setAttribute('class','gridSquare');
        new_div.textContent = ".";
        new_row.appendChild(new_div);
    }
    //updating the squares variable with the new grid
    squares = document.querySelectorAll('div.gridSquare')
    squares.forEach(div => div.addEventListener('mouseover', colorTrail, {
    }));
}


//Initializing some values / dictionary objects for color change calculations**
let color = '#3D5588FF'; //initializing with teal as it combine so nicely with the other colors
let colorDict = {'Blue':'#3D5588FF', 'Yellow':'#FFE800FF','Pink':'#FF48B0FF','Red':'#F15060FF', 'Teal': '#00838A'};
let satDict = {'twenty':'33', 'forty':'66', 'sixty':'99', 'eighty':'CC', 'hundred':'FF'};
let val = 'FF'


function colorTrail(e) {
    if (this.style.background == ""){
        this.style.background = color;
        this.setAttribute('colorID', color)
    } else{
        let existingColor = this.getAttribute('colorID') 
        let val2 = existingColor.slice(-2)
        let mixedColor = "#";
        for(let i = 0; i<3; i++) {
            let sub1 = color.substring(1+2*i, 3+2*i);
            let sub2 = existingColor.substring(1+2*i, 3+2*i);
            let v1 = parseInt(sub1, 16);
            let v2 = parseInt(sub2, 16);
            let v = Math.floor((v1 + v2) / 2);
            let sub = v.toString(16).toUpperCase();
            let padsub = ('0'+sub).slice(-2);
            mixedColor += padsub;
        }
        //this is taking the average of the values, which is then added to the new blended color
        let newVal = (Math.round((hexToDec(val)+ hexToDec(val2))/2)).toString(16).toUpperCase()
        console.log("newVal is: "+newVal)
        console.log(color, existingColor, this.getAttribute('colorID'))
        mixedColor +=newVal
        console.log('mixedColor is: '+ mixedColor)
        this.style.background = mixedColor;
        this.setAttribute('colorID', mixedColor)
    }}
function hexToDec(hexString){
  return parseInt(hexString, 16);
}
//event listener to choose the color via the color(hue) buttons
const colors = document.querySelectorAll('.color');
colors.forEach(risocolor => risocolor.addEventListener('click', changeColor))

//event listener to choose the color via the saturation buttons
let saturationButtons = document.querySelectorAll('#saturation')
saturationButtons.forEach(saturation => saturation.addEventListener('click', changeMouseSaturation))


//changes the saturation of the color
function changeMouseSaturation(e) {
    color = this.getAttribute('colorID')
    console.log(color)
    val = color.slice(-2)
}
//changes the hue of the color, keeping the saturation that you've chosen
function changeColor(e) {
    let colorChoice = this.textContent;
    color = colorDict[String(colorChoice)].slice(0,7)+val;
    saturationGridChange(color);
}
//changes the value of the grid options for saturation when you change the hue
function saturationGridChange(color) {
    for (i = 0; i< saturationButtons.length; i++){
        let element = saturationButtons[i];
        let colorID = color.slice(0,7) + satDict[element.className];
        element.style.backgroundColor = colorID
        element.setAttribute('colorID',colorID )

    }
}
//running this initially on it's own so that the buttons work for blue on page reload
saturationGridChange(color)

//starting and stopping the mouseover listener with a click
