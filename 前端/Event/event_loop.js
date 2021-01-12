// 深入理解JavaScript事件循环机制
// 前言
// 众所周知，JavaScript 是一门单线程语言，虽然在 html5 中提出了 Web-Worker ，但这并未改变 JavaScript 是单线程这一核心。可看HTML规范中的这段话：

// To coordinate events, user interaction, scripts, rendering, networking, and so forth, user agents must use event loops as described in this section. There are two kinds of event loops: those for browsing contexts, and those for workers.

// 为了协调事件、用户交互、脚本、UI 渲染和网络处理等行为，用户引擎必须使用 event loops。Event Loop 包含两类：一类是基于 Browsing Context ，一种是基于 Worker ，二者是独立运行的。 下面本文用一个例子，着重讲解下基于 Browsing Context 的事件循环机制。

// 来看下面这段 JavaScript 代码：

console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(function () {
    console.log('promise1');
}).then(function () {
    console.log('promise2');
});

console.log('script end');
// 先猜测一下这段代码的输出顺序是什么，再去浏览器控制台输入一下，看看实际输出的顺序和你猜测出的顺序是否一致，如果一致，那就说明，你对 JavaScript 的事件循环机制还是有一定了解的，继续往下看可以巩固下你的知识；而如果实际输出的顺序和你的猜测不一致，那么本文下面的部分会为你答疑解惑。

// 任务队列
// 所有的任务可以分为同步任务和异步任务，同步任务，顾名思义，就是立即执行的任务，同步任务一般会直接进入到主线程中执行；而异步任务，就是异步执行的任务，比如ajax网络请求，setTimeout 定时函数等都属于异步任务，异步任务会通过任务队列(Event Queue)的机制来进行协调。具体的可以用下面的图来大致说明一下：



// 同步和异步任务分别进入不同的执行环境，同步的进入主线程，即主执行栈，异步的进入 Event Queue 。主线程内的任务执行完毕为空，会去 Event Queue 读取对应的任务，推入主线程执行。 上述过程的不断重复就是我们说的 Event Loop(事件循环) 。

// 在事件循环中，每进行一次循环操作称为tick，通过阅读规范可知，每一次 tick 的任务处理模型是比较复杂的，其关键的步骤可以总结如下：

// 在此次 tick 中选择最先进入队列的任务(oldest task) ，如果有则执行(一次)
// 检查是否存在 Microtasks ，如果存在则不停地执行，直至清空Microtask Queue
// 更新 render
// 主线程重复执行上述步骤
// 可以用一张图来说明下流程：


// 这里相信有人会想问，什么是 microtasks ? 规范中规定，task分为两大类, 分别是 Macro Task （宏任务）和 Micro Task（微任务）, 并且每个宏任务结束后, 都要清空所有的微任务, 这里的 Macro Task也是我们常说的 task ，有些文章并没有对其做区分，后面文章中所提及的task皆看做宏任务(macro task) 。

// (macro)task 主要包含：script(整体代码) 、setTimeout、setInterval、I / O、UI 交互事件、setImmediate(Node.js 环境)

// microtask主要包含：Promise、MutaionObserver、process.nextTick(Node.js 环境)

// setTimeout / Promise 等API便是任务源，而进入任务队列的是由他们指定的具体执行任务。来自不同任务源的任务会进入到不同的任务队列。其中 setTimeout 与 setInterval 是同源的。

// 分析示例代码
// 千言万语，不如就着例子讲来的清楚。下面我们可以按照规范，一步步执行解析下上面的例子，先贴一下例子代码（免得你往上翻）。

console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(function () {
    console.log('promise1');
}).then(function () {
    console.log('promise2');
});

console.log('script end');
// 整体 script 作为第一个宏任务进入主线程，遇到 console.log，输出 script start
// 遇到 setTimeout，其回调函数被分发到宏任务 Event Queue 中
// 遇到 Promise，其 then函数被分到到微任务 Event Queue 中, 记为 then1，之后又遇到了 then 函数，将其分到微任务 Event Queue 中，记为 then2
// 遇到 console.log，输出 script end
// 至此，Event Queue 中存在三个任务，如下表：

