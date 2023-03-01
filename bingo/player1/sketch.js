let brickSound;
let winSound;
let playerName;
let playId=1;
let turn=0;
let serverURL='http://localhost:3000'

function preload(){
  brickSound=loadSound('brick.wav');
  winSound=loadSound('win.wav');
}

function setup() { 
  socket=io.connect(serverURL);
  socket.on('playersName',(data)=>{
    playerName=data[playId];
  })
  socket.on('reload',(data)=>{
    console.log(data);
    location.reload();
  })
  socket.on('wrapData',(data)=>{
    brickSound.play();
    turn=1;
    if(data.playerId==playId){
      turn=0;
    }
    if(box[0].num==0 && data.playerId==playId){
      playerName=data.playerName
      for(let i=0;i<data.data.length;i++){
        box[i].num=data.data[i].num;
        box[i].state=data.data[i].state;
      }
    }
    else{
      for(let i=0;i<box.length;i++){
        if(box[i].num==data.number){
            box[i].state=100;
            }
          }}
          linesNum=checkBingo();
  })
  createCanvas(window.innerWidth,window.innerHeight);
  createBox(); 
  background(100);   
}

function draw() {
  disp();
}

