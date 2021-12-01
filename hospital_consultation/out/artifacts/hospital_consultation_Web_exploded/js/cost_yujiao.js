$(function() {
    // 读取cookie的值,为收款人和收款人编号赋值
    // cookie内容：{user:用户ID#用户姓名#用户类型描述}
    var cookie = getCookie('user');
    var id = cookie.split("#")[0].substring(0);
    $("#userId").val(id);
    $.ajax({
        url : "account/userQuery.do",
        data : {
            "id" : id
        },
        type : "post",
        dataType : "JSON",
        success : function(result) {
            if (result.state == 0) {
                var list = result.data;
                var user = list[0];
                $("#userName").val(user.name);
            }
        }
    });
    // 为收费时间加载默认值（当前时间）
    showDate();
    // 设置按钮监听
    $('#patientId').on('blur', selectPatient).on('focus', function() {
        $('#patientError').empty();
    });
    $("#clear").click(clear);

});

// 展示病人信息
function selectPatient() {
    debugger;
    var patientId=$("#patientId").val();
    if($("#patientId").val()!=""){
        var pId = /^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$/
        if (!pId.test(patientId)) {
            $('#patientId').focus().css({
                border: "1px solid red",
                boxShadow: "0 0 2px red"
            });
            alert("住院编号格式不正确");
            return false;
        }
        if(!(patientId.length==13)){
            $('#patientId').focus().css({
                border: "1px solid red",
                boxShadow: "0 0 2px red"
            });
            alert("住院编号长度为13位");
            return false;
        }
        $.ajax({
            url : "patient/patientQuery.do",
            type : "post",
            data : {
                "patientId" : $("#patientId").val()
            },
            dataType : "JSON",
            async : false,
            success : function(result) {
                if (result.state == 0) {
                    var patient = result.data;
                    $("#departmentName").val(patient[0].departmentName);
                    $("#doctorName").val(patient[0].doctorName);
                    $("#patientName").val(patient[0].name);
                }
            }
        });
    }
}
// 重置
function clear() {
    $("#costForm:input").val("");
}

// 保存
function saveCheck() {
    if ($("#patientId").val() == "") {
        layer.alert("住院号必须选择！");
        $("#patientId").click();
        return false;
    }
    if ($("#account").val() == "") {
        layer.alert("预交费用不能为空！");
        $("#account").click();
        return false;
    }
}

// 获取当前时间
function showDate() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getYear() + 1900;
    var mytime = today.toLocaleTimeString();
    var date = year + "-" + month + "-" + day + " " + mytime;
    document.getElementById("collectionTime").value = date;
}