// 宏任务	微任务
// setTimeout	then1
//     - then2
// 执行微任务，首先执行then1，输出 promise1, 然后执行 then2，输出 promise2，这样就清空了所有微任务
// 执行 setTimeout 任务，输出 setTimeout 至此，输出的顺序是：script start, script end, promise1, promise2, setTimeout
// so，你猜对了吗？

// 看看你掌握了没

// 再来一个题目，来做个练习：


console.log('script start');

setTimeout(function () {
    console.log('timeout1');
}, 10);

new Promise(resolve => {
    console.log('promise1');
    resolve();
    setTimeout(() => console.log('timeout2'), 10);
}).then(function () {
    console.log('then1')
})

console.log('script end');
// 这个题目就稍微有点复杂了，我们再分析下：

// 首先，事件循环从宏任务(macrotask) 队列开始，最初始，宏任务队列中，只有一个 scrip t(整体代码)任务；当遇到任务源(task source) 时，则会先分发任务到对应的任务队列中去。所以，就和上面例子类似，首先遇到了console.log，输出 script start； 接着往下走，遇到 setTimeout 任务源，将其分发到任务队列中去，记为 timeout1； 接着遇到 promise，new promise 中的代码立即执行，输出 promise1, 然后执行 resolve, 遇到 setTimeout, 将其分发到任务队列中去，记为 timemout2, 将其 then 分发到微任务队列中去，记为 then1； 接着遇到 console.log 代码，直接输出 script end 接着检查微任务队列，发现有个 then1 微任务，执行，输出then1 再检查微任务队列，发现已经清空，则开始检查宏任务队列，执行 timeout1, 输出 timeout1； 接着执行 timeout2，输出 timeout2 至此，所有的都队列都已清空，执行完毕。其输出的顺序依次是：script start, promise1, script end, then1, timeout1, timeout2

// 用流程图看更清晰：



// 总结
// 有个小 tip：从规范来看，microtask 优先于 task 执行，所以如果有需要优先执行的逻辑，放入microtask 队列会比 task 更早的被执行。

// 最后的最后，记住，JavaScript 是一门单线程语言，异步操作都是放到事件循环队列里面，等待主执行栈来执行的，并没有专门的异步执行线程。。










// JS浏览器事件循环机制
// 文章来自我的 github 博客，包括技术输出和学习笔记，欢迎star。

// 先来明白些概念性内容。

// 进程、线程
// 进程是系统分配的独立资源，是 CPU 资源分配的基本单位，进程是由一个或者多个线程组成的。

// 线程是进程的执行流，是CPU调度和分派的基本单位，同个进程之中的多个线程之间是共享该进程的资源的。

// 浏览器内核
// 浏览器是多进程的，浏览器每一个 tab 标签都代表一个独立的进程（也不一定，因为多个空白 tab 标签会合并成一个进程），浏览器内核（浏览器渲染进程）属于浏览器多进程中的一种。

// 浏览器内核有多种线程在工作。

// GUI 渲染线程:

// 负责渲染页面，解析 HTML，CSS 构成 DOM 树等，当页面重绘或者由于某种操作引起回流都会调起该线程。
// 和 JS 引擎线程是互斥的，当 JS 引擎线程在工作的时候，GUI 渲染线程会被挂起，GUI 更新被放入在 JS 任务队列中，等待 JS 引擎线程空闲的时候继续执行。
// JS 引擎线程:

// 单线程工作，负责解析运行 JavaScript 脚本。
// 和 GUI 渲染线程互斥，JS 运行耗时过长就会导致页面阻塞。
// 事件触发线程:

// 当事件符合触发条件被触发时，该线程会把对应的事件回调函数添加到任务队列的队尾，等待 JS 引擎处理。
// 定时器触发线程:

// 浏览器定时计数器并不是由 JS 引擎计数的，阻塞会导致计时不准确。
// 开启定时器触发线程来计时并触发计时，计时完成后会被添加到任务队列中，等待 JS 引擎处理。
// http 请求线程:

