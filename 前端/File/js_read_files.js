// 首先我们定义一个input标签type="file"

// jsReadFile:<input type="file" οnchange="jsReadFiles(this.files)"/>

// 然后我们定义一个jsReadFiles的方法将文件作为参数；当上传文件的时候读取这个文件

//js 读取文件
    function jsReadFiles(files) {
            if (files.length) {
                 var file = files[0];
                var reader = new FileReader();//new一个FileReader实例
                if (/text+/.test(file.type)) {//判断文件类型，是不是text类型
                     reader.onload = function() {
                         $('body').append('<pre>' + this.result + '</pre>');
                     }
                    reader.readAsText(file);
                } else if(/image+/.test(file.type)) {//判断文件是不是imgage类型
                    reader.onload = function() {
                        $('body').append('<img src="' + this.result + '"/>');
                    }
                    reader.readAsDataURL(file);
                }
            }
    }



    // 这里用到了html5的FileReader这个对象来完成；

    // FileReader接口的方法：
    // readAsBinaryString                   file                                              将文件读取为二进制编码
    // readAsText                           file,[encoding]                                   将文件读取为文本，其中第二个参数是文本的编码方式，默认值为 UTF-8
    // readAsDataURL                        file                                              将文件读取为DataURL
    // abort                                (none)                                            中断读取操作(无论读取成功或失败，方法并不会返回读取结果，这一结果存储在result属性中)
    
    // 相关事件：
    
    // onabort                               中断
    // onerror                               出错
    // onloadstart                     　  开始
    // onprogress                          正在读取
    // onload                                成功读取
    // onloadend                           读取完成，无论成功失败
    
    // 文件一旦开始读取，无论成功或失败，实例的 result 属性都会被填充。如果读取失败，则 result 的值为 null ，否则即是读取的结果。
    
    // 如果读取文件过大的话fileReader允许分段读取文件；

    var blob_file;
        if(file.webkitSlice) {  //chrome
            blob_file= file.webkitSlice(start, end + 1, 'text/plain;charset=UTF-8');
        } else if(file.mozSlice) { //Firefox
            blob_file= file.mozSlice(start, end + 1, 'text/plain;charset=UTF-8');
        }