$(function() {
	var cookie = getCookie('user');
	// 获取当前用户权限
	var Jurisdiction = cookie.split("#")[2].substring(0, 1);
	var userId = cookie.split("#")[0].substring(0);//用户账号id
	if (Jurisdiction == null || Jurisdiction == "") {
		window.location.href = "index.html";// 未登陆系统，回到登陆页
	}
	// 患者
	if (Jurisdiction == 0) {
		$("#baseinfo").css("display","");
		$("#info").css("display","");
		$("#yuyueguahao").css("display","");
		$("#yuyue").css("display","");
		$("#yihuanluntan").css("display","");
		$("#sendPatient").css("display","");
		$("#receivePatient").css("display","");
		$("#kesixinxi").css("display","");
		$("#ksxxck").css("display","");
		$("#zjxx").css("display","");
		$("#jiesuanzhongxin").css("display", "");
		$("#fycx").css("display", "");
		$("#jfjl").css("display", "");
		$("#hulizhongxin").css("display", "");
		$("#lrtzsj").css("display", "");
		$("#tzsjcx").css("display", "");
		$("#zyls").css("display", "");
		$("#yyls").css("display", "");
		$.ajax({
			url : 'patient/patientQueryBycerificateNo.do',
			type : 'post',
			data : {
				"cerificateNo" : userId
			},
			dataType : 'JSON',
			success : function(result) {
				if (result.state == 0) {
					if(result.data[0].gender==null){
						layer.alert("请首先完善基本信息", {
							icon: 6,
							time: 5000,
							shade:0.3,
							end:function () {
                                window.location.href="patient_base_info.html";
                            }
						})
					}
				}
			}
		});

	}

	/*// 护士
	if (Jurisdiction == 1) {
		$("#ruyuanguanli").css("display", "");
		$("#zycx").css("display", "");
		$("#yaopinguanli").css("display", "");
		$("#ypff").css("display", "");
		$("#jiesuanzhongxin").css("display", "");
		$("#jfjl").css("display", "");
		$("#fycx").css("display", "");
		$("#hulizhongxin").css("display", "");
		$("#lrtzsj").css("display", "");
		$("#tzsjcx").css("display", "");
		$("#yyls").css("display", "");
		$("#chuyuanguanli").css("display", "");
		$("#cycx").css("display", "");
		$("#tongjizhongxin").css("display", "");
		$("#brtj").css("display", "");
		$("#bftj").css("display", "");
		$("#gangwei").text("[护士]");
	}*/

	// 医生
	if (Jurisdiction == 2) {
		$("#jiesuanzhongxin").css("display", "");
		$("#fyyj").css("display", "");
		$("#jfjl").css("display", "");
		$("#fycx").css("display", "");
		$("#yuyuemsg").css("display","");
		$("#yuyuelist").css("display","");
		$("#yihuanluntan").css("display","");
		$("#sendDoctor").css("display","");
		$("#receiveDoctor").css("display","");
		$("#ruyuanguanli").css("display", "");
		$("#rydj").css("display", "");
		$("#zycx").css("display", "");
		$("#yaopinguanli").css("display", "");
		$("#ypff").css("display", "");
		/*$("#kccx").css("display", "");*/
		$("#hulizhongxin").css("display", "");
		$("#lrtzsj").css("display", "");
		$("#tzsjcx").css("display", "");
		$("#zyls").css("display", "");
		$("#yyls").css("display", "");
		$("#chuyuanguanli").css("display", "");
		$("#cydj").css("display", "");
		$("#cycx").css("display", "");
		$("#tongjizhongxin").css("display", "");
		$("#brtj").css("display", "");
		$("#bftj").css("display", "");
		$("#gangwei").text("[医生]");
	}

	/*// 服务前台
	if (Jurisdiction == 3) {
		$("#ruyuanguanli").css("display", "");
		/!*$("#rydj").css("display", "");*!/
		$("#zycx").css("display", "");
		$("#yaopinguanli").css("display", "");
		//$("#tycl").css("dis"display", "");
		$("#jfjl").css("display", "");
		$("#kccx").css("display", "");
		$("#jiesuanzhongxin").css("display", "");
		$("#fyyj").css("display", "");
		$("#fycx").css("display", "");
		$("#chuyuanguanli").css("display", "");
		$("#cydj").css("display", "");
		$("#cycx").css("display", "");
		$("#zbfcl").css("display", "");
		$("#tongjizhongxin").css("display", "");
		$("#brtj").css("display", "");
		$("#bftj").css("display", "");
		$("#gangwei").text("[患者服务中心]");
	}*/

	// 系统管理员
	if (Jurisdiction == 4) {
		$("#ruyuanguanli").css("display", "");
		$("#rydj").css("display", "");
		$("#zycx").css("display", "");
		$("#bingfangguanli").css("display", "");
		$("#xzbf").css("display", "");
		$("#bfjgtz").css("display", "");
		$("#yaopinguanli").css("display", "");
		$("#yprk").css("display", "");
		$("#ypff").css("display", "");
		$("#tycl").css("display", "");
		$("#rkcx").css("display", "");
		$("#kccx").css("display", "");
		$("#jiesuanzhongxin").css("display", "");
		$("#fyyj").css("display", "");
		$("#jfjl").css("display", "");
		$("#fycx").css("display", "");
		$("#hulizhongxin").css("display", "");
		$("#lrtzsj").css("display", "");
		$("#tzsjcx").css("display", "");
		$("#zyls").css("display", "");
		$("#yyls").css("display", "");
		$("#chuyuanguanli").css("display", "");
		$("#cydj").css("display", "");
		$("#cycx").css("display", "");
		$("#zbfcl").css("display", "");
		$("#tongjizhongxin").css("display", "");
		$("#brtj").css("display", "");
		$("#bftj").css("display", "");
		$("#yonghuguanli").css("display", "");
		$("#yhzc").css("display", "");
		$("#yhcx").css("display", "");
		$("#yishengguanli").css("display", "");
		$("#yslr").css("display", "");
		$("#yscx").css("display", "");
	/*	$("#canshushezhi").css("display", "");
		$("#cssz").css("display", "");
		$("#yxrz").css("display", "");*/
		$("#kesixinxi").css("display","");
		$("#ksxxck").css("display","");
		$("#zjxx").css("display","");
		$("#gangwei").text("[超级管理员]");
	}

	/*// 超级管理员
	if (Jurisdiction == 5) {
		$("#ruyuanguanli").css("display", "");
		$("#rydj").css("display", "");
		$("#zycx").css("display", "");
		$("#bingfangguanli").css("display", "");
		$("#xzbf").css("display", "");
		$("#bfjgtz").css("display", "");
		$("#yaopinguanli").css("display", "");
		$("#yprk").css("display", "");
		$("#ypff").css("display", "");
		$("#tycl").css("display", "");
		$("#rkcx").css("display", "");
		$("#kccx").css("display", "");
		$("#jiesuanzhongxin").css("display", "");
		$("#fyyj").css("display", "");
		$("#jfjl").css("display", "");
		$("#fycx").css("display", "");
		$("#hulizhongxin").css("display", "");
		$("#lrtzsj").css("display", "");
		$("#tzsjcx").css("display", "");
		$("#zyls").css("display", "");
		$("#yyls").css("display", "");
		$("#chuyuanguanli").css("display", "");
		$("#cydj").css("display", "");
		$("#cycx").css("display", "");
		$("#zbfcl").css("display", "");
		$("#tongjizhongxin").css("display", "");
		$("#brtj").css("display", "");
		$("#bftj").css("display", "");
		$("#yonghuguanli").css("display", "");
		$("#yhzc").css("display", "");
		$("#yhcx").css("display", "");
		$("#yishengguanli").css("display", "");
		$("#yslr").css("display", "");
		$("#yscx").css("display", "");
		$("#canshushezhi").css("display", "");
		$("#cssz").css("display", "");
		$("#yxrz").css("display", "");
		$("#kesixinxi").css("display","");
		$("#ksxxck").css("display","");
		$("#zjxx").css("display","");
		$("#gangwei").text("[超级管理员]");
	}*/

	$.ajax({
		url : 'account/getUser.do',
		type : 'post',
		data : {},
		dataType : 'JSON',
		success : function(result) {
			if (result.state == 0) {
				var user = result.data;
				if (user == "" || user == null) {
					layer.alert("未登录");
				} else {
					$("#username").text(user.name);
					$("#id").text(user.id);
				}
			}
		}
	});
});
