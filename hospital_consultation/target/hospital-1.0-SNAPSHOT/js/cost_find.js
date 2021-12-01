$(function() {
    /*
     * 读取cookie值，判断是什么类型的用户。 如果是患者，则把住院号设置为只读，隐藏结算按钮 并把数据回显出来
     */
    // cookie内容：{user:用户ID#用户姓名#用户类型描述}
    var cookie = getCookie('user');
    var userid = cookie.split("#")[0].substring(0);
    var usertype = cookie.split("#")[2].substring(0);
    // alert(usertype);
    if (usertype == 0) {// 是患者类型的用户
        document.getElementById("patientId").setAttribute("disabled", true);
        $("#pay").attr("style", "display:none;");
        $("#pays").attr("style", "display:none;");// 隐藏结算按钮
        $.ajax({// 通过身份证查询patient表的患者信息
            url : "patient/patientQueryBycerificateNo.do",
            data : {
                "cerificateNo" : userid
            },
            type : "post",
            dataType : "JSON",
            success : function(result) {
                if (result.state == 0) {
                    var list = result.data;
                    var lastNameNum = list.length;// 只显示最近一次住院记录
                    var patientID = list[lastNameNum - 1].patientId;
                    $("#patientId").val(patientID);
                }
            }
        });
    }
});
$(function() {
    // 设置按钮监听
    $(".jiesuanOK").click(jiesuanOk);
    $(".jiesuanNO").click(Tishiclose);
});
function showPatient(pageNo, pageSize) {
    $("#pageNo").val(pageNo);
    $("#pageSize").val(pageSize);
}
//加载总页数
var total;
//先初始化加载首页，十条数据
showPatient(1,5);
layui.use(['laypage','jquery'], function() {
    $.ajax({
        url:"cost/costQuery.do",
        type:"post",
        data:"",
        dataType:"JSON",
        success:function (result) {
            total=result.data.length;
            var laypage = layui.laypage,$ = layui.$;
            laypage.render({
                elem: $('.page')[0]
                //注意，这里的 elem 指向存放分页的容器，值可以是容器ID、DOM对象。
                //例1. elem: 'idName' 注意：这里不能加 # 号
                //例2. elem: document.getElementById('idName')
                ,count: total //数据总数，从服务端得到
                , limit: 5                      //每页显示条数
                , limits: [5, 10, 15]
                , curr: 1                        //起始页
                , groups: 5                      //连续页码个数
                , prev: '上一页'                 //上一页文本
                , netx: '下一页'                 //下一页文本
                , first: 1                      //首页文本
                , last: 100                     //尾页文本
                , layout: ['prev', 'page', 'next','limit','refresh','skip']
                //跳转页码时调用
                , jump: function (obj, first) { //obj为当前页的属性和方法，第一次加载first为true
                    //非首次加载 do something
                    if (!first) {
                        //清空以前加载的数据
                        $('tbody').empty();
                        //调用加载函数加载数据
                        showPatient(obj.curr,obj.limit);
                    }
                }
            });
        }
    });
});
var counts=0;
var pName='';
// 提交form表单
layui.use(['form', 'layer'],
    function() {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        var patientName = "";
        form.on('submit(sreach)',
            function(data) {
                var patientId = $('#patientId').val();
                if (patientId == null || patientId == "") {
                    $("#patientIdError").css("color", "red");
                    $("#patientIdError").text("*不能为空");
                    return false;
                }
                $.ajax({
                    url:'patient/patientQuery.do',
                    type:'post',
                    data:{"patientId":patientId
                    },
                    dataType:'JSON',
                    success:function (result) {
                        if(result.state == 0){
                            var currData = result.data;
                            pName=currData[0].name;
                            $("#patientName").val(currData[0].name);
                        }
                    }
                });
                $.ajax({
                    url:'cost/costTotal.do',
                    type:'post',
                    data:data.field,
                    dataType:'JSON',
                    success:function (result) {
                        if(result.state == 0){
                            var currData = result.data;
                            $("#tbd").empty();
                            if(currData.length !=0){
                                for (var i = 0; i < currData.length; i++) {
                                    if(currData[i].account==null){
                                        currData[i].account=0;
                                    }
                                    var str='<tr>'+
                                        '<td class="number">' + (i+1) + '</td>'+
                                        '<td class="process">' + currData[i].patientId + '</td>'+
                                        '<td class="process">' + pName + '</td>'+
                                        '<td class="node">' + currData[i].type + '</td>'+
                                        '<td class="name">' + currData[i].account.toFixed(2) + '</td>'+
                                        '</tr>';
                                    $("#tbd").append(str);
                                    layui.use('form', function () {  //此段代码必不可少
                                        var form = layui.form;
                                        form.render();
                                    });
                                    counts = 0;
                                }
                            }
                        }
                    }
                });
                return false;
            });
        //监听提交  费用结算
        form.on('submit(pay)',
            function(data) {
                var patientId = $("#patientId").val();
                if (patientId == null || "" == patientId) {
                    $("#patientIdError").css("color", "red");
                    $("#patientIdError").text("*不能为空");
                    return false;
                } else {
                    counts++;
                    if (counts <= 1) {
                        var $tbody = $("#tbd");
                        var $tr = "<tr style='background-color:#A0E5A2'>"
                            + "<td class='num'>操作</td>"
                            + "<td class='process'>总缴费</td>"
                            + "<td class='process'>总花费</td>"
                            + "<td class='node'>补交</td>" + "<td class='name'>退费</td>"
                            + +"</tr>";
                        $tbody.append($tr);
                        layui.use('form', function () {  //此段代码必不可少
                            var form = layui.form;
                            form.render();
                        });
                        var node = $(".node");// 补交
                        var name = $(".name");// 退费
                        // 总缴费
                        var account = 0;
                        // 总花费
                        var total = 0;
                        for (var i = 2; i < node.length; i++) {
                            if (node.eq(i).html() == "预缴费用") {
                                account = name.eq(i - 1).html() * 1;
                            }
                            if (node.eq(i).html() == "药物费用") {
                                total = (total * 1) + (name.eq(i - 1).html() * 1);
                            }
                            if (node.eq(i).html() == "退药费用") {
                                total = total - name.eq(i - 1).html();
                            }
                            if (node.eq(i).html() == "床位费(总计)") {
                                total = (total * 1) + (name.eq(i - 1).html() * 1);
                            }
                        }
                        var checkpoint = total + account;// 防止不点查询直接点结算，这样费用是0，但是依旧可以结算成功
                        if (total - account >= 0 && checkpoint != 0) {// 欠医院钱
                            var $tr1 = "<tr style='background-color:#6AB96E'>"
                                + "<td class='num'><a href='javascript:void(0);' onclick='selectPay();'>👉确认支付👈</a></td>"
                                + "<td class='process'>" + account.toFixed(2) + "</td>"
                                + "<td class='process'>" + total.toFixed(2) + "</td>"
                                + "<td class='node'>" + (total - account).toFixed(2)
                                + "</td>" + // 补交
                                "<td class='name'>" + 0 + "</td>" + // 退费0
                                +"</tr>";
                            $tbody.append($tr1);
                            layui.use('form', function () {  //此段代码必不可少
                                var form = layui.form;
                                form.render();
                            });
                        }
                        if (total - account < 0 && checkpoint != 0) {// 需要医院退钱
                            var $tr1 = "<tr style='background-color:#6AB96E'>"
                                + "<td class='num'><a href='javascript:void(0);' onclick='selectTishi();'>结算</a></td>"
                                + "<td class='process'>" + account.toFixed(2) + "</td>"
                                + "<td class='process'>" + total.toFixed() + "</td>"
                                + "<td class='node'>" + 0 + "</td>" + // 补交
                                "<td class='name'>" + (account - total).toFixed(2)
                                + "</td>" + // 退费
                                +"</tr>";
                            $tbody.append($tr1);
                            layui.use('form', function () {  //此段代码必不可少
                                var form = layui.form;
                                form.render();
                            });
                        }
                    }
                }
                return false;
            });

    });

function selectPay() {
    var patientId = $("#patientId").val();
    layer.confirm("确认支付吗？",{title:"确认支付"},function (index) {
        $.ajax({
            url:'patient/jiesuan.do',
            type:'post',
            data:{
                "patientId" : patientId
            },
            dataType:'json',
            success:function (result) {
                layer.alert("结算成功",{
                    icon:6,
                    time: 2000,
                    shade:0.3,
                    end:function () {
                        location.href="cost_find.html";
                    }
                },function() {
                    // 获得frame索引
                    var index = parent.layer.getFrameIndex(window.name);
                    //关闭当前frame
                    parent.layer.close(index);
                })
            },
            error : function(result) {
                layer.alert("保存失败");
            }
        })
    })
}
// 确认弹窗
function jiesuanOk() {
    // 确认结算
    var patientId = $("#patientId").val();
    var url = "patient/jiesuan.do";
    var data = {
        "patientId" : patientId
    };
    $.post(url, data, function(result) {
        alert("结算成功！");
        window.location.reload();
    });
}



