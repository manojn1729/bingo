const express=require('express');
const socket=require('socket.io');
const path=require('path');
const app=express();
const port=process.env.PORT || 3000 
const server=app.listen(3000);
const io=socket(server);
let players=[];
let playersName=[];
let gameId=0;
app.use(express.static('bingo'))


io.on('connection',(socket)=>{

    socket.on('disconnect',()=>{
        console.log('close' +socket.id);
    })

    socket.on('password',(agg)=>{
        if(agg=='manoj'){
            io.emit('access',1234)
            console.log(agg);
        }
    })

    socket.on('gameId',(data)=>{
        players=[];
        playersName=[];
        gameId=data;
        console.log(gameId,typeof(gameId));
        io.emit('reload',1);
    })

    socket.on('wrapData',(agg)=>{
        if(socket.id==players[0] || players[1])
            socket.broadcast.emit('wrapData',agg);
    })

    socket.on('playerDetails',(agg)=>{
        if(agg.id==gameId){
            playersData(agg,socket);
        }
    })
    
})



function playersData(agg,socket){
    if(players.length<2){
        playersName.push(agg.name);
        players.push(socket.id)
        io.emit('players',players)
        console.log(playersName);
        io.emit('playersName',playersName)
    }
}



app.get('/',(req,res)=>{
    res.send('error');
})



