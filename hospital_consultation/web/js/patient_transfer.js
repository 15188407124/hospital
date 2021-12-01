layui.use(['form'],function () {
    var form = layui.form;
    form.on("select(department)",function (data) {
        // 医生列表
        $.ajax({
            url: 'doctor/doctorQuery.do',
            type: 'post',
            data: {
                "department": data.value
            },
            dataType: 'JSON',
            success: function (result) {
                if (result.state == 0) {
                    var list = result.data;
                    var $select = $("#doctor");
                    $select.empty();
                    var $xz = "<option id='doctors' value=>" + "请选择" + "</option>";
                    $select.append($xz);
                    if (list.length > 0) {
                        for (var i = 0; i < list.length; i++) {
                            var doctor = list[i];
                            var $option = "<option value=" + doctor.id + ">" + doctor.name
                                + "</option>";
                            $select.append($option);
                            layui.use('form', function () {  //此段代码必不可少
                                var form = layui.form;
                                form.render();
                            });
                        }
                    }
                }
            }
        });
    });
    form.on("select(type)",function (data) {
        var departmentNo = $("#department").val();
        var typeNo = data.value;
        // 病房号列表
        $.ajax({
            url: 'ward/wardQuery.do',
            type: 'post',
            data: {
                "departmentNo": departmentNo,
                "typeNo": typeNo
            },
            dataType: 'JSON',
            success: function (result) {
                if (result.state == 0) {
                    var list = result.data;
                    var $select = $("#ward");
                    $select.empty();
                    var $xz = "<option id='wards' value=>" + "请选择" + "</option>";
                    $select.append($xz);
                    if (list.length > 0) {
                        for (var i = 0; i < list.length; i++) {
                            var ward = list[i];
                            var $option = "<option value=" + ward.wardNo + ">"
                                + ward.wardNo + "号房</option>";
                            $select.append($option);
                            layui.use('form', function () {  //此段代码必不可少
                                var form = layui.form;
                                form.render();
                            });
                        }
                    }
                }
            }
        });
    });
    form.on("select(ward)",function (data) {
        var wardNo = data.value;
        // 床位列表
        $.ajax({
            url: 'bed/bedQuery.do',
            type: 'post',
            data: {
                "wardNo": wardNo
            },
            dataType: 'JSON',
            success: function (result) {
                if (result.state == 0) {
                    var list = result.data;
                    var $select = $("#bedNo");
                    $select.empty();
                    var $xz = "<option id='beds' value=>" + "请选择" + "</option>";
                    $select.append($xz);
                    if (list.length > 0) {
                        for (var i = 0; i < list.length; i++) {
                            var bed = list[i];
                            var $option = "<option value=" + bed.bedNo + ">" + bed.bedNo
                                + "号床</option>";
                            $select.append($option);
                            layui.use('form', function () {  //此段代码必不可少
                                var form = layui.form;
                                form.render();
                            });
                        }
                    }
                }
            }
        });
    })
});
$(function () {
    $('#cerificateNo').on('blur', checkCerificateNo).on('focus', function() {
        $('#patientError').empty();
    });
    // 科室列表
    $.ajax({
        url: 'common/list.do',
        type: 'post',
        data: {
            "name": "科室"
        },
        dataType: 'JSON',
        success: function (result) {
            if (result.state == 0) {
                var list = result.data;
                var $select = $("#department");
                $select.empty();
                var $xz = "<option value=>"
                    + "请选择" + "</option>";
                $select.append($xz)
                if (list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var common = list[i];
                        var $option = "<option value=" + common.value + ">"
                            + common.name + "</option>";
                        $select.append($option);
                        layui.use('form', function () {  //此段代码必不可少
                            var form = layui.form;
                            form.render();
                        });
                    }
                }
            }
        }
    });
// 病房类型列表
    $.ajax({
        url : 'common/typeList.do',
        type : 'post',
        data : {
            "id" : ""
        },
        dataType : 'JSON',
        success : function(result) {
            if (result.state == 0) {
                var list = result.data;
                var $select = $("#type");
                $select.empty();
                var $xz = "<option  value=>" + "请选择" + "</option>";
                $select.append($xz);
                if (list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var common = list[i];
                        var $option = "<option value=" + common.value + ">"
                            + common.name + "</option>";
                        $select.append($option);
                        layui.use('form', function () {  //此段代码必不可少
                            var form = layui.form;
                            form.render();
                        });
                    }
                }
            }
        }
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
                $("#patientId").val(people[0].patientId);
                $("#yroom").val(people[0].roomNo);
                $("#ybed").val(people[0].bedNo);
                //姓名
                $("#name").val(people[0].name);
                //性别
                var $select = $("#gender");
                $select.empty();
                if(people[0].gender==1){
                    var $option = "<option value=" + people[0].gender + ">"+"男</option>";
                }else {
                    var $option = "<option value=" + people[0].gender + ">"+"女</option>";
                }
                $select.append($option);
                layui.use('form', function () {  //此段代码必不可少
                    var form = layui.form;
                    form.render();
                });
                //科室
                $("#department").val(people[0].department);
                //主治医生
                var $select3 = $("#doctor");
                if(people[0].doctorId!=null){
                    $select3.empty();
                    var $option3 = "<option  value=" + people[0].doctorId + ">"+people[0].doctorName+"</option>";
                    $select3.append($option3);
                    layui.use('form', function () {  //此段代码必不可少
                        var form = layui.form;
                        form.render();
                    });
                }
                //房间类型
                    $("#type").val(people[0].roomType);
                     layui.use('form', function () {  //此段代码必不可少
                    var form = layui.form;
                    form.render();
                });
                //房间号
                var $select5 = $("#ward");
                if(people[0].roomNo!=null){
                    $select5.empty();
                    var $option5 = "<option  value=" + people[0].roomNo + ">"+people[0].roomNo+"</option>";
                    $select5.append($option5);
                    layui.use('form', function () {  //此段代码必不可少
                        var form = layui.form;
                        form.render();
                    });
                }
                //床位号
                var $select6 = $("#bedNo");
                if(people[0].bedNo!=null){
                    $select6.empty();
                    var $option6 = "<option  value=" + people[0].bedNo + ">"+people[0].bedNo+"</option>";
                    $select6.append($option6);
                    layui.use('form', function () {  //此段代码必不可少
                        var form = layui.form;
                        form.render();
                    });
                }
                //入院状况
                var $select7 = $("#statu");
                if(people[0].admissionStatus!=null){
                    $select7.empty();
                    if (people[0].admissionStatus==1){
                        var $option7 = "<option  value=" + people[0].admissionStatus + ">"+"一般</option>";
                    }else if (people[0].admissionStatus==2) {
                        var $option7 = "<option  value=" + people[0].admissionStatus + ">"+"急</option>";
                    }else if (people[0].admissionStatus==3) {
                        var $option7 = "<option  value=" + people[0].admissionStatus + ">"+"危</option>";
                    }
                    $select7.append($option7);
                    layui.use('form', function () {  //此段代码必不可少
                        var form = layui.form;
                        form.render();
                    });
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
                $("#patientError").empty().append("*已住院");
                layui.use('form', function () {  //此段代码必不可少
                    var form = layui.form;
                    form.render();
                });
                return false;
            }else {
                $("#patientError").empty().append("该病人已经出院");
            }
        }
    });
    return true;
}