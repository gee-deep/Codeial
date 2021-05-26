{
    const notyNotification = function(type, message){
        
        new Noty({
            theme: 'relax',
            text: message,
            type: type,
            layout: 'topRight',
            timeout: 1500,
        }).show();
    }

    const newPost = function(){

        let postForm = $('#new-post-form');
        postForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url : '/post/create',
                data : postForm.serialize(),
                success: function(data){
                        console.log(data);
                        notyNotification('success',data.message);
                        $('#post-textarea').val('');
                        let newPostData = newDOMPOST(data.data.post);
                        $('#posts-list-container').prepend(newPostData);
                    
                },
                error: function(error){console.error(error.reponseText);},
            });
        });
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

    newPost();
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
   
    let newDOMPOST = function(post){
        return (`
        <div class="post-display-box" id="post-${post._id}">
            <div class="post-header">
                <h6 class="user-name">
                    ${post.user.name}
                </h6>
                    <a class="delete-post-button" href="/post/delete/${post._id}">x</a>
            </div>
            <div class="post-content">
                <h3>
                    ${post.content}
                </h3>
            </div>
            <div>
                <form  class="comment-form" action="/comment/create" method="post">
                    <div class="comment-post-form">
                        <input type="hidden" name="post" value="${post._id}">
                        <input class="comment-box" type="text" name="comment" placeholder="Comment Here" required>
                        <input class="comment-box-submit" type="submit" value="Comment">
                    </div>
                </form>
            </div>
            <div class="post-comment-container">
            </div>
        </div>
    `);


     }


    
}