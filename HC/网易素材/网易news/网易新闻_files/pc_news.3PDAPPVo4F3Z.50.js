!function(e){e.fn.one=function(n,t){this.each(function(){var i=e(this),o=function(e){t.call(i[0],e),i.unbind(n,o)};i.bind(n,o)})}}(NE),function(e){e.fn.tabs=function(){this.each(function(){function n(){a==l?a=0:-1==a&&(a=l-1),o.removeClass("current"),e(o[a]).addClass("current"),s.addClass("none"),e(s[a]).removeClass("none")}var t,i,o,s,l,c=e(this),a=0;t=e(".UI_TABS_NAV",c),i=e(".UI_TABS_CON",c),o=e(t[0].children),s=e(i[0].children),l=o.length,o.each(function(t){e(this).bind("mouseover",function(){a=t,n()})}),e.fn.swipe&&(c.swipeLeft(function(){a--,n()}),c.swipeRight(function(){a++,n()}))})}}(NE),function(e){function n(e,n,t,i){return e/=i,e--,t*(e*e*e+1)+n}e.fn.gallery=function(){this.each(function(){new Gallery(this)})},Gallery=function(n){function t(){clearTimeout(i),v=!1,i=setTimeout(function(){v=!0},2e3)}var i,o,s,l,c,a,r,u,d,f,h=this,m="",p="",v=!0;$ga=e(n),s=e(".UI_GALLERY_CON",n),a=e(".UI_GALLERY_NEXT",n),c=e(".UI_GALLERY_PREV",n),r=e(".UI_GALLERY_NAV",n),u=e(".UI_GALLERY_SUB",n),l=e(s[0].children),o=0,l.each(function(e){1==this.nodeType&&(o++,m+="<li></li>",p+="<li>"+this.getElementsByTagName("img")[0].getAttribute("title")+"</li>")}),s.append(l[0].cloneNode(!0)),a.bind("click",function(e){h.indexTo(h.cur+1)}),c.bind("click",function(e){h.indexTo(h.cur-1)}),r.html(m),u.html(p),d=e(r[0].children),f=e(u[0].children),d.each(function(n){e(this).bind("mouseover",function(){h.indexTo(n)})}),e.fn.swipe&&($ga.swipeLeft(function(){h.indexTo(h.cur+1),t()}),$ga.swipeRight(function(){h.indexTo(h.cur-1),t()})),h.cur=0,h.len=o,h.el=n,h.$con=s,h.$item=l,h.$navList=d,h.$subList=f,h.indexTo(0),$ga.bind("mouseover",function(){clearTimeout(i),v=!1}),$ga.bind("mouseout",function(){i=setTimeout(function(){v=!0},2e3)}),setInterval(function(){v&&h.indexTo(h.cur+1)},8e3)},Gallery.prototype.indexTo=function(t){var i,o,s,l,c=this,a=parseInt(c.el.clientWidth),r=-t*a,u=c.$con,d=c.$item,f=c.$navList,h=c.$subList;u[0].style.left=-c.cur*a+"px",t==c.len?t=0:-1==t&&(t=c.len-1,r=-t*a,u[0].style.left=-c.len*a+"px"),c.cur=t,c.timer&&clearTimeout(c.timer),d.removeClass("current"),f.removeClass("current"),h.removeClass("current"),e(d[t]).addClass("current"),e(h[t]).addClass("current"),e(f[t]).addClass("current"),i=parseInt(u.css("left")),o=r-i,s=20,l=0,function(){return u[0].style.left=n(l,i,o,s)+"px",s>l?(l++,void(c.timer=setTimeout(arguments.callee,20))):(u[0].style.left=r+"px",!1)}()}}(NE),function(e){function n(e,n){return e.replace(/\{([^}]+)\}/g,function(e,t){return n[t]?n[t]:""})}function t(e,n){return 2==n?0==e%4&&0!=e%100||0==e%400?29:28:o[n]}var o=[31,28,31,30,31,30,31,31,30,31,30,31],s=new Date,l=s.getFullYear(),c=s.getMonth(),a=s.getDate();e.fn.calendar=function(e){this.each(function(){new r(this,e)})};var r=function(n,t){var i=this;i.link=t,i.$con=e(".UI_CALENDAR_CON",n),i.$next=e(".UI_CALENDAR_NEXT",n),i.$prev=e(".UI_CALENDAR_PREV",n),i.$year=e(".UI_CALENDAR_YEAR",n),i.$month=e(".UI_CALENDAR_MONTH",n),i.$next.bind("click",function(e){i.next()}),i.$prev.bind("click",function(e){i.prev()}),i.draw(l,c)};r.prototype.next=function(){var e=this.year,n=this.month;return e==l&&n==c?!1:(n++,12==n&&(e++,n=0),e==l&&n==c&&this.$next.addClass("disable"),void this.draw(e,n))},r.prototype.prev=function(){var e=this.year,n=this.month;n--,-1==n&&(e--,n=11),this.$next.removeClass("disable"),this.draw(e,n)},r.prototype.draw=function(e,o){var s,r=t(e,o),u=new Date(e,o,1).getDay(),d="",f=o+1;for(f>9?"":f="0"+f,this.year=e,this.month=o;u--;)d+="<li></li>";for(i=1;i<=r;i++)s=encodeURI(n(this.link,{y:e,m:f,d:i>9?i:"0"+i})),d+=l>e||c>o?'<li><a href="'+s+'">'+i+"</a></li>":i<a?'<li><a href="'+s+'">'+i+"</a></li>":i>a?'<li class="disable">'+i+"</li>":'<li class="current"><a href="#">'+i+"</a></li>";this.$con.html(d),this.$year.html(e),this.$month.html(f)}}(NE),function(e){var n=document.getElementById("nsNavRecCity").innerHTML,t="ns-house-bj",i="\u4e0a\u6d77\u5e02|\u6c5f\u82cf\u7701|\u6d59\u6c5f\u7701|\u5b89\u5fbd\u7701|\u798f\u5efa\u7701|\u6c5f\u897f\u7701",o="\u5e7f\u5dde\u5e02|\u6e56\u5357\u7701|\u6e56\u5317\u7701|\u5e7f\u4e1c\u7701|\u8d35\u5dde\u7701|\u4e91\u5357\u7701|\u5e7f\u897f|\u7518\u8083\u7701|\u9752\u6d77\u7701|\u5b81\u590f|\u65b0\u7586|\u897f\u85cf|\u56db\u5ddd\u7701|\u91cd\u5e86\u5e02|\u9999\u6e2f|\u6fb3\u95e8",s="\u6df1\u5733\u5e02|\u60e0\u5dde\u5e02|\u4e1c\u839e\u5e02",l="\u6d77\u5357\u7701";n&&window.lc&&window.lo&&(-1!=s.indexOf(n)||-1!=s.indexOf(lc)?t="ns-house-sz":-1!=l.indexOf(n)||-1!=l.indexOf(lo)?t="ns-house-hn":-1!=i.indexOf(n)||-1!=i.indexOf(lo)?t="ns-house-sh":(-1!=o.indexOf(n)||-1!=o.indexOf(lo))&&(t="ns-house-gz")),e("."+t).removeClass("none")}(NE),function(e){function n(n){for(var t,i,o='<h2><i class="bg01"></i><a class="ac01" href="http://j.news.163.com/">\u4e3a\u4f60\u63a8\u8350</a></h2>',s=0,l=n.length;l>s;s++)t=n[s],i="http://j.news.163.com"+t.url_163,o+=s?'<li><i></i><a href="'+i+'">'+t.title.substr(0,28)+"</a></li>":'<h4><a href="'+i+'">'+t.title.substr(0,24)+"</a></h4><ul>";o+="</ul>",e("#nsRecForYou").html(o)}var t=document.cookie.match(/(_ntes_nuid=.+?);|(P_INFO=.+?)\|/g),i="",o="";t&&(i=t[0]?t[0].slice(0,-1).replace("_ntes_nuid=",""):"",o=t[1]?t[1].slice(0,-1).replace("P_INFO=",""):""),NE.load.jsonp({url:"http://j.news.163.com/hy/demorec.s?newchannel=newsfrist&limit=7&deviceid="+i+"&urs="+o+"&time="+(new Date).getTime(),charset:"utf-8"},n)}(NE),function(e){function n(){var n,t=e(".ns-calendar"),i=e(".ns-pot-tri");t.calendar("http://snapshot.news.163.com/wgethtml/http+!!news.163.com!/{y}-{m}/{d}/12.html"),i.bind("mouseover",function(){t.removeClass("none")}),i.bind("mouseout",function(e){var o=e.relatedTarget||e.toElement;l(o,i[0])||(n=setTimeout(function(){t.addClass("none")},300))}),t.bind("mouseover",function(){clearTimeout(n)}),t.bind("mouseout",function(e){var n=e.relatedTarget||e.toElement;l(n,t[0])||t.addClass("none")})}function t(){if(!window.ActiveXObject||window.XMLHttpRequest){var n=e(".ns-sidebar"),t=e(".ns-side-tolid",n);e(".ns-side-qrcode",n),e(".ns-popup-qrcode",n);t.bind("click",function(){var e=document.body.scrollTop||document.documentElement.scrollTop,t=document.body.scrollLeft||document.documentElement.scrollLeft;e>0?(e-=e/3+10,window.scrollTo(t,e),setTimeout(arguments.callee,10)):(window.scrollTo(t,0),n.addClass("none"))}),e(window).bind("scroll",function(){var e=document.body.scrollTop||document.documentElement.scrollTop;e>600?n[0].style.display="block":n[0].style.display="none"}),e(window).trigger("scroll")}}function i(){var n,t,i=window.newsList||[],o="";if(!(i.length<8)){for(var s=0;8>s;s++)n=i[s],t=3>s?' class="red"':"",o+="<li><em"+t+">"+(s+1)+'</em><a href="'+encodeURI(n.url)+'#newsindex">'+c(n.title)+'<div class="ns-rank-zan"><i class="ic_thumbs"></i>'+c(n.recommendnum)+"</div></a></li>";e("#jnewsContainer").html(o)}}function o(n){var t,i=n.hotLive||[],o='<ul class="cf"><li class="first"><a href="http://www.bobo.com/?=163.newshome"><img class="ns-creole-img" src="http://img1.cache.netease.com/common/img/bobo.png"></a></li>';if(!(i.length<7)){for(var s=0;7>s;s++)t=i[s],o+=3==s?'</ul><ul class="cf"><li class="first">':2==s||6==s?'<li class="ns9-none">':"<li>",o+='<a href="'+encodeURI(t.liveUrl)+'?f=163.newshome"><img class="ns-creole-img" src="'+encodeURI(t.liveCoverUrl)+'" alt="'+c(t.nick)+'"><div class="ns-creole-mask"></div><div class="ns-creole-task"></div><div class="ns-creole-title"><i class="ic_play_ws"></i><span>'+c(t.anchorExtendTitle)+'</span></div><span class="tagzn"></span></a></li>';o+="</ul>",e("#boboContainer").html(o)}}function s(n){var t,i=n.houseNewsWrapper||[],o="";if(!(i.length<4)){for(var s=0;4>s;s++)t=i[s],o+=0==s?'<li class="first">':3==s?'<li class="ns9-none">':"<li>",o+='<div class="ns-house-pic"><a href="'+encodeURI(t.url)+'"><img src="'+encodeURI(t.picUrl)+'" alt="'+c(t.name)+'"></a></div><h3><a class="ac01" href="'+encodeURI(t.url)+'">'+c(t.name)+'</a></h3><p><a class="ac04" href="'+encodeURI(t.url)+'">'+c(t.country)+"/"+c(t.city)+"</a></p></li>";e("#overseaContainer").html(o)}}function l(e,n){for(;void 0!=e&&null!=e&&"BODY"!=e.tagName.toUpperCase();){if(e==n)return!0;e=e.parentNode}return!1}function c(e){return String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}window.boboData=o,NE.load.js("http://j.news.163.com/jnews2.js",i,"utf-8"),NE.load.js("http://www.bobo.com/api/show/channel/163.newshome/7.json?callback=boboData",null,"utf-8"),NE.load.jsonp({url:"http://vhouse.163.com/firstPageWeb/firstPageAll.do",charset:"utf-8"},s),e(".ns-specail,.ns-loupan,.ns-rank").tabs(),e(".ns-gallery").gallery(),e(".ns-pot-input").one("click",function(){this.value=""}),n(),t()}(NE);
