// 判断扫码的客户端是微信还是支付宝（JS方式）
function IsWeixinOrAlipay(){
    var ua = window.navigator.userAgent.toLowerCase();
    //判断是不是微信
    if ( ua.match(/MicroMessenger/i) == 'micromessenger' ) {  
        return "WeiXIN";  
    }    
    //判断是不是支付宝
    if (ua.match(/AlipayClient/i) == 'alipayclient') {
        return "Alipay";  
    }
    //哪个都不是
    return "false";
}

// 浏览器的 UA 字串 
// 标准格式为： 浏览器标识 (操作系统标识; 加密等级标识; 浏览器语言) 渲染引擎标识 版本信息

// 微信APP：Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) 
// AppleWebKit/605.1.15 (KHTML, like Gecko) 
// Mobile/15G77 MicroMessenger/6.7.2 NetType/4G Language/zh_CN
 
 
// 支付宝APP：Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) 
// AppleWebKit/605.1.15 (KHTML, like Gecko) 
// Mobile/15G77 NebulaSDK/1.8.100112 Nebula PSDType(1) 
// AlipayDefined(nt:4G,ws:320|504|2.0) AliApp(AP/10.1.32.600) 
// AlipayClient/10.1.32.600 Alipay Language/zh-Hans
// 获取user-Agent 之后，
// 通过识别MicroMessenger或者AlipayClient这样的关键字应该就可以判断是微信还是支付宝

function IsWeixinOrAlipay(){

    var ua = window.navigator.userAgent;
    //判断是不是微信
    if ( ua.indexOf("MicroMessenger") > -1 ) {  
        return "WeiXIN";  
    }    
    //判断是不是支付宝
    if (ua.indexOf("AlipayClient") > -1) {
         return "Alipay";  
    }
    //哪个都不是
    return "false";
}


request.getHeader("user-agent");
