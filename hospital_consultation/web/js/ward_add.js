var list;
$(function () {
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
    // 查询所有的病房列表
    $.ajax({
        url : 'ward/wardQuery.do',
        type : 'post',
        data : {
            "id" : ""
        },
        dataType : 'JSON',
        success : function(result) {
            if (result.state == 0) {
                list = result.data;
            }
        }
    });
    showDate();
});
function check() {
    var date = new Date();
    var wardNo = $("#wardNo").val();
    var departmentNo = $("#department").val();
    var typeNo = $("#type").val();
    var wardspace = $("#wardspace").val();
    var createTime = $("#createTime").val();

    if (wardNo == null || wardNo == "") {
        $("#wardError").css("color", "red");
        $("#wardError").text("* 病房号不能为空");
        return false;
    }
    var regex = /^\+?[1-9][0-9]*$/;
    if (!regex.test(wardNo)) {
        $("#wardError").css("color", "red");
        $("#wardError").text("* 病房号必须为正整数");
        return false;
    }
    if (list != null && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            var ward = list[i];
            if (ward.wardNo == wardNo) {
                $("#wardError").css("color", "red");
                $("#wardError").text("* 病房号已存在");
                return false;
            }
        }
    }

    if (departmentNo == null || departmentNo == "") {
        $("#departError").css("color", "red");
        $("#departError").text("* 科室必须选择");
        return false;
    }

    if (typeNo == null || typeNo == "") {
        $("#typeError").css("color", "red");
        $("#typeError").text("* 病房类型必须选择");
        return false;
    }

    if (wardspace == null || wardspace == "") {
        $("#wardspaceerror").css("color", "red");
        $("#wardspaceerror").text("* 病房容量不能为空");
        return false;
    }
    var regex1 = /^\+?[1-9][0-9]*$/;
    if (!regex1.test(wardspace)) {
        $("#wardspaceerror").css("color", "red");
        $("#wardspaceerror").text("* 病房容量必须为整数");
        return false;
    }

    if (createTime == null || createTime == "") {
        $("#createError").css("color", "red");
        $("#createError").text("* 创建时间不能为空");
        return false;
    }
    /*
     * if(createTime<=getNowFormatDate()){ $("#createError").css("color",
     * "red"); $("#createError").text("* 创建时间不能小于当前时间"); return false; }
     */
    return true;
}
// 获取当前时间
function showDate() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getYear() + 1900;
    var mytime = today.toLocaleTimeString();
    var date = year + "-" + month + "-" + day + " " + mytime;
    document.getElementById("createTime").value = date;
}