/*
 * netease ADbox apply v1.0
 * Creation date: 2012/5/17
 * Modified date: xxxx/xxxx/xxxxx
*/

//婵炴惌鍠栭惇鎵涵鍛版澖
var dlBox = new Object();
var s = navigator.userAgent.toLowerCase().match(/msie (\d+)./);
dlBox.broswer =  s && s[1] < 7? 'ie6' : 'other';
dlBox.isShow = 0;

if(dlBox.broswer){
	
	/*************婵炴惌鍠栭惇浼寸嵁閸喗鍟為柟绗涘棭鏀�***********
	*/
	//闂佹澘绉堕悿鍡樼┍閳╁啩绱�
	//闂傚懎绻戝┃娼鑺ョ
	//閻犱緤绱曢悾缁樻姜椤旇姤绂岄柟顒€顭烽崳
	dlBox.num = 0;
	for(dlBox.i=1; dlBox.i<=3; dlBox.i++)
	{
		if(typeof(this["adInfoTempDL"]["lsSrc"+dlBox.i])!="undefined")
		{
			dlBox.num ++;
		}
	}
	dlBox.num2 = Math.floor(Math.random()*adInfoTempDL.loop)+1;

	if(dlBox.num < dlBox.num2)
	{
		dlBox.num2 = 0;
	}else
	{
		dlBox.num = Math.floor(Math.random()*dlBox.num)+1;
	}
	dlBox.top = (typeof(adInfoTempDL.top)=="undefined")?0:adInfoTempDL.top;

	dlBox.lsWidth = (typeof(adInfoTempDL.lsWidth)=="undefined")?20:adInfoTempDL.lsWidth;
	dlBox.lsHeight = (typeof(adInfoTempDL.lsHeight)=="undefined")?300:adInfoTempDL.lsHeight;
	dlBox.lsSrc = (typeof(this["adInfoTempDL"]["lsSrc"+dlBox.num])=="undefined")?"":(this["adInfoTempDL"]["lsSrc"+dlBox.num]);

	dlBox.rsWidth = (typeof(adInfoTempDL.rsWidth)=="undefined")?20:adInfoTempDL.rsWidth;
	dlBox.rsHeight = (typeof(adInfoTempDL.rsHeight)=="undefined")?300:adInfoTempDL.rsHeight;
	dlBox.rsSrc = (typeof(this["adInfoTempDL"]["rsSrc"+dlBox.num])=="undefined")?"":(this["adInfoTempDL"]["rsSrc"+dlBox.num]);

	dlBox.lbWidth = (typeof(adInfoTempDL.lbWidth)=="undefined")?110:adInfoTempDL.lbWidth;
	dlBox.lbHeight = (typeof(adInfoTempDL.lbHeight)=="undefined")?300:adInfoTempDL.lbHeight;
	dlBox.lbSrc = (typeof(this["adInfoTempDL"]["lbSrc"+dlBox.num])=="undefined")?"":(this["adInfoTempDL"]["lbSrc"+dlBox.num]);

	dlBox.rbWidth = (typeof(adInfoTempDL.rbWidth)=="undefined")?110:adInfoTempDL.rbWidth;
	dlBox.rbHeight = (typeof(adInfoTempDL.rbHeight)=="undefined")?300:adInfoTempDL.rbHeight;
	dlBox.rbSrc = (typeof(this["adInfoTempDL"]["rbSrc"+dlBox.num])=="undefined")?"":(this["adInfoTempDL"]["rbSrc"+dlBox.num]);

	dlBox.lgSrc = (typeof(this["adInfoTempDL"]["lgSrc"+dlBox.num])=="undefined")?"":(this["adInfoTempDL"]["lgSrc"+dlBox.num]);
	dlBox.rgSrc =(typeof(this["adInfoTempDL"]["rgSrc"+dlBox.num])=="undefined")?"":(this["adInfoTempDL"]["rgSrc"+dlBox.num]);

	dlBox.url = (typeof(this["adInfoTempDL"]["url"+dlBox.num])=="undefined")?"":(this["adInfoTempDL"]["url"+dlBox.num]);

	//iframe 鐟滆埇鍨圭槐锟犲箮閺囩喐鏉�
	dlBox.isIFrame=(typeof(this["adInfoTempDL"]["isIFrame"+dlBox.num])!="undefined" && this["adInfoTempDL"]["isIFrame"+dlBox.num]);
	dlBox.createElement = function()
	{		
		if(this.isWidth == 1)
		{
			dlBox.lbWidth = 120;
			dlBox.lbHeight = 400;
			dlBox.rbWidth = 120;
			dlBox.rbHeight = 400;
			dlBox.lbSrc = dlBox.lgSrc;
			dlBox.rbSrc = dlBox.rgSrc;

			//left great
			this.leftBigFlag = adBox.createDiv(this.lbWidth,this.lbHeight);
			this.leftBigFlag.style.zIndex = 9999;
			this.leftBigStr = '<div id="dllbFrame"></div><div id="dllbClickL" onclick="dlBox.getURL()"></div><div id="dllbClose"><img src="http://img1.126.net/channel7/js/couplet/x.png" height="18" width="18" border="0"/></div>';
			this.leftBigFlag.innerHTML = this.leftBigStr;
			this.replayFrameL = document.getElementById("dllbFrame");
			this.replayFrameL.innerHTML = dlBox.isIFrame ? '<iframe src="'+this.lbSrc+'" scrolling="no" border="0" width="'+this.lbWidth+'" height="'+this.lbHeight+'" style="border:0 none;overflow:hidden" ></iframe>':adBox.createSwf("dllbMovie",this.lbWidth,this.lbHeight,this.lbSrc);
			this.addCss(this.replayFrameL, 'width:100%; height:100%;');
			this.addCss(document.getElementById('dllbClickL'), 'width:100%; height:100%; background:#0CC; position:absolute; left:0; top:0; cursor:pointer; filter:alpha(opacity=0); opacity:0;');
			this.addCss(document.getElementById('dllbClose'), 'width:18px; height:18px;  position:absolute; left:0; top:0; cursor:pointer;');
			document.getElementById('dllbClose').onclick = function() {
				dlBox.action("sClose");
			}
			this.leftBigFlag.style.overflow = "hidden";

			//right great
			this.rightBigFlag = adBox.createDiv(this.rbWidth,this.rbHeight);
			this.rightBigFlag.style.zIndex = 9999;
			this.rightBigStr = '<div id="dlrbFrame"></div><div id="dlrbClickL" onclick="dlBox.getURL()"></div><div id="dlrbClose"><img src="http://img1.126.net/channel7/js/couplet/x.png" height="18" width="18" border="0"/></div>'
			this.rightBigFlag.innerHTML = this.rightBigStr;
			this.replayFrameL = document.getElementById("dlrbFrame");
			this.replayFrameL.innerHTML =dlBox.isIFrame ? '<iframe src="'+this.rbSrc+'" scrolling="no" border="0" width="'+this.rbWidth+'" height="'+this.rbHeight+'" style="border:0 none;overflow:hidden" ></iframe>': adBox.createSwf("dlrbMovie",this.rbWidth,this.rbHeight,this.rbSrc);
			this.addCss(this.replayFrameL, 'width:100%; height:100%;');
			this.addCss(document.getElementById('dlrbClickL'), 'width:100%; height:100%; background:#0CC; position:absolute; left:0; top:0; cursor:pointer; filter:alpha(opacity=0); opacity:0;');
			this.addCss(document.getElementById('dlrbClose'), 'width:18px; height:18px;  position:absolute; right:0; top:0; cursor:pointer;');
			document.getElementById('dlrbClose').onclick = function() {
				dlBox.action('sClose');
			}
			this.rightBigFlag.style.overflow = "hidden";

			//妤犵偛鐏濋幉锟犲冀閸ヮ亶鍞�
			this.left_ad = document.createElement('img');
			this.left_ad.src = "http://img2.126.net/ntesrich/2015/0902/duilian_left.png";
			this.left_ad.style.position = "absolute";
			this.left_ad.style.bottom = "0px";
			this.left_ad.style.left = "0px";
			this.leftBigFlag.appendChild(this.left_ad);

			this.right_ad = document.createElement('img');
			this.right_ad.src = "http://img2.126.net/ntesrich/2015/0902/duilian_right.png";
			this.right_ad.style.position = "absolute";
			this.right_ad.style.bottom = "0px";
			this.right_ad.style.right = "0px";
			this.rightBigFlag.appendChild(this.right_ad);



			if(this.url == "")
			{
				document.getElementById("dllbClickL").style.visibility  =  "hidden"; 
				document.getElementById("dlrbClickL").style.visibility  =  "hidden"; 
			}
		}else
		{
			//left small
			this.leftSmallFlag = adBox.createDiv(this.lsWidth,this.lsHeight);
			
			this.leftSmallStr = '<div id="dllsFrame"></div><div id="dllsClickL"></div>';
			this.leftSmallFlag.innerHTML = this.leftSmallStr;
			document.getElementById('dllsClickL').onmouseover = function() {
				dlBox.action('showB');
			}
			this.leftSmallFlag.style.zIndex = 9999;
			this.replayFrameL = document.getElementById("dllsFrame");
			this.replayFrameL.innerHTML = dlBox.isIFrame ? '<iframe src="'+this.lsSrc+'" scrolling="no" border="0" width="'+this.lsWidth+'" height="'+this.lsHeight+'" style="border:0 none;overflow:hidden" ></iframe>':"<img src="+this.lsSrc+">";
			this.leftSmallFlag.style.overflow = "hidden";
			this.addCss(this.replayFrameL, 'width:100%; height:100%;');
			this.addCss(document.getElementById('dllsClickL'), 'width:100%; height:100%; background:#0CC; position:absolute; left:0; top:0; cursor:pointer; filter:alpha(opacity=0); opacity:0;');


			//right small
			this.rightSmallFlag = adBox.createDiv(this.rsWidth,this.rsHeight);
			
			this.rightSmallStr = '<div id="dlrsFrame"></div><div id="dlrsClickL"></div>';
			this.rightSmallFlag.innerHTML = this.rightSmallStr;
			document.getElementById('dlrsClickL').onmouseover = function() {
				dlBox.action('showB');
			}
			this.rightSmallFlag.style.zIndex = 9999;
			this.replayFrameL = document.getElementById("dlrsFrame");
			this.replayFrameL.innerHTML =dlBox.isIFrame ? '<iframe src="'+this.rsSrc+'" scrolling="no" border="0" width="'+this.rsWidth+'" height="'+this.rsHeight+'" style="border:0 none;overflow:hidden" ></iframe>': adBox.createSwf("dlrsMovie",this.rsWidth,this.rsHeight,this.rsSrc);
			this.rightSmallFlag.style.overflow = "hidden";
			this.addCss(this.replayFrameL, 'width:100%; height:100%;');
			this.addCss(document.getElementById('dlrsClickL'), 'width:100%; height:100%; background:#0CC; position:absolute; left:0; top:0; cursor:pointer; filter:alpha(opacity=0); opacity:0;');
			
			//妤犵偛鐏濋幉锟犲冀閸ヮ亶鍞�
			this.left_ad = document.createElement('img');
			this.left_ad.src = "http://img2.126.net/ntesrich/2015/0902/duilian_left.png";
			this.left_ad.style.position = "absolute";
			this.left_ad.style.bottom = "0px";
			this.left_ad.style.left = "0px";
			this.leftSmallFlag.appendChild(this.left_ad);

			this.right_ad = document.createElement('img');
			this.right_ad.src = "http://img2.126.net/ntesrich/2015/0902/duilian_right.png";
			this.right_ad.style.position = "absolute";
			this.right_ad.style.bottom = "0px";
			this.right_ad.style.right = "0px";
			this.rightSmallFlag.appendChild(this.right_ad);

			//left big
			this.leftBigFlag = adBox.createDiv(this.lbWidth,this.lbHeight);
			
			this.leftBigStr = '<div id="dllbFrame"></div><div id="dllbClickL" onclick="dlBox.getURL()"></div>';
			this.leftBigFlag.innerHTML = this.leftBigStr;
			document.getElementById('dllbFrame').onmouseout = function(){
				dlBox.action('hideS');
			}
			document.getElementById('dllbClickL').onmouseout = function(){
				dlBox.action('hideS');
			}
			this.leftBigFlag.style.zIndex = 9999;
			this.replayFrameL = document.getElementById("dllbFrame");
			this.replayFrameL.innerHTML =dlBox.isIFrame ? '<iframe src="'+this.lbSrc+'" scrolling="no" border="0" width="'+this.lbWidth+'" height="'+this.lbHeight+'" style="border:0 none;overflow:hidden" ></iframe>': adBox.createSwf("dllbMovie",this.lbWidth,this.lbHeight,this.lbSrc);
			this.leftBigFlag.style.display = "none";
			this.leftBigFlag.style.overflow = "hidden";
			this.addCss(this.replayFrameL, 'width:100%; height:100%;');
			this.addCss(document.getElementById('dllbClickL'), 'width:100%; height:100%; background:#0CC; position:absolute; left:0; top:0; cursor:pointer; filter:alpha(opacity=0); opacity:0;');

			//right big
			this.rightBigFlag = adBox.createDiv(this.rbWidth,this.rbHeight);
			
			this.rightBigStr = '<div id="dlrbFrame"></div><div id="dlrbClickL" onclick="dlBox.getURL()"></div>';
			this.rightBigFlag.innerHTML = this.rightBigStr;
			document.getElementById('dlrbFrame').onmouseout = function(){
				dlBox.action('hideS');
			}
			document.getElementById('dlrbClickL').onmouseout = function(){
				dlBox.action('hideS');
			}
			this.rightBigFlag.style.zIndex = 9999;
			this.replayFrameL = document.getElementById("dlrbFrame");
			this.replayFrameL.innerHTML =dlBox.isIFrame ? '<iframe src="'+this.rbSrc+'" scrolling="no" border="0" width="'+this.rbWidth+'" height="'+this.rbHeight+'" style="border:0 none;overflow:hidden" ></iframe>': adBox.createSwf("dlrbMovie",this.rbWidth,this.rbHeight,this.rbSrc);
			this.rightBigFlag.style.display = "none";
			this.rightBigFlag.style.overflow = "hidden";
			this.addCss(this.replayFrameL, 'width:100%; height:100%;');
			this.addCss(document.getElementById('dlrbClickL'), 'width:100%; height:100%; background:#0CC; position:absolute; left:0; top:0; cursor:pointer; filter:alpha(opacity=0); opacity:0;');
			
			if(this.url == "")
			{
				document.getElementById("dllbClickL").style.visibility  =  "hidden"; 
				document.getElementById("dlrbClickL").style.visibility  =  "hidden"; 
			}
		}
	}
	//閻犱礁澧介悿鍡樻媴瀹ュ洨鏋�
	dlBox.reSetPosition = function()
	{

		if(adBox.getClientInfo("top") >= this.top)
		{	
 			if(this.broswer == "ie6")
			{
				this.leftBigFlag.style.position = "absolute";
				this.leftBigFlag.style.top = adBox.getClientInfo("top")  +"px";
				this.rightBigFlag.style.position = "absolute";
				this.rightBigFlag.style.top = adBox.getClientInfo("top") +"px";
			}else
			{
				this.leftBigFlag.style.position = "fixed";
				this.leftBigFlag.style.top = 55 +"px";
				this.rightBigFlag.style.position = "fixed";
				this.rightBigFlag.style.top = 55 +"px";
			}
		}else
		{
			this.leftBigFlag.style.position = "absolute";
			this.leftBigFlag.style.top = this.top +"px";
			this.rightBigFlag.style.position = "absolute";
			this.rightBigFlag.style.top = this.top +"px";
		}
		this.leftBigFlag.style.left = "0px";
		this.rightBigFlag.style.left = adBox.getClientInfo("width") -  dlBox.rbWidth + "px";

		
		//閻忓繐绻愰崹搴㈡綇閵娧冭姵閻忓繐绻愰顕€鎳曢敓
		if(this.isWidth == 0)
		{
			if(adBox.getClientInfo("top") >= this.top)
			{		
				if(this.broswer == "ie6")
				{
					this.leftSmallFlag.style.position = "absolute";
					this.leftSmallFlag.style.top = adBox.getClientInfo("top")  +"px";
					this.rightSmallFlag.style.position = "absolute";
					this.rightSmallFlag.style.top = adBox.getClientInfo("top") +"px";
				}else
				{
					this.leftSmallFlag.style.position = "fixed";
					this.leftSmallFlag.style.top = 55 +"px";
					this.rightSmallFlag.style.position = "fixed";
					this.rightSmallFlag.style.top = 55 +"px";
				}
			}else
			{
				this.leftSmallFlag.style.position = "absolute";
				this.leftSmallFlag.style.top = this.top +"px";
				this.rightSmallFlag.style.position = "absolute";
				this.rightSmallFlag.style.top = this.top +"px";
			}
			this.leftSmallFlag.style.left = "0px";
			this.rightSmallFlag.style.left = adBox.getClientInfo("width") -  dlBox.lsWidth + "px";
		}
	}
	//缂備焦鍨甸悾鐐鐎ｂ晜顐介悘蹇庢祰椤�
	dlBox.addEvent = function(obj, type, fn) {
		if(obj.addEventListener) {
			obj.addEventListener(type, function() {
				fn.call(dlBox);
			}, false);
		} else if(obj.attachEvent) {
			obj.attachEvent('on' + type, function() {
				fn.call(dlBox);
			});
		}
	}
	
	//濞存嚎鍊撶花
	dlBox.action = function(code)
	{
		if(code == "sClose")
		{
			this.leftBigFlag.style.display = "none";
			this.rightBigFlag.style.display = "none";
		}else if(code == "showB")
		{
			this.leftBigFlag.style.display = "block";
			this.rightBigFlag.style.display = "block";
		}else if(code == "hideS")
		{
			this.leftBigFlag.style.display = "none";
			this.rightBigFlag.style.display = "none";
		}
	}
	//闁瑰灚鎸哥槐鎴︽煣閻愵剙澶�
	dlBox.getURL = function()
	{
		window.open(this.url,"_blank");
	}
	//涓篋OM瀵硅薄娣诲姞css style
	dlBox.addCss = function(dom, str) {
		var css_before = dom.style.cssText.toLowerCase();
		if(!(css_before.length > 0 && css_before.indexOf(';', css_before.length-1) == 1)) {
			dom.style.cssText = css_before + ';' + str;
			
		} else {
			dom.style.cssText = css_before + str;
		}
	}
	//缂備胶鍘ч幃搴ｆ嫬閸愵亝鏆�
	dlBox.go = function()
	{
		if(dlBox.isShow == 0)
		{
			if(dlBox.num2 != 0)
			{
				//闁告帇鍊栭弻鍥礆閸℃岸鍝洪柣婊愭嫹
				if(adBox.getClientInfo("width") >= 1280)
				{
					this.isWidth = 1;
				}else
				{
					this.isWidth = 0;
				}

				//闁汇垻鍠愰崹姘跺礂閸愵亞顦�
				this.createElement();
				//閻犱礁澧介悿鍡樻媴瀹ュ洨鏋�
				this.reSetPosition();
				//缂備焦鍨甸悾绶峞size闁告粌顔抍roll濞存粌顑勫▎
				dlBox.addEvent(window, "resize", dlBox.reSetPosition);
				dlBox.addEvent(window, "scroll", dlBox.reSetPosition);
			}
			dlBox.isShow = 1;
		}
	}
	//dlBox.go();
	//闁圭瑳鍡╂斀缂備焦鎸诲
	/***************缂備焦鎸诲**************/
}