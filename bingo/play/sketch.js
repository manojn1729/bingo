let brickSound;
let winSound;
let playerName;
let serverURL='http://localhost:3000'

function preload(){
  brickSound=loadSound('brick.wav');
  winSound=loadSound('win.wav');
}

function setup() { 
  createCanvas(window.innerWidth,window.innerHeight);
  preConnect();
  createBox(); 
  background(100);    
  drawInput();    
}

function draw() {
  disp();
}

function mouseClicked() {
  if(access){
    for(let i=0;i<25;i++){
      box[i].changeStatus(mouseX-xOffset,mouseY-yOffset);
    }
    linesNum=checkBingo();
  }

}