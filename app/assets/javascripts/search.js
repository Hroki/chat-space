$(document).on('turbolinks:load', function() { });$(function() {
  
  var user_list = $("#user-search-result");
  var member_list = $("#member_search_result");

  function appendUsers(user) {
    var html = `<div class='chat-group-user clearfix js-chat-member'>
            <p class="chat-group-user__name">
            ${user.name}
            </p>
            <a class="user_search_add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加
            </a>
            </div>`
    return html;
  }

  function appendErrMsgToHTML(length) {
    var html = `<li>
                  <div class='chat-group-form-input'>${ length=0 }</div>
                </li>`
    return html;
  }

  function appnedMenbaers(name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id="${user_id}">
                <input name='group[user_ids][]' type='hidden' value="${user_id}">
                <p class='chat-group-user__name'>${name}</p>
                <div class='user_search_remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
    return html;
  }

  $("#user-search-field").on("keyup", function() {

    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(members) {
      $("#user-search-result").empty(); 
      console.log(members)
      if (members.length !== 0) {
        members.forEach(function(user){
          var html = appendUsers(user);
          user_list.append(html);
        })
      }else{
        var html = appendErrMsgToHTML("一致するユーザーはいません");
        $("#user_search_result").append(html)

      }
    })
    .fail(function () {
      alert('ユーザー検索に失敗しました');
    });
  });
  
  $(function () {
    $(document).on("click", '.user_search_add', function () {
        var name = $(this).attr("data-user-name");
        var user_id = $(this).attr("data-user-id");
        $(this).parent().remove();
  
        var html = appnedMenbaers(name, user_id);
        member_list.append(html)
    });
    $(document).on("click", '.user_search_remove', function () {
        $(this).parent().remove();
    });
  });
  
});

