!function(win){
    //一个3d场景就是一个构造函数的实例
    
    function FY_3(canvas,camera_obj){
        this.canvas = canvas;  //canvas元素
        // this.renderer;
        // this.scene;
        this.arr =[];

        this.renderer = new THREE.WebGLRenderer({canvas:this.canvas});  //创建渲染器对象
        this.renderer.setClearColor(0xb9d3ff, 1);//设置渲染器背景色
        this.scene = new THREE.Scene(); //创建场景对象
        // this.solarSystem = new THREE.Object3D();  //创建空的场景图节点
        // this.scene.add(this.solarSystem);
        this.raycaster = new THREE.Raycaster(); //光线投射用于进行鼠标拾取
        this.mouse = new THREE.Vector2();  //二维向量
        this.getAmbient();
        this.getCamera(camera_obj);
         this.controls = new THREE.OrbitControls(this.camera,canvas);//创建控件对象
        // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
        this.axisHelper = new THREE.AxisHelper(1000);
        this.scene.add(this.axisHelper);
        // arr.forEach(item => {
        //     this.scene.add(this.getMesh(item.geometry,item.material));
        // });
        // for (let i = 0; i < arr.length; i++) {
    }
    //公共方法c
    FY_3.prototype ={
       
        getMesh:function(geometry, material){  //网格模型对象Mesh
            return new THREE.Mesh(geometry, material);
        },
        getAmbient:function(){    //环境光
            var color  =  '#ffffff';
            this.ambient = new THREE.AmbientLight(color);
            this.scene.add(this.ambient);
        },
        getCamera:function(obj){ // 透视投影相机  人眼模式
            //fov 视角范围   aspect 渲染窗口的长宽比  near 近裁截面  far  远裁截面
            var camera,fov,aspect,near,far,X,Y,Z;
            fov = obj.fov || 60;
            aspect = obj.aspect || 2;
            near = obj.near || 0.1;
            far  =  obj.far || 5000;
            X = obj.X || 200;
            Y = obj.Y || 0;
            Z = obj.Z || 1000;
            camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            camera.position.set(X,Y,Z);
            camera.lookAt(this.scene.position);
            this.camera = camera;
            if (obj.animation) {
                // this.controls = new THREE.OrbitControls(camera,this.canvas);//创建控件对象
                 
            }
            

        },
        
        geometry :function(num){
            var geometry = null;
            if(num ===1){
                geometry = new THREE.BoxGeometry(200,200,200); //创建长方体  
            }else if(num ===2){
                geometry = new THREE.CylinderGeometry(5, 5, 20, 32); //创建圆柱体 
            }else if(num ===3){
                geometry = new THREE.SphereGeometry(100, 32, 32); //创建球体 
            }
            return geometry;
        },
        selfGeometry:function(){//自定义几何体

        },
        planeGeometry:function(){
            var geometry = new THREE.PlaneGeometry( 100, 100, 32 );
            var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
            var plane = this.getMesh( geometry, material );
            return   plane;
        },
        material:function(url,callback){  //材质对象Material
            var material = null;
            if(url){  //带纹理的材质走这里  
               var textureLoader  = new THREE.TextureLoader();
               textureLoader.load(url,function(texture){
                    texture.offset = new THREE.Vector2(0,0)   //位置偏移  -1,1

                    texture.wrapS = THREE.RepeatWrapping; //平铺
                    texture.wrapT = THREE.RepeatWrapping;//平铺
                    texture.repeat.set(3, 1);//平铺
                    
                    // texture.rotation = Math.PI/2;
                    var material  = new THREE.MeshLambertMaterial({
                        side:THREE.DoubleSide,//两面可见,
                        color: 0x4488ff,
                        transparent: true,
                        opacity: 0.7,
                        // color: 0x0000ff,
                        // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
                        map: texture,//设置颜色贴图属性值
                    }); 
                    // material.wireframe = true;//线条模式渲染(查看细分数)
                    callback(material,texture);
               })
                 
              
            }else{
                material  = new THREE.MeshLambertMaterial({ //Lambert网格材质，与光照有反应，漫反射
                    color: 0x0000ff
                }); 
                return material
            }
            
        },
        
        getMtlAndObj:function(arr,callback){
            var mtlLoader  = new THREE.MTLLoader();//材质文件加载器
            var objLoader  = new THREE.OBJLoader();//obj加载器
            if(arr.length ==3){  //带材质的文件
                mtlLoader.setPath(arr[0]);
                mtlLoader.load(arr[1], function(materials) {
                    materials.preload();
                    
                    objLoader.setMaterials(materials);
                    objLoader.load(arr[2], function(object) {
                            object.scale.set(1, 1, 1);
                            callback(object);   
                    })
                })
            }else{
                objLoader.load(arr[0], function(object) {
                    object.scale.set(1, 1, 1);
                    callback(object);
             })
            }
        },
        render:function(){ //执行渲染操作
            if (this.resizeRendererToDisplaySize(this.renderer)) {
                this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
                this.camera.updateProjectionMatrix();
            }

            this.renderer.render(this.scene,this.camera);
            if( this.labelRenderer){
                this.labelRenderer.render( this.scene,this.camera ); 
            }
            // this.labelRenderer.render( this.scene,this.camera );
        },
        resizeRendererToDisplaySize:function(){  //判断渲染比例是否发生变化
            // var canvas = renderer.domElement;
            var width = this.canvas.clientWidth;
            var height = this.canvas.clientHeight;
            var needResize = this.canvas.width !== width || this.canvas.height !== height;
            if (needResize) {
              this.renderer.setSize(width, height, false);
            }
            return needResize;
        },
         //鼠标操作时事件处理
         event:function(event,obj){
            var intersects ; 
            // console.log(event);
            this.mouse.x = ( event.offsetX / this.canvas.clientWidth ) * 2 - 1;
            this.mouse.y = - ( event.offsetY / this.canvas.clientHeight ) * 2 + 1;
             // 通过摄像机和鼠标位置更新射线 
            //  console.log(this.mouse.x,this.mouse.y,this.canvas);
            this.raycaster.setFromCamera( this.mouse, this.camera);
            // 计算物体和射线的焦点scene.children
            // console.log( this.scene.children[2]);
             console.log( this);
            intersects = this.raycaster.intersectObjects(obj);
            return  intersects;  //返回相交的元素 以供以后操作
          }
    }
    FY_3.prototype.constructor=FY_3;
   
    win.FY_3 = FY_3;
}(window)