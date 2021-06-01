module.exports.chatSockets =  function(socketServer){

    let io = require('socket.io')(socketServer,{
        cors: {
            origin: '*',
          }
    });
    io.sockets.on('connection',function(socket){
        socket.on('disconnect',function(){
        });


        socket.on('join_room',function(data){

            socket.join(data.chatroom);
            io.in(data.chatroom).emit('User_Joined',data);

        });
        socket.on('send_message',function(data){
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('receive_message', data);
        });
        
    });
}