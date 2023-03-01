let playerId;
let turn;

function preConnect(){
    socket=io.connect(serverURL);
    socket.on('players',(data)=>{

      for(let i=0;i<data.length;i++){
        if(data[i]==socket.id){
            socket.on('wrapData',(agg)=>{
                if(turn==false && agg.playerId!=playerId){
                    for(let i=0;i<box.length;i++){
                        if(box[i].num==agg.number){
                            box[i].state=100;
                            turn=!turn;
                            linesNum=checkBingo();
                        }
                    }
                }
            })
            playerId=i;
            turn=!playerId;
            
            setTimeout(deleteInputs,500);
        }
            
      }
    })
    socket.on('stopAccess',(agg)=>
    {
        mouseFunction=false;
    })
}

function wrapSend(num){
    let wrapData={"playerId":playerId,
    "number":num,
    "playerName":playerName,
    data:[]
};
    for(let i=0;i<box.length;i++){
        let x={"num":box[i].num,
               "state":box[i].state            
        }
        wrapData.data.push(x);
    }
    socket.emit('wrapData',wrapData);
}

function sendPlayerDetails(){
    playerName=playerInput.value();
    socket.emit('playerDetails',{
        "name":playerInput.value(),
        "id":gameId.value()
    })

}

