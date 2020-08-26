<template>
  <div>
    <!-- 点击添加，弹出弹框 -->
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加管理员':'编辑管理员'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="userform" :rules="rules" ref="ruleForm">
        <el-form-item prop="roleid" label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="userform.roleid" placeholder="请选择">
            <el-option
              v-for="item in get_RoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="userform.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input v-model="userform.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="userform.status"
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
// 引入接口
import { getUserAdd, getUserInfo, getUserEdit } from "../../util/axios";
export default {
  data() {
    return {
      editId: 0, //用于编辑删除
      changePage: 1,
      formLabelWidth: "120px",
      userform: {
        roleid: "", //所属角色编号
        username: "", //用户名称
        password: "", //密码
        status: 1,
      },
      // 表单验证（根据产品需求制定）
      rules: {
        roleid: [
          // 代表加红色星标
          { required: true, message: "请输入所属角色", trigger: "blur" },
        ],
        username: [
          // 代表加红色星标
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          // 验证字符数
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: ["isShow"],
  mounted() {
    //获取角色列表
    this.getRoleListAction();
    console.log(this.isShow, "父组件传递的内容");
  },
  computed: {
    // 角色列表
    ...mapGetters(["get_RoleList"]),
  },
  methods: {
    //  封装关闭弹框并清空事件
    reset() {
      // 清空表单信息
      this.userform = {
        roleid: "", //所属角色编号
        username: "", //用户名称
        password: "", //密码
        status: 1,
      };
      this.$refs["ruleForm"].clearValidate(this.rules);
      // 子组件去修改父组件的弹框状态  子传父
      this.$emit("closeDialog", false);
    },
    // 触发角色列表和管理员列表的的调取
    ...mapActions(["getRoleListAction", "getUserListAction"]),
    //点击弹框获取一条数据
    update(uid, changePage) {
      this.editId = uid;
      this.changePage = changePage;
      getUserInfo({ uid }).then((res) => {
        if (res.code === 200) {
          console.log(res, "一条数据");
          this.userform = res.list;
        }
      });
    },

    // 添加表单事件
    add(formName) {
      // validate	对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      //   valid 有效的，正确的
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调取接口
          // 是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            // 调取添加接口
            getUserAdd(this.userform).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                // 关闭弹框并清空
                this.reset();
                //重新调取管理员列表
                this.isShow.getCount();
              }
            });
          } else {
            //uid用户编号，必填项  对数据进行编辑
            this.userform.uid = this.editId;
            // 调取添加接口
            getUserEdit(this.userform).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                // 重新调取列表
                this.getUserListAction({
                  size: 2,
                  page: this.changePage,
                });
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
