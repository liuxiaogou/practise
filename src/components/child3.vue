<template>
  <div v-on="$listeners">
      这是三级组件
      <h4><slot></slot></h4>
      <h4><slot name="ss" :tt="'ds'"></slot></h4>
      <div v-bind="{ id: 'someProp', 'other-attr': 'otherProp' }">这是v-bind绑定对象</div>
      <div v-bind:text-content="text"></div>
      <div v-bind="$attrs">222</div>
  </div>
</template>

<script>
export default {
    name:'Child3',
    data() {
      return {
        text: '通过 prop 修饰符绑定 DOM 属性'
      }
    },
    mounted () {
      console.log(this.$attrs);
    },
}
</script>

<style>

</style>