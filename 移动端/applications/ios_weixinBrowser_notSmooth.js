// 移动端或微信浏览器中H5页面滚动时卡顿不流畅而且有时整个网页被拉起出现浏览器背景

// iOS端浏览器滑动卡顿不流畅可以用-webkit-overflow-scrolling: touch;通过提升内存占用提升流畅性；

// 至于网页被拖起出现空白；可以禁止滑动事件，然后按需开启需要滑动的dom；

overscroll(els) {
    for (var i = 0; i < els.length; ++i) {
        var el = els[i];
        el.addEventListener('touchstart', function () {
            var top = this.scrollTop, totalScroll = this.scrollHeight, currentScroll = top + this.offsetHeight
            if (top === 0) {
                this.scrollTop = 1;
            } else if (currentScroll === totalScroll) {
                this.scrollTop = top - 1;
            }
        });
        el.addEventListener('touchmove', function (evt) {
            if (this.offsetHeight < this.scrollHeight)
                evt._isScroller = true;
        });
    }
}
// 页面加载完毕执行禁止滑动事件
document.body.addEventListener('touchmove', function (evt) {
    if (!evt._isScroller) {
        evt.preventDefault();
    }
})

// 然后按需开启滑动事件，比如要给class名为.content的dom开启
overscroll(document.querySelectorAll('.content'));