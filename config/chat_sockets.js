module.exports.chatSockets =  function(socketServer){

    let io = require('socket.io')(socketServer,{
        cors: {
            origin: '*',
          }
    });
    io.sockets.on('connection',function(socket){
        console.log('New connection Recieved',socket.id);
        socket.on('disconnect',function(){
            console.log('Socket Disconnected :(')
        });


        socket.on('join_room',function(data){
            console.log('Joining Request Recieved',data);

            socket.join(data.chatroom);
            io.in(data.chatroom).emit('User_Joined',data);

        });
        socket.on('send_message',function(data){
            console.log('Server Request Recieved', data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('receive_message', data);
        });
        
    });
}