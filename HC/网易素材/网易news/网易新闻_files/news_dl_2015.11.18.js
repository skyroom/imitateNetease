document.write('<style type="text/css">');
document.write('#tcldivtf1b {position: absolute; top: '+coupletTop+'px; left:0;visibility:hidden;z-index:1001}');
document.write('#tcldivtf2b {position: absolute; top: '+coupletTop+'px; right: 0;visibility:hidden;z-index:1001}');
document.write('#duilian-ad-left {position: absolute; bottom: 0; left: 0;}');
document.write('#duilian-ad-right {position: absolute; bottom: 0; right: 0;}');
document.write('#shutBtn1 {position: absolute; top: '+(coupletTop-18)+'px;left:0px;z-index:1001;cursor:pointer;}');
document.write('#shutBtn2 {position: absolute; top: '+(coupletTop-18)+'px;right:0px;z-index:1001;cursor:pointer;}');
document.write('</style>');
function closecouplet(){
    var ww;
    if (window.innerWidth){
        ww = window.innerWidth;
    }
    else if((document.body) && (document.body.clientWidth)){
        ww = document.body.clientWidth;
    }
    if (document.documentElement  && document.documentElement.clientWidth){
        ww = document.documentElement.clientWidth;
    }
    if(window.screen.width<1440){
        return true;
    }else{
        return false;
    }
}
    var isclosecouplet=closecouplet();
    if (window.screen.width>=1024){
        var coupletHeight = 300;
        var coupletWidth = 20;
//	var coupletTop = 146;
        var coupletNow = new Date();
        var coupletAdId = coupletLeftUrl + coupletNow.toDateString();
        document.write('<div id="tcldivtf1"><div id="coupletLeft" ><a href="'+coupletLeftHref+'" target="_blank"><img src="'+coupletLeftUrl+'" width="'+coupletWidth+'" height="'+coupletHeight+'" style="position:absolute;top:'+ coupletTop + 'px;left:0;z-index:10; border:0px" /></a></div><div id="tcldivtf1b" style="height:'+coupletHeight+'px;"><embed src='+coupletLeftUrlb+' quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="110" height="300" wmode=opaque></embed><a href="'+coupletLeftHref+'" target="_blank" class="cover" style="position:absolute;top:0;left:0;cursor:pointer;width:100%;height:100%; z-index:10;background:url(about:blank);"></a><img id="duilian-ad-left" src="http://img2.126.net/ntesrich/2015/0902/duilian_left.png"></div></div>');
        document.write('<div id="tcldivtf2"><div id="coupletRight" ><a href="'+coupletRightHref+'" target="_blank"><img src="'+coupletRightUrl+'" width="'+coupletWidth+'" height="'+coupletHeight+'" style="position:absolute;top:'+ coupletTop + 'px;right:0;z-index:10; border:0px" /></a></div><div id="tcldivtf2b" style="height:'+coupletHeight+'px;"><embed src='+coupletRightUrlb+' quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="110" height="300" wmode=opaque></embed><a href="'+coupletRightHref+'" target="_blank" class="cover" style="position:absolute;top:0;left:0;cursor:pointer;width:100%;height:100%; z-index:10;background:url(about:blank);"></a><img id="duilian-ad-right" src="http://img2.126.net/ntesrich/2015/0902/duilian_right.png"></div></div>');

        //document.getElementById('coupletLeft').style.visibility = "hidden";
        //document.getElementById('coupletRight').style.visibility = "hidden";
        if (document.all){
            document.write('<script type="text/javascript" for="coupletLeft" event="FSCommand(command,args)">');
            document.write('coupletLeft_DoFSCommand(command,args)');
            document.write('<\/script>');
            document.write('<script type="text/javascript" for="coupletRight" event="FSCommand(command,args)">');
            document.write('coupletLeft_DoFSCommand(command,args)');
            document.write('<\/script>');
        }
        function coupletLeft_DoFSCommand(command,args){
            if (command == "quit"){
                document.getElementById('coupletLeft').style.visibility = "hidden";
                document.getElementById('coupletRight').style.visibility = "hidden";
            }
        }
        function coupletRight_DoFSCommand(command,args){
            coupletLeft_DoFSCommand(command,args);
        }
//var topFloatAdWidth = 750;
//var topFloatAdHeight = 500;
        var oTcldivtf1 = document.getElementById('tcldivtf1');
        var oTcldivtf2 = document.getElementById('tcldivtf2');
        var oTcldivtf1b = document.getElementById('tcldivtf1b');
        var oTcldivtf2b = document.getElementById('tcldivtf2b');
        (function(){
            var xx=document.createElement("a");
            xx.id="shutBtn1";
            xx.innerHTML='<img src="http://img1.126.net/channel7/js/couplet/x.png">';
            document.body.appendChild(xx);
            var yy=document.createElement("a");
            yy.id="shutBtn2";
            yy.innerHTML='<img src="http://img1.126.net/channel7/js/couplet/x.png">';
            document.body.appendChild(yy);
        })();
        var oShut1=document.getElementById("shutBtn1");
        var oShut2=document.getElementById("shutBtn2");
        oShut1.onclick=function(){
            oTcldivtf1.style.display="none";
            oTcldivtf2.style.display="none";
            oShut1.style.display="none";
            oShut2.style.display="none"
        };
        oShut2.onclick=function(){
            oTcldivtf1.style.display="none";
            oTcldivtf2.style.display="none";
            oShut1.style.display="none";
            oShut2.style.display="none"
        };
        var userAgent = navigator.userAgent;
        //if(userAgent.indexOf('MSIE')>-1 && userAgent.indexOf('Opera')<0){ oTcldivtf1b.style.visibility='hidden';}
        oTcldivtf1.onmouseover  = function(){oTcldivtf1b.style.visibility='visible';oTcldivtf2b.style.visibility='visible';}
        oTcldivtf1.onmouseout  = function(){oTcldivtf1b.style.visibility='hidden';oTcldivtf2b.style.visibility='hidden';}
        oTcldivtf2.onmouseover  = function(){oTcldivtf1b.style.visibility='visible';oTcldivtf2b.style.visibility='visible';}
        oTcldivtf2.onmouseout  = function(){oTcldivtf1b.style.visibility='hidden';oTcldivtf2b.style.visibility='hidden';}
        if(!isclosecouplet){
            oTcldivtf1b.style.visibility='visible';
            oTcldivtf2b.style.visibility='visible';
            oShut1.style.display="none";
            oShut2.style.display="none";
        }
    }