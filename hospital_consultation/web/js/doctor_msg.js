//职称列表
var listTitle;
// 科室列表
var listDepartment;
var $tbody = $("#tbd");
var start = 0;
var end = 5;

$(function() {
    $("#clear").click(reset);
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
                listTitle = result.data;
                var $ul = $("#title");
                $ul.empty();
                var $xz = "<option value=>"
                    + "请选择职称" + "</option>";
                $ul.append($xz)
                if (listTitle.length > 0) {
                    for (var i = 0; i < listTitle.length; i++) {
                        var common = listTitle[i];
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
    // 为科室的下拉列表增加数据
    $.ajax({
        url : 'common/list.do',
        type : 'post',
        data : {
            "name" : "科室"
        },
        dataType : 'JSON',
        success : function(result) {
            if (result.state == 0) {
                listDepartment = result.data;
                var $ul = $("#department");
                $ul.empty();
                var $xz = "<option value=>"
                    + "请选择科室" + "</option>";
                $ul.append($xz)
                if (listDepartment.length > 0) {
                    for (var i = 0; i < listDepartment.length; i++) {
                        var common = listDepartment[i];
                        var $li = "<option value=" + common.value + ">"
                            + common.name + "</option>";
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
    $.ajax({
        type : "POST",
        dataType : "json",
        url : "doctor/doctorQuery.do",
        data : {},
        success : function(result) {
            if(result.state == 0){
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
                        },
                        display_msg : true, // 是否显示记录信息
                        setPageNo : false
                        // 是否显示跳转第几页
                    });
                    $("#showbuttom").show();
                } else {
                    layer.alert("未找到信息！");
                    $("#showbuttom").hide();
                }
                showList(list, start, end);
            }
        },
        error : function(result) {
            layer.alert("保存失败");
        }

    });
});
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
                    type : "POST",
                    dataType : "json",
                    url : "doctor/doctorQuery.do",
                    data : data.field,
                    success : function(result) {
                        if(result.state == 0){
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
                                    },
                                    display_msg : true, // 是否显示记录信息
                                    setPageNo : false
                                    // 是否显示跳转第几页
                                });
                                $("#showbuttom").show();
                            } else {
                                layer.alert("未找到信息！");
                                $("#showbuttom").hide();
                            }
                            showList(list, start, end);
                        }
                    },
                    error : function(result) {
                        layer.alert("保存失败");
                    }

                });
                return false;
            });

    });
function reset() {
    /*
     * $(":input","#doctor_find_head").val("");
     * $(":li","#doctor_find_head").val("请选择");
     */
    window.location.reload(true);
}
function showList(list, start, end) {
    if (list.length > 0) {
        for (var i = start; i < end; i++) {
            var doctor = list[i];
            var gender = "";
            var title = "";
            var department = "";
            // 将对应的int值转为中文
            for (var j = 0; j < listTitle.length; j++) {
                if (listTitle[j].value == doctor.title) {
                    title = listTitle[j].name;
                }
            }
            for (var c = 0; c < listDepartment.length; c++) {
                if (listDepartment[c].value == doctor.department) {
                    department = listDepartment[c].name;
                }
            }
            if (doctor.gender == 1) {
                gender = "男";
            } else if (doctor.gender == 2) {
                gender = "女";
            }
            if ((i + 1) % 2 == 0) {
                trStyle = "<tr style='background-color:#eff6fa'>";
            } else {
                trStyle = "<tr>";
            }
            var state = "是";
            if (doctor.state == 1) {
                state = "否";
            }
            if(doctor.state==0){
                var $tr = $(trStyle
                    + "<td class='num'>"
                    + (i + 1)
                    + "</td>"
                    + "<td class='name'>"
                    + doctor.id
                    + "</td>"
                    + "<td class='process'>"
                    + doctor.name
                    + "</td>"
                    + "<td class='node'>"
                    + department
                    + "<span style='display:none'>"
                    + doctor.department
                    + "</span></td>"
                    + "<td class='num'>"
                    + gender
                    + "<span style='display:none;'>"
                    + doctor.gender
                    + "</span></td>"
                    + "<td class='node'>"
                    + title
                    + "<span style='display:none;'>"
                    + doctor.title
                    + "</span></td>"
                    + "<td class='time'>"
                    + doctor.workTime
                    + "</td>"
                    + "<td class='num'>"
                    + state
                    + "</td>"
                    +'<td class="td-manage"><a href="doctor_yuyue.html?id='+doctor.id+'" title="现在预约">'+'马上预约</a>'+'</td>'+
                    + "</tr>");
            }else {
                var $tr = $(trStyle
                    + "<td class='num'>"
                    + (i + 1)
                    + "</td>"
                    + "<td class='name'>"
                    + doctor.id
                    + "</td>"
                    + "<td class='process'>"
                    + doctor.name
                    + "</td>"
                    + "<td class='node'>"
                    + department
                    + "<span style='display:none'>"
                    + doctor.department
                    + "</span></td>"
                    + "<td class='num'>"
                    + gender
                    + "<span style='display:none;'>"
                    + doctor.gender
                    + "</span></td>"
                    + "<td class='node'>"
                    + title
                    + "<span style='display:none;'>"
                    + doctor.title
                    + "</span></td>"
                    + "<td class='time'>"
                    + doctor.workTime
                    + "</td>"
                    + "<td class='num'>"
                    + state
                    + "</td>"
                    +'<td class="td-manage"><a href="doctor_msg.html?id='+doctor.id+'" title="返回医生列表">'+'返回医生列表</a>'+'</td>'+
                    + "</tr>");
            }
            $tbody.append($tr);
        }
    }
}