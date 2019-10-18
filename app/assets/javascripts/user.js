$(function() {

  function showNameList(data){
    let html =`
          <div class="chat-group-user clearfix">
            <p class="chat-group-user__name">${data.name}</p>
            <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${data.user_id}" data-user-name="${data.name}">追加</div>
          </div>`
    $("#user-search-result").append(html);
  }

  function addNameList(data_user_id,data_user_name){
    let html =`
          <div class="chat-group-user clearfix">
            <p class="chat-group-user__name">${data_user_name}</p>
            <div class="user-search-add chat-group-user__btn chat-group-user__btn--remove" data-user-id="${data_user_id}" data-user-name:"${data_user_name}">削除</div>
            <input type="hidden" value="${data_user_id}" checked="checked" name="group[user_ids][]" id="group_user_ids_${data_user_id}">
          </div>`
    $("#user-joined-in").append(html);
    $(".chat-group-user__btn--remove").on("click",function(){
      $(this).parent().remove();
    });
  }

  $("#user-search-field").on("keyup",function(){
    let input = $(this).val();
    $.ajax({
        type: 'GET',
        data: {keyword: input},
        url: '/users#index',
        dataType: 'json'
      }).done(function(data){
        $("#user-search-result").empty();
        if (data.length !== 0) {
          data.forEach(function(data){
            showNameList(data);
            })
          // 新規のユーザー
          $(".chat-group-user__btn--add").on("click",function(){
            let data_user_id    = $(this).attr("data-user-id");
            let data_user_name  = $(this).attr("data-user-name");
            addNameList(data_user_id,data_user_name);
            $(this).parent().remove();
            $("#user-search-field").val("");
          });
        } else {
          $("#user-search-result").append("一致するユーザはありません");
        };
      }).fail(function(){
        alert("ユーザの取得に失敗しました")
      })
    });

  $(".chat-group-user__btn--remove").on("click",function(){
    $(this).parent().remove();
  });
})
