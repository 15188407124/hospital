$(function () {
    var data = window.location.href.split("?")[1].split("=")[1];
    var id = data.substring(0,data.length-1);
    $("#id").val(id);
    $.ajax({
        url:"category/categoryQueryMsg.do",
        type:"post",
        data:{
            "id":id
        },
        dataType:"json",
        success:function (result) {
            var category = result.data;
            $("#type").val(category.type);
            $("#name").val(category.name);
            $("#updatePrice").val(category.price);
        }

    })

});