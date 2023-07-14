//Declaration of Variables
const settings = document.querySelectorAll('button')
const gridContainer = document.querySelector('.gridContainer');
const colorSelector = document.querySelector('.colorSelector');
const selectedColor = document.querySelector('.selectedColor');
const gridLine = document.querySelector('.gridLine');
const eraser = document.querySelector('.eraser');
const clearBtn = document.querySelector('.clear');
const rgbBtn = document.querySelector('.rgb');
const sizeValue = document.querySelector('.size');
const sizeSlider = document.querySelector('.slider')

let gridBoxes = gridContainer.children;

let defaultSize = 16;
let defaultColor = '#333333'

function createGrid(gridSize) {
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize ** 2; i++) {
        const gridItems = document.createElement('div');
        gridItems.addEventListener('mouseover', colorGrid);
        gridContainer.appendChild(gridItems).className = 'gridItems';
    }
}


function colorGrid(e) {
    if (!settings.clicked) return;

    e.target.style.backgroundColor = defaultColor;
}

function chooseColor(color) {
    defaultColor = color;
    for (let i = 0; i < gridBoxes.length; i++){
        gridBoxes[i].addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = color;
            defaultColor = color;
        });
    }
}


function eraseGrid() {
    for (let i = 0; i < gridBoxes.length; i++){
        gridBoxes[i].addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = 'white';
        });
    }
}


function clearGrid() {
    const gridItems = gridContainer.querySelectorAll('div');
    gridItems.forEach(gridItem => gridItem.style.backgroundColor = 'white');
}

function changeColorRGB() {   
    for (let i = 0; i < gridBoxes.length; i++){
        gridBoxes[i].addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = getRandomColors();
        })
    }
}

function getRandomColors() {
    const colorR = Math.floor(Math.random() * 256);
    const colorG = Math.floor(Math.random() * 256);
    const colorB = Math.floor(Math.random() * 256);

    let color = `rgb(${colorR}, ${colorG}, ${colorB})`;

    return color;
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}
   

function updateSize(value) {
    gridContainer.innerHTML = '';
    defaultSize = value;
    createGrid(defaultSize);
}

function setGridLine() {
    const gridItems = gridContainer.querySelectorAll('div');
    if (gridLine.textContent === 'Hide Gridline') {
        gridItems.forEach(gridItem => gridItem.style.border = 'none');
        gridLine.textContent = 'Show Gridline';
    } else {
        gridItems.forEach(gridItem => gridItem.style.border = '1px solid gray');
        gridLine.textContent = 'Hide Gridline'
    }
}


let prevButton = null;

for (let i = 0; i < settings.length; i++) {
    settings[i].addEventListener('click', (e) => {

        console.log(e.target);
        if (e.target !== gridLine) {
            e.target.classList.add('active');  
            
            if(prevButton !== null) {
                prevButton.classList.remove('active');
                clearBtn.classList.remove('active');
            } 
            
            prevButton = e.target;
            console.log(prevButton);
        }
    });
}

//Event Listeners
colorSelector.oninput = (e) => chooseColor(e.target.value);
selectedColor.onclick = () => chooseColor(defaultColor);
gridLine.onclick = () => setGridLine();
eraser.onclick = () => eraseGrid();
clearBtn.onclick = () => clearGrid();
rgbBtn.onclick = () => changeColorRGB();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => updateSize(e.target.value);
window.onload = () => createGrid(defaultSize);