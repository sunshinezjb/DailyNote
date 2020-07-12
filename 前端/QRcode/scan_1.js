<script src="../../../js/plugins/jquery-2.1.4/jquery.min.js"></script>
//以下是微信JS-SDK的文件，必须引入
<script src="../../../js/plugins/jweixin-1.0.0.js"></script>




    $.ajax({
        type:"post",
        url:"",//自己填写请求地址
        data:{},
        success:function(result){
            wx.config({
            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            debug: false,
            // 必填，公众号的唯一标识
            appId: result.appId,
            // 必填，生成签名的时间戳
            timestamp:""+result.timestamp,
            // 必填，生成签名的随机串
            nonceStr:result.noncestr,
             // 必填，签名，见附录1
             signature:result.signature,
             // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
             jsApiList : [ 'checkJsApi', 'scanQRCode' ]
             });
          }
    })

    wx.error(function(res) {
        alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
    });

    wx.ready(function() {
        wx.checkJsApi({
             jsApiList : ['scanQRCode'],
             success : function(res) {

             }
        });

        //点击按钮扫描二维码
        document.querySelector('#scanQRCode').onclick = function() {
            wx.scanQRCode({
                needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType : [ "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success : function(res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                 window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
                }
            });
        };

    });
    // 报错：因为页面加载会先请求ajax，所以wx.config配置错误，就会弹出错误。根据错误查找相应解决方案，一般情况都是后台请求参数错误导致的。


