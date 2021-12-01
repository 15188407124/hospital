var drugId='';
$(function() {
    $("#clear").click(clear);
    $('#patientId').on('blur', checkpatientId).on('focus', function() {
    });
});
function checkpatientId(){
    var patientId = $('#patientId').val();
    if(patientId==""||patientId==null){
        return false;
    }
    $.ajax({
        type : "POST",
        dataType : "json",
        url : "patient/patientQuery.do",
        data : {"patientId":patientId},
        success : function(result) {
            var patient = result.data;
            $("#patientName").val(patient[0].name);
        }
    });
    $.ajax({
        url : "drugs/grantQuery.do",
        type : "post",
        data : {
            "patientId" : patientId
        },
        dataType : "JSON",
        success : function(result) {
            if (result.state == 0) {
                var list = result.data;
                console.log("list:" + list);
                var $datalist = $("#drugsName");
                $datalist.empty();
                var $xz = "<option id='wards' value=>" + "请选择药品" + "</option>";
                $datalist.append($xz);
                if (list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var stock = list[i];
                        var $li = "<option value='" + stock.drugsId + "'>"
                            + stock.drugsName + "</option>";
                        $datalist.append($li);
                        layui.use('form', function () {  //此段代码必不可少
                            var form = layui.form;
                            form.render();
                        });
                    }
                }
            }
        },
        error : function(result) {
            layer.alert("没有药品可退");
        }
    });
}
layui.use(['form'],function () {
    var form = layui.form;
    form.on("select(drugsName)", function (data) {
        drugId = data.value;
    });
});
function checknum() {
    var patientId = $("#patientId").val();
    $.ajax({
        url : "cost/countTotal.do",
        type : "post",
        data : {
            "patientId" : patientId,
            "drugId" : drugId
        },
        dataType : "JSON",
        success : function(result) {
            if (result.state == 0) {
                var count = result.data;
                console.log("count:" + count);
                $("#count1").val(count);
            }
        },
        error : function(result) {

        }
    });
}
function checknum1() {
    var count = $("#count").val();
    var count1 = $("#count1").val();
    if(count1==""){
        layer.alert("请选择退药药品名称")
        return;
    }
    if (count1 - count < 0) {
        layer.alert("对不起，数量超额！病人只有:" + count1 + "个该药品");
        $("#count").val("");
    }
}

// 提交form表单
layui.use(['form', 'layer'],
    function() {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        form.on('submit(add)',
            function(data) {
                $.ajax({
                    url : "drugs/DrugWithdrawal.do",
                    data :data.field,
                    type : "post",
                    dataType : "JSON",
                    success : function(result) {
                            layer.alert("退药成功", {
                                icon: 6,
                                time: 2000,
                                shade:0.3,
                            });

                    },
                    error : function(result) {
                        layer.alert("退药失败");
                    }
                });
                return false;
            });

    });
// 清空条件按钮
function clear() {
    $("#drugsForm :input").val("");
}