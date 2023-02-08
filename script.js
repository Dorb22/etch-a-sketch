const body = document.querySelector('.body')
const container = document.querySelector('.container');
const side = document.querySelector('.side');
const right = document.querySelector('.right');
container.style.display = 'flex';
container.style.flexWrap = 'wrap';
container.style.border = '#D99AC5 solid 1px';
const containerHeight = parseFloat(getComputedStyle(container).height);
const containerWidth = parseFloat(getComputedStyle(container).width);
const aftertitle = document.querySelector('.aftertitle');
let grid;
let state = 'normal';
let gridNumber;

let gridColor = '#000000';
const colorpicker = side.querySelector('.colorpicker');
let pickedColor = colorpicker.value;
colorpicker.addEventListener('change', () => {
    pickedColor = colorpicker.value;
    gridColor = pickedColor;
})

right.removeChild(aftertitle);

const start = document.createElement('div');
start.style.cssText = 'display: flex; flex-direction: column;justify-content: center; align-items: center;';
container.appendChild(start);

const title = document.createElement('div');
title.classList.add('title')
title.textContent = 'GridArt';
start.appendChild(title);

const startButton = document.createElement('button');
startButton.classList.add('startbutton');
startButton.textContent = 'Start';
startButton.style.cssText = 'background-color: #B37BA4; font-size: 35px; color: white; border-style: none; transition: all 150ms ease-in-out';
right.appendChild(startButton);
startButton.addEventListener('click', () => {
    right.removeChild(startButton);
    start.removeChild(title);
    right.appendChild(container);
    makeGrid();
    selectGrid();
    fillGrid();
    right.appendChild(aftertitle);
});

let allGrid;
let gridArray;

function selectGrid() {
    allGrid = document.querySelectorAll('.unit');
    gridArray = Array.from(allGrid);
}

let condition = 'unclicked';
container.addEventListener('mousedown', () => condition = 'clicked');
container.addEventListener('mouseup', () => condition = 'unclicked');

function fillGrid(){
    let gridBackground;
    for(let i=0; i < gridArray.length; i++){
        gridArray[i].addEventListener('mouseover', () => {
            if (state === 'psychedelic' && condition === 'clicked' && erase === 'no'){  
                let randomColor = '#' + (Math.floor(Math.random()*16777215).toString(16));
                gridArray[i].style.backgroundColor = randomColor;
            }
            else if (state === 'normal' && condition === 'clicked' && erase === 'no') {
                gridArray[i].style.backgroundColor = gridColor;
            }
            else if (state === 'shadow' && condition === 'clicked' && erase === 'no') {
                if(gridArray[i].style.backgroundColor === ''){
                gridBackground = 'rgb(255, 255, 255)';
                }
                else if (gridArray[i].style.backgroundColor === 'rgb(0, 0, 0)'){
                gridBackground = 'rgb(0, 0, 0)';
                }
                else{ 
                gridBackground = gridArray[i].style.backgroundColor;
                }
                let remove1 = gridBackground.replace('rgb(', '');
                let remove2 = remove1.replace(')', '');
                let rgbArray  = remove2.split(', ');
                let rValue = rgbArray[0];
                let gValue = rgbArray[1];
                let bValue = rgbArray[2];
                let hexa = rgbToHex(+rValue, +gValue, +bValue);
                gridArray[i].style.backgroundColor = newShade(hexa, -20);
            }
            else if (state === 'light' && condition === 'clicked' && erase === 'no'){
                if(gridArray[i].style.backgroundColor === ''){
                    gridBackground = 'rgb(255, 255, 255)';
                    }
                    else if (gridArray[i].style.backgroundColor === 'rgb(0, 0, 0)'){
                    gridBackground = 'rgb(0, 0, 0)';
                    }
                    else{ 
                    gridBackground = gridArray[i].style.backgroundColor;
                    }
                    let remove1 = gridBackground.replace('rgb(', '');
                    let remove2 = remove1.replace(')', '');
                    let rgbArray  = remove2.split(', ');
                    let rValue = rgbArray[0];
                    let gValue = rgbArray[1];
                    let bValue = rgbArray[2];
                    let hexa = rgbToHex(+rValue, +gValue, +bValue);
                    gridArray[i].style.backgroundColor = newShade(hexa, 20);
            }
            else if (erase === 'yes'){
                gridArray[i].style.backgroundColor = 'rgb(255, 255, 255)';
            }
            else return;
        })
    }
}

function toHex(){
    
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  const newShade = (hexColor, magnitude) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
};

startButton.addEventListener('mouseover', () => {
    startButton.style.backgroundColor = '#14BDEB';
    startButton.style.scale = '1.1';
})
startButton.addEventListener('mouseout', () => {
    startButton.style.backgroundColor = '#B37BA4';
    startButton.style.scale = '1';
})


