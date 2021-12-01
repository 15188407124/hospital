var $tbody = $("#tbd");
var start = 0;
var end = 5;
$(function() {
    $("#clear").click(reset);
});
layui.use(['form', 'layer'],
    function() {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        form.on('submit(sreach)',
            function(data) {
                $.ajax({
                    type : "POST",
                    dataType : "json",
                    url : "drugs/stockQuery.do",
                    data : data.field,
                    success : function(result) {
                        if (result.state == 0) {
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
                                layer.alert("未查询到数据！");
                                $("#showbuttom").hide();
                            }
                            showList(list, start, end);
                        }
                    },
                    error : function(result) {
                        layer.alert("保存失败");
                    }

                });
                return false;
            });

    });
function showList(list, start, end) {
    if (list.length > 0) {
        for (var i = start; i < end; i++) {
            var stock = list[i];
            if ((i + 1) % 2 == 0) {
                trStyle = "<tr style='background-color:#eff6fa;cursor:pointer' onclick='jump(this);'>";
            } else {
                trStyle = "<tr style='cursor:pointer' onclick='jump(this);'>";
            }
            var $tr = trStyle + "<td class='num'>" + (i + 1) + "</td>"
                + "<td class='name'>" + stock.drugsId + "</td>"
                + "<td class='name'>" + stock.drugsName + "</td>"
                + "<td class='node'>" + stock.price + "</td>"
                + "<td class='node'>" + stock.account + "</td>" + "</tr>";
            $tbody.append($tr);
        }
    }
}
function reset() {
    $("#stock_find :input").val("");
}
