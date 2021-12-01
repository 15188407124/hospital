$(function() {
    $("#clear").click(reset);
    $('#drugsId').on('blur', checkdrugsId).on('focus', function() {
        $('#drugsIdError').empty();
    });
    $('#patientId').on('blur', checkpatientId).on('focus', function() {
        $('#patientIdError').empty();
    });
});
function checkpatientId(){
    var patientId = $('#patientId').val();
    if(patientId!=""){
        var pId = /^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$/
        if (!pId.test(patientId)) {
            $('#patientId').focus().css({
                border: "1px solid red",
                boxShadow: "0 0 2px red"
            });
            alert("住院编号格式不正确");
            return false;
        }
        if(!(patientId.length==13)){
            $('#patientId').focus().css({
                border: "1px solid red",
                boxShadow: "0 0 2px red"
            });
            alert("住院编号长度为13位");
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
    }
}
function checkdrugsId(){
    var drugsId = $('#drugsId').val();
    if(drugsId!=""){
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
}
layui.use(['form', 'layer'],
    function() {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        form.on('submit(add)',
            function(data) {
                $.ajax({
                    type : "POST",
                    dataType : "json",
                    url : "drugs/grantAdd.do",
                    data : data.field,
                    success : function(result) {
                            layer.alert("发放成功", {
                                icon: 6,
                                time: 2000,
                                shade:0.3,
                            });
                    },
                    error : function(result) {
                        layer.alert("发放失败");
                    }

                });
                return false;
            });

    });

function reset() {
    $("#drug_sellForm :input").val("");
}
