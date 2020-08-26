<template>
  <div>
    <div class="wrap">
      <div class="nav">
        <div class="c">
          <div @click="$router.back()">
            <img src="../assets/images/public/arr.png" alt />
          </div>
          <div class="center">登录</div>
          <div class="set" @click="$router.push('/register')">注册</div>
        </div>
      </div>
      <div class="bg">
        <div class="content">
          <div>
            手机号：
            <input type="number" />
          </div>
          <div>
            密&nbsp;&nbsp;&nbsp;码：
            <input type="password" />
          </div>
        </div>
        <div class="btn">
          <button>登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/login.css";
</style>
