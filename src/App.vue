<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- mouseover 是通过child1中的v-on="$listeners"  子组件中的事件触发会冒泡到父级（父子） -->
    <!-- <component v-bind:is="currentTabComponent"></component>  动态组件 -->  
    <Child1 @clicks="clickMe"  @mouseover="mouseOver"></Child1>
    <Child2 :text.sync="msg" :explain="msg2" numb="wer"></Child2>
  </div>
</template>

<script>
import Child1 from './components/child1'
import Child2 from './components/child2'
export default {
  name: 'App',
  components:{
    Child1,Child2
  },
  data() {
    return {
      msg:'props：这是父与子的通信,单向数据流，一般不能修改父传给你子的props值',
      msg2:'包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)',
      currentTabComponent:'Child2'
    }
  },
  methods: {
    clickMe() {
        console.log('子组件点击了，父组件响应  $emit 子与父通信 ');
        console.log(this.$root.key);
        this.$root.key = '把root中data的数据改变了';
        console.log(this.$root.key);
    },
    mouseOver(){
      console.log('$listeners 会被展开和监听，来自父级的回调函数');
    }
  },
  mounted () {
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
</style>
