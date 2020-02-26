!function(win){
    var T = {
        init:function(canvas,bgColor,geometry,material,ambient,directional,camera){
            var renderer,scene,mesh,axisHelper,raycaster,mouse;
            bgColor = bgColor || '#b9d3ff';
            geometry = geometry || this.geometry(1);
            material = material || this.material(); 
            ambient =  this.ambient();
            directional = directional || this.directionalLight();
            camera =  camera || this.camera();
          
            renderer = new THREE.WebGLRenderer({canvas:canvas}); //创建渲染器对象
            renderer.setClearColor(bgColor, 1); //设置背景颜色
            scene = new THREE.Scene();  //创建场景对象
            mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            
            scene.add(mesh);
            scene.add(ambient);
             // scene.add(directional);
            camera.lookAt(scene.position);  //设置相机方向(指向的场景对象)

            axisHelper = new THREE.AxisHelper(300);  // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
            scene.add(axisHelper);

            raycaster = new THREE.Raycaster(); //光线投射用于进行鼠标拾取
            mouse = new THREE.Vector2();  //二维向量
            // renderer.render(scene,camera);
            return {renderer,scene,camera,raycaster,mouse};
        },
        render:function(renderer,scene,camera){ //执行渲染操作
            if (this.resizeRendererToDisplaySize(renderer)) {
                var canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }
            renderer.render(scene,camera);
        },
        resizeRendererToDisplaySize:function(renderer){  //判断渲染比例是否发生变化
            var canvas = renderer.domElement;
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;
            var needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
              renderer.setSize(width, height, false);
            }
            return needResize;
        },
        geometry:function(num){  //几何体
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
        material:function(url,callback){  //材质对象Material
            var material = null;
            if(url){  //带纹理的材质走这里
               var textureLoader  = new THREE.TextureLoader();
               textureLoader.load(url,function(texture){
                    var material  = new THREE.MeshLambertMaterial({
                        // color: 0x0000ff,
                        // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
                        map: texture,//设置颜色贴图属性值
                    }); 
                    callback(material);
               })
                 
              
            }else{
                material  = new THREE.MeshLambertMaterial({
                    color: 0x0000ff
                }); //Lambert网格材质，与光照有反应，漫反射
                // callback(material);
                return material
            }
            
        },
        ambient:function(color){    //环境光
            color  = color || '#ffffff';
            var ambient = new THREE.AmbientLight(color);
            return ambient;
        },
        directionalLight:function(){
            var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
            directionalLight.position.set(400, 200, 100);
            // 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
            // directionalLight.target = mesh2;
            return  directionalLight;
        },
        
        camera:function(fov,aspect,near,far,X,Y,Z){ // 透视投影相机  人眼模式
            //fov 视角范围   aspect 渲染窗口的长宽比  near 近裁截面  far  远裁截面
            fov = fov || 60;
            aspect = aspect || 2;
            near = near || 0.1;
            far  =  far || 1000;
            X = X || 200;
            Y = Y || 200;
            Z = Z || 200;
            var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            camera.position.set(X,Y,Z);
            return  camera;

        },
        //鼠标操作时事件处理
        event:function(event,renderer,camera,scene,raycaster,mouse){
          var intersects ; 
          mouse.x = ( event.offsetX / renderer.domElement.clientWidth ) * 2 - 1;
          mouse.y = - ( event.offsetY / renderer.domElement.clientHeight ) * 2 + 1;
           // 通过摄像机和鼠标位置更新射线 
          raycaster.setFromCamera( mouse, camera );
          // 计算物体和射线的焦点scene.children
          intersects = raycaster.intersectObjects( scene.children );
          return  intersects;  //返回相交的元素 以供以后操作
        }

    }
    win.FY_3 = T;
}(window)