
<template>
  <!-- 承载一级路由 -->
  <div id="app">
    <!-- 
      router-link 在DOM中被解析成a标签
      tag="span" 改变默认标签
    -->
    <!-- 定义路由出口 -->
    <router-view></router-view>
  </div>
</template>


<script>
export default {};
</script>


<style>
</style>
