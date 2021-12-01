$(function(){
	$('#switch_qlogin').click(function(){
		$('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_bottom').animate({left:'0px',width:'70px'});
		$('#qlogin').css('display','none');
		$('#web_qr_login').css('display','block');
		
		});
	$('#switch_login').click(function(){
		$('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_bottom').animate({left:'154px',width:'70px'});
		
		$('#qlogin').css('display','block');
		$('#web_qr_login').css('display','none');
		});
if(getParam("a")=='0')
{
	$('#switch_login').trigger('click');
}

	});
	
function logintab(){
	scrollTo(0);
	$('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
	$('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
	$('#switch_bottom').animate({left:'154px',width:'96px'});
	$('#qlogin').css('display','none');
	$('#web_qr_login').css('display','block');
	
}


//根据参数名获得该参数 pname等于想要的参数名 
function getParam(pname) { 
    var params = location.search.substr(1); // 获取参数 平且去掉？ 
    var ArrParam = params.split('&'); 
    if (ArrParam.length == 1) { 
        //只有一个参数的情况 
        return params.split('=')[1]; 
    } 
    else { 
         //多个参数参数的情况 
        for (var i = 0; i < ArrParam.length; i++) { 
            if (ArrParam[i].split('=')[0] == pname) { 
                return ArrParam[i].split('=')[1]; 
            } 
        } 
    } 
}  


var reMethod = "GET",
	pwdmin = 6;
/**
 * 检查身份证号是否未注册
 */
$(function () {
	$('#u').on('blur', checkCerificateNo).on('focus', function() {
		$('#userCue').empty();
	});
});
function checkCerificateNo(){
	var cerificateNo = $("#u").val();
	$.ajax({
		type : "POST",
		dataType : "json",
		url : "account/userQuery.do",
		data :{"id":cerificateNo},
		success : function(result) {
			var datas = result.data;
			if (cerificateNo!='superman'&&datas.length == 0) {
				$('#uerror').empty().append("该用户未注册");
			}
		}
	});

}

/**
 * 检查身份证是否已注册
 */
$(function () {
	$('#cerificateNo').on('blur', checkCerificate).on('focus', function() {
		$('#userCue').empty();
	});
})
function checkCerificate(){
	var cerificateNo = $("#cerificateNo").val();
	$.ajax({
		type : "POST",
		dataType : "json",
		url : "patient/patientQueryBycerificateNo.do",
		data :{"cerificateNo":cerificateNo},
		success : function(result) {
			var datas = result.data;
			if (datas.length != 0&&cerificateNo!="") {
				$('#userCue').empty().append("该用户已注册");
				document.getElementById("reg").setAttribute("disabled", true);//设置不可点击
				document.getElementById("reg").style.backgroundColor  = '#555555';//设置背景色
			}
		}
	});
}
$(document).ready(function() {
	$('#reg').click(function() {
		if ($('#cerificateNo').val() == "") {
			$('#cerificateNo').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×身份证号不能为空</b></font>");
			return false;
		}
		var cardId = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		if (!cardId.test($('#cerificateNo').val())) {
			$('#cerificateNo').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×身份证格式不正确</b></font>");
			return false;
		}
		if ($('#name').val() == "") {
			$('#name').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×用户名不能为空</b></font>");
			return false;
		}
		if ($('#name').val().length < 2 || $('#name').val().length > 16) {

			$('#name').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×用户名位2-16字符</b></font>");
			return false;
		}
		if ($('#contacts').val() == "") {
			$('#contacts').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×紧急联系人不能为空</b></font>");
			return false;
		}
		if ($('#contacts').val().length < 2 || $('#contacts').val().length > 6) {

			$('#contacts').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×紧急联系人为4-16字符</b></font>");
			return false;
		}
		var contactsPhone = $("#contactsPhone").val();
		if (contactsPhone == null || contactsPhone == "") {
			$('#contactsPhone').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×联系人电话不能为空</b></font>");
			return false;
		}
		var contactsPhoneNum = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
		if (!contactsPhoneNum.test(contactsPhone)) {
			$('#contactsPhone').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×联系人电话格式不正确</b></font>");
			return false;
		}
		var saveData = $("#regUser").serialize();
		$.ajax({
			type : "POST",
			dataType : "json",
			url : "patient/new_patient_Add.do",
			data : saveData,
			success : function(result) {
				if (result.state == 0) {
					alert("注册成功！,默认密码为123456，请及时修改！");
					parent.location.href="login.html";
				}
				window.location.reload();
			},
			error : function(result) {
				alert("注册失败，请重试");
			}

		});
	});
	

});
//登录按钮
function Login() {
	// 登录时进行校验
	var name = $("#u").val();
	var password = $("#p").val();
	var Verification = $("#Verification").val();// 获取验证码
	// 校验用户名是否为空
	if (name == "" || name == null) {
		$('#u').focus().css({
			border: "1px solid red",
			boxShadow: "0 0 2px red"
		});
		$('#uerror').html("<font color='red'><b>×用户名不能为空</b></font>");
		return false;
	}
	// 判断密码是否为空
	if (password == "" || password == null) {
		$('#p').focus().css({
			border: "1px solid red",
			boxShadow: "0 0 2px red"
		});
		$('#perror').html("<font color='red'><b>x密码不能为空</b></font>");
		return false;
	}
	// 判断验证码是否为空
	if (Verification == "" || Verification == null) {
		$('#Verification').focus().css({
			border: "1px solid red",
			boxShadow: "0 0 2px red"
		});
		$('#yerror').html("<font color='red'><b>验证码不能为空</b></font>");
		return false;
	}
	// 对用户输入的原密码进行MD5加密并转换为32位大写字母密文
	var md5pwd = (hex_md5(password)).toUpperCase();
	// 登陆提交请求
	$.ajax({
		url : 'account/login.do',
		type : 'POST',
		data : {
			'username' : name,
			'password' : md5pwd,
			'Verification' : Verification
		},
		dataType : 'JSON',
		success : function(result) {
			// result 就是服务器发送回来 的JsonResult对象
			// state 和 data属性是在sonResult中定义的Bean属性
			if (result.state == 0) {
				window.location.href = 'index.html';// 登陆成功，跳转用户主页
				return;
			}
			var field = result.state;
			if (field == 1) {
				// 显示用户名错误
				$('#uerror').empty().append(result.message);
			}
			if (field == 2) {
				// 显示密码错误
				$('#perror').empty().append(result.message);
			}
			if (field == 3) {
				// 验证码错误
				$("#yerror").empty().append(result.message);
			}
		}
	});
}
// 清空页面的提示信息（失去焦点的时候调用）
function cleanNerror() {
	$("#uerror").html("");
}

function cleanPerror() {
	$("#perror").html("");
}

function cleanYerror() {
	$("#yerror").html("");
}
function cleanCerror(){
	$("#userCue").html("");
}
function cleanUerror(){
	$("#userCue").html("");
}
function cleanCoerror(){
	$("#userCue").html("");
}
function cleanCPerror(){
	$("#userCue").html("");
}

// 回车登录
$(document).keydown(function(event) {
	if (event.keyCode == 13) {
		$("#login").click();
	}
});