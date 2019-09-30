Set

// 基本用法
// ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。（不包括空对象）

// Set 本身是一个构造函数，用来生成 Set 数据结构。
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
console.log(i);
}
// 2 3 5 4

// 上面代码通过add方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。

// Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[…set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
function divs () {
return […document.querySelectorAll(‘div’)];
}
const set = new Set(divs());
set.size // 56

// 类似于
divs().forEach(div => set.add(div));
set.size // 56

// 上面代码中，例一和例二都是Set函数接受数组作为参数，例三是接受类似数组的对象作为参数。

// 上面代码中，也展示了一种去除数组重复成员的方法。
// 去除数组的重复成员
[…new Set(array)]

// 向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value equality”，它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
// 上面代码向 Set 实例添加了两个NaN，但是只能加入一个。这表明，在 Set 内部，两个NaN是相等。
// 另外，两个对象总是不相等的。
let set = new Set();
set.add({});
set.size // 1
set.add({});
set.size // 2
// 上面代码表示，由于两个空对象不相等，所以它们被视为两个值。

// Set 实例的属性和方法
// Set 结构的实例有以下属性。
// 1：Set.prototype.constructor：构造函数，默认就是Set函数。
// 2：Set.prototype.size：返回Set实例的成员总数。

// Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

// 操作方法

// 1：add(value)：添加某个值，返回 Set 结构本身。

// 2：delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。

// 3：has(value)：返回一个布尔值，表示该值是否为Set的成员。

// 4：clear()：清除所有成员，没有返回值。

// 上面这些属性和方法的实例如下。

// 例1
s.add(1).add(2).add(2);
// 注意2被加入了两次
s.size // 2
s.has(1) // true
s.has(2) // true
s.has(3) // false

例2
s.delete(2);
s.has(2) // false

// 下面是一个对比，看看在判断是否包括一个键上面，Object结构和Set结构的写法不同。
// 对象的写法
const properties = {
‘width’: 1,
‘height’: 1
};
if (properties[someName]) {
// do something
}

// Set的写法
const properties = new Set();
properties.add(‘width’);
properties.add(‘height’);
if (properties.has(someName)) {
// do something
}

// 遍历操作

// Set 结构的实例有四个遍历方法，可以用于遍历成员。

// 1：keys()：返回键名的遍历器

// 2：values()：返回键值的遍历器

// 3：entries()：返回键值对的遍历器

// 4：forEach()：使用回调函数遍历每个成员

// 需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

// （1）keys()，values()，entries()

// keys方法、values方法、entries方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

let set = new Set([‘red’, ‘green’, ‘blue’]);
for (let item of set.keys()) {
console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
console.log(item);
}
// [“red”, “red”]
// [“green”, “green”]
// [“blue”, “blue”]
// 上面代码中，entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。

// Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
// Set.prototype[Symbol.iterator] === Set.prototype.values
// // true
// 这意味着，可以省略values方法，直接用for…of循环遍历 Set。
let set = new Set([‘red’, ‘green’, ‘blue’]);
for (let x of set) {
console.log(x);
}
// red
// green
// blue

// （2）forEach()

// Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。

set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ’ : ’ + value))
// 1 : 1
// 4 : 4
// 9 : 9
// 上面代码说明，forEach方法的参数就是一个处理函数。该函数的参数与数组的forEach一致，依次为键值、键名、集合本身（上例省略了该参数）。这里需要注意，Set 结构的键名就是键值（两者是同一个值），因此第一个参数与第二个参数的值永远都是一样的。

// 另外，forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。

// Array.from方法可以将 Set 结构转为数组
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);

// 这就提供了去除数组重复成员的另一种方法。
function dedupe(array) {
return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]

// 遍历的应用

// 1：扩展运算符（…）内部使用for…of循环，所以也可以用于 Set 结构
let set = new Set([‘red’, ‘green’, ‘blue’]);
let arr = […set];
// [‘red’, ‘green’, ‘blue’]

// 扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。
let arr = [3, 5, 2, 2, 5, 5];
let unique = […new Set(arr)];
// [3, 5, 2]

