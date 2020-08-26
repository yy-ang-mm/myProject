<template>
  <div>
    <div class="wrap">
      <div class="nav">
        <div class="c">
          <div @click="$router.back()">
            <img src="../assets/images/public/arr.png" alt />
          </div>
          <div class="center">注册</div>
          <div class="set" @click="$router.push('/login')">登录</div>
        </div>
      </div>
      <div class="bg">
        <div class="content">
          <div>
            昵&nbsp;
            &nbsp;
            &nbsp;
            称：
            <input type="text" name id />
          </div>
          <div>
            手机号：
            <input type="number" />
          </div>
          <div>
            密&nbsp;
            &nbsp;
            &nbsp;
            码：
            <input type="password" />
          </div>
          <div class="test">
            <p>
              验证码：
              <input type="text" />
            </p>
            <p>重新发送(57)</p>
          </div>
        </div>
        <div class="btn">
          <button>下一步</button>
        </div>
        <div class="isGree">
          <input type="checkbox" />我已阅读并同意使用条款和隐私政策
        </div>
      </div>
    </div>
  </div>
</template><script>
export default {
  data() {
    return {};
  },
};
</script><style lang=""scoped>
@import "../assets/css/register.css";
</style>