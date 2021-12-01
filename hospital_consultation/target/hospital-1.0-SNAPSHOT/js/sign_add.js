$(function () {
    $("#measureTime").val(getNowAllFormatDate());
    /*
	 * 读取cookie值，判断是什么类型的用户。 如果是患者，则把姓名、住院号、床位号设置为只读， 并把数据回显出来
	 */
    // cookie内容：{user:用户ID#用户姓名#用户类型描述}
    var cookie = getCookie('user');
    var userid = cookie.split("#")[0].substring(0);
    var usertype = cookie.split("#")[2].substring(0);
    // alert(usertype);
    if (usertype == 0) {// 是患者类型的用户
        document.getElementById("patientId").setAttribute("type", "hidden");
        document.getElementById("patientNum").setAttribute("style",
            "display:none;");
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
                    var patientBedNo = list[lastNameNum - 1].bedNo;
                    // alert(patientName);
                    $("#patientId").val(patientID);
                    $("#patientName").val(patientName);
                    $("#bedNo").val(patientBedNo);
                }
            }
        });
    }else {
        $('#patientId').on('blur', findCerificateNo).on('focus', function () {
         });
    }

});
function findCerificateNo() {
    var patientId = $('#patientId').val();
    $("#patientName").val("");
    if(patientId!=""){
        var pId = /^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$/
        if (!pId.test(patientId)) {
           alert("住院编号格式不正确");
            return false;
        }
        if(!(patientId.length==13)){
            alert("住院编号长度为13位");
            return false;
        }
        $.ajax({// 通过身份证查询patient表的患者信息
            url : "patient/patientQuery.do",
            data : {
                "patientId" : patientId
            },
            type : "post",
            dataType : "JSON",
            success : function(result) {
                if (result.state == 0) {
                    var list = result.data;
                    var lastNameNum = list.length;// 只显示最近一次住院记录
                    var patientName = list[lastNameNum - 1].name;
                    // alert(patientName);
                    $("#patientName").val(patientName);
                }
            }
        });
    }
}
// 获取当前时间(yyyy-mm-dd hh:mm:ss)
function getNowAllFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1
        + strDate + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

function check() {
    /**
     * 预校验
     */
    if ($("#patientId").val() == "") {
        layer.alert("住院编号不能为空！");
        $("#patientId").click();
        return false;
    }
    if ($("#measureTime").val() == "") {
        layer.alert("时间不能为空!");
        $("#measureTime").click();
        return false;
    }
    if ($("#temperature").val() == "" && $("#pulse").val() == ""
        && $("#bloodPressure").val() == "" && $("#bloodSugar").val() == "") {
        layer.alert("请至少输入一项体征数据!");
        return false;
    }

    /**
     * 数据合法性校验
     */
    if ($("#temperature").val() > 45 || $("#temperature").val() < 33
        && $("#temperature").val() != 0) {
        layer.alert("体温数据错误,建议体温区间[33,45]");
        return false;
    }
    if ($("#pulse").val() > 250 || $("#pulse").val() < 0) {
        layer.alert("心率数据错误,建议心率区间[0,250]");
        return false;
    }
    if ($("#bloodSugar").val() > 30 || $("#pulse").val() < 0) {
        layer.alert("血糖数据错误,建议血糖区间[0,20]");
        return false;
    }
    var bloodPress = $("#bloodPressure").val();
    if (bloodPress.indexOf("/") == -1) {
        layer.alert("血压格式不正确,建议录入格式:舒张压/收缩压");
        return false;
    }
    var array = new Array();
    array = bloodPress.split("/");
    if (array[0] < 0 || array[0] > 250 || array[1] < 0 || array[1] > 300) {
        layer.alert("血压值不正确!");
        return false;
    }

    /**
     * 空值自动填充
     */
    if ($("#temperature").val() == "") {
        $("#temperature").val("0");
    }
    if ($("#pulse").val() == "") {
        $("#pulse").val("0");
    }
    if ($("#bloodPressure").val() == "") {
        $("#bloodPressure").val("0/0");
    }
    if ($("#bloodSugar").val() == "") {
        $("#bloodSugar").val("0");
    }
}
