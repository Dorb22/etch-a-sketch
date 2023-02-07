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

let gridColor;
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
            else if (state === 'normal') {
                gridArray[i].style.backgroundColor = gridColor;
            }
            else if (state === 'shadow'){
                gridArray[i].style.backgroundColor = `#00000021`;
                console.log(gridColor);
                console.log(state);
            }
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
    else {
        state = 'normal';
        psychedelicButton.textContent = 'Normal Mode';
        psychedelicButton.classList.add = 'normal';
        psychedelicButton.style.cssText = 'width: 250px; height: 50px; font-size: 20px; background-color: #efeded; border: 3px solid white; filter: drop-shadow(-10px 3px 2px #00000021); padding: 5px 30px 5px 30px;)';
    }
}
);





    















