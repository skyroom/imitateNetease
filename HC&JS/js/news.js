//百度推广广告的轮放
var bdAnimate={
	word:["香云纱连衣裙","UI界面设计","攻城掠地","html5程序设计","html5培训","python培训","网络会议视频","丝绸连衣裙"],
	DISTANCE:23,//保存总距离
	STEPS:10,//保存总步数
	INTERVALS:100,//保存总时间

	distance:0,//保存每步移动的距离
	interval:0,//保存每步移动的时间

	timer:null,//保存ul移动动画的序号
	nextTimer:null,//保存选中下一个的动画的序号
	showImgTimer:null,

	moved:0,//保存已经走了几步

	ul:null,//保存需要移动的ul元素
	span:null,//保存放文字的span元素
	img:null,//保存大图
	lis:null,

	direction:-1,//保存ul移动的方向

	liIndex:1,//当前选中的li的下标

	init:function(){
		this.lis=document.querySelectorAll("#bdUl li");

		this.ul=document.getElementById('bdUl');
        
        var imgs=document.querySelectorAll("#bdUl li img");
		for(var i=0;i<imgs.length;i++)
		{
			imgs[i].onmouseover=this.liOver.bind(this);
			imgs[i].onmouseout=this.liOut.bind(this);
		}        
		this.span=document.getElementById('bdWord');

		this.img=document.getElementById('bdBigImg');
		this.img.onmouseover=this.imgOver.bind(this);
		this.img.onmouseout=this.imgOut.bind(this);

		this.distance=this.DISTANCE/this.STEPS;
		this.interval=this.INTERVALS/this.STEPS;
		this.autoMove();
	},
	move:function(){
		this.timer=setTimeout(this.moveStep.bind(this),this.interval);
	},
	moveStep:function(){
		this.moved++;
		var style=getComputedStyle(this.ul);
		var d=parseFloat(style.left);
		d+=this.direction*this.distance;
		this.ul.style.left=d+"px";
		if(this.moved<this.STEPS)
		{
			this.timer=setTimeout(this.moveStep.bind(this),this.interval);
		}else {
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			if(this.direction==-1)
			{
				this.direction=1;
			}else {
				this.direction=-1;
			}

		}
	},
	autoMove:function(){//显示下一张
		var me=this;
		this.nextTimer=setTimeout(function(){
			for(var i=0;i<me.lis.length;i++)//清除所有的li的class
			{
				me.lis[i].className="";
			}

			if(me.liIndex==me.lis.length-1)//7
			{
				if(me.ul.style.left!="-23px")
				{
					me.move();
				}
			}

			if(me.liIndex==0)//0
			{
				me.move();
			}

			me.lis[me.liIndex].className="current";
			
			me.span.innerHTML=me.word[me.liIndex];
			me.img.style.opacity=0;//初始化img的opacity为0
			me.img.src=me.lis[me.liIndex].firstElementChild.src;
			me.showImg();

			me.liIndex++;//加1表示显示下一张图片
			me.liIndex%=me.lis.length;
			
			me.autoMove();
		},2000);
	},
	showImg:function(){//让图片的opcity慢慢变大
		var op=0;
		var me=this;
		if(me.showImgTimer===null)
		{
			me.showImgTimer=setInterval(function(){
				op+=0.2;
				me.img.style.opacity=op;
				if(op==1)
				{
					clearInterval(me.showImgTimer);
					me.showImgTimer=null;
				}
			},80);
		}
	},
	liOver:function(){
		var li=event.target.parentNode;
		var style=getComputedStyle(this.ul);

		for(var i=0;i<this.lis.length;i++)
		{
			this.lis[i].className="";
			if(this.lis[i].firstElementChild.src==li.firstElementChild.src)//利用src属性获得mouseover的li的liIndex
			{
				this.liIndex=i;
			}
		}
		
		if(this.liIndex==this.lis.length-1)//如果liIndex等于7并且ul的left等于0，则表示可以move
		{
			if(style.left=="0px")
			{
				this.move();
			}
		}

		if(this.liIndex==0)//如果liIndex等于0并且ul的left等于-23，则表示可以move
		{
			if(style.left=="-23px")
			{
				this.move();
			}
		}
		clearTimeout(this.nextTimer);
		this.nextTimer=null;

		li.className="current";

		if(this.span.innerHTML!=this.word[this.liIndex])//如果滑上去的li和当前liIndex的li不是同一个
		{
			this.span.innerHTML=this.word[this.liIndex];
			this.img.src=this.lis[this.liIndex].firstElementChild.src;

			this.showImg();
		}
	},
	liOut:function(){//鼠标滑出后开启总动轮播
		this.liIndex++;
		if(!this.nextTimer)
		{
			this.autoMove();
		}
	},
	imgOver:function(){
		clearTimeout(this.nextTimer);
		this.nextTimer=null;
	},
	imgOut:function(){
		this.autoMove();
	}
}
bdAnimate.init();
