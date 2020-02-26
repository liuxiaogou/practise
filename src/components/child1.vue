<template>
    <div>
        <p @click="showText" v-on="$listeners">{{msg}}</p>
        <Child3 @click="sss" :prop="someThing">
            <div>
                ssssssss
            </div>
         <template v-slot:ss="{obj}">{{obj}}</template>
            </Child3>
    </div>
  
  
</template>

<script>
import Child3 from './child3'
export default {
    components:{
        Child3
    },
    data() {
        return {
            msg:'第一个子组件，点我看打印',
            someThing:'一些事情'
        }
    },
    methods: {
        showText(){
            this.$bus.$emit('foo'); //通过事件总线进行兄弟间的通信
             this.$emit('clicks');  //父子间的通讯
        },
        sss(){
            alert(2);
        }
        
    },
    mounted() {
       console.log(this.$listeners);
        
    },
    created() {
        
    },

}
</script>

<style>

</style>