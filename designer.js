// ===============================
// ROOM DESIGNER
// ===============================

console.log("Designer Loaded");

// Canvas

const roomCanvas = document.getElementById("roomCanvas");

// Furniture Buttons

const furnitureButtons =
document.querySelectorAll(".furniture-card button");

// Add Furniture

furnitureButtons.forEach((button)=>{

button.addEventListener("click",()=>{

const card = button.parentElement;

const image = card.querySelector("img").src;

createFurniture(image);

});

});


// Create Furniture

function createFurniture(image){

const item=document.createElement("img");

item.src=image;

item.className="canvas-furniture";

item.style.left="50px";

item.style.top="50px";

roomCanvas.appendChild(item);

enableDrag(item);

}


// ===============================
// DRAG SYSTEM
// ===============================

function enableDrag(item){

let offsetX=0;

let offsetY=0;

let dragging=false;

item.addEventListener("mousedown",(e)=>{

dragging=true;

offsetX=e.offsetX;

offsetY=e.offsetY;

});

document.addEventListener("mousemove",(e)=>{

if(!dragging)return;

const rect=roomCanvas.getBoundingClientRect();

item.style.left=(e.clientX-rect.left-offsetX)+"px";

item.style.top=(e.clientY-rect.top-offsetY)+"px";

});

document.addEventListener("mouseup",()=>{

dragging=false;

});

}