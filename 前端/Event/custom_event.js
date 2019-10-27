// 1. 事件的创建
// JS中，最简单的创建事件方法，是使用Event构造器：

var myEvent = new Event('event_name');

// 但是为了能够传递数据，就需要使用 CustomEvent 构造器：

var myEvent = new CustomEvent('event_name', {
    detail:{
        // 将需要传递的数据写在detail中，以便在EventListener中获取
        // 数据将会在event.detail中得到
    },
});


// 事件的监听
// JS的EventListener是根据事件的名称来进行监听的，比如我们在上文中已经创建了一个名称为‘event_name’ 的事件，那么当某个元素需要监听它的时候，就需要创建相应的监听器：

//假设listener注册在window对象上
window.addEventListener('event_name', function(event){
    // 如果是CustomEvent，传入的数据在event.detail中
    console.log('得到数据为：', event.detail);

    // ...后续相关操作
});

// 至此，window对象上就有了对‘event_name’ 这个事件的监听器，当window上触发这个事件的时候，相关的callback就会执行。

// 3. 事件的触发
// 对于一些内置（built-in）的事件，通常都是有一些操作去做触发，比如鼠标单击对应MouseEvent的click事件，利用鼠标（ctrl+滚轮上下）去放大缩小页面对应WheelEvent的resize事件。 
// 然而，自定义的事件由于不是JS内置的事件，所以我们需要在JS代码中去显式地触发它。方法是使用 dispatchEvent 去触发（IE8低版本兼容，使用fireEvent）：

// 首先需要提前定义好事件，并且注册相关的EventListener
var myEvent = new CustomEvent('event_name', { 
    detail: { title: 'This is title!'},
});
window.addEventListener('event_name', function(event){
    console.log('得到标题为：', event.detail.title);
});
// 随后在对应的元素上触发该事件
if(window.dispatchEvent) {  
    window.dispatchEvent(myEvent);
} else {
    window.fireEvent(myEvent);
}
// 根据listener中的callback函数定义，应当会在console中输出 "得到标题为： This is title!"



/**------------------------------------------------------------------------------------------------------------------------------------ */



// 下面绑定事件的代码，进行了兼容性处理，能够被所有浏览器支持：

function addEvent(obj,type,handle){
    try{ // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        obj.addEventListener(type,handle,false);
    }catch(e){
        try{ // IE8.0及其以下版本
            obj.attachEvent('on' + type,handle);
        }catch(e){ // 早期浏览器
            obj['on' + type] = handle;
        }
    }
}

// 自定义事件
var $ = function(el) {
    return new _$(el);    
};
var _$ = function(el) {
    this.el = (el && el.nodeType == 1)? el: document;
};
_$.prototype = {
    constructor: this,
    addEvent: function(type, fn, capture) {
        var el = this.el;
        if (window.addEventListener) {
            el.addEventListener(type, fn, capture);
            var ev = document.createEvent("HTMLEvents");
            ev.initEvent(type, capture || false, false);

            if (!el["ev" + type]) {
                el["ev" + type] = ev;
            }  
        } else if (window.attachEvent) {
            el.attachEvent("on" + type, fn);    
            if (isNaN(el["cu" + type])) {
                // 自定义属性
                el["cu" + type] = 0; 
            }   
            var fnEv = function(event) {
                if (event.propertyName == "cu" + type) { fn.call(el); }
            };
            el.attachEvent("onpropertychange", fnEv);     
            if (!el["ev" + type]) {
                el["ev" + type] = [fnEv];
            } else {
                el["ev" + type].push(fnEv);    
            }
        }
        return this;
    },
    fireEvent: function(type) {
        var el = this.el;
        if (typeof type === "string") {
            if (document.dispatchEvent) {
                if (el["ev" + type]) {
                    el.dispatchEvent(el["ev" + type]);
                }
            } else if (document.attachEvent) {
                el["cu" + type]++;
            }    
        }    
        return this;
    },
    removeEvent: function(type, fn, capture) {
        var el = this.el;
        if (window.removeEventListener) {
            el.removeEventListener(type, fn, capture || false);
        } else if (document.attachEvent) {
            el.detachEvent("on" + type, fn);
            var arrEv = el["ev" + type];
            if (arrEv instanceof Array) {
                for (var i=0; i<arrEv.length; i+=1) {
                    el.detachEvent("onpropertychange", arrEv[i]);
                }
            }
        }
        return this;    
    }
};


$(elImage)
    .addEvent("click", funClick)
    .addEvent("alert", funAlert1)
    .addEvent("alert", funAlert2);
// 而funClick方法中有等同下面脚本：

$(e.target).fireEvent("alert");
// 因此，点击图片，才会出现三个弹出框：用户点击图片 → 执行funClick → 第一个弹框 → 执行fireEvent → 触发自定义"alert"事件 → 连续两个"alert"事件弹框

// 当点击图片下面的按钮清除掉自定义"alert"事件后，再点击图片就只有一个弹出





/**-------------------------------------------------------------------------------------------------------------------------------------- */


// 在js开发过程中，往往ui和js过度的耦合，这种并不是我们想要的结果。

// 通过事件可以达到解耦合的效果。

// 第一种方法；

var EventTarget=function(){
         this._listeners={};
     }

EventTarget.prototype={
         constructor:this,
         addEventListener:function(type,fn){
             if (typeof this._listeners[type]==="undefined") {
                 this._listeners[type]=[];
             }
             if (typeof fn==="function") {
                 this._listeners[type].push(fn);
                 this.doEvent(type," jun");此处调用监听方法
             }
         },
         doEvent:function(type,parameter){
            var arrayEvent=this._listeners[type];
            if (arrayEvent instanceof Array) {
                for (var i = 0,length =arrayEvent.length; i <length ; i++) {
                       if (typeof arrayEvent[i] ==="function") {
                              arrayEvent[i]({parameter:parameter});//此处传递参数
                       }
                }
            }
            return this;
         },
         removeEvent:function(type,fn){
            var arrayEvent=this._listeners[type];
            if (typeof type==="string"&&arrayEvent instanceof Array) {
                if (typeof fn==="function") {
                    for (var i =0,length=arrayEvent.length; i <length ; i++) {
                        if (arrayEvent[i]===fn) {
                            this._listeners[type].splice(i,1);
                            break;
                        }
                }
            }else{
                    delete this._listeners[type];
                }
            }
            return this;
         }
     }
     
     var eventTarget=new EventTarget();
     eventTarget.addEventListener("say",function(data){
         alert("hello world"+data.parameter);
     });//添加事件监听

// 通过为"say"添加方法，当fireEvent()执行到"say"方法。会调用添加的function。从而可以取出js中的数据并作用到ui上。

// 第二种方法

// 其实dom元素中可以自己加入自定义方法并在合适的时候触发该方法

$("p").bind("myEvent", function (event, message1, message2) {//第一个参数是事件，第二，三个参数是发送过来的数据。
      alert(message1 + ' ' + message2);

};

$('p').trigger("myEvent", ["Hello","World!"]);//“hello”是第一个数据，"world"是第二个数据

// 其中myEvent是自己定义的任意事件名称。只要选择器选择的是相同的dom元素，那么在任何地方都能触发bind的方法，比如；

function showMsg(event) {  
       $('p').trigger("myEvent", ["Hello","World!"]);
}




