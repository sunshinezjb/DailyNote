// window是全局浏览器内置顶级对象

// 1、全局变量默认是挂在window下的

var  a = 123;
alert(window.a)//123

// 2、window下的子对象
// A、location

// *   window.location.href                当前页面的 URL，可以获取，可以修改（页面跳转）。
// *   window.location.hostname      web 主机的域名
// *   window.location.pathname      当前页面的路径和文件名
// *   window.location.port               web 主机的端口 （80 或 443）
// *   window.location.protocol         所使用的 web 协议（http:// 或 https://）
// *   window.location.search           请求参数（？后面的内容）
//  window.location.reload()
// 刷新页面的方法。一般情况下给reload()传递一个true，让他刷新，并不使用缓存。缓存的东西一般为js文件，css文件等。

// B、window.navigator

//     navigator.appName      返回获取当前浏览器的名称。
//     navigator.appVersion    返回 获取当前浏览器的版本号。
//     navigator.platform        返回 当前计算机的操作系统。
//     以上属性已经在逐渐被抛弃了。
//     一个新的属性将替代这些属性。
//     navigator.userAgent   返回浏览器信息（可用此属性判断当前浏览器）
// 判断当前浏览器类型的代码：

function isBrowser() {
    var userAgent = navigator.userAgent;
    //微信内置浏览器
    if(userAgent.match(/MicroMessenger/i) == 'MicroMessenger') {
        return "MicroMessenger";
    }

    //QQ内置浏览器
    else if(userAgent.match(/QQ/i) == 'QQ') {
        return "QQ";
    }

    //Chrome
    else if(userAgent.match(/Chrome/i) == 'Chrome') {
        return "Chrome";
    }

    //Opera
    else if(userAgent.match(/Opera/i) == 'Opera') {
        return "Opera";
    }

    //Firefox
    else if(userAgent.match(/Firefox/i) == 'Firefox') {
        return "Firefox";
    }

    //Safari
    else if(userAgent.match(/Safari/i) == 'Safari') {
        return "Safari";
    }

    //IE
    else if(!!window.ActiveXObject || "ActiveXObject" in window) {
        return "IE";
    }
    else {
        return "未定义:"+userAgent;
    }
}


// C、history

    history.go(1)    //参数可写任意整数，正数前进，负数后退
    history.back()   //后退
    history.forward() //前进


// D、screen: 屏幕

window.screen.width //返回当前屏幕宽度(分辨率值)
window.screen.height //返回当前屏幕高度(分辨率值)

// 3、window下的弹框方法

    alert()   
    prompt()  
    confirm()
    confirm:
<script>
            if(window.confirm("熊哥帅不帅？")){
                alert("真不要脸");
            }else{
                alert("瞎说什么大实话");
            }
        </script>


// 4、定时器

//     超时定时器        间隔定时器

//     setTimeout       setInterval

//     clearTimeout    clearInterval
<script>
            var n = 0;
            var timer = setInterval(function(){
                console.log(n++);
                if(n > 4){
                    clearInterval(timer);
                }
            },1000);

            var timer1 = setTimeout(function(){
                clearInterval(timer);
            },5000);
            clearTimeout(timer1);
</script>

// 5、window.onload

window.onload = function(){
                //浏览器加载完成事件
                //窗口文档加载结束  之后执行一遍的代码
                console.log(document.getElementById("box"));
            }

// 6、window.onscroll

window.onscroll = function(){
                //滚动条滚动事件
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                console.log(scrollTop);
            }
//scrolltop=document.documentElement.scrollTop||document.body.scrollTop; //兼容写法


// 7、window.onresize

window.onresize = function(){
                //浏览器窗口大小改变的事件
                console.log(111);
            }