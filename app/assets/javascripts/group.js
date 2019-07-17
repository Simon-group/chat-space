$(document).on('turbolinks:load', function(){
  $(function() {
  
    var search_list = $(".search-users");
  
    function appendUser(user){
      var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>`
        search_list.append(html);
    }

    var member_list = $(".chat-group-users");

    function addUser(name,user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-22'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    member_list.append(html);
      }
  
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users){
        $(".search-users").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
      })
      .fail(function(){
        alert('検索に失敗しました');
      })
    });
      $(document).on("click", ".user-search-add", function () {
        var name = $(this).attr('data-user-name');
        var user_id = $(this).attr('data-user-id');
        $(this).parent().remove();
        addUser(name, user_id);
      });
  
      $(document).on("click", ".user-search-remove", function () {
        $(this).parent().remove();
      })
    })
  });
  