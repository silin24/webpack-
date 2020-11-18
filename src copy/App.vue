<template>
<div>
  <h2 id="demo">{{msg}}</h2>
  <hello-world></hello-world>
  <HelloWorld/>
</div>
  
</template>

<script>
// import HelloWorld from './component/HelloWorld.vue'
import HelloWorld from './component/HelloWorld'

export default {
data() {
  return {
    msg:'First Vue Component'
  }
},

components:{ //局部注册组件,只能在当前组件使用
  HelloWorld

}
}
</script>

<style >
h2{
  color: red;
}
</style>