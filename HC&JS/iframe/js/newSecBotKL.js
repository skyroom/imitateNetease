var source=[
		{"sale":49.9,"scj":99.9,"intro":"伊瓜苏 传统炎魔咖啡粉 500克","src":"images/ef61946a2a4948d7961f3f98292028e2.jpg"},
		{"sale":499,"scj":999,"intro":"中腰极修 身破洞牛仔裤","src":"images/086e578cabe74945af4b53cfbb53849f.jpg"},
		{"sale":1299,"scj":2700,"intro":"女士双肩 背包 绿色","src":"images/a7aa74788f4a489f9209a45f20008669.jpg"}];
function KLShopLB(iIndex,ul,div)
{
	this.iIndex=iIndex;
	this.ul=document.getElementById(ul);
	this.lis=this.ul.getElementsByTagName("li");
	this.div=document.getElementById(div);
	
	this.autoMove=function(){
		//让li获得current
		for(var i=0;i<this.lis.length;i++)
		{
			this.lis[i].className="";
		}
				
		this.lis[(++this.iIndex)%3].className="current";

		//更换图片及文字
		var img=this.div.getElementsByTagName("img")[0];
		var str=img.src;
		i=str.indexOf("images");
		img.src=str.slice(0,i)+source[this.iIndex%3].src;

		var b=this.div.getElementsByTagName("b")[0];
		b.innerHTML=source[this.iIndex%3].sale;

		var s=this.div.getElementsByTagName("s")[1];
		s.innerHTML="¥&nbsp;"+source[this.iIndex%3].scj+"&nbsp;";

		var ielem=this.div.getElementsByTagName("i")[1];
		ielem.innerHTML=source[this.iIndex%3].intro;
	};
	this.timer=setInterval(this.autoMove.bind(this),1000);

	this.clear=function(e)
	{
		e=e||window.event;
		var target=e.target;
		if(target.nodeName=="A")
		{
			target=target.parentNode;
		}
		if(target.nodeName=="LI")
		{
			this.iIndex=target.dataset.num;
				
			if(this.timer)//当鼠标进入时
			{
				clearInterval(this.timer);
				this.timer=null;
				for(var i=0;i<this.lis.length;i++)
				{
					this.lis[i].className="";
				}
					
				if(target.nodeName=="LI")
				{
					target.className="current";
				}
				//更换图片及文字
				var img=this.div.getElementsByTagName("img")[0];
				var str=img.src;
				i=str.indexOf("images");
				img.src=str.slice(0,i)+source[this.iIndex].src;

				var b=this.div.getElementsByTagName("b")[0];
				b.innerHTML=source[this.iIndex%3].sale;

				var s=this.div.getElementsByTagName("s")[1];
				s.innerHTML="¥&nbsp;"+source[this.iIndex].scj+"&nbsp;";

				var ielem=this.div.getElementsByTagName("i")[1];
				ielem.innerHTML=source[this.iIndex].intro;

			}else {
				this.timer=setInterval(this.autoMove.bind(this),1000);
			}
		}
	};
	this.ul.addEventListener("mouseover",this.clear.bind(this));//当鼠标移入时，停止自动轮播，并根据li更换图片和文字
	this.ul.addEventListener("mouseout",this.clear.bind(this));//当鼠标移出时，开启自动轮播

	this.clearDiv=function()
	{
			if(this.timer)
			{
				clearInterval(this.timer);
				this.timer=null;
			}else{
				this.timer=setInterval(this.autoMove.bind(this),1000);
			}
	}
	this.div.addEventListener("mouseover",this.clearDiv.bind(this));//当鼠标移入时，停止自动轮播
	this.div.addEventListener("mouseout",this.clearDiv.bind(this));//当鼠标移出时，开启自动轮播
}
var KLShopLBOne=new KLShopLB(-1,"ul1","div1");//iIndex,ul,div
var KLShopLBTwo=new KLShopLB(0,"ul2","div2");//iIndex,ul,div
var KLShopLBThree=new KLShopLB(1,"ul3","div3");//iIndex,ul,div

function showEm()
{
	var timer=setInterval(sm,500);
	var count=1;
	function sm()
	{
		var em=secBotKL_con.getElementsByTagName("em");
		if(count++%2)
		{
			for(var i=0;i<em.length;i++)
			{
				em[i].style.backgroundColor="#1E72EF";
			}
		}
		else {
			for(var i=0;i<em.length;i++)
			{
				em[i].style.backgroundColor="#F3003F";
			}
		}
	}
}
showEm();