// 2：数组的map和filter方法也可以间接用于 Set 了
let set = new Set([1, 2, 3]);
set = new Set([…set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([…set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}

// 3：使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([…a, …b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([…a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([…a].filter(x => !b.has(x)));
// Set {1}

// 4：在遍历操作中，同步改变原来的 Set 结构
// 目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([…set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6

// 上面代码提供了两种方法，直接在遍历操作中改变原来的 Set 结构。

// 二：Map
// 含义和基本用法
// JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

// 为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

const m = new Map();
const o = {p: ‘Hello World’};

m.set(o, ‘content’)
m.get(o) // “content”

// 上面代码使用 Map 结构的set方法，将对象o当作m的一个键，然后又使用get方法读取这个键

// 1：作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
const map = new Map([
[‘name’, ‘张三’],
[‘title’, ‘Author’]
]);
map.size // 2
map.has(‘name’) // true
map.get(‘name’) // “张三”

// Map构造函数接受数组作为参数，实际上执行的是下面的算法。
const items = [
[‘name’, ‘张三’],
[‘title’, ‘Author’]
];

const map = new Map();

items.forEach(
([key, value]) => map.set(key, value)
);

例：
const set = new Set([
[‘foo’, 1],
[‘bar’, 2]
]);
const m1 = new Map(set);
m1.get(‘foo’) // 1

const m2 = new Map([[‘baz’, 3]]);
const m3 = new Map(m2);
m3.get(‘baz’) // 3

// 上面代码中，我们分别使用 Set 对象和 Map 对象，当作Map构造函数的参数，结果都生成了新的 Map 对象。

// 2：如果对同一个键多次赋值，后面的值将覆盖前面的值。

// 3：如果读取一个未知的键，则返回undefined。

// 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

const map = new Map();
map.set([‘a’], 555);
map.get([‘a’]) // undefined
// 上面代码的set和get方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此get方法无法读取该键，返回undefined。

// 同理，同样的值的两个实例，在 Map 结构中被视为两个键。
const map = new Map();
const k1 = [‘a’];
const k2 = [‘a’];
map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
// 上面代码中，变量k1和k2的值是一样的，但是它们在 Map 结构中被视为两个键。

// 由上可知，Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

// 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。

let map = new Map();
map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set(‘true’, 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123

// 实例的属性和操作方法
// Map 结构的实例有以下属性和操作方法

// （1）size 属性：size属性返回 Map 结构的成员总数。
const map = new Map();
map.set(‘foo’, true);
map.set(‘bar’, false);
map.size // 2

// （2）set(key, value)：set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
const m = new Map();

m.set(‘edition’, 6) // 键是字符串
m.set(262, ‘standard’) // 键是数值
m.set(undefined, ‘nah’) // 键是 undefined

// set方法返回的是当前的Map对象，因此可以采用链式写法。
let map = new Map()
.set(1, ‘a’)
.set(2, ‘b’)
.set(3, ‘c’);

// （3）get(key)：get方法读取key对应的键值，如果找不到key，返回undefined。
const m = new Map();
const hello = function() {console.log(‘hello’);};
m.set(hello, ‘Hello ES6!’) // 键是函数

m.get(hello) // Hello ES6!

// （4）has(key)：has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
const m = new Map();
m.set(‘edition’, 6);
m.set(262, ‘standard’);
m.set(undefined, ‘nah’);

m.has(‘edition’) // true
m.has(‘years’) // false
m.has(262) // true
m.has(undefined) // true

// （5）delete(key)：delete方法删除某个键，返回true。如果删除失败，返回false。
const m = new Map();
m.set(undefined, ‘nah’);
m.has(undefined) // true

m.delete(undefined)
m.has(undefined) // false

// （6）clear()：clear方法清除所有成员，没有返回值。
let map = new Map();
map.set(‘foo’, true);
map.set(‘bar’, false);

map.size // 2
map.clear()
map.size // 0

// 遍历方法

// Map 结构原生提供三个遍历器生成函数和一个遍历方法。

// 1：keys()：返回键名的遍历器。

// 2：values()：返回键值的遍历器。

// 3：entries()：返回所有成员的遍历器。

// 4：forEach()：遍历 Map 的所有成员。

// 需要特别注意的是，Map 的遍历顺序就是插入顺序。

// 例1：
const map = new Map([
[‘F’, ‘no’],
[‘T’, ‘yes’],
]);

for (let key of map.keys()) {
console.log(key);
}
// “F”
// “T”

// 例2：
for (let value of map.values()) {
console.log(value);
}
// “no”
// “yes”

// 例3：
for (let item of map.entries()) {
console.log(item[0], item[1]);
}
// “F” “no”
// “T” “yes”

// 或者
for (let [key, value] of map.entries()) {
console.log(key, value);
}
// “F” “no”
// “T” “yes”

// 等同于使用map.entries()
for (let [key, value] of map) {
console.log(key, value);
}
// “F” “no”
// “T” “yes”

// 上面代码最后的那个例子，表示 Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。

map[Symbol.iterator] === map.entries
// true

// 1：Map 结构转为数组结构，比较快速的方法是使用扩展运算符（…）。
const map = new Map([
[1, ‘one’],
[2, ‘two’],
[3, ‘three’],
]);

[…map.keys()]
// [1, 2, 3]

[…map.values()]
// [‘one’, ‘two’, ‘three’]

[…map.entries()]
// [[1,‘one’], [2, ‘two’], [3, ‘three’]]

[…map]
// [[1,‘one’], [2, ‘two’], [3, ‘three’]]

// 2：结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
const map0 = new Map()
.set(1, ‘a’)
.set(2, ‘b’)
.set(3, ‘c’);

const map1 = new Map(
[…map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => ‘a’, 2 => ‘b’}

const map2 = new Map(
[…map0].map(([k, v]) => [k * 2, ‘_’ + v])
);
// 产生 Map 结构 {2 => ‘_a’, 4 => ‘_b’, 6 => ‘_c’}

// 3：Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。
map.forEach(function(value, key, map) {
console.log(“Key: %s, Value: %s”, key, value);
});

// forEach方法还可以接受第二个参数，用来绑定this。
const reporter = {
report: function(key, value) {
console.log(“Key: %s, Value: %s”, key, value);
}
};

map.forEach(function(value, key, map) {
this.report(key, value);
}, reporter);

// 上面代码中，forEach方法的回调函数的this，就指向reporter。

// 与其他数据结构的互相转换

// （1）Map 转为数组：前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（…）。

const myMap = new Map()
.set(true, 7)
.set({foo: 3}, [‘abc’]);
[…myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ ‘abc’ ] ] ]

// （2）数组 转为 Map：将数组传入 Map 构造函数，就可以转为 Map。

new Map([
[true, 7],
[{foo: 3}, [‘abc’]]
])

// Map {
// true => 7,
// Object {foo: 3} => [‘abc’]
// }

// （3）Map 转为对象：如果所有 Map 的键都是字符串，它可以转为对象。

function strMapToObj(strMap) {

let obj = Object.create(null);
for (let [k,v] of strMap) {
obj[k] = v;
}
return obj;

}

const myMap = new Map()
.set(‘yes’, true)
.set(‘no’, false);

strMapToObj(myMap)
// { yes: true, no: false }

// （4）对象转为 Map：

function objToStrMap(obj) {
let strMap = new Map();
for (let k of Object.keys(obj)) {
strMap.set(k, obj[k]);
}
return strMap;
}

objToStrMap({yes: true, no: false})
// Map {“yes” => true, “no” => false}

// （5）Map 转为 JSON：Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

function strMapToJson(strMap) {

return JSON.stringify(strMapToObj(strMap));

}

let myMap = new Map().set(‘yes’, true).set(‘no’, false);

strMapToJson(myMap)
// ‘{“yes”:true,“no”:false}’

// 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

function mapToArrayJson(map) {

return JSON.stringify([…map]);

}

let myMap = new Map().set(true, 7).set({foo: 3}, [‘abc’]);

mapToArrayJson(myMap)
// ‘[[true,7],[{“foo”:3},[“abc”]]]’

// （6）JSON 转为 Map：JSON 转为 Map，正常情况下，所有键名都是字符串。

function jsonToStrMap(jsonStr) {

return objToStrMap(JSON.parse(jsonStr));

}

jsonToStrMap(’{“yes”: true, “no”: false}’)
// Map {‘yes’ => true, ‘no’ => false}

// 但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是数组转为 JSON 的逆操作。

function jsonToMap(jsonStr) {

return new Map(JSON.parse(jsonStr));

}

jsonToMap(’[[true,7],[{“foo”:3},[“abc”]]]’)
// Map {true => 7, Object {foo: 3} => [‘abc’]}