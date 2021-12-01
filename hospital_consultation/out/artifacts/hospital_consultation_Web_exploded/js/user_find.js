//将用户的权限作为全局变量
var start = 0;
var end = 5;
var id = $("#tbd");
var startTime = $("#startTime");
var endTime = $("#endTime");
var username = $("#username");
var $tbody = $("#tbd");
// 提交form表单
$(function () {
    $("#clear").click(Reset);
});
layui.use(['form', 'layer'],
    function() {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        form.on('submit(sreach)',
            function(data) {
                $.ajax({
                    url:'account/userQuery.do',
                    type:'post',
                    data:data.field,
                    dataType:'JSON',
                    success:function (result) {
                        if (result.state == 0) {
                            var list = result.data;
                            $tbody.empty();
                            // 分页
                            if (list.length > 0) {
                                $('.pagination').pagination(list.length, {
                                    callback : function(page) {
                                        start = page * this.items_per_page;
                                        end = (page + 1) * this.items_per_page;
                                        $tbody.empty();
                                        showList(list, start, end);
                                        return true;
                                    },
                                    display_msg : true, // 是否显示记录信息
                                    setPageNo : false
                                    // 是否显示跳转第几页
                                });
                            } else {
                                layer.alert("未找到信息！");
                            }
                            showList(list, start, end);
                        }

                    }
                });
                return false;
            });
    });
function showList(list, start, end) {
    if (list.length > 0) {
        for (var i = start; i < end; i++) {
            var user = list[i];
            var describe = "";
            // 将用户权限转成中文
            if (user.describe == "0") {
                describe = "患者";
            }
            if (user.describe == "1") {
                describe = "护士";
            }
            if (user.describe == "2") {
                describe = "医生";
            }
            if (user.describe == "3") {
                describe = "服务前台";
            }
            if (user.describe == "4") {
                describe = "系统管理员";
            }
            /*
             * 超管用户是系统底层后门用户,不允许系统查到, 需要查到超管先删掉SQL语句中的：and user_describe != 5
             */
            if (user.describe == "5") {
                describe = "超级管理员";
            }
            var trStyle;
            if ((i + 1) % 2 == 0) {
                trStyle = "<tr style='background-color:#eff6fa'>";
            } else {
                trStyle = "<tr>";
            }
            var $tr = $(trStyle
                + "<td class='num'>"
                + (i + 1)
                + "</td>"
                + "<td class='name'>"
                + user.id
                + "</td>"
                + "<td class='process'>"
                + user.name
                + "</td>"
                + "<td class='node'>"
                + describe
                + "<span style='display:none'>"
                + user.describe
                + "</span></td>"
                + "<td class='time'>"
                + user.createtime
                + "</td>"
                + "<td class='name'><a href='user_edit.html?id="+user.id+"' title='编辑'><i class=\"layui-icon\">&#xe642;</i></a>&nbsp;&nbsp;&nbsp;&nbsp;"
                + "<a title=\"重置密码\" onclick=\"userUpdatePwd('"+user.id+"');\" href=\"javascript:;\"><i class=\"layui-icon\">&#xe631;</i></a>&nbsp;&nbsp;&nbsp;&nbsp;"
                + "<a title=\"删除\" onclick=\"user_del('"+user.id+"');\" href=\"javascript:;\"><i class=\"layui-icon\">&#xe640;</i></a></td>"
                + "</tr>");
            $tbody.append($tr);
        }
    }
}
function Reset() {
    window.location.reload(true);
}
function userUpdatePwd(id) {
    // 得到所选用户的Id
    var userId = id;
    var defaultpwd = "123456";
    // 提交请求
    $.ajax({
        url : "account/updateUser.do",
        data : {
            "id" : userId,
            "password" : defaultpwd
        },
        type : "post",
        dataType : "JSON",
        async: false,
        success : function(result) {
            if (result.state == 0) {
                layer.alert("密码重置为:123456");
            }else{
                layer.alert("未知异常!");
            }
        }
    });
}
// 删除用户
function user_del(obj) {
    // 得到所选用户的Id
    var userId = obj
    $.ajax({
        url : 'account/userDelete.do',
        type : 'post',
        data : {
            "id" : userId
        },
        dataType : 'JSON',
        success : function(result) {
            if (result.state == 0) {
                layer.alert("删除成功！");
            }
            if (result.state == 3) {
                layer.alert("该用户不存在！");
            }
        }
    });
}