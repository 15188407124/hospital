$(function () {
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
                var $title = $("#select_zhicheng");
                $title.empty();
                var $xz = "<option value=>"
                    + "请选择职称" + "</option>";
                $title.append($xz)
                if (listTitle.length > 0) {
                    for (var i = 0; i < listTitle.length; i++) {
                        var common = listTitle[i];
                        var $li = "<option value=" + common.value
                            + ">" + common.name + "</option>";
                        $title.append($li);
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
                var $keshi = $("#select_keshi");
                $keshi.empty();
                var $xz = "<option value=>"
                    + "请选择科室" + "</option>";
                $keshi.append($xz);
                if (listDepartment.length > 0) {
                    for (var i = 0; i < listDepartment.length; i++) {
                        var common = listDepartment[i];
                        var $li = "<option value=" + common.value + ">"
                            + common.name + "</option>";
                        $keshi.append($li);
                        layui.use('form', function () {  //此段代码必不可少
                            var form = layui.form;
                            form.render();
                        });
                    }
                }
            }
        }
    });
    console.log(window.location.href);
    var data = window.location.href.split("?")[1].split("=")[1];
    $.ajax({
        url:"doctor/doctorQueryById.do",
        type:"post",
        data:{
            "id":data
        },
        dataType:"json",
        success:function (result) {
            var doctorList = result.data;
            $("#idUpdate").val(doctorList[0].id);
            $("#nameUpdate").val(doctorList[0].name);
            $("#select_keshi").val(doctorList[0].department);
            layui.use('form', function () {  //此段代码必不可少
                var form = layui.form;
                form.render();
            });
            $("#select_gender").val(doctorList[0].gender);
            layui.use('form', function () {  //此段代码必不可少
                var form = layui.form;
                form.render();
            });
            $("#select_zhicheng").val(doctorList[0].title);
            layui.use('form', function () {  //此段代码必不可少
                var form = layui.form;
                form.render();
            });
        }

    })
});
function reset() {
    window.location.reload(true);
}
// 校验
function checkName() {
    var name = $("#nameUpdate").val();
    if (name == null || "" == name) {
        $(".nameUpdateError").text("*请填写！");
        return false;
    }
    return true;
}
layui.use(['form', 'layer'],
    function() {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        form.on('submit(add)',
            function(data) {
                console.log(data);
                if(checkName()){
                    // 校验成功后提交
                    $.ajax({
                        url : "doctor/updateDoctorMessage.do",
                        data : data.field,
                        type : "post",
                        dataType : "JSON",
                        success : function(result) {
                            if (result.state == 0) {
                                layer.alert("更新成功！",{
                                    icon: 6,
                                    time:2000,
                                    shade:0.3,
                                    end:function () {
                                        location.href="doctor_find.html";
                                    }
                                });

                            }
                        },
                        error : function() {
                            layer.alert("更新失败！");
                        }
                    });
                }
                return false;
            });

    });