<template>
    <div class="page-content">
        <mf1-header title="用户需求签名">
          <mf1-button slot="right" @tap="handelClearEl()" type="danger">清除</mf1-button>
          <mf1-button slot="right" @tap="saveImage()" type="danger">保存</mf1-button>
        </mf1-header>
        <div class="sign-content">
            <div class="div_canvas_container">
              <canvas id="signCanvas"></canvas>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    //数字签名
    name : 'digitaSign',
    data() {
        return{
            imgsrc:""
        }
    },
    mounted() {
        let vm = this;
        vm.digitaSignType = vm.$route.query.type;
        this.$nextTick(()=>{
          setTimeout(() => {
              vm.initCanvas()
            },100)
        });

        /**---------------------------横屏-------------------------------*/
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
              oCanvas.width = oCanvas.offsetWidth*rate;
              oCanvas.height = oCanvas.offsetHeight*rate;
            } else if (/(Android)/i.test(navigator.userAgent)) {
              //Android终端
              oCanvas.width = oCanvas.offsetHeight*rate;
              oCanvas.height = oCanvas.offsetWidth*rate;
            }
 
    },
    methods: {
        initCanvas(){
            let rate = 2;
            let oCanvas = document.getElementById("signCanvas");
            oCanvas.width = oCanvas.offsetWidth*rate;
            oCanvas.height = oCanvas.offsetHeight*rate;
            let cxt = oCanvas.getContext("2d");
            cxt.fillStyle = "#fff";
            cxt.fillRect(0, 0, oCanvas.width, oCanvas.height);
            cxt.lineWidth = 2*rate;
            cxt.strokeStyle="#101010";
            let posX = 0; //x坐标
            let posY = 0; //y坐标
            let position = null;
            let parentPosintin = oCanvas.getBoundingClientRect()
 
            //手指触摸屏幕可记录此时的位置作为起点
            oCanvas.addEventListener("touchstart", function(event) {
              posX = event.changedTouches[0].clientX;
              posY = event.changedTouches[0].clientY - parentPosintin.top + 0.5;
              cxt.beginPath();
              cxt.moveTo(posX*rate, posY*rate);
            });
            //手指屏滑动画线
            oCanvas.addEventListener("touchmove", function(event) {
              optimizedMove(event);
            });
            let requestAnimationFrame = window.requestAnimationFrame;
            let optimizedMove = requestAnimationFrame ? function(e){
              requestAnimationFrame(function(){
                move(e);
              });
            } : move;
            function move(event){
              posX = event.changedTouches[0].clientX  + 0.5;
              posY = event.changedTouches[0].clientY - parentPosintin.top + 0.5;
              cxt.lineTo(posX*rate, posY*rate);
              cxt.stroke();
            }
        },
        // 清除画板
        handelClearEl() {
          let oCanvas = document.getElementById("signCanvas");
          let cxt = oCanvas.getContext("2d");
          cxt.clearRect(0, 0, oCanvas.width, oCanvas.height);
        },
        //保存为图片
        saveImage() {
            let oCanvas = document.getElementById("signCanvas");
            let imgBase64 = oCanvas.toDataURL();
            this.imgsrc = imgBase64;
            if(this.digitaSignType == "partyA"){
                this.$store.commit("SET_PAERT_A_IMG", imgBase64)
            }else{
                this.$store.commit("SET_PAERT_B_IMG", imgBase64)
            }
            mui.back();
        }
    }
}



</script>

<style lang="scss">
    .div_canvas_container {
				// margin-top: 1.35rem;
				width: 100vw;
				height: 100vh;
        overflow: hidden;
		}
      #signCanvas{
				width: 100%;
				height: 100%;
				background: #FFFFFF;
				border: none;
        box-sizing: border-box;
        overflow: hidden;
			}
</style>

