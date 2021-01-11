// 什么是闭包？
// 闭包就是一个函数，能够访问其他函数内部变量的函数

// 闭包示例代码

function outer () {
    var a = '变量1'
    var inner = function () {
        console.info(a)
    }
    return inner    // inner 就是一个闭包函数，因为他能够访问到outer函数的作用域
}
var inner = outer()   // 获得inner闭包函数
inner()   //"变量1"

// 当程序执行完var inner = outer()，其实outer的执行环境并没有被销毁，因为他里面的变量a仍然被inner函数作用域链所引用，当程序执行完inner(), 这时候，inner和outer的执行环境才会被销毁调；
// 闭包内存泄露的原因：《JavaScript高级编程》书中建议：由于闭包会将它的外部函数的作用域也保存在内存中，因此会比其他函数更占用内存，这样的话，如果过度使用闭包，就会有内存泄露的威胁。

// 基本类型变量（Number 、Boolean、Undefined、String、Null）的值一般都是存在栈内存中，
// 引用类型变量（Array、Object、Function）的值存储在堆内存中，栈内存存储对应空间地址
// 闭包的作用
// 1.访问其他函数内部变量
// 2.保护变量不被内存回收机制回收
// 3.避免全局变量被污染 方便调用上下文的局部变量 加强封装性

// 闭包的缺点
// 闭包长期占用内存，内存消耗很大，可能导致内存泄露

// 如何避免闭包引起的内存泄漏
// 1，在退出函数之前，将不使用的局部变量全部删除。可以使变量赋值为null;（示例如下）

//  这段代码会导致内存泄露
window.onload = function () {
    var el = document.getElementById("id");
    el.onclick = function () {
        alert(el.id);
    }
}
// 解决方法为
window.onload = function () {
    var el = document.getElementById("id");
    var id = el.id;                                      //解除循环引用
    el.onclick = function () {
        alert(id);
    }
    el = null;                                          // 将闭包引用的外部函数中活动对象清除
}

// 2,避免变量的循环赋值和引用。 （示例如上）

// 循环引用引起的内存泄漏，是因为IE 的bug，循环引用无法自动判断，所以通过拷贝值，把内外引用脱钩，这样就可回收。IE9及其以后已修复。（感谢 猫SirSir 的讲解！）

// 3，利用Jquery释放自身指定的所有事件处理程序。
// 由于jQuery考虑到了内存泄漏的潜在危害，所以*它会手动释放自己指定的所有事件处理程序 *。只要坚持使用jQuery的事件绑定方法，就可以一定程度上避免这种特定的常见原因导致的内存泄漏。

// 这段代码会导致内存泄露
$(document).ready(function () {
    var button = document.getElementById('button-1');
    button.onclick = function () {
        console.log('hello');
        return false;
    };
});
// 当指定单击事件处理程序时，就创建了一个在其封闭的环境中包含button变量的闭包。而且，现在的button也包含一个指向闭包（onclick属性自身）的引用。这样，就导致了在IE中即使离开当前页面也不会释放这个循环。

// 用jQuery化解引用循环
$(document).ready(function () {
    var $button = $('#button-1');
    $button.click(function (event) {
        event.preventDefault();
        console.log('hello');
    });
});