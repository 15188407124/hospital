$(function () {
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
                /*var $xz = "<option  value=>" + "请选择" + "</option>";*/
               /* $select.append($xz);*/
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
    // 读取cookie的值,为收款人和收款人编号赋值
    // cookie内容：{user:用户ID#用户姓名#用户类型描述}
    var cookie = getCookie('user');
    var cerificateNo = cookie.split("#")[0].substring(0);
    $("#cerificateNo").val(cerificateNo);
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
                //病人id
                $("#patientId").val(people[0].patientId);
                //姓名
                $("#name").val(people[0].name);
                //性别
                var $select = $("#gender");
                $select.val(people[0].gender);
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
                    $select2.empty();
                    if (people[0].maritalStatus==1){
                        var $option2 = "<option  value=" + people[0].maritalStatus + ">"+"已婚</option>";
                    }else {
                        var $option2 = "<option  value=" + people[0].maritalStatus + ">"+"未婚</option>";
                    }
                    $select2.append($option2);
                    layui.use('form', function () {  //此段代码必不可少
                        var form = layui.form;
                        form.render();
                    });
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
                layui.use('form', function () {  //此段代码必不可少
                    var form = layui.form;
                    form.render();
                });
                return false;
            }
        }
    });
})
