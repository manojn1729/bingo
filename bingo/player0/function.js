let box=[];
let scratch=[];
let boxSize;
let xOffset;
let yOffset;
let linesNum=0;
let access=true;
let mouseFunction=true;


// shuffel the array from 1 to 25 ;

function shuffel(){
  const arr=[]
  for(let i=1;i<=25;i++){
    arr.push(i);
  }
  for(let i=arr.length-1;i>=0;i--){
    let ran=floor(random(0,i+1));
    let temp=arr[ran];
    arr[ran]=arr[i];
    arr[i]=temp;
  }
  return arr;
}

// get box starting x and y location

function getBoxXY(){
    if(width>height){
    boxSize=height/7
    xOffset=width/2-boxSize*2.5;
    yOffset=boxSize;
  }
  
  else{
    boxSize=width/7
    xOffset=width/2-boxSize*2.5;
    yOffset=boxSize+height/2-boxSize*2.5;
  }
}

function createBox(){
  const arr=shuffel();
  getBoxXY();
  for(let y=0;y<5;y++){
    for(let x=0;x<5;x++){
      box.push(new Box(x*boxSize,y*boxSize,boxSize,boxSize,0));
    }
  }
}






function checkBingo(){
  let numLines=0;
  scratch=[];
  for(let x=0;x<5;x++){
      let temp=true;
      for(let y=0;y<5;y++){
        if(box[y*5+x].state==255)
          temp=false;
      }
      if(temp){
        numLines++;
         scratch.push(new lineLoc(box[x].x+boxSize/2,boxSize/2,box[x].x+boxSize/2,boxSize*5-boxSize/2))
        // print('vertical')
        
      }
    }
  for(let y=0;y<5;y++){
      let temp=true;
      for(let x=0;x<5;x++){
        if(box[y*5+x].state==255)
          temp=false;
      }
      if(temp){
        numLines++;
        // print('horizantal')
        scratch.push(new lineLoc(boxSize/2,box[y*5].y+boxSize/2,boxSize*5-boxSize/2,box[y*5].y+boxSize/2))
      }
    }
  {
    temp=true
    for(let x=0;x<5;x++){
    if(box[x*5+x].state==255){
      temp=false;
    }
    }
    if(temp){
      scratch.push(new lineLoc(boxSize/2,boxSize/2,boxSize*5-boxSize/2,boxSize*5-boxSize/2))
        numLines++;
      }
  }
  
  {
    temp=true
    for(let x=0;x<5;x++){
    if(box[x*5+4-x].state==255){
      temp=false
    }
    }
    if(temp){
        numLines++;
      scratch.push(new lineLoc(boxSize*5-boxSize/2,boxSize/2,boxSize/2,boxSize*5-boxSize/2))
      }
    return numLines;
  }
  
}

function disBack(){
  if(turn){
    background(220,20,100);
  }
  else{
    background(20,220,100)
  }
}

function disp(){
  if(access){
    disBack();
    printBingo();
    drawBox();
    drawLine();
    printHash();
  }
 
}





function printBingo(){
  let name='BINGO';
  if(linesNum>=5){
    if(!winSound.isPlaying()){
      winSound.play()
    }
  }
  else{
    winSound.stop();
  }
  push();
  translate(xOffset,yOffset)
  for(let i=0;i<linesNum;i++){
    if(i>4)
      break;
    fill(0)
    textSize(boxSize/2);
    textAlign(CENTER,CENTER);
    text(str(name[i]),boxSize*i+boxSize/2,-boxSize/2)
  }
  pop();
}

function drawBox(){
  translate(xOffset,yOffset)
  for(let i=0;i<25;i++){
    box[i].drawBox();
  }
  translate(-xOffset,-yOffset);
}

function drawLine(){
  push();
   translate(xOffset,yOffset)
  strokeWeight(5)
  for(let i=0;i<scratch.length;i++){
    line(scratch[i].x,scratch[i].y,scratch[i].x1,scratch[i].y1);
  }
  pop();
}

function printHash(){
  let tails=0;
  let tailsNum=0;
  for(let i=0;i<25;i++){
    if(box[i].state!=255){
      tails+=box[i].num;
      tailsNum++;
    }
  }
  let hash=ceil(tailsNum*100+tails*3+sqrt(tails*tailsNum));
  push();
  translate(xOffset,yOffset)
  fill(0)
  textSize(boxSize/2);
  textAlign(CENTER,CENTER);
  // text("Hash : "+str(hash),boxSize*3-boxSize/2,boxSize*5+boxSize/2)
  text(playerName,boxSize*3-boxSize/2,boxSize*5+boxSize/2)
  pop();
  
}


