//1.通过new File()将base64转换成file文件，此方式需考虑浏览器兼容问题。

//将base64转换为文件
var dataURLtoFile= function(dataurl, filename) { 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};


//调用
var file = dataURLtoFile(base64Data, imgName);




//2.先将base64转换成blob，再将blob转换成file文件，此方法不存在浏览器不兼容问题。

//将base64转换为blob
var dataURLtoBlob= function(dataurl) { 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};
//将blob转换为file
var blobToFile= function(theBlob, fileName){
   theBlob.lastModifiedDate = new Date();
   theBlob.name = fileName;
   return theBlob;
};
//调用
var blob = dataURLtoBlob(base64Data);
var file = blobToFile(blob, imgName);
