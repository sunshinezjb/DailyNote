(function(){

    var alipayEnterIp = "这里录入支付宝进入页面的地址";
    var weixinEnterIp = "这里录入微信进入页面的地址";
    var errorPageIp = "非支付宝扫码进入页面的地址";

    var ua = window.navigator.userAgent;
       
    if (ua.indexOf("AlipayClient") > -1) { //判断是不是支付宝扫码进入
         window.location.href = alipayEnterIp;
    }else if ( ua.indexOf("MicroMessenger") > -1 ) { //判断是不是微信扫码进入 
         window.location.href = weixinEnterIp; 
    }else{
         window.location.href = errorPageIp;
    }
})();