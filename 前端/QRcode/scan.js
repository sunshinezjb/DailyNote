// H5实现扫一扫

// 在本案例主要利用H5自带的API navigator的getUserMedia方法获得摄像头，并通过createObjectURL将数据流复制给video标签的src。

2.主html面：（直接复制即可调起摄像头）

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0, user-scalable=no, width=device-width">
<meta content="yes" name="apple-mobile-web-app-capable" /> 
<meta content="black" name="apple-mobile-web-app-status-bar-style" /> 
<meta content="telephone=no" name="format-detection" /> 
<meta content="email=no" name="format-detection" /><!--禁止Android中自动识别页面中的邮件地址--> 
<title>扫一扫</title>
<script src="js/jquery-1.10.2.min.js"></script> 
<style>
#video {
    height: 400px;
    width: 400px;
    display: block;
    margin: 0;
    padding: 0;
}
#canvas {
    height: 400px;
    width: 800px;
    display: block;
    margin: 0;
    padding: 0;
}
</style>  
<video  id="video">
<script>
    var flag = true;
    window.addEventListener("DOMContentLoaded", function () {
        var video = document.getElementById("video"), canvas, context;
        try {
            canvas = document.createElement("canvas");
            canvas.width = 640;
            canvas.height = 480;
            context = canvas.getContext("2d");
        } catch (e) { alert("not support canvas!"); return; }
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
 
        if (navigator.getUserMedia)
            navigator.getUserMedia(
                { "video": true },
                function (stream) {
                    if (video.mozSrcObject !== undefined)video.mozSrcObject = stream;
                    else video.src = ((window.URL || window.webkitURL || window.mozURL || window.msURL) && window.URL.createObjectURL(stream)) || stream;               
                    video.play();
                },
                function (error) {
                    alert("请检查是否存在或者开启摄像头");
                    flag = false;
                }
            );
        else alert("Native device media streaming (getUserMedia) not supported in this browser");
       
        setInterval(function () {
        	if(!flag){
        		return;
        	}
            context.drawImage(video, 0, 0, canvas.width = video.videoWidth, canvas.height = video.videoHeight);
    		var image = canvas.toDataURL("image/png").replace("data:image/png;base64,", ""); 
            $.ajax({
				url : 'qRCodeAction_decoderQRCode.action',
				async : false,
				type : 'post',
				data : {
					'time' : (new Date()).toString(),
					'img' : image
				},
				success : function(message) {
					if(message!=null){
					  flag=false;
					  window.location.href='qRCodeActionshow.action?message='+message;
					}
				},
		    });
        }, 5000);
    }, false);
 </script> 
</head>
<body>
</body>
</html>

{/* 3.主要代码： */}

	{/* /**
	 * 解析二维码
	 */ */}
	public String decoderQRCode(){
		try {
			String realpath = ServletActionContext.getServletContext().getRealPath("/file");
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			String imgName = sdf.format(new Date()) + ".png";
			String filePath = realpath+Constants.SF_FILE_SEPARATOR+imgName;
			OutputStream out = new FileOutputStream(filePath);
			QRCode.GenerateImage(img,out);//生成图片
			message  = QRCode.decoderQRCode(filePath);
			int index=message.indexOf('=');
			message=message.substring(index+1);
			System.out.println(message);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

4.二维码生成：（附带）

	/**
	 * 生成二维码
	 */
	public String encoderQRCode(){
		String realpath = ServletActionContext.getServletContext().getRealPath("/file");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String imgName = sdf.format(new Date()) + ".png";
		String  imgPath= realpath+"/"+imgName;
		QRCode.encoderQRCode(content, imgPath, "png");
		message = imgName;
		return Action.SUCCESS;
	}

————————————————
版权声明：本文为CSDN博主「Porcelain_cs」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/porcelain_cs/article/details/72794393s

