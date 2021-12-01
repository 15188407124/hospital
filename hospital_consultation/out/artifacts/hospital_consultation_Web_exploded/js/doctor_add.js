$(function () {
    $('#doctorname').on('focus', function() {
        $('#doctorNameError').empty();
    });

    $('#time').on('focus', function() {
        $('#timeError').empty();
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
// 为职称的下拉列表增加数据
    $.ajax({
        url : 'common/list.do',
        type : 'post',
        data : {
            "name" : "职称"
        },
        dataType : 'JSON',
        success : function(result) {
            if (result.state == 0) {
                var list = result.data;
                var $ul = $("#titles");
                $ul.empty();
                var $xz = "<option value=>"
                    + "请选择" + "</option>";
                $ul.append($xz)
                if (list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var common = list[i];
                        var $li = "<option  value=" + common.value
                            + ">" + common.name + "</option>";
                        $ul.append($li);
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
// 校验方法
function checkName() {
    var name = $("#doctorname").val();
    if (name === "") {
        $("#doctorNameError").css("color", "red");
        $("#doctorNameError").empty().append("*姓名不能为空");
        return false;
    }
    return true;
}
function checkTime() {
    var name = $("#time").val();
    if (name === "") {
        $("#timeError").css("color", "red");
        $("#timeError").empty().append("*入职时间不能为空");
        return false;
    }
    return true;
}
function checkDepart() {
    var depart = $("#department").text();
    if (depart == 0) {
        alert("科室不能为空！");
        return false;
    }
    return true;
}
function checkTitles() {
    var depart = $("#titles").text();
    if (depart == 0) {
        alert("医生职称不能为空！");
        return false;
    }
    return true;
}
function checkGender() {
    var gender = $("#sex").text();
    if (gender == 0) {
        alert("性别不能为空！");
        return false;
    }
    return true;
}