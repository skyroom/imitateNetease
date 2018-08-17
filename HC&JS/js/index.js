var indBanner={
	wordObj:[
				{'wz':'王思聪唯一公开的女友露肩秀舞技','img':'images/indexBanner/1.jpg'},
				{'wz':'花样秀性感！美女劈腿逆天好身材','img':'images/indexBanner/2.jpg'},
				{'wz':'读懂房价暴涨心理别被这几个错误买房观坑惨','img':'images/indexBanner/3.jpg'},
				{'wz':'咋回事?荷兰"最强大脑"与高圆圆米兰看展','img':'images/indexBanner/4.jpg'},
				{'wz':'就要大!3万元自主车配巨屏 特斯拉哭晕','img':'images/indexBanner/5.jpg'},
				{'wz':'警察也无语!高速车祸 女子弃车先回家吃饭','img':'images/indexBanner/6.jpg'}
			],
	DISTANCE:310,
	INTETVAL:300,
	STEPS:50,

	interval:0,//每一步的时间间隔
	distance:0,//每一步的步长
	moved:0,//保存已经走了的步数

	iTimer:null,//保存i元素轮播的序号
	ulTimer:null,//保存ul动画的序号

	is:null,
	iIndex:0,//保存当前显示的图片的index
	next:1,//保存下一张显示的图片的index
	ul:null,
	banner:null,
	direction:1,//保存移动的方向

	canAuto:true,

	spanLeft:null,
	spanRight:null,

	init:function(){
		this.is=document.querySelectorAll("#ban-foot>i");
		for(var i=0;i<this.is.length;i++)
		{
			this.is[i].onclick=this.iClick.bind(this);
			this.is[i].onmouseover=this.stopAutoMove.bind(this);
			this.is[i].onmouseout=this.startAutoMove.bind(this);
		}
		this.ul=document.querySelector("#index-banner ul");
		this.banner=document.querySelector("#index-banner")

		var imgs=document.querySelectorAll("#index-banner ul li a p img");
		for(var i=0;i<imgs.length;i++)
		{
			imgs[i].onmouseover=this.stopAutoMove.bind(this);
			imgs[i].onmouseout=this.startAutoMove.bind(this);
		}

		this.is[this.iIndex].className="current";//初始化要显示的i

		this.interval=this.INTETVAL/this.STEPS;
		this.distance=this.DISTANCE/this.STEPS;

		this.spanLeft=document.getElementById('ban-foot-left');
		this.spanLeft.onclick=this.spanLeftClick.bind(this);

		this.spanRight=document.getElementById('ban-foot-right');
		this.spanRight.onclick=this.spanRightClick.bind(this);

		this.createUl();

		this.autoMove();
	},
	move:function(){
		clearTimeout(this.iTimer);
		this.iTimer=null;

		this.ulTimer=setTimeout(this.moveStep.bind(this),this.interval);
	},
	moveStep:function(){
		var style=getComputedStyle(this.ul);
		this.ul.style.left=parseFloat(style.left)-this.distance*this.direction+"px";
		this.moved++;
		if(this.moved>=this.STEPS)
		{
			clearTimeout(this.ulTimer);

			this.ulTimer=null;
			this.moved=0;

			this.createUl();

			if(this.canAuto)//如果不是自动轮播时的move。就不允许执行autoMove
			{
				this.autoMove();
			}
		}else {
			this.ulTimer=setTimeout(this.moveStep.bind(this),this.interval);
		}
	},
	autoMove:function(){
		var me=this;
		this.iTimer=setTimeout(function(){
			if(me.canAuto)
			{	
				me.showI();
				me.move();
			}	
		},2000);
	},
	showI:function(){//给下一个要显示的i添加“current”
		this.clearClass();

		if(this.iIndex+1>=this.is.length)
		{
			this.is[0].className="current";
		}else {
			this.is[this.iIndex+1].className="current";
		}

		this.iIndex++;
		this.iIndex%=this.is.length;

		this.next=this.iIndex+1;
		this.next%=this.is.length;
	},
	createUl:function(){//自动轮播时创建ul
		this.ul.style.left="0px";
		var img=this.ul.getElementsByTagName('img');
		img[0].src=this.wordObj[this.iIndex].img;
		img[1].src=this.wordObj[this.next].img;

		var bs=this.ul.getElementsByTagName('b');
		bs[0].innerHTML=this.wordObj[this.iIndex].wz;
		bs[1].innerHTML=this.wordObj[this.next].wz;

		this.direction=1;

	},
	createUlOnclick:function(i){//点击时创建ul
		if(this.iIndex<this.next)
		{
			this.ul.style.left="0px";

			var img=this.ul.getElementsByTagName('img');
			img[0].src=this.wordObj[this.iIndex].img;
			img[1].src=this.wordObj[this.next].img;

			var bs=this.ul.getElementsByTagName('b');
			bs[0].innerHTML=this.wordObj[this.iIndex].wz;
			bs[1].innerHTML=this.wordObj[this.next].wz;
			
			this.direction=1;
		}
		else if(this.iIndex>this.next)
		{
			var img=this.ul.getElementsByTagName('img');
			img[0].src=this.wordObj[this.next].img;
			img[1].src=this.wordObj[this.iIndex].img;

			var bs=this.ul.getElementsByTagName('b');
			bs[0].innerHTML=this.wordObj[this.next].wz;
			bs[1].innerHTML=this.wordObj[this.iIndex].wz;

			this.ul.style.left="-310px";
			this.direction=-1;
		}
		this.iIndex=i;
	},
	stopAutoMove:function(){//当img、i鼠标滑入的时候停止自动轮播。
		this.canAuto=false;

		this.clearClass();

		this.is[this.iIndex].className="stop";
		
	},
	startAutoMove:function(){//当img、i鼠标滑出的时候启动自动轮播。
		if(this.ulTimer==null)//如果ul正在移动就什么都不做。
		{
			clearTimeout(this.iTimer);
			this.iTimer=null;

			this.canAuto=true;
			this.is[this.iIndex].className="current";

			this.next=this.iIndex+1;
			this.next%=this.is.length;
			this.createUl();
				
			this.autoMove();
		}
		/*else {
			this.canAuto=true;
			this.autoMove();
		}*/
	},
	iClick:function(){
		var iElem=event.target;
		if(parseInt(iElem.dataset.num)!=this.iIndex/*&&this.ulTimer==null*/)
		{
			this.clearClass();
			
			iElem.className="stop";

			this.next=parseInt(iElem.dataset.num);
			this.createUlOnclick(this.next);
			
			this.move();
		}
	},
	spanLeftClick:function(){
		this.clearClass();
		this.next=this.iIndex-1;
		if(this.next<0)
		{
			this.next+=this.is.length;
		}
		
		var img=this.ul.getElementsByTagName('img');
		img[0].src=this.wordObj[this.next].img;
		img[1].src=this.wordObj[this.iIndex].img;

		var bs=this.ul.getElementsByTagName('b');
		bs[0].innerHTML=this.wordObj[this.next].wz;
		bs[1].innerHTML=this.wordObj[this.iIndex].wz;

		this.ul.style.left="-310px";
		this.direction=-1;
		this.iIndex=this.next;
		this.is[this.iIndex].className="stop";

		this.move();
	},
	spanRightClick:function(){
		this.clearClass();
		this.next=this.iIndex+1;
		if(this.next>=this.is.length)
		{
			this.next%=this.is.length;
		}

		this.createUl();//以下三句话表示当点击右边按钮是，先准备好ul、i的内容和样式 
		this.iIndex=this.next;//每移动之前更改iIndex
		this.is[this.iIndex].className="stop";

		this.move();
	},
	clearClass:function(){//清除i的class
		for(var i in this.is)
		{
			this.is[i].className="";
		}
	}
}
indBanner.init();