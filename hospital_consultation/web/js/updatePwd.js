var uid;
$(function () {
    // 读取cookie的值,为收款人和收款人编号赋值
    // cookie内容：{user:用户ID#用户姓名#用户类型描述}
    var cookie = getCookie('user');
    var id = cookie.split("#")[0].substring(0);
    uid=id;
    $("#userId").val(id);/*useid,user表中的userid值*/
    $('#oldPwd').on('blur', checkPwd).on('focus', function() {
        $('#patientError').empty();
    });
});
// 根据id获取接收方的姓名
function checkPwd() {
    var oldPwd = $('#oldPwd').val();
    if (oldPwd == null || oldPwd == "") {
        $("#patientError").text("原密码不能为空")
        return false;
    }
    // 对用户输入的原密码进行MD5加密并转换为32位大写字母密文
  /*  var md5pwd = (hex_md5(oldPwd)).toUpperCase();*/
    $.ajax({
        url : 'account/checkPwdUser.do',
        type : 'post',
        data : {
            "uid":uid,
            "password" : oldPwd
        },
        dataType : 'JSON',
        success : function(result) {
            if (result.state == 0) {
                var people = result.data;
                if(people.length==0){
                    $("#patientError").text("原密码不正确")
                }
            }
        }
    });
}
layui.use(['form', 'layer'],
    function() {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        form.on('submit(add)',
            function(data) {
                $.ajax({
                    type : "POST",
                    dataType : "json",
                    url : "account/updateUser.do",
                    data : data.field,
                    success : function(result) {
                        if(result.state == 0){
                            //发异步，把数据提交给php
                            layer.alert("修改成功", {
                                    icon: 6,
                                    time: 2000,
                                    shade:0.3,
                                    end:function () {
                                        parent.location.href="index.html";
                                    }
                                },
                                function() {
                                    // 获得frame索引
                                    var index = parent.layer.getFrameIndex(window.name);
                                    //关闭当前frame
                                    parent.layer.close(index);
                                });
                        }
                    },
                    error : function(result) {
                        layer.alert("修改失败");
                    }

                });
                return false;
            });

    });