$(function () {
    $("#clear").click(reset);
    console.log(window.location.href);
    var data = window.location.href.split("?")[1].split("=")[1];
    $.ajax({
        url:"account/userQuery.do",
        type:"post",
        data:{
            "id":data
        },
        dataType:"json",
        success:function (result) {
            var doctorList = result.data;
            $("#idUpdate").val(doctorList[0].id);
            $("#nameUpdate").val(doctorList[0].name);
            $("#phoneUpdate").val(doctorList[0].phone);
            $("#select_id").val(doctorList[0].describe);
            layui.use('form', function () {  //此段代码必不可少
                var form = layui.form;
                form.render();
            });
        }

    })
});
function reset() {
    window.location.reload(true);
}
// 校验
function checkName() {
    var name = $("#nameUpdate").val();
    if (name == null || "" == name) {
        $(".nameUpdateError").text("*请填写！");
        return false;
    }
    return true;
}

function checkPhone() {
    var phone = $("#phoneUpdate").val();
    if (phone == "" || phone == null) {
        $(".phoneUpdateError").text("*请填写！");
        return false;
    }
    var expr = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i;
    if (!expr.test(phone)) {
        $(".phoneUpdateError").text("*填写有误！");
        return false;
    }
    return true;
}
layui.use(['form', 'layer'],
    function() {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        form.on('submit(add)',
            function(data) {
                console.log(data);
                if(checkName()&&checkPhone()){
                    // 校验成功后提交
                    $.ajax({
                        url : "account/updateUserMessage.do",
                        data : data.field,
                        type : "post",
                        dataType : "JSON",
                        success : function(result) {
                            if (result.state == 0) {
                                layer.alert("更新成功！",{
                                    icon: 6,
                                    time:2000,
                                    shade:0.3,
                                    end:function () {
                                        location.href="user_find.html";
                                    }
                                });

                            }
                        },
                        error : function() {
                            layer.alert("更新失败！");
                        }
                    });
                }
                return false;
            });

    });