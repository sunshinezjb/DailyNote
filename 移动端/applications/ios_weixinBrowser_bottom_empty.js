// 解决iOS12以上微信内置浏览器下键盘收起底部空白的问题

/*
 * iOS12以上版本，微信打开链接点击输入框获取焦点后虚拟键盘自动弹出
 * 收起键盘，原来弹出键盘的位置一片空白，页面没有自动适应整个屏幕
 * 解决办法：
 * 在当前页面滚动的位置上下滚动1px的距离即可实现页面的自适应
 */
document.body.addEventListener('focusout', () => {
    //软键盘收起的事件处理
    let ua = window.navigator.userAgent;
    let app = window.navigator.appVersion;
    //$alert('浏览器版本: ' + app + '\n' + '用户代理: ' + ua);
    if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        //$alert('ios端');
        var currentPosition, timer;
        var speed = 1;
        timer = setInterval(function () {
            currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
            currentPosition -= speed;
            window.scrollTo(0, currentPosition); //页面向上滚动
            currentPosition += speed;
            window.scrollTo(0, currentPosition); //页面向下滚动
            clearInterval(timer);
        }, 100);
    } else if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
        //$alert('android端');
    }
})



