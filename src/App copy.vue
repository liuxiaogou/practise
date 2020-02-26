<template>
  <div id="app">
      <canvas id="c"></canvas>
      <HelloWorld></HelloWorld> 
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
      renderer:null,
      camera:null,
      scene:null
    }
  },
  methods: {
      init(){
          /**
         * 创建场景对象Scene
         */
        const canvas = document.querySelector('#c');
        var scene = new THREE.Scene();
        this.scene = scene;
        /**
         * OBJ和材质文件mtl加载
         */
       
        var mtlLoader  = new THREE.MTLLoader();//材质文件加载器
         mtlLoader.setPath('/static/file/');
        var objLoader  = new THREE.OBJLoader();//obj加载器
      //   var manager = new THREE.LoadingManager();
      //  THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
        mtlLoader.load('castle.mtl', function(materials) {
          materials.preload();
          // 返回一个包含材质的对象MaterialCreator
          // console.log(materials);
          //obj的模型会和MaterialCreator包含的材质对应起来
           objLoader.setMaterials(materials);
          //  objLoader.setPath('/static/file/');
          objLoader.load('/static/file/castle.obj', function(object) {
            console.log(object);
             //获取两个翅膀的位置
               
                 object.scale.set(1, 1, 1);
            scene.add(object);//返回的组对象插入场景中
              render();

          })
          
        })
        
        // /**
        /**
        * 创建旋转网格模型
        */
            // var points = [
            //     new THREE.Vector2(50,120),
            //     new THREE.Vector2(25,0),
            //     new THREE.Vector2(50,-300)
            // ];
            // var geometry = new THREE.LatheGeometry(points,30);
            // var material=new THREE.LineBasicMaterial({
            //     color:0xff0000,//三角面颜色
            //     size:5
            // });//材质对象
            // material.wireframe = true;//线条模式渲染(查看细分数)
            // var mesh=new THREE.Line(geometry,material);//旋转网格模型对象
            // scene.add(mesh);//旋转网格模型添加到场景中                 
        //     var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        // var material = new THREE.PointsMaterial({
        //   color: 0x0000ff,
        //   size:5
        // }); //材质对象Material
        // console.log(geometry);
        // var mesh = new THREE.Points(geometry, material); //网格模型对象Mesh
        // scene.add(mesh); //网格模型添加到场景中    
        //点光源
            // var point = new THREE.PointLight(0xffffff);
            // // var color = new THREE.Color("rgb(255, 0, 0)");
            // //  point.intensity=0.1;
            // console.log(point);
            // point.position.set(10000, 50000, 10000); //点光源位置
            //  scene.add(point); //点光源添加到场景中
        // 平行光
        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
        directionalLight.position.set(80, 100, 50);
        // 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
        // directionalLight.target = mesh2;
        // scene.add(directionalLight);    
        //环境光
        var ambient = new THREE.AmbientLight(0xffffff);
        scene.add(ambient);
        // console.log(scene)
        // console.log(scene.children)s 
        /** 
         * 相机设置
         */
        /**透视投影相机对象*/
        var camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 1, 5000);
        camera.position.set(200, 200, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        // camera.lookAt(new THREE.Vector3(0,0,0));
        this.camera = camera;
        // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
        var axisHelper = new THREE.AxisHelper(300);
        scene.add(axisHelper);
        /**
         * 创建渲染器对象
         */
        
        var renderer = new THREE.WebGLRenderer({canvas});
        this.renderer = renderer;
        // renderer.setSize(width, height);//设置渲染区域尺寸
         renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        
        function resizeRendererToDisplaySize(renderer) {
          const canvas = renderer.domElement;
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          const needResize = canvas.width !== width || canvas.height !== height;
          if (needResize) {
            renderer.setSize(width, height, false);
          }
          return needResize;
        }
        function render(){  
          if (resizeRendererToDisplaySize(renderer)) {
              const canvas = renderer.domElement;
              camera.aspect = canvas.clientWidth / canvas.clientHeight;
              camera.updateProjectionMatrix();
          }
          renderer.render(scene,camera);//执行渲染操作
        }
        render();
        var controls = new THREE.OrbitControls(camera,canvas);//创建控件对象
        // controls.enableDamping = true;
         controls.enableZoom = true;
         controls.addEventListener('change', render);//监听鼠标、键盘事件
      },
      initThreeClickEvent(){
        var clickObjects = [];
        var that = this;
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        document.getElementById("c").addEventListener('mousedown', onDocumentMouseDown, false);
        function onDocumentMouseDown(event) {
            event.preventDefault();
            console.log(event.offsetX);
           console.log(that.renderer.domElement.clientWidth);
           console.log(event.offsetY);
           console.log( that.renderer.domElement.clientHeight);
            mouse.x = (event.offsetX / that.renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(event.offsetY /  that.renderer.domElement.clientHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, that.camera);
            console.log(that.scene.children);
            var intersects = raycaster.intersectObjects(that.scene.children[2].children);
            console.log(intersects);
            for ( var i = 0; i < intersects.length; i++ ) {
               intersects[i].object.material[2].opacity =0.5;
                intersects[i].object.material[2].transparent  =true;
            }
            //总结一下，这里必须装网格，mesh，装入组是没有效果的
            //所以我们将所有的盒子的网格放入对象就可以了
            // 需要被监听的对象要存储在clickObjects中。
            // var intersects = raycaster.intersectObjects(clickObjects);

            //  console.log(intersects);
            // if(intersects.length > 0) {
            //     // 在这里填写点击代码
            //     console.log("dianji");
            //     console.log(intersects[0].object)
            //     showDetailPage(intersects[0].object.name);

            // }

        }
      }
  },
  mounted() {
    this.init();
    this.initThreeClickEvent();
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
