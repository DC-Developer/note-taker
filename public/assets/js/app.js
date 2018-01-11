document.ready(function(){
    
    $("#user2Note").on("click", function(){
        $.ajax({
            type: "POST",
            url: "/notes",
            data: {
              username: $(this).text()
            }
          })
          .done(function(data){
              console.log(data);
          })
    })
    
})