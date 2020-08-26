<template>
  <div>
    <!-- 面包屑 -->
    <bread-nav></bread-nav>
    <!-- 添加按钮 -->
    <div>
      <el-button type="primary" size="mini" plain @click="openDialog">添加</el-button>
    </div>
    <!-- 渲染表格 -->
    <cate-list ref="cateList" @update="update"></cate-list>
    <!-- 弹出对话框
    :isShow="sonStatus"  控制打开弹框
    -->
    <v-add ref="vAdd" :isShow="sonStatus" @closeDialog="closeDialog"></v-add>
  </div>
</template>

<script>
import breadNav from "../../components/breadNav";
import cateList from "./list";
import vAdd from "./add";
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
    cateList,
    vAdd,
  },
  methods: {
    //封装一个打开弹框事件
    openDialog() {
      this.sonStatus.isAdd = true;
      this.sonStatus.dialogShow = true;
    },
    // 封装一个关闭弹框事件  弹框右上角的x
    closeDialog(e) {
      this.sonStatus.dialogShow = e;
      console.log(e, "事件源");
    },
    //update事件
    update(e) {
      this.sonStatus.isAdd = e.isAdd;
      this.sonStatus.dialogShow = true;
      this.$refs.vAdd.update(e.id);
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