// http 请求的时候会开启一条请求线程。
// 请求完成有结果了之后，将请求的回调函数添加到任务队列中，等待 JS 引擎处理。


// image


// JavaScript 引擎是单线程
// JavaScript 引擎是单线程，也就是说每次只能执行一项任务，其他任务都得按照顺序排队等待被执行，只有当前的任务执行完成之后才会往下执行下一个任务。

// HTML5 中提出了 Web - Worker API，主要是为了解决页面阻塞问题，但是并没有改变 JavaScript 是单线程的本质。了解 Web - Worker。

// JavaScript 事件循环机制
// JavaScript 事件循环机制分为浏览器和 Node 事件循环机制，两者的实现技术不一样，浏览器 Event Loop 是 HTML 中定义的规范，Node Event Loop 是由 libuv 库实现。这里主要讲的是浏览器部分。

// Javascript 有一个 main thread 主线程和 call - stack 调用栈(执行栈) ，所有的任务都会被放到调用栈等待主线程执行。

// JS 调用栈

// JS 调用栈是一种后进先出的数据结构。当函数被调用时，会被添加到栈中的顶部，执行完成之后就从栈顶部移出该函数，直到栈内被清空。

// 同步任务、异步任务

// JavaScript 单线程中的任务分为同步任务和异步任务。同步任务会在调用栈中按照顺序排队等待主线程执行，异步任务则会在异步有了结果后将注册的回调函数添加到任务队列(消息队列)中等待主线程空闲的时候，也就是栈内被清空的时候，被读取到栈中等待主线程执行。任务队列是先进先出的数据结构。

// Event Loop

// 调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。每次栈内被清空，都会去读取任务队列有没有任务，有就读取执行，一直循环读取 - 执行的操作，就形成了事件循环。



// image





// image



// 定时器

// 定时器会开启一条定时器触发线程来触发计时，定时器会在等待了指定的时间后将事件放入到任务队列中等待读取到主线程执行。

// 定时器指定的延时毫秒数其实并不准确，因为定时器只是在到了指定的时间时将事件放入到任务队列中，必须要等到同步的任务和现有的任务队列中的事件全部执行完成之后，才会去读取定时器的事件到主线程执行，中间可能会存在耗时比较久的任务，那么就不可能保证在指定的时间执行。

// 宏任务(macro - task) 、微任务(micro - task)

// 除了广义的同步任务和异步任务，JavaScript 单线程中的任务可以细分为宏任务和微任务。

// macro - task包括：script(整体代码), setTimeout, setInterval, setImmediate, I / O, UI rendering。

// micro - task包括：process.nextTick, Promises, Object.observe, MutationObserver。

// 复制代码
console.log(1);
setTimeout(function () {
    console.log(2);
})
var promise = new Promise(function (resolve, reject) {
    console.log(3);
    resolve();
})
promise.then(function () {
    console.log(4);
})
console.log(5);
// 复制代码


// 示例中，setTimeout 和 Promise被称为任务源，来自不同的任务源注册的回调函数会被放入到不同的任务队列中。

// 有了宏任务和微任务的概念后，那 JS 的执行顺序是怎样的？是宏任务先还是微任务先？

// 第一次事件循环中，JavaScript 引擎会把整个 script 代码当成一个宏任务执行，执行完成之后，再检测本次循环中是否寻在微任务，存在的话就依次从微任务的任务队列中读取执行完所有的微任务，再读取宏任务的任务队列中的任务执行，再执行所有的微任务，如此循环。JS 的执行顺序就是每次事件循环中的宏任务 - 微任务。

