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

    let createPost = function(){

        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                method: 'POST',
                url : '/post/create',
                data : newPostForm.serialize(),
                success: function(data){

                        let newPostData = newPostDOM(data.data.post);
                        $('#posts-list-container').prepend(newPostData);
                        $('#post-textarea').val('');
                        notyNotification('success',data.message);
                    
                },
                error: function(error){console.error(error.reponseText);},
            });
        });
    }

    newPostDOM = function(post){
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


    createPost();


































}