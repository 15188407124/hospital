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
    });//病患身份证号输入框失去焦点后触发checkCerificateNo函数，检查身份证号的有效性，并提取病患信息
    // 民族列表
    $.ajax({
        url: 'common/nationList.do',
        type: 'post',
        data: {
            "id": ""
        },
        dataType: 'JSON',
        success: function (result) {
            if (result.state == 0) {
                var list = result.data;
                var $select = $("#nation");
                $select.empty();
                var $xz = "<option  value=>" + "请选择" + "</option>";
                $select.append($xz);
                if (list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var common = list[i];
                        var $option = "<option value=" + common.value + ">" + common.name + "</option>";
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
    var cardId = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (!cardId.test(cerificateNo)) {
        $('#cerificateNo').focus().css({
            border: "1px solid red",
            boxShadow: "0 0 2px red"
        });
        $('#patientError').html("<font color='red'><b>×身份证号格式不正确</b></font>");
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
                //姓名
                $("#name").val(people[0].name);
                //性别
                var $select = $("#gender");
                if(people[0].gender!=null){
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
                }
                //民族
                var $select1 = $("#nation");
                $select1.val(people[0].nation);
                    layui.use('form', function () {  //此段代码必不可少
                        var form = layui.form;
                        form.render();
                    });

                //工作单位
                $("#workUnit").val(people[0].workUnit);
                //生日
                $("#birth").val(people[0].birth);
                //家庭住址
                $("#homeAddress").val(people[0].homeAddress);
                //家庭电话
                $("#homePhone").val(people[0].homePhone)
                //婚姻状况
                var $select2 = $("#marry");
                if(people[0].maritalStatus!=null){
                    $select2.val(people[0].maritalStatus);
                }
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
                var $select4 = $("#type");
                if(people[0].roomType!=null){
                    $select4.val(people[0].roomType);
                }
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
                    $select7.val(people[0].admissionStatus);
                    /*$select7.empty();
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
                    });*/
                }
                //紧急联系人
                $("#contacts").val(people[0].contacts);
                //紧急联系人电话
                $("#contactsPhone").val(people[0].contactsPhone);
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
                $("#patientError").empty().append("*已登记");
                $("#add").addClass("layui-btn layui-btn-radius layui-btn-disabled").prop("disabled" , true);
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