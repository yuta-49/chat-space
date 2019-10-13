$(document).on("turbolinks:load", function(){
  function addNewCommentToBottom(message){
    let html = `
      <div class="rightside__chatmain__messagebox">
        <div class="rightside__chatmain__messagebox__patial">
          <p class="rightside__chatmain__messagebox__patial__name">
            ${message.user_name}
          </p>
          <p class="rightside__chatmain__messagebox__patial__date">
            ${message.created_at}
          </p>
        </div>
          <p class="rightside__chatmain__messagebox__patial__message">
          ${message.content}
          </p>
          <img class="rightside__chatmain__messagebox__patial__image" src="${message.image}" alt="">
      </div>
    `;
    return html;
  }

  function scrollToBottom(){
    let long = $(".rightside__chatmain")[0].scrollHeight;
    $(".rightside__chatmain").animate({scrollTop:long});
  }
  
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    let formdata = new FormData(this);
    let url      = $(this).attr("action");
    $.ajax ({
      type: "POST",
      url: url,
      data: formdata,
      dataType: "json",
      processData: false,
      contentType: false
    })    
    .done(function(message){
      var html = addNewCommentToBottom(message);
      $(".rightside__chatmain").append(html);
      $("#new_message")[0].reset();
      scrollToBottom();
    })
    .fail(function () {
      alert('ファイルの取得に失敗しました。');
    })
    .always(function() {
      $(".rightside__formbox__btn").removeAttr("disabled");
    })
  })
})