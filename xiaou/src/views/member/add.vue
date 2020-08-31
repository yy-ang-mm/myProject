<template>
  <div>
    <!-- 点击添加，弹出弹框 -->
    <el-dialog :before-close="reset" title="编辑会员" :visible.sync="isShow.dialogShow" center>
      <el-form :model="memberform" :rules="rules" ref="ruleForm">
        <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth">
          <el-input v-model="memberform.phone"></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称" :label-width="formLabelWidth">
          <el-input v-model="memberform.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input v-model="memberform.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="memberform.status"
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
import { getMemberInfo, getMemberEdit } from "../../util/axios";
export default {
  data() {
    return {
      editId: 0, //用于编辑删除
      formLabelWidth: "120px",
      memberform: {
        phone: "", //手机号
        nickname: "", //昵称
        password: "", //密码
        status: 1,
      },
      // 表单验证（根据产品需求制定）
      rules: {
        phone: [
          // 代表加红色星标
          { required: true, message: "请输入会员名称", trigger: "blur" },
        ],
        nickname: [
          // 代表加红色星标
          { required: true, message: "请输入会员手机号", trigger: "blur" },
        ],
      },
    };
  },
  props: ["isShow"],
  mounted() {
    //获取角色列表
    this.getMemberListAction();
    console.log(this.isShow, "父组件传递的内容");
  },
  computed: {
    // 会员列表
    ...mapGetters(["get_MemberList"]),
  },
  methods: {
    //  封装关闭弹框并清空事件
    reset() {
      // 清空表单信息
      (this.memberform = {
        phone: "", //所属角色编号
        nickname: "", //用户名称
        password: "", //密码
        status: 1,
      }),
        this.$refs["ruleForm"].clearValidate(this.rules);
      // 子组件去修改父组件的弹框状态  子传父
      this.$emit("closeDialog", false);
    },
    // 触发会员列表的的调取
    ...mapActions(["getMemberListAction"]),
    //点击弹框获取一条数据
    update(uid) {
      this.editId = uid;
      this.isAdd = false;
      getMemberInfo({ uid }).then((res) => {
        if (res.code === 200) {
          console.log(res, "一条数据");
          this.Memberform = res.list;
        }
      });
    },

    // 添加表单事件
    add(formName) {
      // validate	对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      //   valid 有效的，正确的
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //uid用户编号，必填项  对数据进行编辑
          this.memberform.uid = this.editId;
          // 调取添加接口
          getMemberEdit(this.memberform).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              //关闭弹框并清空
              this.reset();
              // 重新调取列表
              this.getMemberListAction();
            }
          });
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
