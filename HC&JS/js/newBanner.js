/*广告图片数组*/
var newsBannerImgs=[
    {"i":0,"img":"images/newsBanner/201604071103489bfe9.jpg","word":"武汉遭遇罕见大暴雨"},
    {"i":1,"img":"images/newsBanner/20160404091231f6123.jpg","word":"再不买就要被“税”了"},
    {"i":2,"img":"images/newsBanner/20160405095409867b9.jpg","word":"《看客》，公墓之困"},
    {"i":3,"img":"images/newsBanner/2016040508341896106.jpg","word":"美国加州签署15美元最低时薪法案"},
    {"i":4,"img":"images/newsBanner/20160405081109d13bc.jpg","word":"济南公墓垃圾堆积如山 清洁工每天背4千斤"},
];

var banner={
	LIWIDTH:600,//保存每个人li的宽度
	distance:0,//保存本次移动的总距离
	DUARTION:500,//保存本次移动的总时间
	STEPS:100,//保存本次移动的总步数
	moved:0,//保存本次已经移动的步数，控制移动结束
	step:0,//保存每步移动的距离
	INTERVAL:0,//保存每步移动的时间
	timer:0,
	ulImg:null,
	is:null,
	banner:null,
	ulWord:null,
	spans:null,
	WAIT:3000,
	canAuto:true,
	init:function()
	{
		this.INTERVAL=this.DUARTION/this.STEPS;
		this.ulImg=document.querySelector(".banner_ul");
		
		this.ulWord=document.querySelector(".word_con_ul");
		this.spans=document.querySelector(".banner_cy");
		this.updateView();
		//留住this
		var me=this;
		this.spans.addEventListener("mouseover",function(e)
		{
			e=e||window.event;
			if(e.target.nodeName=="I"&&e.target.className!="current")
			{
				var startI=document.querySelector(".banner_cy .current").dataset.num;
				var endI=e.target.dataset.num;
				for(var i=0;i<me.is.length;i++)
				{
					me.is[i].className="";
				}
				e.target.className="current";
				me.move(endI-startI);
			}
		});

		this.banner=document.querySelector(".banner");
		this.banner.addEventListener("mouseover",function(){
			me.canAuto=false;
		});
		this.banner.addEventListener("mouseout",function(){
			me.canAuto=true;
		});
		btnLeft.addEventListener("click",this.showLeft.bind(this));
		btnRight.addEventListener("click",this.showRight.bind(this));
		//启动自动轮播
		this.autoMove();
	},
	move:function(n)//将banner_ul左移或右移n个
	{
		if(this.timer!=null)//如果有动画正在运行，防止动画叠加
		{
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			this.ulImg.style.left="0px";
		}

		this.distance=n*this.LIWIDTH;
		this.step=this.distance/this.STEPS;

		if(n<0)//当n<0时，表示右移，提前调整数组内容
		{
			var dels=newsBannerImgs.splice(newsBannerImgs.length+n,-n);
			Array.prototype.unshift.apply(newsBannerImgs,dels);
			this.ulImg.style.left=this.LIWIDTH*n+"px";
			this.updateView();
		}

		this.timer=setTimeout(this.moveStep.bind(this,n),this.INTERVAL);
	},
	moveStep:function(n)//将banner_ul移动一步
	{
		var left=parseFloat(getComputedStyle(this.ulImg).left);
		this.ulImg.style.left=left-this.step+"px";
		this.moved++;
		if(this.moved<this.STEPS)
		{
			this.timer=setTimeout(this.moveStep.bind(this,n),this.INTERVAL);
		}else {
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			if(n>0)
			{
				var dels=newsBannerImgs.splice(0,n);
				Array.prototype.push.apply(newsBannerImgs,dels);//newsBannerImgs=newsBannerImgs.concat(dels);
				this.updateView();
				this.ulImg.style.left="0px";
			}
			//启动自动轮播
			this.autoMove();
		}
	},
	updateView:function()//将newsBannerImgs数组中的图片，更新到页面中，并更新对应的小点和文字
	{
		//遍历newsBannerImgs数组
		for(var i=0,strImg="",strWord="",strIdx="";i<newsBannerImgs.length;i++)
		{
			strImg+="<li><a href='#'><img src="+newsBannerImgs[i].img+"><div class='img_a_back'></div></a></li>";
			
			strIdx+="<i data-num="+i+"></i>";
		}
		this.ulImg.innerHTML=strImg;
		this.spans.innerHTML=strIdx;

		this.is=document.querySelectorAll(".banner_cy i");
		this.is[newsBannerImgs[0].i].className="current";
		strWord="<li><span>"+newsBannerImgs[0].word+"</span></li>";
		this.ulWord.innerHTML=strWord;
	},
	autoMove:function()
	{
		var me=this;//留住this
		//启动一个一次性定时器，传入任务函数move，提前绑定this，同时将n绑定为1，设定等待时间为WAIT
		this.timer=setTimeout(function(){
			if(me.canAuto){
				me.move(1);
			}
			else{
				me.autoMove();
			}
		},this.WAIT);
	},
	showLeft:function()
	{
		this.move(-1);
	},
	showRight:function()
	{
		this.move(1);
	}
}
banner.init();