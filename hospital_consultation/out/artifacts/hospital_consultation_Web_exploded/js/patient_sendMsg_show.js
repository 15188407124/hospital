var $tbody = $("#tbd");
var start = 0;
var end = 5;
// 读取cookie的值,为收款人和收款人编号赋值
// cookie内容：{user:用户ID#用户姓名#用户类型描述}
var cookie = getCookie('user');
var id = cookie.split("#")[0].substring(0);
$(function() {
    $("#clear").click(reset);
    /*查询已发信息*/
    $.ajax({
        type : "POST",
        dataType : "json",
        url : "patient/patientQueryMsg.do",
        data : {"patientId":id,"mark":0},
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
                showList(list, start, end);
            }
        },
        error : function(result) {
            layer.alert("查询失败");
        }

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
            var patient = list[i];
            if ((i + 1) % 2 == 0) {
                trStyle = "<tr style='background-color:#eff6fa'>";
            } else {
                trStyle = "<tr>";
            }
            var $tr = $(trStyle
                + "<td class='num'>"
                + (i + 1)
                + "</td>"
                + "<td class='name'>"
                + patient.doctorId
                + "</td>"
                + "<td class='process'>"
                + patient.name
                + "</td>"
                + "<td class='process'>"
                + patient.msg
                + "</td>"
                + "<td class='time'>"
                + patient.msgtime
                + "</td>"
                + "</tr>");
            $tbody.append($tr);
        }

    }
}
