$(function () {
    $('#cerificateNo').on('blur', checkCerificateNo).on('focus', function() {
        $('#patientError').empty();
    });
});
// 检查当前入院登记患者是否存在未出院的记录
function checkCerificateNo() {
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
        success : function(result) {
            if (result.state == 0) {
                var people = result.data;
                //姓名
                $("#name").val(people[0].name);
                //性别
                var $select = $("#gender");
                $select.empty();
                if(people[0].gender==1){
                    $select.val("男");
                }else {
                    $select.val("女");
                }
                layui.use('form', function () {  //此段代码必不可少
                    var form = layui.form;
                    form.render();
                });
                //民族
                var $select1 = $("#nation");
                $select1.empty();
                if (people[0].nation==1){
                    $select1.val("汉");
                }else if (people[0].nation==2) {
                    $select1.val("蒙古族");
                }else if (people[0].nation==3) {
                    $select1.val("回族");
                }else if (people[0].nation==4) {
                    $select1.val("藏族");
                }else if (people[0].nation==5) {
                    $select1.val("维吾尔族");
                }else if (people[0].nation==6) {
                    $select1.val("苗族");
                }else{
                    $select1.val("其它");
                }
                layui.use('form', function () {  //此段代码必不可少
                    var form = layui.form;
                    form.render();
                });
                //科室
                $("#department").val(people[0].departmentName);
                //主治医生
                var $select3 = $("#doctorName");
                if(people[0].doctorId!=null){
                    $select3.empty();
                    $select3.val(people[0].doctorName);
                    layui.use('form', function () {  //此段代码必不可少
                        var form = layui.form;
                        form.render();
                    });
                }
                //房间号
                var $select5 = $("#roomNo");
                if(people[0].roomNo!=null){
                    $select5.empty();
                    $select5.val(people[0].roomNo);
                    layui.use('form', function () {  //此段代码必不可少
                        var form = layui.form;
                        form.render();
                    });
                }
                //床位号
                var $select6 = $("#bedNo");
                if(people[0].bedNo!=null){
                    $select6.empty()
                    $select6.val(people[0].bedNo);
                    layui.use('form', function () {  //此段代码必不可少
                        var form = layui.form;
                        form.render();
                    });
                }
                //住院号
                $("#patientId").val(people[0].patientId);
                //入院时间
                $("#inTime").val(people[0].admissionTime);
                //是否结算
                if(people[0].settlementState==0){
                    $("#jiesuan").val("否");
                }else {
                    $("#jiesuan").val("是");
                }

            }
        }
    });
    $.ajax({
        url : 'patient/patientcheck.do',
        type : 'post',
        data : {
            "cerificateNo" : cerificateNo
        },
        dataType : 'JSON',
        success : function(result) {
            if (result.state == 2) {
                $("#patientError").css("color", "red");
                $("#patientError").empty().append("*未出院");
                layui.use('form', function () {  //此段代码必不可少
                    var form = layui.form;
                    form.render();
                });
                return false;
            }
        }
    });
    return true;
}