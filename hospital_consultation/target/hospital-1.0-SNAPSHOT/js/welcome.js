$(function () {
    showDate();
    $.ajax({
        url : 'account/getUser.do',
        type : 'post',
        data : {},
        dataType : 'JSON',
        success : function(result) {
            if (result.state == 0) {
                var user = result.data;
                if (user == "" || user == null) {
                    alert("未登录");
                } else {
                    $("#name").text(user.name);
                    $("#id").val(user.id);
                }
            }
        }
    });

})
// 获取当前时间
function showDate() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getYear() + 1900;
    var mytime = today.toLocaleTimeString();
    var date = year + "-" + month + "-" + day + " " + mytime;
    document.getElementById("date").innerText = date;
}
$(function () {
    //获取img
    var img = document.querySelectorAll("img");//通过选择器，获取img
    var li = document.querySelectorAll(".ul li");
    var div = document.querySelectorAll('.top div');
    // console.log(img);
    var index = 0;//定义一个初始值为0的变量
    function scrol() {

    //使用display实现
        	//隐藏
       	for(var i=0;i<img.length;i++){
       	    //设置让三个隐藏，一个显示
            	img[i].style.display = "none";//把所有的img隐藏
                li[i].style.backgroundColor =""; //分页颜色全都不显示
       	}
                img[index].style.display = "block";//让一个显示
        	    li[index].style.backgroundColor = "red";//一个分页显示颜色
                index++;//自增
         if(index==div.length){
                 index=0;
        	}
    }
    var timer = setInterval(scrol,2000);//设置定时器
    function mOver(index){//设置鼠标移动在分页上的函数
        clearInterval(timer);//清除定时器
        for(var i=0;i<div.length;i++){//循环实现分页颜色的变化
            div[i].style.zIndex ="1";//让所有图片隐藏
            li[i].style.backgroundColor =""; //分页颜色失效
        }
        div[index].style.zIndex = "9";//当前选中分页显示
    }
    function mOut(){//鼠标移出让它继续轮播
        timer = setInterval(scrol,500);
    }
    for(var i =0;i<div.length;i++){
        li[i].onmouseover = function(){
            mOver(i);
        }
        li[i].onmouseout = function(){
            mOut(i);
        }
    }
})