var upPeople=0;
var downPeople=0;
var doctorName='';
var todays='';
var tom='';
var aftertom='';
var did='';
var pid='';
$(function () {
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
    // 读取cookie的值,为收款人和收款人编号赋值
    // cookie内容：{user:用户ID#用户姓名#用户类型描述}
    var cookie = getCookie('user');
    var id = cookie.split("#")[0].substring(0);
    pid = id;
    $("#userId").val(id);
    var doctorId = window.location.href.split("?")[1].split("=")[1];
    did=doctorId;
    console.log(window.location.href);
    var data = window.location.href.split("?")[1].split("=")[1];
    doctorID=data;
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
            doctorName=doctorList[0].name;
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

    });
    $.ajax({
        url : 'doctor/OrderDoctorQuery.do',
        type : 'post',
        data : {
                "patientId":id,
                "doctorId":doctorId
        },
        dataType : 'JSON',
        success : function(result) {
            if (result.data.length !=0 ) {
                var orders=result.data;
                $("#up").empty();
                $("#up").text("你已经预约该医生");
                if(orders[0].order_up==1){
                    $("#upTime").attr("checked",true);
                    $("#downTime").attr("checked",false);
                }else if (orders[0].order_down==1) {
                    $("#downTime").attr("checked",true);
                    $("#upTime").attr("checked",false);
                }
                var dates = orders[0].order_date;
                if(dates.substring(dates.length-2,dates.length)==todays){
                    $("#yuyueTime").attr("checked",true);
                    $("#yuyueTimes").attr("checked",false);
                    $("#yuyueTimess").attr("checked",false);
                }else if(dates.substring(dates.length-2,dates.length)==tom){
                    $("#yuyueTime").attr("checked",false);
                    $("#yuyueTimes").attr("checked",true);
                    $("#yuyueTimess").attr("checked",false);
                }else if(dates.substring(dates.length-2,dates.length)==aftertom) {
                    $("#yuyueTime").attr("checked",false);
                    $("#yuyueTimes").attr("checked",false);
                    $("#yuyueTimess").attr("checked",true);
                }
                $('input[name="order_date"]').attr("disabled",true);//设置单选按钮不可选中
                $('input[name="order_time"]').attr("disabled",true);
                $("#add").addClass("layui-btn layui-btn-radius layui-btn-disabled").prop("disabled" , true);
            }else {
                $("#clear").addClass("layui-btn layui-btn-radius layui-btn-disabled").prop("disabled" , true);
            }
        }
    });
    showsDate();
});
/*取消预约*/
function removeOrder() {
    var order_time = $('input[name="order_time"]:checked').val();
    console.log(order_time);
    $.ajax({
        url : 'doctor/delOrderDoctor.do',
        type : 'post',
        data : {
            "patientId":pid,
            "doctorId":did
        },
        dataType : 'JSON',
        success : function(result) {
                    layer.alert("取消预约成功！",{
                        icon: 6,
                        time:2000,
                        shade:0.3,
                        end:function () {
                            parent.location.href="index.html";
                        }
                    });
                },
        error:function () {
            layer.alert("取消预约失败")
        }
    });
}
function checkOrder(data) {
    if(checkTime(data)){
        $.ajax({
            url : "doctor/checkIsOrder.do",
            data : data,
            type : "post",
            dataType : "JSON",
            success : function(result) {
                if(result.data.length!=0){
                    layer.alert("该时间段已经预约过其他医生，无法继续进行预约！",{
                        icon: 6,
                        time:2000,
                        shade:0.3,
                    });
                }else {
                    $.ajax({
                        url : "doctor/updateDoctorOrder.do",
                        data : data,
                        type : "post",
                        dataType : "JSON",
                        success : function(result) {
                            layer.alert("预约成功！",{
                                icon: 6,
                                time:2000,
                                shade:0.3,
                                end:function () {
                                    location.href="doctor_msg.html";
                                }
                            });

                        },
                        error : function() {
                            layer.alert("预约失败！");
                        }
                    });
                }
            }
        });
    }
}
//检查时间段是否已经超过预约时间
function checkTime(dateFiled) {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getYear() + 1900;
    var date = year + "-" + month + "-" + day;
    var hour = today.getHours();
    if(date==dateFiled.order_date){
        if(hour>=11&&hour<17&&dateFiled.order_time==1){
           layer.alert("当前超过预约时间段，请选择正确的时间段")
            return false;
        }else if(hour>=17) {
            layer.alert("当前超过预约时间段，请选择正确的时间段")
            return false;
        }else {
            return true;
        }
    }else {
        return true;
    }
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
                    checkOrder(data.field);
                }
                return false;
            });
        form.on('radio(dateRadio)', function(data){
            var torder=$('input[name="order_time"]:checked').val();
            if(torder!=""&&torder!=null){
                checkOrderNum(data.value,torder);
            }
        });
        form.on('radio(timeRadio)', function(data){
            var dorder=$('input[name="order_date"]:checked').val();
            if(dorder!=""&&dorder!=null){
                checkOrderNum(dorder,data.value);
            }
        });
    });
