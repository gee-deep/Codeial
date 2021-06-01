class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000',{ transports : ['websocket'] });
        
        if(this.userEmail)
            this.connectionHandler();
    
        
    }
    connectionHandler(){
        let self = this;

        this.socket.on('connect',function(){
            console.log('Connection established using Sockets');
        
            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatroom : 'codeial'
            });
            self.socket.on('User_Joined',function(data){
                console.log('A User joined',data);
                self.userJoin(data);
            })
            
        
        });

        $('#send-message-form').submit(function(e){
            e.preventDefault();

            let msg = $('#chat-message-input').val();
            if(msg!=''){
                self.socket.emit('send_message',{
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial '
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log('Message received',data.message);
    
            let newMessage = $('<li>')

            let messageType = 'recieved';
            if(data.user_email == self.userEmail )
                messageType = 'sent';


            newMessage.append($('<span>',{
                'html': data.message

            }));
            let sender = $('<div>');
            sender.append($('<sub>',{
                'html': data.user_email
            }));
            newMessage.append(sender);
            newMessage.addClass(messageType);

            $('#message-list').append(newMessage);
            $("#chat-box").scrollTop($("#chat-box")[0].scrollHeight);
            
            $('#chat-message-input').val('');
            





        })

    }
    userJoin(data){
        let newMessage = $('<li>')

        let messageType = 'user-joined';

        newMessage.append($('<sub>',{
            'html': `${data.user_email} Joined The Chat`,

        }));
        newMessage.addClass(messageType);
        $('#message-list').append(newMessage);
        $("#chat-box").scrollTop($("#chat-box")[0].scrollHeight);

    }



}