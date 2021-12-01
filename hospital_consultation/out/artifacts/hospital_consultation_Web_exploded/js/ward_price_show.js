function showPatient(pageNo, pageSize) {
            $.ajax({
                url:'category/categoryQuery.do',
                type:'post',
                data:{pageNo:pageNo,pageSize:pageSize,id:"",type:"",name:""},
                dataType:'JSON',
                success:function (result) {
                    if(result.state==0){
                        var list = result.data;
                        var $tbody = $("#tbd");
                        $tbody.empty();
                        if(list.length>0){
                            for (var i = 0;i<list.length;i++){
                                var category=list[i];
                                var str='<tr>'+
                                    '<td>' + (i+1) + '</td>'+
                                    '<td>' + category.type + '</td>'+
                                    '<td>' + category.name + '</td>'+
                                    '<td>' + category.price + '</td>'+
                                    '<td>' + category.updateTime+ "<input type='hidden' name='id' value="+category.id+">" + '</td>'+
                                    '<td class="td-manage"><a href="update_ward_price.html?id='+category.id+'+" title="修改价格">'+'修改价格</a>'+'</td>'+
                                    '</tr>';
                                $("#tbd").append(str);

                            }
                        }
                    }
                }
            })
        }
//加载总页数
var total;
//先初始化加载首页，十条数据
showPatient(1,5);
layui.use(['laypage','jquery'], function() {
    $.ajax({
        url:"category/categoryQuery.do",
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



