(function(win,doc){
    
    function insertAfter(c, b) {
        var a = b.parentNode;
        if (a.lastChild == b) {
            a.appendChild(c)
        } else {
            a.insertBefore(c, b.nextSibling)
        }
    }
    var anchor = "jdad"+Math.random()*100;
    document.open();
    document.write("<div id="+anchor+"></div>");
    function requestApi(jd_auto_url,width,height) {
        // var scripts = doc.getElementsByTagName("script");
        // var script = scripts[scripts.length - 1];
        var script = document.getElementById(anchor);
        var m_content = doc.createElement("iframe");
        m_content.scrolling = "no";
        m_content.marginheight = "0";
        m_content.marginwidth = "0";
        m_content.setAttribute("frameborder", "0", 0);
        if(width){
            m_content.width = width;
        }else{
            m_content.width="100%";
        }
        if(height){
            m_content.height = height;
        }else{
            m_content.height="100%";
        }
        m_content.src = jd_auto_url;
        insertAfter(m_content, script);
    }

    function getRefUrl() {
        var url = "";
        try{
            if(win.top !== win){
                url = win.top.location.href;
            }
        }catch(e){
        }
        if(url == ""){
            url = win.location.href || "";
        }
        /**url = url.replace(new RegExp("&","gm"),"%26");**/
        url = encodeURIComponent(url);
        return url;
    }

    function run(){
        try{
            var time = new Date().getTime();
            var jd_auto_url = "//x.jd.com/cpcunion?spread_type=2&ad_type=7&ad_ids=v_ad_ids&p=v_jd_p&posid=v_position_id&unionsiteid=v_site_id&union_id=v_unid&pid=v_pid&euid=v_euid&ref=v_ref&_=v_time";
            if("undefined" == typeof jd_union_euid){
                jd_union_euid = "";
            }
            if("undefined" == typeof jd_union_unid){
                jd_union_unid = "";
            }
            if("undefined" == typeof jd_union_pid){
                jd_union_pid = "";
            }
            if("undefined" == typeof jd_ad_ids){
                jd_ad_ids = "";
            }
            if("undefined" == typeof jd_position_id){
                jd_position_id = "";
            }
            if("undefined" == typeof jd_site_id){
                jd_site_id = "";
            }
            if("undefined" == typeof p){
                p = "";
            }
            var w = 0,h = 0;
            if("undefined" != typeof jd_width){
                w = parseInt(jd_width)
                if(isNaN(w)){ w = 0;}
            }
            if("undefined" != typeof jd_height){
                h = parseInt(jd_height)
                if(isNaN(h)){ h = 0 ;}
            }
            var ref = getRefUrl();
            jd_auto_url = jd_auto_url.replace("v_time",time);
            jd_auto_url = jd_auto_url.replace("v_ad_ids",jd_ad_ids);
            jd_auto_url = jd_auto_url.replace("v_unid",jd_union_unid);
            jd_auto_url = jd_auto_url.replace("v_euid",jd_union_euid);
            jd_auto_url = jd_auto_url.replace("v_pid",jd_union_pid);
            jd_auto_url = jd_auto_url.replace("v_position_id",jd_position_id);
            jd_auto_url = jd_auto_url.replace("v_site_id",jd_site_id);
            jd_auto_url = jd_auto_url.replace("v_jd_p",p);
            jd_auto_url = jd_auto_url.replace("v_ref",ref);
            requestApi(jd_auto_url,w,h);
        }catch (e){
            console.log(e);
        } 
    }
    run();
})(window,document);
