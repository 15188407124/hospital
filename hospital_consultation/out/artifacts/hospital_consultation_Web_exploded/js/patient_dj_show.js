var list;
var $tbody = $("#tbd");
var start = 0;
var end = 5;
$(function () {
    $.ajax({
        url:'patient/patientQuery.do',
        type:'post',
        data:{},
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
function showList(lists, start, end) {
    var departName='';
    var ward='';
    var bed='';
    var doctor='';
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
            }
            var admissionTime = patient.admissionTime.substring(0,
                patient.admissionTime.length - 2);

            if(patient.departmentName==null){
                departName='未登记';
            }else {
                departName=patient.departmentName;
            }
            if(patient.roomNo==null){
                ward='未登记';
            }else {
                ward=patient.roomNo;
            }
            if(patient.bedNo==null){
                bed='未登记';
            }else {
                bed=patient.bedNo;
            }
            if(patient.doctorName==null){
                doctor='未登记';
            }else {
                doctor=patient.doctorName;
            }
            var $tr = trStyle + "<td class='num'>" + (i + 1) + "</td>"
                + "<td class='time'>" + patient.name + "</td>"
                + "<td class='num'>" + gender + "</td>"
                + "<td class='node'>" + departName + "</td>"
                + "<td class='num'>" + ward + "</td>"
                + "<td class='num'>" + bed + "</td>"
                + "<td class='name'>" + patient.patientId + "</td>"
                + "<td class='name'>" + doctor + "</td>"
                + "<td class='num'>" + state + "</td>"
                + "<td>" + patient.contacts + "</td>"
                + "<td class='time'>" + admissionTime + "</td>" + "</tr>";
            $tbody.append($tr);
        }
    }
}



