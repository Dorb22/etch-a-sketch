const body = document.querySelector('.body')
const container = document.querySelector('.container');
const side = document.querySelector('.side');
const right = document.querySelector('.right');
container.style.display = 'flex';
container.style.flexWrap = 'wrap';
container.style.border = '#D99AC5 solid 1px';
const containerHeight = parseFloat(getComputedStyle(container).height);
const containerWidth = parseFloat(getComputedStyle(container).width);
let grid;
const gridNumber = 16;
let gridColor = 'black';


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
    makeGrid();
    const allGrid = document.querySelectorAll('.unit');
    const gridArray = Array.from(allGrid);
    for(let i=0; i < gridArray.length; i++){
    gridArray[i].addEventListener('mouseover', () => {
        gridArray[i].style.backgroundColor = 'pink';
    })
}
});
startButton.addEventListener('mouseover', () => {
    startButton.style.backgroundColor = '#14BDEB';
    startButton.style.scale = '1.1';
})
startButton.addEventListener('mouseout', () => {
    startButton.style.backgroundColor = '#B37BA4';
    startButton.style.scale = '1';
})

function makeGrid () {
    right.appendChild(container);
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
const psychedelicButton = document.createElement('button');
psychedelicButton.textContent = 'Psychedelic Mode';
side.appendChild(psychedelicButton);


psychedelicButton.addEventListener('click', () =>{
    let randomCharacter;
    const randomNumber = Math.floor(Math.random() * 16);
    switch (randomNumber){
        case 10:
            randomCharacter = 'A';
            break;
        case 11:
            randomCharacter = 'B'; 
            break;
        case 12:
            randomCharacter = 'C';
            break;
        case 13:
            randomCharacter = 'D';
            break;
        case 14:
            randomCharacter = 'E';
            break;
        case 15:
            randomCharacter = 'F';
            break;
        default: randomCharacter = randomNumber;
    }
    console.log(randomCharacter);   
}
);










