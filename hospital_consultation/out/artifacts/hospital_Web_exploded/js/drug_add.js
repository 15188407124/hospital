$(function() {
    $("#clear").click(reset);
    $('#drugsId').on('blur', checkdrugsId).on('focus', function() {
        $('#drugsIdError').empty();
    });
    $('#drugsName').on('blur', checkdrugsName).on('focus', function() {
        $('#drugsNameError').empty();
    });
    showDate();
});
function checkdrugsName(){
    var drugsName = $('#drugsName').val();
    if (drugsName == null || drugsName == "") {
        $('#drugsNameError').val("药品名不能为空");
        return false;
    }
}
function checkdrugsId(){
    var drugsId = $('#drugsId').val();
    if (drugsId == null || drugsId == "") {
        $("#drugsIdError").val("药品编号不能为空");
        return false;
    }
    $.ajax({
        type : "POST",
        dataType : "json",
        url : "drugs/drugsFind.do",
        data : {"drugsId":drugsId},
        success : function(result) {
            var drug = result.data;
            $("#drugsName").val(drug[0].name);
            $("#price").val(drug[0].price);
        }
    });

}
layui.use(['form', 'layer'],
    function() {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        form.on('submit(add)',
            function(data) {
                if (Number($("#year").val()) < 0 || Number($("#mouth").val()) < 0
                    || Number($("#day").val()) < 0) {
                    layer.alert("保质期不能为负！");
                    return false;
                } else if ($("#year").val() == "" && $("#mouth").val() == ""
                    && $("#day").val() == "") {
                    layer.alert("保质期不能为空！");
                    return false;
                }
                $.ajax({
                    type : "POST",
                    dataType : "json",
                    url : "drugs/drugsSave.do",
                    data : data.field,
                    success : function(result) {
                        //发异步，把数据提交给php
                        if(result.state==0){
                            layer.alert("增加成功", {
                                icon: 6,
                                time: 2000,
                                shade:0.3,
                            });
                        }
                    },
                    error : function(result) {
                        layer.alert("保存失败");
                    }

                });
                return false;
            });

    });
// 获取当前时间
function showDate() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getYear() + 1900;
    var mytime = today.toLocaleTimeString();
    var date = year + "-" + month + "-" + day + " " + mytime;
    document.getElementById("inTime").value = date;
}
function reset() {
    $("#drugsForm :input").val("");
}
