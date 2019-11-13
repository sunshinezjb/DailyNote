REM布局实例代码

var fontSizeInit = function() {
    var doc = document.documentElement,
        cli   = doc.clientWidth;
    cli&&(cli/=320,2<cli&&(cli=2),doc.style.fontSize=16*cli+"px");
}
fontSizeInit();
    window.addEventListener('resize', function() {
        fontSizeInit();
    });

sass
{
$baseFontSize:16px !default;
// pixels to rems 
@function pxToRem($px) {
      @return $px / $baseFontSize * 1rem;
}
html {
    font-size: $baseFontSize;
    -ms-touch-action: none;
}
}



/**------------------------------------------------------------------------------------------------------------------------------------------------------ */


<script>
        !(function(win, doc) {
            function setFontSize() {
                var baseFontSize = 100;
                var baseWidth = 320;
                var clientWidth = document.documentElement.clientWidth || window.innerWidth;
                var innerWidth = Math.max(Math.min(clientWidth, 480), 320);
                var rem = 100;
                if (innerWidth > 362 && innerWidth <= 375) {
                    rem = Math.floor(innerWidth / baseWidth * baseFontSize * 0.9);
                }
                if (innerWidth > 375) {
                    rem = Math.floor(innerWidth / baseWidth * baseFontSize * 0.84);
                }
                window.__baseREM = rem;
                document.querySelector('html').style.fontSize = rem + 'px';
            };

            var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
            var timer = null;
            win.addEventListener(evt, function() {
                clearTimeout(timer);
                timer = setTimeout(setFontSize, 300);
            }, false);
            win.addEventListener("pageshow", function(e) {
                if (e.persisted) {
                    clearTimeout(timer);
                    timer = setTimeout(setFontSize, 300);
                }
            }, false);
            setFontSize();
        }(window, document));
</script>


