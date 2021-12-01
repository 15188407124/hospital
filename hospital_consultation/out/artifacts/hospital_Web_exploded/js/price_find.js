var $tbody = $("#tbd");
var start = 0;
var end = 5;
$(function () {
    $('#cerificateNo').on('blur', getPatientName);
    $("#clear").click(clear);
});
$(function() {
    /*
     * 读取cookie值，判断是什么类型的用户。 如果是患者，则把姓名、住院号设置为只读， 并把数据回显出来
     */
    // cookie内容：{user:用户ID#用户姓名#用户类型描述}
    var cookie = getCookie('user');
    var userid = cookie.split("#")[0].substring(0);
    var usertype = cookie.split("#")[2].substring(0);
    // alert(usertype);
    if (usertype == 0) {// 是患者类型的用户
        document.getElementById("patientId").setAttribute("type", "hidden");
        document.getElementById("patientName").setAttribute("readOnly", false);
        $.ajax({// 通过身份证查询patient表的患者信息
            url : "patient/patientQueryBycerificateNo.do",
            data : {
                "cerificateNo" : userid
            },
            type : "post",
            dataType : "JSON",
            success : function(result) {
                if (result.state == 0) {
                    var list = result.data;
                    var lastNameNum = list.length;// 只显示最近一次住院记录
                    var patientID = list[lastNameNum - 1].patientId;
                    var patientName = list[lastNameNum - 1].name;
                    $("#patientId").val(patientID);
                    $("#patientName").val(patientName);
                    $("#cerificateNo").val(userid);
                }
            }
        });
    }
});
// 提交form表单
layui.use(['form', 'layer'],
    function() {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer;
        //自定义验证规则
        form.verify({
            nikename: function(value) {
                if (value.length < 5) {
                    return '昵称至少得5个字符啊';
                }
            },
            pass: [/(.+){6,12}$/, '密码必须6到12位'],
            repass: function(value) {
                if ($('#L_pass').val() != $('#L_repass').val()) {
                    return '两次密码不一致';
                }
            }
        });
        //监听提交
        form.on('submit(sreach)',
            function(data) {
                $.ajax({
                    url:'cost/costQuery.do',
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
                                $("#showbuttom").show();
                            } else {
                                alert("未查询到数据！");
                                $("#showbuttom").hide();
                                $("#reset").click();
                            }
                            showList(list, start, end);
                        }
                    }
                });
                return false;
            });

    });

function getPatientName() {
    var cerificateNo = $('#cerificateNo').val();
    if (cerificateNo == null || cerificateNo == "") {
        return false;
    }
    $.ajax({
        url : 'patient/patientQueryBycerificateNo.do',
        type : 'post',
        data : {
            "cerificateNo" : cerificateNo
        },
        dataType : 'JSON',
        success:function (result) {
            if(result.state==0){
                var people = result.data;
                //姓名
                $("#patientName").val(people[0].name);
                //住院号
                $("#patientId").val(people[0].patientId);
            }
        }
    })

}
function showList(lists, start, end) {
    if (lists.length > 0) {
        for (var i = start; i < end; i++) {
            var cost = lists[i];
            var trStyle;
            if ((i + 1) % 2 == 0) {
                trStyle = "<tr style='background-color:#eff6fa'>";
            } else {
                trStyle = "<tr>";
            }
            var costTime = cost.costTime.substring(0, cost.costTime.length - 2)
            var $tr = trStyle + "<td class='num'>" + (i + 1) + "</a></td>"
                + "<td class='name'>" + cost.id + "</td>"
                + "<td class='name'>" + cost.patientId + "</td>"
                + "<td class='name'>" + cost.patientName + "</td>"
                + "<td class='node'>" + cost.account + "</td>"
                + "<td class='node'>" + cost.type + "</td>"
                + "<td class='time'>" + costTime + "</td>"
                + "<td class='node'>" + cost.userName + "</td>" + "</tr>";
            $tbody.append($tr);
        }
    }
}
// 重置
function clear() {
    window.location.reload();
}