function checkOrderNum(orderDate,order_num) {
    var datas;
    if(order_num==1){
        datas={"doctorId":did, "order_date":orderDate, "order_up":1,"order_down":0}
    }else {
        datas={"doctorId":did, "order_date":orderDate, "order_up":0,"order_down":1}
    }
    $.ajax({
        url : 'doctor/findOrderNum.do',
        type : 'post',
        data : datas,
        dataType : 'JSON',
        success : function(result) {
            if (result.state == 0) {
                var listcount = result.data;
                    if(listcount[0]==3){
                        $("#up").text("该时间段预约人数已满");
                        $("#add").addClass("layui-btn layui-btn-radius layui-btn-disabled").prop("disabled" , true);
                        return false;
                    }else {
                        $("#up").text("");
                    }
                    $("#add").removeClass("layui-btn-disabled").prop("disabled",false);
            }
        }
    });
}
function showsDate() {
    // 获取当前时间
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getYear() + 1900;
        var date = year + "-" + month + "-" + day;
        todays=day;
        document.getElementById("yuyueTime").value = date;
        if(month%2==1){
            if(day==31){
                date=year+"-" + month+1 + "-" +1;
                tom=1;
            }else {
                date=year+"-" + month + "-" + (day+1);
                tom=day+1;
            }

        }else if(month%2==0){
            if(month==2){
                if(year%4==0&&year%400!=0&&day==28){
                    date=year+"-" + 3 + "-" +1;
                    tom=1;
                }else if (year%4!=0&&day==29) {
                    date=year+"-" + month+1 + "-" +1;
                    tom=1;
                }
            }else if(month==12&&day==30){
                date=year+1+"-" + 1 + "-" + 1;
                tom=1;
            }else if(day==30){
                date=year+"-" + month+1 + "-" + 1;
                tom=1;
            }else {
                date=year+"-" + month + "-" + (day+1);
                tom=day+1;
            }
        }
        document.getElementById("yuyueTimes").value = date;
    if(month%2==1){
        if(day==30){
            date=year+"-" + month+1 + "-" +1;
            tom=1;
        }else if(day==31) {
            date=year+"-" + month+1 + "-" + 2;
            tom=2;
        }else {
            date=year+"-" + month + "-" + day+2;
        }

    }else if(month%2==0){
        if(month==2){
            if(year%4==0&&year%400!=0){
                if(day==27){
                    date=year+"-" + 3 + "-" +1;
                    aftertom=1;
                }else if(day==28){
                    date=year+"-" + 3 + "-" +2;
                    aftertom=2;
                }
            }else if (year%4!=0&&day==29) {
                if(day==28){
                    date=year+"-" + month+1 + "-" +1;
                    aftertom=1;
                }else if(day=29){
                    date=year+"-" + month+1 + "-" +2;
                    aftertom=2;
                }
            }
        }else if(month==12){
            if(day==29){
                date=year+1+"-" + 1 + "-" + 1;
                aftertom=1;
            }else if(day==30) {
                date=year+1+"-" + 1 + "-" + 2;
                aftertom=2;
            }

        }else if(day==30) {
            date=year+"-" + month+1 + "-" + 2;
            aftertom=2;
        }else if(day==29){
            date=year+"-" + month+1 + "-" + 1;
            aftertom=1;
        }else {
            date=year+"-" + month + "-" + (day+2);
            aftertom=day+2;
        }
    }
        document.getElementById("yuyueTimess").value = date;


}