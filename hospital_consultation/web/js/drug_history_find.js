var $tbody = $("#tbd");
var start = 0;
var end = 5;
$(function() {
    $("#clear").click(clear);
    /*
     * 读取cookie值，判断是什么类型的用户。 如果是患者，则把身份证号设置为只读， 并把数据回显出来
     */
    // cookie内容：{user:用户ID#用户姓名#用户类型描述}
    var cookie = getCookie('user');
    var userid = cookie.split("#")[0].substring(0);
    var usertype = cookie.split("#")[2].substring(0);
    if (usertype == 0) {// 是患者类型的用户，设置身份证为只读
        document.getElementById("patientId").setAttribute("type", "hidden");
        $.ajax({// 通过身份证查询patient表的患者信息
            url : "patient/patientQueryBycerificateNo.do",
            data : {
                "cerificateNo" : userid
            },
            type : "post",
            dataType : "JSON",
            success : function(result) {
                if (result.state == 0) {
                    var lists = result.data;
                    var lastNameNum = lists.length;// 只显示最近一次住院记录
                    var patientID = lists[lastNameNum - 1].patientId;
                    $("#patientId").val(patientID);
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
                var patientId = document.getElementById("patientId").value;
                $.ajax({
                    url : "drugs/grantDrugsFindByPatienId.do",
                    data : {
                        "patientId" : patientId
                    },
                    type : "post",
                    dataType : "JSON",
                    success : function(result) {
                        if (result.state == 0) {
                            var lists = result.data;
                            $tbody.empty();
                            // 分页
                            if (lists.length > 0) {
                                $('.pagination').pagination(lists.length, {
                                    callback : function(page) {
                                        start = page * this.items_per_page;
                                        end = (page + 1) * this.items_per_page;
                                        $tbody.empty();
                                        showList(lists, start, end);
                                        return true;
                                    },
                                    display_msg : true, // 是否显示记录信息
                                    setPageNo : false,
                                    // 是否显示跳转第几页
                                });
                            } else {
                                layer.alert("未找到信息！",{
                                    icon:6,
                                });
                            }
                            showList(lists, start, end);
                        }
                    }
                });
                return false;
            });

    });
function showList(lists, start, end) {
    if (lists.length > 0) {
        for (var i = start; i < end; i++) {
            var drug = lists[i];
            if ((i + 1) % 2 == 0) {
                trStyle = "<tr style='background-color:#eff6fa' onclick='jump(this.firstChild);'>";
            } else {
                trStyle = "<tr onclick='jump(this.firstChild);'>";
            }
            var grantTime = drug.grantTime.substring(0,
                drug.grantTime.length - 2);// 删去时间后面的.0
            var $tr = trStyle + "<td class='name'>" + drug.drugId + "</td>"
                + "<td class='name'>" + drug.drugName + "</td>"
                + "<td class='num'>" + drug.drugCount + "</td>"
                + "<td class='num'>" + drug.drugPrice + "</td>"
                + "<td class='name'>" + drug.patientName + "</td>"
                + "<td class='name'>" + drug.grantUserName + "</td>"
                + "<td class='time'>" + grantTime + "</td>" + "</tr>";
            $tbody.append($tr);
        }
    }
}
// 清空条件按钮
function clear() {
    window.location.reload(true);
}