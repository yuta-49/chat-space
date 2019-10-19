$(function () {
  function addNewCommentToBottom(message){
    let html = `
     <div class="rightside__chatmain__messagebox" data-message-id="${message.id}"> 
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
          ${message.image ? `<img class="rightside__chatmian__messagebox__patial__image" src="${message.image}">` : ""}
      </div>
    `;
    return html;
  }
  
  function scrollToBottom() {
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
      let html = addNewCommentToBottom(message);
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
  
  function reloadMessages() {
    let last_message_id = $(".rightside__chatmain__messagebox:last").data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {last_id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){
        messages.forEach(function(message){
          let html = addNewCommentToBottom(message);
          $(".rightside__chatmain").append(html);
          scrollToBottom();
        })
      }
    })
    .fail(function() {
      alert('自動更新できませんでした');
    });
  };
  if(document.URL.match("/messages")){
    // setInterval(reloadMessages, 5000);
  }
});
