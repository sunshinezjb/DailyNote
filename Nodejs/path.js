// 一、path模块的引入。

// 直接引用。node中自带的模块

const path = require('path');
// 二、path.join(path1，path2，path3.......)

//   作用：将路径片段使用特定的分隔符（window：\）连接起来形成路径，并规范化生成的路径。若任意一个路径片段类型错误，会报错。

const path = require('path');
let myPath = path.join(__dirname,'/img/so');
let myPath2 = path.join(__dirname,'./img/so');
let myPath3=path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
 
 
console.log(__dirname);           
console.log(myPath);    
console.log(myPath2);   
console.log(myPath3);  


// 三、path.resolve([from...],to)

// 作用：把一个路径或路径片段的序列解析为一个绝对路径。相当于执行cd操作。

// /被解析为根目录。

let myPath = path.resolve(__dirname,'/img/so');
let myPath2 = path.resolve(__dirname,'./img/so');
let myPath3=path.resolve('/foo/bar', './baz');
let myPath4=path.resolve('/foo/bar', '/tmp/file/');
 
console.log(__dirname);           
console.log(myPath);    
console.log(myPath2);   
console.log(myPath3);  
console.log(myPath4);  
