js处理img标签加载图片失败，显示默认图片

// 1.第一种方法：
// 如果已经引入了jquery插件，就很好办。没有的话，如果实在需要，可以附上代码：

script(type='text/javascript', src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js")
    //这是jade文件的写法，可以自行转换为html

    // handle error
    $('img').error(function(){
            $(this).attr('src', "default.jpg(默认图片的url地址)");
         });

//  2.第二种方法：如果img标签是少量的话，可以用这个：
img的onerror事件
         
<img src='test.jpg' alt='test' οnerrοr="this.src='default.jpg'" />
//alt属性的意思是在图片为加载成功时显示的文字


/***-------------------------------------------------------------------------------------------------------------------------------- */

html 的img标签，如何设置未加载完成的时候显示另一个图片

<div id="aa"><img src="图片地址" onload="a();" border="0" /></div>



<script>
   function a() {
       document.getElementById('aa').innerHTML = '另一张图片';
   }
</script>











