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
let state;
let gridNumber;
let gridColor = 'black';

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
start.appendChild(startButton);
startButton.addEventListener('click', () => {
    container.removeChild(start);
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

function fillGrid(){
    for(let i=0; i < gridArray.length; i++){
        gridArray[i].addEventListener('mouseover', () => {
            if (state === 'psychedelic'){
            let randomColor = '#' + (Math.floor(Math.random()*16777215).toString(16));
            gridArray[i].style.backgroundColor = randomColor;
            }
            else gridArray[i].style.backgroundColor = gridColor;
        })
    }
}

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

function styleGrid() {
    grid.style.border = 'black solid 1px';
    grid.style.boxSizing = 'border-box';
}

//left side
const slider = document.querySelector('.gridnumber');
let dimensions = slider.value;
let dimensionsDisplay = document.createElement('div')
dimensionsDisplay.textContent = `${dimensions} x ${dimensions}`;
side.appendChild(dimensionsDisplay);

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

const selectMode = document.createElement('div');
selectMode.classList.add('selectmode');
selectMode.textContent = 'Click to toggle between modes';
side.appendChild(selectMode);

const psychedelicButton = document.createElement('button');
psychedelicButton.textContent = `Normal Mode`;
side.appendChild(psychedelicButton);

let stateCount = 0;
psychedelicButton.addEventListener('click', () => {
    ++stateCount;
    if (stateCount % 2 !== 0){
    state = 'psychedelic';
    psychedelicButton.textContent = `Psychedelic Mode`;
    psychedelicButton.style.backgroundColor = '#14BDEB';
    } else if (stateCount % 2 === 0){
        state = 'normal';
        psychedelicButton.textContent = `Normal Mode`;
        psychedelicButton.style.backgroundColor = null;
    }
}
);





    















