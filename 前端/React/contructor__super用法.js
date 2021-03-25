// 首先，ES6 的 class 属于一种“语法糖”，所以只是写法更加优雅，更加像面对对象的编程，其思想和 ES5 是一致的。

// function Point(x, y) {
//   this.x = x;
//   this.y = y;
// }

// Point.prototype.toString = function() {
//   return '(' + this.x + ',' + this.y + ')';
// }
// 等同于

// class Point {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }

//   toString() {
//     return '(' + this.x + ',' + this.y + ')';
//   }
// }
// 其中 constructor 方法是类的构造函数，是一个默认方法，通过 new 命令创建对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个默认的 consructor 方法会被默认添加。所以即使你没有添加构造函数，也是会有一个默认的构造函数的。一般 constructor 方法返回实例对象 this ，但是也可以指定 constructor 方法返回一个全新的对象，让返回的实例对象不是该类的实例。

// 下面好好分析一下 super 关键字的作用：

// super 这个关键字，既可以当做函数使用，也可以当做对象使用。这两种情况下，它的用法完全不用。

// 1. 当做函数使用
// class A {}
// class B extends A {
//   constructor() {
//     super();  // ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。
//   }
// }
// 注：在 constructor 中必须调用 super 方法，因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工,而 super 就代表了父类的构造函数。super 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B，因此 super() 在这里相当于 ```A.prototype.constructor.call(this, props)``。

// class A {
//   constructor() {
//     console.log(new.target.name); // new.target 指向当前正在执行的函数
//   }
// }

// class B extends A {
//   constructor() {
//     super();
//   }
// }

// new A(); // A
// new B(); // B
// 可以看到，在 super() 执行时，它指向的是 子类 B 的构造函数，而不是父类 A 的构造函数。也就是说，super() 内部的 this 指向的是 B。

// 2. 当做对象使用
// 在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

// class A {
//   c() {
//     return 2;
//   }
// }

// class B extends A {
//   constructor() {
//     super();
//     console.log(super.c()); // 2
//   }
// }

// let b = new B();
// 上面代码中，子类 B 当中的 super.c()，就是将 super 当作一个对象使用。这时，super 在普通方法之中，指向 A.prototype，所以 super.c() 就相当于 A.prototype.c()。

// 通过 super 调用父类的方法时，super 会绑定子类的 this。

// class A {
//   constructor() {
//     this.x = 1;
//   }
//   s() {
//     console.log(this.x);
//   }
// }

// class B extends A {
//   constructor() {
//     super();
//     this.x = 2;
//   }
//   m() {
//     super.s();
//   }
// }

// let b = new B();
// b.m(); // 2
// 上面代码中，super.s() 虽然调用的是 A.prototytpe.s()，但是 A.prototytpe.s()会绑定子类 B 的 this，导致输出的是 2，而不是 1。也就是说，实际上执行的是 super.s.call(this)。

// 由于绑定子类的 this，所以如果通过 super 对某个属性赋值，这时 super 就是 this，赋值的属性会变成子类实例的属性。

// class A {
//   constructor() {
//     this.x = 1;
//   }
// }

// class B extends A {
//   constructor() {
//     super();
//     this.x = 2;
//     super.x = 3;
//     console.log(super.x); // undefined
//     console.log(this.x); // 3
//   }
// }

// let b = new B();
// 上面代码中，super.x 赋值为 3，这时等同于对 this.x 赋值为 3。而当读取 super.x 的时候，调用的是 A.prototype.x，但并没有 x 方法，所以返回 undefined。

// 注意，使用 super 的时候，必须显式指定是作为函数，还是作为对象使用，否则会报错。


// class A {}
// class B extends A {
//   constructor() {
//     super();
//     console.log(super); // 报错
//   }
// }
// 上面代码中，console.log(super); 的当中的 super，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。这是，如果能清晰的表明 super 的数据类型，就不会报错。

// 最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用 super 关键字。

// 结语：
// ES6 的 class 毕竟是一个“语法糖”，所以只要理解了 JavaScript 中对象的概念和面向对象的思想，class 就不难理解啦。


// react中这两个API出镜率超级高，但是一直不太懂这到底是干嘛的，有什么用；今天整理一下，方便自己查看同时方便大家。

// 1.constructor( )-----super( )的基本含义

// constructor( )——构造方法

//        这是ES6对类的默认方法，通过 new 命令生成对象实例时自动调用该方法。并且，该方法是类中必须有的，如果没有显示定义，则会默认添加空的constructor( )方法。


// super( ) ——继承

//       在class方法中，继承是使用 extends 关键字来实现的。子类 必须 在 constructor( )调用 super( )方法，否则新建实例时会报错。


//      报错的原因是：子类是没有自己的 this 对象的，它只能继承自父类的 this 对象，然后对其进行加工，而super( )就是将父类中的this对象继承给子类的。没有 super，子类就得不到 this 对象。


// 2.Es5-----Es6关于继承的实现不同之处
//   出现上面情况的原因是，ES5的继承机制与ES6完全不同。

// 复习一个重要知识点——ES5中new到底做了些啥？


// 当一个构造函数前加上new的时候，背地里来做了四件事：
// 1.生成一个空的对象并将其作为 this；
// 2.将空对象的 __proto__ 指向构造函数的 prototype；
// 3.运行该构造函数；
// 4.如果构造函数没有 return 或者 return 一个返回 this 值是基本类型，则返回this；如果 return 一个引用类型，则返回这个引用类型。

//       简单解释，就是在ES5的继承中，先创建子类的实例对象this，然后再将父类的方法添加到this上（ Parent.apply(this) ）。而ES6采用的是先创建父类的实例this（故要先调用 super( )方法），完后再用子类的构造函数修改this。


// 3.super(props)------super()-----以及不写super的区别
//    如果你用到了constructor就必须写super(),是用来初始化this的，可以绑定事件到this上;

//    如果你在constructor中要使用this.props,就必须给super加参数：super(props)；

//    （无论有没有constructor，在render中this.props都是可以使用的，这是React自动附带的；）

//    如果没用到constructor,是可以不写的；React会默认添加一个空的constructor。
