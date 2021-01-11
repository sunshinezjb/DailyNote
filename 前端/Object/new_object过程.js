// 写在前面的话
// 前端的入门相对简单，相对于其他方向天花板可能会相对较低。但是在市场上一个优秀的前端依旧是很抢手的。能够站在金字塔上的人往往寥寥无几。

// 目前前端也已经一年半了，在公司的知识栈相对落后，就业形势不容乐观，所以有必要自己琢磨，往中高级前端进阶。后续我将推出《JavaScript进阶系列》，一方面是一个监督自己学习的一个过程，另一方面也会给看到的童鞋一些启发。

// JavaScript新建对象的过程
// 在ES5中定义一个函数来创建对象，如下：

function Person (name) {
    this.name = name;
}
Person.prototype.getName = function () {
    return name;
}
var person = new Person("xuan");
console.log(person.name);//输出：xuan
console.log(person.getName());//输出：xuan
// 复制代码
// 我们看到当我们新建一个对象，我们就可以访问构造器中的指向this的属性，还可以访问原型中的属性。我们不妨把JavaScript调用new的过程主要由下面四步组成：

// 新生成一个空对象
// 将空对象链接到原型中
// 绑定this
// 返回新对象
// 下面跟着我按照这个思路来创建对象：

function create () {
    //Todo
}
person = create(Person, "xuan");//create(ObjectName,...arguments)
// 复制代码
// 我们使用如上所示的函数来模拟new关键字。

// 首先第一步新建一个对象：

function create () {
    var obj = new Object();
    return obj;
}
person = create(Person, "xuan");
// 复制代码
// 现在已经创建并返回一个对象，当然现在打印出来肯定是一个普通的对象，毕竟流程还没有走完，我们接着往下看。

// 第二步链接到原型中：

function create () {
    var obj = new Object();
    var constructor = [].shift.call(arguments);
    console.log(constructor);
    console.log(arguments);
    obj.__proto__ = constructor.prototype;
    return obj;
}

person = create(Person, "xuan");
// 复制代码
// 现在把构造函数和参数都打印出来了。没问题！

// 第三步绑定this，如下：

function create () {
    let obj = new Object();
    let constructor = [].shift.call(arguments)
    obj.__proto__ = constructor.prototype
    constructor.apply(obj, arguments);
    console.log(obj);
    return obj;
}
person = create(Person, "xuan");
// 复制代码
// 打印结果实现new对象的效果。

// 现在改一下构造函数代码：

function Person (name) {
    this.name = name;
    return {
        name: "abc"
    }
}
var person = new Person("xuan");
console.log(person);
console.log(Object.prototype.toString.call(person));
// 复制代码
// 效果如下:

// 我们执行一下我们构建的函数效果如下：
// 发现不一致，所以我们要处理第三步绑定this中apply函数的返回值：
function create () {
    let obj = new Object();
    let constructor = [].shift.call(arguments)
    obj.__proto__ = constructor.prototype
    //constructor.apply(obj, arguments);
    let res = constructor.apply(obj, arguments);
    if (res) {
        return res;
    } else {
        return obj;
    }
}
person = create(Person, "xuan");
// 复制代码
// 效果如下：

//  完美！
// 现在我们思考一下这里的res返回值有三种情况：undefined，基本类型，对象。

// 如果res是undefined时，返回obj；

// 如果res是基本类型我们也返回obj；

// 如果res是对象我们返回res对象；

// 综合一下：

// 如果返回的res对象是Object类型那么返回res，否则返回obj。当然其他的判断条件也是可以的。最后代码优化如下：

function create () {
    let obj = new Object();
    let constructor = [].shift.call(arguments)
    obj.__proto__ = constructor.prototype
    //constructor.apply(obj, arguments);
    let res = constructor.apply(obj, arguments);
    return res instanceof Object ? res : obj;
}
person = create(Person, "xuan");
// 复制代码
// 几个问题
// 现在的代码已经完美了么？我们先来提几个问题。

// new Object()创建的对象纯净么？
// 为啥使用[].shift.call()来进行参数分割？arguments是一个数组么？
// new Object()创建的对象纯净么？
// 首先什么是纯净？我们定义一个对象的__proto__属性为空的对象是一个纯净的对象。

// 在第二步的时候中已经改变的obj的原型链，所以无论它前面的原型链是咋样的都无所谓，但是为了保证对象的纯净性，我们有必要引出Object.create()，该方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。我们来看一下：

var person1 = Object.create({});
// 复制代码
// 打印如下:

// 我们看到person1的__proto__指向了{}对象，所以我们在上述代码中直接修改如下：

function create () {
    let constructor = [].shift.call(arguments);
    let obj = Object.create(constructor.prototype);
    let res = constructor.apply(obj, arguments);
    return res instanceof Object ? res : obj;
}
person = create(Person, "xuan");
// 复制代码
// 为啥使用[].shift.call()来进行参数分割？arguments是一个数组么？
// 首先我们知道arguments是函数传入的参数，那么这个参数是数组么？我们打印一下便知：

console.log(arguments);
console.log(Object.prototype.toString.call(arguments));
console.log(arguments instanceof Array);
// 复制代码
// 结果如下

// 不是数组。我们展开发现他跟数组很像，查一下资料发现这个对象是类数组。里面没有shift函数，直接调用shift会报错。我们使用使用Array.from(arguments)将arguments转成数组，然后在调用shift函数也是一种思路。但是在这里我们使用apply最适合。所以下述代码是模拟new Object()的最优代码:

function create () {
    let constructor = [].shift.call(arguments);
    let obj = Object.create(constructor.prototype);
    let res = constructor.apply(obj, arguments);
    return res instanceof Object ? res : obj;
}
person = create(Person, "xuan");
