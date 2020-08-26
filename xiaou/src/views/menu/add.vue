<template>
  <div>
    <!-- 点击添加，弹出弹框 -->
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加菜单':'编辑菜单'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="menuform" :rules="rules" ref="ruleForm">
        <el-form-item prop="title" label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="menuform.title"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="menuform.pid" placeholder="请选择上级菜单">
            <el-option value disabled>--请选择--</el-option>
            <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
            <el-option
              v-for="item in get_MenuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="menuform.type" :label="1">目录</el-radio>
          <el-radio v-model="menuform.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="menuform.type==1"
          prop="icon"
          label="菜单图标"
          :label-width="formLabelWidth"
        >
          <el-input v-model="menuform.icon"></el-input>
        </el-form-item>
        <el-form-item v-if="menuform.type==2" label="菜单地址" :label-width="formLabelWidth">
          <el-input v-model="menuform.url"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="menuform.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button type="primary" @click="add('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getMenuAdd, getMenuInfo, getMenuEdit } from "../../util/axios";
export default {
  data() {
    return {
      editId: 0, //编辑删除用的
      formLabelWidth: "120px", //lable宽度
      menuform: {
        title: "",
        pid: 0,
        type: 1, //类型1目录2菜单
        icon: "",
        url: "",
        status: 1,
      },
      // 表单验证（根据产品需求制定）
      rules: {
        title: [
          // 代表加红色星标
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          // 验证字符数
          { min: 2, max: 9, message: "长度在 2 到 9 个字符", trigger: "blur" },
        ],
        pid: [
          // 代表加红色星标
          { required: true, message: "请选择上级菜单", trigger: "change" },
        ],
      },
    };
  },
  props: ["isShow"],
  computed: {
    ...mapGetters(["get_MenuList"]),
  },
  methods: {
    // 关闭弹框事件
    // 封装一个清空事件
    reset() {
      // 方法一
      this.menuform = {
        title: "",
        pid: 0,
        type: 1, //类型1目录2菜单
        icon: "",
        url: "",
        status: 1,
      };
      //   子组件关闭弹框要去修改父组件dialogShow这个数据
      this.$emit("closeDialog", false);
      // 方法二
      //  表单域 model 字段，在使用 validate、resetFields 方法的情况下，prop属性是必填的
      //   this.$refs["ruleForm"].resetFields();
    },

    // 编辑事件
    update(id) {
      // 赋值 给调取编辑接口用
      this.editId = id;
      // 更改isAdd状态
      this.isAdd = false;
      getMenuInfo({ id }).then((res) => {
        console.log(res, "一条数据");
        if (res.code == 200) {
          //   this.dialogShow = true;
          this.menuform = res.list;
        }
      });
    },
    // 调取行动
    ...mapActions(["getMenuListAction"]),
    //   添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调取接口
          /* console.log(this.menuform, "this.menufrom");
          this.menuform.status = this.menuform.status ? 1 : 2;
          // 利用深拷贝，开辟一个新的空间，切断之前的视图联系，不会出现双向数据绑定
          let data = JSON.parse(JSON.stringify(this.menuform));
          // 后端接收的时候要1，或者2  el-switch要是true或者false
          data.status = data.status ? 1 : 2;
          console.log(data, "表单信息"); */
          // 是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            // 调取添加接口
            getMenuAdd(this.menuform).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                // 关闭弹框并清空
                this.reset();
                // 重新调取列表
                this.getMenuListAction();
              }
            });
          } else {
            // id编号，必填项  对数据进行编辑
            this.menuform.id = this.editId;
            // 调取添加接口
            getMenuEdit(this.menuform).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                // 关闭弹框并清空
                this.reset();
                // 重新调取列表
                this.getMenuListAction();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
