<template>
    <div>
         <p>{{text}}</p>
         <p>{{'$sttrs的值:' +$attrs.numb}}</p>
         <!-- 过滤器 -->
         <p v-for="(item,index) in list" :key="index">{{item | fils(index)}}</p>
    </div>
 
 
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '第二个子组件'
        },
    },
    data() {
        return {
            msg:'第二个子组件',
            list:[1,'sss']
        }
    },
    filters: {    //局部过滤器
        fils: function(value,symbol='0') { //全局过滤器在main.js  当全局和局部从冲突时，以局部优先
            return '过滤器:'+value+'过滤器参数:'+symbol;
        }
    },
    methods: {
        clickMe(){
            console.log('兄弟组件点击了，我响应了 事件总线$bus');
            this.$emit('update:text','双向数据绑定：update通过sync修饰符可以修改父级传过来的props值');
        }
        
    },
    mounted() {
        this.$bus.$on('foo',this.clickMe);
    },
    created() {
        console.log(this.$attrs);
        console.log(this);
    }

}
</script>

<style>

</style>