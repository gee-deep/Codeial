{
    let notyNotification = function(type, message){
        
        new Noty({
            theme: 'relax',
            text: message,
            type: type,
            layout: 'topRight',
            timeout: 1500,
        }).show();
    }


    let addComment = function(){
        $.each($('.comment-form'),function(index, value){
            const form = $(this);
            form.submit(function(e){
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: form.prop('action'),
                data: form.serialize(),
                success: function(data){
                    console.log(data.comment);
                    notyNotification('success',data.message);
                    $('.comment-box',form).val("");
                    $('.post-comment-container',$(`#post-${data.comment.post}`)).prepend(newDOMComment(data.comment));
                },
                error: function(err){
                    console.log(err);
                }

            });
        });
        
    });
    }
    addComment();



    let newDOMComment = function(comment){
        return (`
            <div class="post-comment">
                <div class="user-name"><a href="#">
                        ${comment.user.name}
                    </a></div>
                <div class="comment-content">
                    ${comment.comment}
                </div>
                <div class="comment-delete">
                    <a href="/comment/delete/${comment._id}">X</a>
                </div>
            </div>    

        `);
    }
   
    


    
}