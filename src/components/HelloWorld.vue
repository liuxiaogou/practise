<template>
  <div class="hello">
      <ul style="display:flex;flex-wrap:wrap;">
        <li>
          <h4>点击查找元素</h4>
          <canvas ref="a"></canvas>
        </li>
        <li>
          <h4>纹理贴图</h4>
          <canvas ref="b"></canvas>
        </li>
        <li>
          <h4>2d圆弧</h4>
          <canvas ref="c"></canvas>
        </li>
        <li>
          <h4>3d线条曲线以及曲线作为路径 管道成型</h4>
          <canvas ref="d"></canvas>
        </li>
        <li>
           <h4>旋转成型</h4>
          <canvas ref="e"></canvas>
        </li>
        <li>
          <h4>文字添加</h4>
          <canvas ref="f"></canvas>
        </li>
        <li>
          <h4>canvas作为画布</h4>
          <canvas ref="g"></canvas>
         
        </li>
      </ul>
      <img ref="img" :src="img_url" alt="" style="display:none">
       <div ref="ss" style="width:300px; height:150px;display:none"></div>
       <canvas ref="foot" class="foot" >

       </canvas>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      num :0,
      scene:null,
      sceneB:null,
      sceneC:null,
      img_url:'static/img/timg.jpg',
      obj:{
          X:0,
          Y:0,
          Z:300,
          animation:true
      }
    }
  },
  methods: {
      initA(){
           this.scene = new FY_3(this.$refs.a,{animation:true}); //创建一个构造函数的实例，一个实例代表了一个3d场景
           let geometry1 = this.scene.geometry(1);
           let geometry2 = this.scene.geometry(1);
           let material = this.scene.material();
           let mesh1 = this.scene.getMesh(geometry1,material);
           let mesh2 = this.scene.getMesh(geometry2,material);
           mesh1.name="ttttttttt";
            mesh2.name="mmmmmmmmmmmm";
           mesh2.position.x = 300;
           this.scene.scene.add(mesh1);
            this.scene.scene.add(mesh2);
           this.actionA();
           //控制类型写在这里而不是写在3d.js中是为以后操作方便
           this.scene.renderer.domElement.addEventListener( 'mousedown',this.onMouseDown1, false ); //监听鼠标按下事件
           this.scene.controls.addEventListener('change',this.actionA);//监听鼠标、键盘事件
        },
        onMouseDown1(event){
           let arr =this.scene.event(event,this.scene.scene.children);
             console.log(arr);
        },
        actionA(){
          this.scene.render();
        },
        initB(){
             this.sceneB = new FY_3(this.$refs.b,this.obj); //创建一个构造函数的实例，一个实例代表了一个3d场景
            this.sceneB.material('static/img/timg.jpg',(material)=>{
              let geometry = this.scene.geometry(1);
              this.sceneB.scene.add(this.scene.getMesh(geometry,material));
              requestAnimationFrame(this.action) //开始动画
            })
            this.sceneB.renderer.domElement.addEventListener( 'mousedown',this.onMouseDown1, false ); //监听鼠标按下事件
            this.sceneB.controls.addEventListener('change',this.action);//监听鼠标、键盘事件
        },
        action(times){ //动画函数
            times*=0.001;
            cancelAnimationFrame(this.num);   //取消动画
            this.num = requestAnimationFrame(this.action);   
            // this.item.scene.children[0].rotation.x = times*0.2; 方式一 累计弧度
            //  this.item.scene.children[0].rotation.y = times*0.2;
            this.sceneB.scene.children[2].rotateX(0.01);   //方式二  增量弧度
            this.sceneB.scene.children[2].rotateY(0.01);
           this.sceneB.render();
        },
        initC(){
          this.sceneC = new FY_3(this.$refs.c,this.obj); //创建一个构造函数的实例，一个实例代表了一个3d场景
          var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
          //参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
          var arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI);
          //getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
          var points = arc.getPoints(50);//分段数50，返回51个顶点
          // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
          geometry.setFromPoints(points);
          //材质对象
          var material = new THREE.LineBasicMaterial({
            color: 0xff0000
          });
          //线条模型对象
          var line = new THREE.Line(geometry, material);
          this.sceneC.scene.add(line); //线条对象添加到场景中
          this.actionC();
          this.sceneC.renderer.domElement.addEventListener( 'mousedown',this.onMouseDown1, false ); //监听鼠标按下事件
           this.sceneC.controls.addEventListener('change',this.actionC);//监听鼠标、键盘事件
        } ,
        actionC(){
          this.sceneC.render();
        },
        initD(){
           this.sceneD = new FY_3(this.$refs.d,this.obj); //创建一个构造函数的实例，一个实例代表了一个3d场景
          
          // 三维样条曲线  Catmull-Rom算法
          var curve = new THREE.CatmullRomCurve3([
           new THREE.Vector3(-10, -50, -50),
            new THREE.Vector3(10, 0, 0),
            new THREE.Vector3(8, 50, 50),
            new THREE.Vector3(-5, 0, 100)
          ]);
          //TubeGeometry的功能就是通过一条曲线生成一个圆管
          var geometry = new THREE.TubeGeometry(curve, 100, 0.6,50);
          //材质对象
          this.sceneB.material('static/img/water.jpg',(material)=>{
              console.log(material);
              this.sceneD.material = material;
            // let geometry = this.scene.geometry(1);
            this.sceneD.scene.add(this.scene.getMesh(geometry,material));
            //   this.actionD();
             requestAnimationFrame(this.actionD) //开始动画
        })
        //   var material = new THREE.MeshBasicMaterial({
        //     color: 0x000000,
        //     side:THREE.DoubleSide
        //   });
          //线条模型对象
        //   var mesh = new THREE.Mesh(geometry, material);
        //   mesh.name = 'ssssssssssssss';
        //   this.sceneD.scene.add(mesh); //线条对象添加到场景中
        //   this.actionD();
         
          this.sceneD.renderer.domElement.addEventListener( 'mousedown',this.onMouseDown1, false ); //监听鼠标按下事件
           this.sceneD.controls.addEventListener('change',this.actionD);//监听鼠标、键盘事件
        },
        actionD(){
           this.sceneD.material.map.offset.x -= 0.03;
          cancelAnimationFrame(this.num3);   //取消动画
          this.num3 = requestAnimationFrame(this.actionD);   
          this.sceneD.render();
        },
        initE(){
          this.sceneE = new FY_3(this.$refs.e,this.obj); //创建一个构造函数的实例，一个实例代表了一个3d场景
          let points = [
              new THREE.Vector2(200,-50),
              new THREE.Vector2(200,50),
          ];
          var group = new THREE.Group();
          let geometry = new THREE.LatheGeometry(points,30,0,Math.PI/5);
          console.log(geometry);
          this.sceneE.material('static/img/timg.jpg',(material)=>{
              // let geometry = this.scene.geometry(1);
              var mesh = this.scene.getMesh(geometry,material);
               group.add(mesh);
              for (let i = 0; i < 8; i++) {
                let ss = mesh.clone();
                  ss.rotateY(Math.PI/4*i);
                  group.add(ss);
              }
              // group.rotateX(0.1);
               this.sceneE.scene.add(group);
              // requestAnimationFrame(this.action) //开始动画
               requestAnimationFrame(this.actionE) 
            })
          this.sceneE.renderer.domElement.addEventListener( 'mousedown',this.onMouseDown1, false ); //监听鼠标按下事件
           this.sceneE.controls.addEventListener('change',this.actionE);//监听鼠标、键盘事件
        } ,
        actionE(){
         cancelAnimationFrame(this.num1);   //取消动画
            this.num1 = requestAnimationFrame(this.actionE);   
            this.sceneE.scene.children[2].rotateY(0.01);
           this.sceneE.render();
        },
        initF(){
          var canvas = this.$refs.f;
          var oRect = canvas.getBoundingClientRect();
          this.sceneF = new FY_3(canvas,{X:160,Y:-30,Z:300}); //创建一个构造函数的实例，一个实例代表了一个3d场景
          var earthDiv = document.createElement( 'div' );
          earthDiv.className = 'label';
          earthDiv.textContent = '这是div';
          // earthDiv.style.marginTop = '-1em';
          var earthLabel = new THREE.CSS3DObject( earthDiv );
           var group = new THREE.Group();
           earthLabel.position.set(0, 0, 100 );
           var earthDiv1 = document.createElement( 'div' );
          earthDiv1.className = 'label';
          earthDiv1.textContent = '这是div2';
          // earthDiv.style.marginTop = '-1em';
          var earthLabel1 = new THREE.CSS3DObject( earthDiv1 );
          earthLabel1.rotateY(Math.PI/2);
           earthLabel1.position.set(100,0, 0 );
           var earthDiv2 = document.createElement( 'div' );
          earthDiv2.className = 'label';
          earthDiv2.textContent = '这是div3';
          // earthDiv.style.marginTop = '-1em';
          var earthLabel2 = new THREE.CSS3DObject( earthDiv2 );
          earthLabel2.rotateY(Math.PI);
           earthLabel2.position.set(0,0, -100 );
            var earthDiv3 = document.createElement( 'div' );
          earthDiv3.className = 'label';
          earthDiv3.textContent = '这是div4';
          // earthDiv.style.marginTop = '-1em';
          var earthLabel3 = new THREE.CSS3DObject( earthDiv3 );
          earthLabel3.rotateY(-Math.PI/2);
          earthLabel3.position.set(-100,0, 0 );
          group.add(earthLabel,earthLabel1,earthLabel2,earthLabel3);
          this.sceneF.scene.add(group);
          this.sceneF.labelRenderer = new THREE.CSS3DRenderer();
          this.sceneF.labelRenderer.setSize( canvas.clientWidth, canvas.clientHeight );
           console.log(this.sceneF.scene);
          
          this.sceneF.labelRenderer.domElement.style.position = 'absolute';
          this.sceneF.labelRenderer.domElement.style.top = oRect.top+'px';
          this.sceneF.labelRenderer.domElement.style.left= oRect.left+'px';

          document.body.appendChild(  this.sceneF.labelRenderer.domElement );
          requestAnimationFrame(this.actionF)
          this.sceneF.controls = new THREE.OrbitControls(this.sceneF.camera,this.sceneF.labelRenderer.domElement);//创建控件对象
          
          this.sceneF.labelRenderer.domElement.addEventListener( 'mousedown',this.onMouseDown1, false ); //监听鼠标按下事件
           this.sceneF.controls.addEventListener('change',this.actionF);//监听鼠标、键盘事件
        } ,
        actionF(){
        //  cancelAnimationFrame(this.num3);   //取消动画
        //  this.num3 = requestAnimationFrame(this.actionF);   
        //  this.sceneF.scene.children[2].rotateY(0.03);
        //   this.sceneF.scene.children[2].rotateX(0.03);
          this.sceneF.render();
        },
        initG(img){
          this.sceneG = new FY_3(this.$refs.foot,{X:0,Y:0,Z:2600}); //创建一个构造函数的实例，一个实例代表了一个3d场景
          let points = [
              new THREE.Vector2(2500,-40),
              new THREE.Vector2(2500,40),
          ];
          var group = new THREE.Group();
          let geometry = new THREE.LatheGeometry(points,30,0,Math.PI/60);
          var thiscancas = this.$refs.ss.getElementsByTagName('canvas')[0];
          // var texture = new THREE.CanvasTexture(thiscancas);
          var material  = new THREE.MeshLambertMaterial({
              // side:THREE.DoubleSide,//两面可见,
              // color: 0x0000ff,
              // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
              map: new THREE.TextureLoader().load(img)
          }); 
          var mesh = this.scene.getMesh(geometry,material);
               group.add(mesh);
              for (let i = 0; i < 108; i++) {
                let ss = mesh.clone();
                  ss.rotateY(Math.PI/48*i);
                  group.add(ss);
              }
                // this.sceneG.scene.translateZ(-2500);
               this.sceneG.scene.add(group);
              // requestAnimationFrame(this.action) //开始动画
               requestAnimationFrame(this.actionG) 
          this.sceneG.renderer.domElement.addEventListener( 'mousedown',this.onMouseDown1, false ); //监听鼠标按下事件
           this.sceneG.controls.addEventListener('change',this.actionG);//监听鼠标、键盘事件
        } ,
        actionG(){
         cancelAnimationFrame(this.num2);   //取消动画
            this.num2 = requestAnimationFrame(this.actionG);   
            this.sceneG.scene.children[2].rotateY(0.0002);
           this.sceneG.render();
        },
        getEcharts(){
          let tt = this.$echarts.init(this.$refs.ss);
          var value = 83;
          var option = {
              backgroundColor: '#000',
              title: {
                  
                  text: `${value}分`,
                  // subtext: '综合健康评分',
                  left: 'center',
                  top: 'center', //top待调整
                  textStyle: {
                      color: '#fff',
                      fontSize: 20,
                      fontFamily: 'DINAlternate-Bold',
                  },
                  subtextStyle: {
                      color: '#ff',
                      fontSize: 35,
                      fontFamily: 'PingFangSC-Regular',
                      top: 'center'
                  },
                  itemGap: -4 //主副标题间距
              },
              xAxis: {
                  splitLine: {
                      show: false
                  },
                  axisLabel: {
                      show: false
                  },
                  axisLine: {
                      show: false
                  }
                  // data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
              },
              yAxis: {
                  splitLine: {
                      show: false
                  },
                  axisLabel: {
                      show: false
                  },
                  axisLine: {
                      show: false
                  }
              },
              series: [
                  // 内圆
                  {
                       animation: false,
                      type: 'pie',
                      radius: ['0', '50%'],
                      center: ['50%', '50%'],
                      z: 0,
                      itemStyle: {
                          normal: {
                              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                      offset: 0,
                                      color: '#1147A1'
                                  },
                                  {
                                      offset: 0.5,
                                      color: '#423DB3'
                                  },
                                  {
                                      offset: 1,
                                      color: '#1147A1'
                                  }
                              ]),
                              label: {
                                  show: false
                              },
                              labelLine: {
                                  show: false
                              }
                          },
                      },
                      label: {
                          normal: {
                              position: "center",

                          }
                      },
                      data: [100],
                  },
                  // 进度圈
                  {
                      type: 'pie',
                      clockWise: true,
                       animation: false,
                      radius: ["60%", "55%"],
                      data: [{
                              value: value,
                              itemStyle: {
                                  normal: {
                                      borderWidth: 10,
                                      borderColor: {
                                          colorStops: [{
                                              offset: 0,
                                              color: '#7940FE' || '#00cefc' // 0% 处的颜色
                                          }, {
                                              offset: 1,
                                              color: '#2A69EC' || '#367bec' // 100% 处的颜色
                                          }]
                                      },
                                      color: { // 完成的圆环的颜色
                                          colorStops: [{
                                              offset: 0,
                                              color: '#7940FE' || '#00cefc' // 0% 处的颜色
                                          }, {
                                              offset: 1,
                                              color: '#2A69EC' || '#367bec' // 100% 处的颜色
                                          }]
                                      },
                                      label: {
                                          show: false
                                      },
                                      labelLine: {
                                          show: false
                                      },
                                  },
                              }
                          },
                          {
                              name: 'gap',
                              value: 100 - value,
                              itemStyle: {
                                  normal: {
                                      label: {
                                          show: false
                                      },
                                      labelLine: {
                                          show: false
                                      },
                                      color: 'rgba(0, 0, 0, 0)',
                                      borderColor: 'rgba(0, 0, 0, 0)',
                                      borderWidth: 0,
                                  }
                              },
                          }
                      ]
                  },
                  //刻度尺
                  {
                      // name: "白色圈刻度",
                      type: "gauge",
                      radius: "67%",
                       animation: false,
                      startAngle: 225, //刻度起始
                      endAngle: -134.8, //刻度结束
                      z: 4,
                      axisTick: {
                          show: true,
                          lineStyle: {
                              width: 2,
                              color: 'rgba(1,244,255, 0.9)'
                          } 
                      },
                      splitLine: {
                          length: 16, //刻度节点线长度
                          lineStyle: {
                              width: 2,
                              color: 'rgba(1,244,255, 0.9)'
                          } //刻度节点线
                      },
                      axisLabel: {
                          color: 'rgba(255,255,255,0)',
                          fontSize: 12,
                      }, //刻度节点文字颜色
                      pointer: {
                          show: false
                      },
                      axisLine: {
                          lineStyle: {
                              opacity: 0
                          }
                      },
                      detail: {
                          show: false
                      },
                      data: [{
                          value: 0,
                          name: ""
                      }]
                  },
                  // 刻度圈
                  {
                      "type": "pie",
                      "radius": ["0%", "73%"],
                      "center": ["50%", "50%"],
                       animation: false,
                      "avoidLabelOverlap": false,
                      "label": {
                          "normal": {
                              "show": false,
                              "position": "center"
                          },
                          "emphasis": {
                              "show": false,
                              "textStyle": {
                                  "fontWeight": "bold"
                              }
                          }
                      },
                      "itemStyle": {
                          "normal": {
                              "color": {
                                  "type": "linear",
                                  "x": 0,
                                  "y": 0,
                                  "x2": 0,
                                  "y2": 1,
                                  "colorStops": [{
                                      "offset": 0.05,
                                      "color": "rgba(32,36,107, 0.2)"
                                  }, {
                                      "offset": 0.5,
                                      "color": "rgba(32,36,107,0.3)"
                                  }, {
                                      "offset": 0.95,
                                      "color": "rgba(32,36,107, 0.2)"
                                  }]
                              }
                          }
                      },
                      "labelLine": {
                          "normal": {
                              "show": false
                          }
                      },
                      "data": [{
                          "value": 3235
                      }]
                  },
                  //最外层圈
                  {
                      "type": "pie",
                      "radius": ["0%", "85%"],
                      "center": ["50%", "50%"],
                      "avoidLabelOverlap": false,
                       animation: false,
                      hoverAnimation: false,
                      "label": {
                          "normal": {
                              "show": false,
                              "position": "center"
                          },
                          "emphasis": {
                              "show": false,
                              "textStyle": {
                                  "fontWeight": "bold"
                              }
                          }
                      },
                      "itemStyle": {
                          "normal": {
                              "color": {
                                  "type": "linear",
                                  "x": 0,
                                  "y": 0,
                                  "x2": 0,
                                  "y2": 1,
                                  "colorStops": [{
                                      "offset": 0.05,
                                      "color": "rgba(21,24,65, 0.2)"
                                  }, {
                                      "offset": 0.5,
                                      "color": "rgba(21,24,65, 0.3)"
                                  }, {
                                      "offset": 0.95,
                                      "color": "rgba(21,24,65, 0.2)"
                                  }]
                              }
                          }
                      },
                      "labelLine": {
                          "normal": {
                              "show": false
                          }
                      },
                      "data": [{
                          "value": 3235
                      }]
                  }
              ]
          };
          tt.setOption(option);
          var img  = tt.getDataURL({
              pixelRatio: 4,
              backgroundColor: '#999'
          });
          console.log(img);
          this.initG(img);
          window.addEventListener("resize", function() {
                tt.resize();
            });
        }
            
  },
  mounted() {
      this.initA();
      this.initB();
      this.initC();
      this.initD();
      this.initE();
      this.initF();
      this.getEcharts();
      // FY_3.init();
     // this.initThreeClickEvent();

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li{
    list-style: none;
    display: inline-block;
    margin-right: 20px;
  }
  canvas{
    width:600px;
    height:300px;
  }
  
  .foot{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    height:300px;
  }
</style>
