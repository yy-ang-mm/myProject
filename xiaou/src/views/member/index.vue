<template>
  <div>
    <!-- 面包屑 -->
    <bread-nav></bread-nav>
    <!-- 渲染表格 -->
    <user-list ref="userList" @update="update"></user-list>
    <!-- 弹出对话框
    :isShow="sonStatus"  控制打开弹框
    -->
    <v-Diolog ref="vAdd" :isShow="sonStatus" @closeDialog="closeDialog"></v-Diolog>
  </div>
</template>

<script>
import breadNav from "../../components/breadNav";
import userList from "./list";
import vDiolog from "./add";
export default {
  data() {
    return {
      sonStatus: {
        isAdd: true, //是否是添加
        dialogShow: false, //控制对话框显示隐藏
      },
    };
  },
  components: {
    breadNav,
    userList,
    vDiolog,
  },
  methods: {
    //封装一个打开弹框事件
    openDialog() {},
    // 封装一个关闭弹框事件  弹框右上角的x
    closeDialog(e) {
      this.sonStatus.dialogShow = e;
      console.log(e, "事件源");
    },
    //update事件
    update(e) {
      this.sonStatus.isAdd = e.isAdd;
      // 打开弹框
      this.sonStatus.dialogShow = true;
      this.$refs.vDiolog.update(e.uid);
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-button {
  margin-top: 25px;
  margin-bottom: 10px;
}
</style>
