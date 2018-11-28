<template>
    <div class="dialog-imgs">
        <div class="clickImg" @click="dialogImg">
            <img src="../../static/img/dropimg.jpeg" alt="">
        </div>
        <el-dialog
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="true"
            width="60%"
            center>
            <span class="closeClick" @click="clearImg">x</span>
            <div class="imgTopBox" :style="{height: this.height+'px'}" ref="imgTopBox">
                <img ref="user_image" :style="{width: this.width+'px', left: this.left+'px', top: this.top+'px'}"
                    id="imgtol" src="../../static/img/dropimg.jpeg" alt="" @mousedown="move">
            </div>
            <div class="bottomBtn">
                <span @click="enlargeImg()">
                  放大
                </span>
                <span @click="shrinkImg()">
                  缩小
                </span>
                <span @click="rotateImageLeft()">
                  向左旋转
                </span>
                <span @click="rotateImageRight()">
                  向右旋转
                </span>
                <span>
                    <a href="javascript:;" v-downimg="imgUrl">
                        下载
                    </a>
                </span>
            </div>  
        </el-dialog>
        <img ref="imgSize" style="position:absolute;left:-200000px" src="../../static/img/dropimg.jpeg" alt="">
    </div>
</template>
<script>
export default {
    data() {
        return {
            deg: 0,
            current: 0,
            positionX: 0,
            positionY: 0,
            dialogFormVisible: false,
            left: 0,
            top: 0,
            width: '',
            height: '',
            addCount: 0,
            imgUrl: '',
        }
    },
    mounted() {
        this.addCount = 5
        this.height = document.documentElement.clientHeight * 0.6
    },
    methods: {
        dialogImg () {
            let timer = null;
            timer = setTimeout(() => {
                this.width = this.$refs.imgSize.offsetWidth / 2;
                this.height = this.$refs.imgSize.offsetHeight / 2;
                this.left = (document.documentElement.clientWidth / 2) - (this.$refs.imgSize.offsetWidth / 4) - (document.documentElement.clientWidth * 0.2);
                this.top = ((document.documentElement.clientHeight / 2) - (document.documentElement.clientHeight * 0.2) - (this.$refs.imgSize.offsetHeight / 4))
                this.dialogFormVisible = true;
                clearTimeout(timer)
            }, 200)
        },
        clearImg () {
            this.dialogFormVisible = false;
            this.width = this.$refs.imgSize.offsetWidth / 2;
            this.height = this.$refs.imgSize.offsetHeight / 2;
            this.current = 0;
            this.$refs.user_image.style.transform = 'rotate('+this.current+'deg)';
            this.imgUrl = ''
        },
        move (e) {
            const odiv = e.target; // 获取目标元素
            // 鼠标相对元素的位置
            const disX = e.clientX - odiv.offsetLeft;
            const disY = e.clientY - odiv.offsetTop;
            const imgTopBoxWidth = this.$refs.imgTopBox.offsetWidth;
            const imgTopBoxHeight = this.$refs.imgTopBox.offsetHeight;
            const imgWidth = this.$refs.user_image.offsetWidth;
            const imgHeight = this.$refs.user_image.offsetHeight;
            const WtooLarge = imgWidth > imgTopBoxWidth;
            const HtooLarge = imgHeight > imgTopBoxHeight;
            if (WtooLarge && !HtooLarge) {
                document.onmousemove = (e) => { // 鼠标按下并移动的事件
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    // 绑定元素位置到positionX和positionY上面
                    this.positionX = top;
                    this.positionY = left;

                    if (left <= (imgTopBoxWidth - imgWidth)) {
                        left = imgTopBoxWidth - imgWidth;
                    } else if (left >= 0) {
                        left = 0;
                    }

                    if (top <= 0) {
                        top = 0;
                    } else if (top >= imgTopBoxHeight - imgHeight) {
                        top = imgTopBoxHeight - imgHeight;
                    }

                    // 移动当前元素
                    odiv.style.left = left + 'px';
                    odiv.style.top = top + 'px';
                };
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            } else if (!WtooLarge && HtooLarge) {
                document.onmousemove = (e) => { // 鼠标按下并移动的事件
                    // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    // 绑定元素位置到positionX和positionY上面
                    this.positionX = top;
                    this.positionY = left;

                    if (left <= 0) {
                        left = 0;
                    } else if (left >= imgTopBoxWidth - imgWidth) {
                        left = imgTopBoxWidth - imgWidth;
                    }

                    if (top >= 0) {
                        top = 0;
                    } else if (top <= imgTopBoxHeight - imgHeight) {
                        top = imgTopBoxHeight - imgHeight;
                    }

                    // 移动当前元素
                    odiv.style.left = left + 'px';
                    odiv.style.top = top + 'px';
                };
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            } else if (WtooLarge && HtooLarge) {
                document.onmousemove = (e) => { // 鼠标按下并移动的事件
                    // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    // 绑定元素位置到positionX和positionY上面
                    this.positionX = top;
                    this.positionY = left;

                    if (left >= 0) {
                        left = 0;
                    } else if (left <= imgTopBoxWidth - imgWidth) {
                        left = imgTopBoxWidth - imgWidth;
                    }

                    if (top >= 0) {
                        top = 0;
                    } else if (top <= imgTopBoxHeight - imgHeight) {
                        top = imgTopBoxHeight - imgHeight;
                    }

                    // 移动当前元素
                    odiv.style.left = left + 'px';
                    odiv.style.top = top + 'px';
                };
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
            e.preventDefault()
            // this.enlargeImg()
        },
        // 放大图片
        enlargeImg () {
            this.addCount += 1;
            if (this.addCount > 16) {
                this.addCount = 16;
                return false;
            }
            this.height += this.$refs.imgSize.offsetHeight * 0.1;
            this.width += this.$refs.imgSize.offsetWidth * 0.1;
            this.left = (this.$refs.imgTopBox.offsetWidth / 2) - (this.width / 2);
            this.top = (this.$refs.imgTopBox.offsetHeight / 2) - (this.height / 2);
        },
        // 缩小
        shrinkImg () {
            this.addCount -= 1;
            if (this.addCount < 5) {
                this.addCount = 5;
                return false
            }
            this.height += this.$refs.imgSize.offsetHeight * -0.1;
            this.width += this.$refs.imgSize.offsetWidth * -0.1;
            this.left = (this.$refs.imgTopBox.offsetWidth / 2) - (this.width / 2);
            this.top = (this.$refs.imgTopBox.offsetHeight - this.height) / 2;
        },
        // 旋转图片
        rotateImageLeft() {
            if (this.width > this.$refs.imgSize.offsetWidth / 2 || this.width < this.$refs.imgSize.offsetWidth / 2) {
                this.width = this.$refs.imgSize.offsetWidth / 2;
                this.height = this.$refs.imgSize.offsetHeight / 2;
                this.$refs.user_image.style.transform = 'rotate('+this.current+'deg)';
            } else {
                this.current = (this.current - 90) % 360;
                this.$refs.user_image.style.transform = 'rotate('+this.current+'deg)';
            }
            this.left = (this.$refs.imgTopBox.offsetWidth / 2) - (this.width / 2);
            this.top = (this.$refs.imgTopBox.offsetHeight - this.height) / 2;
            this.addCount = 5
        },
        rotateImageRight() {
            if (this.width > this.$refs.imgSize.offsetWidth / 2 || this.width < this.$refs.imgSize.offsetWidth / 2) {
                this.width = this.$refs.imgSize.offsetWidth / 2;
                this.height = this.$refs.imgSize.offsetHeight / 2;
                this.$refs.user_image.style.transform = 'rotate('+this.current+'deg)';
            } else {
                this.current = (this.current + 90) % 360;
                this.$refs.user_image.style.transform = 'rotate('+this.current+'deg)';
            }
            this.left = (this.$refs.imgTopBox.offsetWidth / 2) - (this.width / 2);
            this.top = (this.$refs.imgTopBox.offsetHeight - this.height) / 2;
            this.addCount = 5
        },
    }
}

</script>
<style>
    .clickImg {
        width: 200px;
        height: 200px;
        position: absolute;
    }
    .clickImg img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .el-dialog {
        width: 100%;
        overflow: hidden;
        background: none;
        box-shadow: none;
    }
    .el-dialog__header {
        display: none;
    }
    .el-dialog__body {
        height: 300px;
        position: relative;
        padding: 0;
    }
    .imgTopBox {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin: 0 auto;
    }
    .imgTopBox img {
        position: absolute;
        margin: 0 auto;
    }
    .bottomBtn {
        width: 700px;
        height: 25px;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -350px;
        text-align: center;
    }
    .closeClick {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>
