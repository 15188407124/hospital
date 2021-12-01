$(function () {
    // 读取cookie的值,为收款人和收款人编号赋值
    // cookie内容：{user:用户ID#用户姓名#用户类型描述}
    var cookie = getCookie('user');
    var id = cookie.split("#")[0].substring(0);
    $("#doctorId").val(id);/*useid,user表中的userid值*/
    console.log(window.location.href);
    var data = window.location.href.split("?")[1].split("=")[1];
    $("#patientId").val(data);
    // 根据id获取接收方的姓名
    $.ajax({
        url : 'account/userQuery.do',
        type : 'post',
        data : {
            "id" : data,
            "describe":0
        },
        dataType : 'JSON',
        success : function(result) {
            if (result.state == 0) {
                var people = result.data;
                if(people.length!=0){
                    //姓名
                    $("#patientName").val(people[0].name);
                }else {
                    $("#patientError").text("无该账户患者")
                }
            }
        }
    });
});
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
                    url : "doctor/msgSave.do",
                    data : data.field,
                    success : function(result) {
                        if(result.state == 0){
                            //发异步，把数据提交给php
                            layer.alert("发送成功", {
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
                        layer.alert("发送失败");
                    }

                });
                return false;
            });

    });