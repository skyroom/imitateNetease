//header_con 部分的js
function headerCon()
{
	
	var lis=document.querySelectorAll("header .header_con>ul>li");
	
	for(var i=0;i<lis.length;i++)
	{
		lis[i].onmouseover=headerConPop;
		lis[i].onmouseout=headerConPop;
	}
	
	var divs=document.querySelectorAll("header .header_con>ul>li>div");
	for(i=0;i<divs.length;i++)
	{
		divs[i].onmouseover=keepHover;
		divs[i].onmouseout=keepHover;
	}
}
function headerConPop()
{
	var div=this.querySelector("div");
	if(div!=undefined)
	{
		var style=getComputedStyle(div);
		div.style.display=(style.display=="none"?"block":"none");
	}
}
function keepHover()
{
	var a=this.previousElementSibling;
	a.className=(a.className==""?"hover":"");
}

//aside的返回顶部
function asideGoTop()
{
	
	var li=document.querySelector("#aside li:first-child+li");
	li.onclick=function()
	{
		var DISTANCE=document.body.scrollTop;//总距离
		var STEPS=50;//100步完成移动
		var TIMES=500;//500毫秒完成移动
		var step=0;//当前移动的步数

		var distance=DISTANCE/STEPS;//每步移动的距离
		var interval=TIMES/STEPS;//每步移动的时间

		var timer=setInterval(function(){
			if(step==STEPS)
			{
				clearInterval(timer);
				timer=null;
			}else {
				step++;
				DISTANCE-=distance;
				window.scrollTo(0,DISTANCE);
			}
		},interval)
	};
}
function login()
{
	var uname=$('.register_index_pop input[type="text"]');
	var pwd=$('.register_index_pop input[type="password"]');
	var btn=$('.register_index_pop #login-btn');
	var p=$('.register_index_pop .login-error');
	btn.click(function(){
		if(uname.val()=="")
		{
			p.css("display",'block').html("邮箱不能为空");
		}else if(pwd.val()=="")
		{
			p.css("display",'block').html("密码不能为空");
		}else {
			$.post("php/login.php",{"uname":uname.val(),"pwd":pwd.val()},
				function(data)
				{
					if(data==='cz')
					{
						$('#register-free').html(uname.val()+'<i></i>');
						$('#login-box').removeClass('login-box').addClass('logined-box').addClass('login-box-news').html('<a>欢迎您，</a>');
						$('#register-ul').css('display','none');
						$('#user-ul').css('display','block');
					}else {
						p.css("display",'block').html("账号或者密码错误");
					}
				}
			)
		}
	});
	console.log(uname);
}
window.addEventListener("load",function(){
	headerCon();
	asideGoTop();
	login();
})
window.addEventListener("scroll",function(){
	var scrollTop=document.body.scrollTop;
	if(scrollTop>500)
	{
		aside.style.display="block";
	}else {
		aside.style.display="none";
	}
});