// 上面的示例中，第一次事件循环，整段代码作为宏任务进入主线程执行。
// 遇到了 setTimeout ，就会等到过了指定的时间后将回调函数放入到宏任务的任务队列中。
// 遇到 Promise，将 then 函数放入到微任务的任务队列中。
// 整个事件循环完成之后，会去检测微任务的任务队列中是否存在任务，存在就执行。
// 第一次的循环结果打印为: 1, 3, 5, 4。
// 接着再到宏任务的任务队列中按顺序取出一个宏任务到栈中让主线程执行，那么在这次循环中的宏任务就是 setTimeout 注册的回调函数，执行完这个回调函数，发现在这次循环中并不存在微任务，就准备进行下一次事件循环。
// 检测到宏任务队列中已经没有了要执行的任务，那么就结束事件循环。
// 最终的结果就是 1, 3, 5, 4, 2。






// 从一个例子说起
var start = new Date()

setTimeout(function () {
    var end = new Date
    console.log('Time elapsed:', end - start, 'ms')
}, 500)

while (new Date() - start < 1000) {
}
// 有其他语言能完成预期的功能吗？Java, 在Java.util.Timer中，对于定时任务的解决方案是通过多线程手段实现的，任务对象存储在任务队列，由专门的调度线程，在新的子线程中完成任务的执行

// js是单线程的
// JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。

// 为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

// 函数调用栈和任务队列
// image

// 调用栈
// JS执行时会形成调用栈, 调用一个函数时, 返回地址、参数、本地变量都会被推入栈中, 如果当前正在运行的函数中调用另外一个函数, 则该函数相关内容也会被推入栈顶.该函数执行完毕, 则会被弹出调用栈.变量也随之弹出, 由于复杂类型值存放于堆中, 因此弹出的只是指针, 他们的值依然在堆中, 由GC决定回收.

//     事件循环（event loop） & 任务队列（task queue）
// JavaScript 主线程拥有一个执行栈以及一个任务队列

// 遇到异步操作（例如：setTimeout, AJAX）时，异步操作会由浏览器(OS)执行，浏览器会在这些任务完成后，将事先定义的回调函数推入主线程的任务队列(task queue)中, 当主线程的执行栈清空之后会读取task queue中的回调函数, 当task queue被读取完毕之后, 主线程接着执行, 从而进入一个无限的循环, 这就是事件循环.

//     主线程执行栈 & 任务队列 循环执行，构成事件循环

// 结论
// setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行。

// 另一个例子
(function test () {
    setTimeout(function () { console.log(4) }, 0);
    new Promise(function executor (resolve) {
        console.log(1);
        for (var i = 0; i < 10000; i++) {
            i == 9999 && resolve();
        }
        console.log(2);
    }).then(function () {
        console.log(5);
    });
    console.log(3);
})()
// Macrotask & Microtask
// macrotask 和 microtask 是异步任务的两种分类。在挂起任务时，JS 引擎会将所有任务按照类别分到这两个队列中，首先在 macrotask 的队列（这个队列也被叫做 task queue）中取出第一个任务，执行完毕后取出 microtask 队列中的所有任务顺序执行；之后再取 macrotask 任务，周而复始，直至两个队列的任务都取完。

// macro - task: script（整体代码）, setTimeout, setInterval, setImmediate, I / O, UI rendering
// micro - task: process.nextTick, Promises（这里指浏览器实现的原生 Promise）, Object.observe, MutationObserver
// image

// 结论
// 全部代码(script) macrotask -> microtask queue(含有promise.then) -> macrotask(setTimeout) -> 下一个microtask

// Node.js的事件循环
// process.nextTick & setImmediate
// process.nextTick指定的任务总是发生在所有异步任务之前
// setImmediate指定的任务总是在下一次Event Loop时执行
process.nextTick(function A () {
    console.log(1);
    process.nextTick(function B () { console.log(2); });
});

setTimeout(function timeout () {
    console.log('TIMEOUT FIRED');
}, 0)
new Promise(function (resolve) {
    console.log('glob1_promise');
    resolve();
}).then(function () {
    console.log('glob1_then')
})
process.nextTick(function () {
    console.log('glob1_nextTick');
})
// 总结
// 通过学习函数调用栈，任务队列，MacroTask, MicroTask等概念，对js中的事件循环机制有更深的理解，在以后面对setTimeout, setInterval等异步操作时，更清晰的理解其运行机制，避免写出不可控的代码。