function makeGrid () {
    gridNumber = dimensions;
    for(let i=0; i < gridNumber * gridNumber; i++){
    grid = document.createElement('div');
    grid.style.width = `${containerWidth/gridNumber}px`;
    grid.style.height = `${containerHeight/gridNumber}px`;
    grid.classList.add('unit');
    styleGrid();
    container.appendChild(grid);
    }
}

function styleGrid(format) {
    grid.style.border = 'black solid 1px';
    grid.style.boxSizing = 'border-box';
}

//left side
const slider = document.querySelector('.gridnumber');
const dim = document.querySelector('.dim');
let dimensions = slider.value;
let dimensionsDisplay = document.createElement('div')
dimensionsDisplay.textContent = `${dimensions} x ${dimensions}`;
dimensionsDisplay.classList.add('size');
dim.appendChild(dimensionsDisplay);

slider.addEventListener('change', () => {
    dimensions = slider.value;
    dimensionsDisplay.textContent = `${dimensions} x ${dimensions}`;
    removeGrid();
    makeGrid();
    selectGrid();
    fillGrid();
})

function removeGrid(){
    selectGrid();
    for (i = 0; i < gridArray.length; i++){
        container.removeChild(gridArray[i]);
    }
}

const colorSection = document.createElement('div');
colorSection.classList.add('colorsection');
side.appendChild(colorSection);

const selectMode = document.createElement('div');
selectMode.classList.add('selectmode');
selectMode.textContent = 'Click to toggle between modes';
colorSection.appendChild(selectMode);

const psychedelicButton = document.createElement('button');
psychedelicButton.textContent = `Normal Mode`;
colorSection.appendChild(psychedelicButton);

let psychedelicCount = 0;
psychedelicButton.textContent = `Normal Mode`;
psychedelicButton.classList.add = 'normal';
psychedelicButton.style.cssText = 'width: 250px; height: 50px; font-size: 20px; background-color: #efeded; border: 3px solid white; filter: drop-shadow(-10px 3px 2px #00000021); padding: 5px 30px 5px 30px;)';
psychedelicButton.addEventListener('click', () => {
    if (state === 'normal') {
        state = 'psychedelic';
        psychedelicButton.textContent = 'Psychedelic Mode';
        psychedelicButton.style.cssText = 'width: 250px; height: 50px; font-size: 20px; background-image: linear-gradient(80deg, #D99AC5, #14BDEB); border: 3px solid white; filter: drop-shadow(-10px 3px 2px #00000021); padding: 5px 30px 5px 30px;)';
    }
    else if (state === 'psychedelic') {
        state = 'shadow';
        psychedelicButton.textContent = 'Shadow Mode';
        psychedelicButton.classList.add = 'shadow';
        psychedelicButton.style.cssText = 'width: 250px; height: 50px; font-size: 20px; color: white; background-color: black; border: 3px solid white; filter: drop-shadow(-10px 3px 2px #00000021); padding: 5px 30px 5px 30px;)';
    }
    else if (state === 'shadow'){
        state = 'light';
        psychedelicButton.textContent = 'Lighten Mode';
        psychedelicButton.classList.add = 'light';
        psychedelicButton.style.cssText = 'width: 250px; height: 50px; font-size: 20px; background-color: #ffffae; line; border: 3px solid white; filter: drop-shadow(-10px 3px 2px #00000021); padding: 5px 30px 5px 30px;)';
    }
    else {
        state = 'normal';
        psychedelicButton.textContent = 'Normal Mode';
        psychedelicButton.classList.add = 'normal';
        psychedelicButton.style.cssText = 'width: 250px; height: 50px; font-size: 20px; background-color: #efeded; border: 3px solid white; filter: drop-shadow(-10px 3px 2px #00000021); padding: 5px 30px 5px 30px;)';
    }
}
);

const eraser = document.createElement('button')
eraser.classList.add('eraser');
eraser.textContent = 'Erase';
side.appendChild(eraser);

let erase = 'no';
eraser.addEventListener('click', () => {
    if (erase === 'no') erase = 'yes';
    else if (erase === 'yes') erase = 'no';
});

const noGrid = document.createElement('button');
noGrid.textContent = 'Remove Grid';
noGrid.classList.add('nogrid');
side.appendChild(noGrid);

let gridPresence = 'yes';
noGrid.addEventListener('click', () => {
    if (gridPresence === 'yes'){
        noGrid.textContent = 'Add Grid';
        selectGrid();
        for (let i = 0; i < gridArray.length; i++){
            gridArray[i].style.borderColor = 'rgb(0, 0, 0, 0)';
        }   
        gridPresence = 'no';
    }
    else if(gridPresence === 'no'){
        noGrid.textContent = 'Remove Grid';
        selectGrid();
        for (let i = 0; i < gridArray.length; i++){
            gridArray[i].style.borderColor = 'black';
        } 
        gridPresence = 'yes';
    }
})

const clear = document.createElement('button');
clear.classList.add('clear');
clear.textContent= 'Clear Canvas';
side.appendChild(clear);

clear.addEventListener('click', () => {
    removeGrid();
    makeGrid();
    selectGrid();
    fillGrid();
})


    















