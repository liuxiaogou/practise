<template>
  <div id="app">
      <HelloWorld></HelloWorld> 
      <canvas id="c"></canvas>
      <button @click="stopAnimation">停止动画</button>
      <button @click="reply">回复</button>
      
  </div>
</template>

<script>
 import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
     HelloWorld
  },
  data(){
    return {
        scene:null,
        stop_animation:false
    }
  },
  methods: {
      init(){
        const canvas = document.querySelector('#c');
        const arr =['/static/file/','/castle.mtl','/static/file/castle.obj']; //加载外部文件的路径
        this.scene = new FY_3(canvas,{animation:true}); //创建一个构造函数的实例，一个实例代表了一个3d场景
        this.scene.scene.add(this.scene.planeGeometry())
        this.scene.getMtlAndObj(arr,(object)=>{
          this.scene.scene.add(object);  //加载成功后添加到场景中去
           //this.scene.render(); //执行渲染函数
            requestAnimationFrame(this.action) //开始动画
          this.scene.controls.addEventListener('change',()=>{ //监听鼠标、键盘事件 
             this.scene.render(); //执行渲染函数
          });
          canvas.addEventListener( 'mousedown',this.onMouseDown, false ); //监听鼠标按下事件
        });
      },
      action (){
        cancelAnimationFrame(this.num);   //取消动画
        if(!this.stop_animation){
           this.num = requestAnimationFrame(this.action);   
           this.scene.scene.rotateY(0.008);   //方式二  增量弧度
        }
         this.scene.scene.children[1].position.set(0,0,500);   //网格偏移量
        // this.scene.scene.children[2].rotateY(0.01);
         this.scene.render(); //执行渲染函数
      },
      onMouseDown(event){
         let arr =this.scene.event(event,this.scene.scene.children[2].children);
         console.log(arr);
      },
      stopAnimation(){
        this.stop_animation = !this.stop_animation;
        this.action();
      },
      reply(){
        this.stop_animation = true;
        this.init(); //执行渲染函数
      }
  },
  mounted() {
    this.init();
    // this.initThreeClickEvent();
  },

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#c{
  width:600px;
  height: 300px;
}
</style>
