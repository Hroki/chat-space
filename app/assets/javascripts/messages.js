$(function(){

  function buildHTML(message){
    
    var img = message.image.url == null ? "" : `<img class: 'lower-message__image' src=${message.image.url}></img>`
    
    var html = 
    `<div class= "message">
      <div class= "upper-message">
        <div class= "upper-message__user-name">
          ${message.user_name}
        </div>
        <div class= "upper-message__date">
          ${message.date}
        </div>
      </div>
      <div class= "lower-message">
        <p class="lower-message__content">
        ${message.content}
        </p>
        ${img}
      </div>
    </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){

    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(data){
      var html = "";
      html = buildHTML(data);
      $('.Messages').append(html);
      $('.textbox').val('');
      $('form')[0].reset();
      $(".Messages").animate({scrollTop:$('.Messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      var last_message_id = $('.message:last').data("message-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
     
      $.ajax({ 
        url: "api/messages", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
        type: 'get', //メソッドを指定
        dataType: 'json', //データはjson形式
        data: {id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
      })
      .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
        var insertHTML = '';//追加するHTMLの入れ物を作る
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
          $('.Messages').append(insertHTML);//メッセージを追加
          $(".Messages").animate({scrollTop:$('.Messages')[0].scrollHeight}, 'fast');
        })
        
      })
      .fail(function () {
        alert('失敗しました'); //失敗した場合の記述
      });
    }
  };
  setInterval(reloadMessages, 5000);
});
