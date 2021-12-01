var list;
var $tbody = $("#tbd");
var start = 0;
var end = 5;
// 读取cookie的值,为收款人和收款人编号赋值
// cookie内容：{user:用户ID#用户姓名#用户类型描述}
var cookie = getCookie('user');
var id = cookie.split("#")[0].substring(0);
var doctorId=id;
var cerifiNo;
$("#docId").val(doctorId);
$(function () {
    $.ajax({
        url:'patient/OrderQuery.do',
        type:'post',
        data:{"doctorId":doctorId},
        dataType:'JSON',
        success:function (result) {
            if (result.state == 0) {
                var lists = result.data;
                $tbody.empty();
                // 分页
                if (lists.length > 0) {
                    $('.pagination').pagination(lists.length, {
                        callback : function(page) {
                            start = page * this.items_per_page;
                            end = (page + 1) * this.items_per_page;
                            $tbody.empty();
                            showList(lists, start, end);
                            return true;
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
                showList(lists, start, end);
            }
        }
    })
});
// 提交form表单
layui.use(['form', 'layer'],
    function() {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        form.on('submit(sreach)',
            function(data) {
                $.ajax({
                    url:'patient/OrderQuery.do',
                    type:'post',
                    data:data.field,
                    dataType:'JSON',
                    success:function (result) {
                        if (result.state == 0) {
                            var lists = result.data;
                            $tbody.empty();
                            // 分页
                            if (lists.length > 0) {
                                $('.pagination').pagination(lists.length, {
                                    callback : function(page) {
                                        start = page * this.items_per_page;
                                        end = (page + 1) * this.items_per_page;
                                        $tbody.empty();
                                        showList(lists, start, end);
                                        return true;
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
                            showList(lists, start, end);
                        }
                    }
                })
                return false;
            });

    });
function showList(lists, start, end) {
    if (lists.length > 0) {
        for (var i = start; i < end; i++) {
            var patient = lists[i];
            // 将性别转为中文
            var gender = "男";
            if (patient.gender == 2) {
                gender = "女";
            }
            // 入院情况转为中文
            var state = "一般";
            if (patient.admissionStatus == 2) {
                state = "急";
            }
            if (patient.admissionStatus == 3) {
                state = "危";
            }
            var trStyle;
            if ((i + 1) % 2 == 0) {
                trStyle = "<tr style='background-color:#eff6fa;cursor:pointer' onclick='jump(this);'>";
            } else {
                trStyle = "<tr style='cursor:pointer' onclick='jump(this);'>";
            };
            var dates= patient.order_date.substring(0,10);
            var times='';
            if(patient.order_up==1){
                times="上午";
            }else {
                times="下午";
            }
            if(patient.order_state==0){
                var $tr = trStyle + "<td class='num'>" + (i + 1) + "</td>"
                    + "<td class='time'>" + patient.name + "</td>"
                    + "<td class='num'>" + gender + "</td>"
                    + "<td class='node'>" + patient.homeAddress + "</td>"
                    + "<td class='name'>" + patient.cerificateNo + "</td>"
                    + "<td>" + patient.contacts + "</td>"
                    + "<td class='num'>" + patient.contactsPhone + "</td>"
                    + "<td class='time'>" + patient.order_time + "</td>"
                    + "<td class='time'>" + dates+times+"</td>"
                    +'<td class="td-manage"><a  href="javascript:void(0)" onclick="detailOrder('+patient.patientId+')"  title="待问诊">'+'待问诊</a>'+'</td>'
            }else {
                var $tr = trStyle + "<td class='num'>" + (i + 1) + "</td>"
                    + "<td class='time'>" + patient.name + "</td>"
                    + "<td class='num'>" + gender + "</td>"
                    + "<td class='node'>" + patient.homeAddress + "</td>"
                    + "<td class='name'>" + patient.cerificateNo + "</td>"
                    + "<td>" + patient.contacts + "</td>"
                    + "<td class='num'>" + patient.contactsPhone + "</td>"
                    + "<td class='time'>" + patient.order_time + "</td>"
                    + "<td class='time'>" + dates+times+"</td>"
                    +'<td class="td-manage"><a href="javascript:void(0)"  title="已问诊">'+'已问诊</a>'+'</td>'
            }
               /* +'<td class="td-manage"><a href="doctor_msg.html?id='+doctor.id+'" title="已问诊">'+'已问诊</a>'+'</td>'*/
                $tbody.append($tr);
        }
    }
}
function detailOrder(patientId) {
    $.ajax({
        url : 'patient/patientQuery.do',
        type : 'post',
        data : {
            "patientId" : patientId
        },
        dataType : 'JSON',
        success : function(result) {
            if (result.state == 0) {
                var people = result.data;
                cerifiNo=people[0].cerificateNo;
            }
        }
    });
    setTimeout(function () {
        $.ajax({
            url : 'patient/detailOrder.do',
            type : 'post',
            data : {
                "patientId" : cerifiNo
            },
            dataType : 'JSON',
            success : function(result) {
                window.location.href="order_patients.html"
            }
        });
    },100)
}



