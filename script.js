const container = document.querySelector('.container');
container.style.display = 'flex';
container.style.flexWrap = 'wrap';
container.style.border = 'blue solid 1px';
const containerHeight = parseFloat(getComputedStyle(container).height);
const containerWidth = parseFloat(getComputedStyle(container).width);
let grid;
const gridNumber = 16;
const gridColor = 'black';

function makeUnit () {
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

makeUnit();

const allGrid = document.querySelectorAll('.unit');
const gridArray = Array.from(allGrid);
for(let i=0; i < gridArray.length; i++){
    gridArray[i].addEventListener('mouseover', () => {
        gridArray[i].style.backgroundColor = 'pink';
    })
}








