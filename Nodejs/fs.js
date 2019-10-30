Node.js之fs用法详解

// Node.js 内置的fs模块就是文件系统模块，负责读写文件。和所有其他JS模块不同的是，fs模块同时提供了异步和同步的方法。

// 文件写入
var fs = require("fs");
//       要写入的文件   要写入的内容       a追加|w写入（默认）|r（读取）  回调函数
fs.writeFile("11.txt","我是要写入的11.txt文件的内容",{flag:"a"},function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log("写入成功");
    }
})

// 运行上述代码的时候，会发现该父级文件夹下会自动生成一个11.txt文件。

fs.appendFile("11.txt","这是要追加的内容",function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log("追加成功");
    }

})

// 因为是追加的内容，所以内容会自动在该文件后面

// 上面说的方法都是异步操作，异步操作会返回一个回调函数，在回调函数里面执行结束语句，不然会出现错误

// 而所有的同步函数，都只是在异步函数后面加上Sync

var res = fs.writeFileSync("11.txt","这里面是使用同步方法写的内容");
console.log(res);
// 文件读取
// 异步方法读取文件

//文件读取
fs.readFile("11.txt",function (err,data) {
    if(err){
        return console.log(err);
    }else {
        //toString() 将buffer格式转化为中文
        console.log(data.toString());
    }
})

// 如果使用同步的方法,不需要在后面使用回调方法

var data = fs.readFileSync("11.txt");
console.log(data.toString());
// 文件修改
//    要修改名字的文件  修改后的名字  回调函数
fs.rename("11.txt","22.txt",function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("修改成功");
    }
})
// 文件删除
//删除文件
fs.unlink("11.txt",function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log("删除成功");
    }
})
// 文件复制（先读取，在复制）
// 异步方法

fs.readFile("22.txt",function (err,data) {
    if(err){
        return console.log(err);
    }else{
        var getData = data.toString();
        fs.writeFile("33.txt",getData,function (err) {
            if(err){
                return console.log(err);
            }else {
                console.log("复制欧克");
            }
        })
    }
})
// 同步方法,相比异步少了很对回调

var res = fs.writeFileSync("44.txt",fs.readFileSync("22.txt"));
console.log(res);
// 文件夹创建
//文件夹创建
//1 -- 执行   2 -- 写入  4 -- 读取  7=1+2+4  以为创建的文件夹可执行可读可写
fs.mkdir("img",0777,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("创建成功");
    }
})
// 上述的权限就是在文件简介里面权限


// 文件权限
// 修改文件夹权限
fs.chmod("img",0333,function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log("修改ok");
    }
})

// 修改文件夹名字，与修改文件是同一个函数
//修改文件夹名称
fs.rename("img","image",function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log("修好");
    }
})
// 判断某个文件件是否存在，如果不存在创建，exists函数，是唯一一个回调函数中不带err的回调函数
fs.exists("img",function (exists) {
    if(exists){
        console.log("该文件夹已经存在");
    }else {
        fs.mkdir("img",function (err) {
            if(err){
                return console.log(err);
            }else {
                console.log("创建成功");
            }
        })
    }
})
// 删除文件夹（只能删除空的文件夹）
fs.rmdir("img",function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log("删除成功");
    }
})
// 读取文件夹里面的信息
fs.readdir("image",function (err,data) {
    if(err){
        console.log(err);
    }else {
        console.log(data);
    }
})

// 判断一个位置问价是否是文件或者是文件件
fs.stat("image",function (err,data) {
   if(err){
       return console.log(err);
   }else {
       //判断是否是文件
       if(data.isFile()){
           //是文件
           console.log("yes");
       }else{
           //是文件夹
           console.log("no");
       }
   }
})
// 删除非空文件夹
// 首先获取到该文件夹里面所有的信息，遍历里面的信息，判断是文件还是文件夹，如果是文件直接删除，如果是文件，进入文件，重复上述过程
function delFile(url) {
    var data = fs.readdirSync(url);
    for(var i = 0;i < data.length;i++){
        // console.log(data[i])
        var path = url + "/" +data[i];
        console.log(path);
        var stat = fs.statSync(path);
        if(stat.isFile()){
            fs.unlinkSync(path);
        }else{
            delFile(path);
        }
    }
    fs.rmdirSync(url);
}
delFile("image");