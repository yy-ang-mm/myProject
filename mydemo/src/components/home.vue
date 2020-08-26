
<template>
  <div>
    <div class="nav">
      <!-- 路由切换导航 -->
      <router-link tag="div" active-class="select" to="/index">
        <p class="iconfont">&#xe609;</p>
        <div class="title">首页</div>
      </router-link>
      <router-link tag="div" active-class="select" to="/shopcart">
        <p class="iconfont">&#xe618;</p>
        <div class="title">购物车</div>
      </router-link>
      <router-link tag="div" active-class="select" to="/mime">
        <p class="iconfont">&#xe615;</p>
        <div class="title">我的</div>
      </router-link>
    </div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </div>
</template>


<script>
export default {};
</script>


<style scoped>
@import url("../assets/iconFont/iconfont.css");
.nav {
  z-index: 2;
  border-top: 1px solid #f4f4f4;
  display: flex;
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 18px;
  text-align: center;
  background: white;
  margin-bottom: 0;
}
div {
  flex: 1;
}
.iconfont {
  margin-top: -14px;
  font-size: 30px;
}
.title {
  margin-top: -45px;
}
.select {
  color: orange;
  background: #f4f4f4f4;
}
</style>

