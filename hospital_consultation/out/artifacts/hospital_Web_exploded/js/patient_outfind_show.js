function showPatient(pageNo, pageSize) {
    $("#pageNo").val(pageNo);
    $("#pageSize").val(pageSize);
    $.ajax({
        url:'patient/leftShow.do?pageNo='+pageNo+"&pageSize="+pageSize,
        type:'post',
        data:'',
        dataType:'JSON',
        success:function (result) {
            var currData = result.data;
            if (currData.length != 0) {
                var sex ='';
                for (var i = 0; i < currData.length; i++) {
                    /*判断性别*/
                    if(currData[i].gender==1){
                        sex='男';
                    }else {
                        sex='女';
                    }
                    var str='<tr>'+
                        '<td>' + currData[i].patientName + '</td>'+
                        '<td>' + sex + '</td>'+
                        '<td>' + currData[i].cerificateNo +'</td>'+
                        '<td>' + currData[i].homeAddress + '</td>'+
                        '<td>' + currData[i].homePhone + '</td>'+
                        '<td>' + currData[i].patientId + '</td>'+
                        '<td>' + currData[i].departName + '</td>'+
                        '<td>' + currData[i].doctorName + '</td>'+
                        '<td>' + currData[i].contacts + '</td>'+
                        '<td>' + currData[i].leaveTime + '</td>'+
                        '</tr>';
                    $("#tbd").append(str);
                }

            }
        }
    });
}
//加载总页数
var total;
//先初始化加载首页，十条数据
showPatient(1,5);
layui.use(['laypage','jquery'], function() {
    $.ajax({
        url:"patient/leftFind.do",
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
// 提交form表单
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
                    url:'patient/leftPageFind.do',
                    type:'post',
                    data:data.field,
                    dataType:'JSON',
                    success:function (result) {
                        $("#tbd").empty();
                        var currData = result.data;
                        if (currData.length != 0) {
                            var sex ='';
                            for (var i = 0; i < currData.length; i++) {
                                /*判断性别*/
                                if(currData[i].gender==1){
                                    sex='男';
                                }else {
                                    sex='女';
                                }
                                var str='<tr>'+
                                    '<td>' + currData[i].patientName + '</td>'+
                                    '<td>' + sex + '</td>'+
                                    '<td>' + currData[i].cerificateNo +'</td>'+
                                    '<td>' + currData[i].homeAddress + '</td>'+
                                    '<td>' + currData[i].homePhone + '</td>'+
                                    '<td>' + currData[i].patientId + '</td>'+
                                    '<td>' + currData[i].departName + '</td>'+
                                    '<td>' + currData[i].doctorName + '</td>'+
                                    '<td>' + currData[i].contacts + '</td>'+
                                    '<td>' + currData[i].leaveTime + '</td>'+
                                    '</tr>';
                                $("#tbd").append(str);
                            }

                        }

                    }
                });
                return false;
            });

    });



