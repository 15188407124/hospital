var $tbody=$("#tbd");
var start=0;
var end=5;
$(function() {
	$.ajax({
		url : "administrative/findAdministraitveMsg.do",
		type : "post",
		data : {
		},
		dataType : "JSON",
		async : false,
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
		error : function() {
			layer.alert("查询失败");
		}
	});
});
function showList(list, start, end) {
				for (var i = start; i < end; i++) {
					var parameter = list[i];
					if ((i + 1) % 2 == 0) {
						trStyle = "<tr style='background-color:#eff6fa'>";
					} else {
						trStyle = "<tr>";
					}
					var $tr = $(trStyle + "<td class='num'>" + (i + 1)
						+ "</td>" + "<td class='process'>"
						+ parameter.value + "</td>"
						+ "<td class='process'>"
						+ parameter.name + "</td>"
						+ "<td class='node'>" + parameter.message + "</td>"
						+"</tr>");
					$tbody.append($tr);

				}
			}
