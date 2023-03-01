var access=0;
let serverURL='https://noisy-chemical-tachometer.glitch.me';

function setup() { 
  socket=io.connect(serverURL);
  socket.on('access',(data)=>{
    console.log(data);
    access=data;
    password.hide();
    button.hide();
    gameId=createInput('gameId').position(windowWidth/2,windowHeight/10);
    gameIdSend=createButton('Submitt').position(windowWidth/2,windowHeight/6);
    gameIdSend.mousePressed(sendGameId);
});

  password=createInput('enter pass');
  button=createButton('enter');
  button.mousePressed(sendPass)

}

function draw() {
  
}

function sendPass(){
  socket.emit('password',password.value())
  console.log(password.value());
}

function sendGameId(){
  socket.emit('gameId',gameId.value());
}



