<template>
  <div>
    <el-container>
      <el-header>
        <h2>后台管理系统</h2>
        <div class="back" v-if="nickname">
          <p>
            欢迎
            <span>{{nickname}}</span>
          </p>
          <el-button type="danger" round @click="out">退出登录</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "../components/index_nav";
export default {
  data() {
    return {
      nickname: "",
    };
  },
  mounted() {
    // 获取登录信息
    let userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : {};
    this.nickname = userInfo.username;
  },
  methods: {
    // 退出事件
    out() {
      this.$confirm("确定要退出登录吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 删除会话存储中登录的信息
        sessionStorage.removeItem("userInfo");
        // 删除之后跳转回登录页
        this.$router.push("/login");
      });
    },
  },
  components: {
    vNav,
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header {
  background-color: $firstBgcolor;
  line-height: 60px;
  color: white;
  display: flex;
  justify-content: space-between;
}

.back {
  display: flex;
  align-items: baseline;

  p {
    margin-right: 10px;
  }

  span {
    color: #00FF7F;
  }
}
</style>

