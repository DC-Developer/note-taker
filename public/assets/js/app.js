document.ready(function(){
    
    $("#userButt").on("submit", function(){
        var username = $("#userButt").val();
        console.log("username from ajax: " + username);
        $.ajax({
            type: "POST",
            url: "/notes",
            data: username
          })
          .done(function(data){
              console.log(data);
          })
    })
    
})