<template>
  <div>
    <!-- 点击添加，弹出弹框 -->
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加商品规格':'编辑商品规格'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="specsform" :rules="rules" ref="ruleForm">
        <el-form-item prop="specsname" label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="specsform.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          v-for="(item,index) in specsArr"
          :key="index"
        >
          <el-input v-model="item.value" style="width:65%"></el-input>
          <el-button type="primary" v-if="index==0" @click="addSpecs(item)">新增规格属性</el-button>
          <el-button @click="delSpecs(item)" v-else>删除</el-button>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="specsform.status"
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
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
export default {
  data() {
    return {
      specsArr: [
        {
          value: "",
        },
      ],
      editId: 0, //用于编辑删除
      changePage: 1,
      formLabelWidth: "120px",
      specsform: {
        specsname: "", //规格名称
        attrs: "", //规格属性
        status: 1,
      },
      // 表单验证（根据产品需求制定）
      rules: {
        specsname: [
          // 代表加红色星标
          { required: true, message: "请输入商品规格名称", trigger: "blur" },
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
    // 添加规格属性
    addSpecs(item) {
      //判断
      if (this.specsArr.length <= 6) {
        this.specsArr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加6个");
      }
    },
    delSpecs(item) {
      let index = this.specsArr.indexOf(item);
      if (index !== -1) {
        this.specsArr.splice(index, 1);
      }
    },

    //  封装关闭弹框并清空事件
    reset() {
      // 清空表单信息
      this.specsform = {
        specsname: "", //规格名称
        attrs: "", //规格属性
        status: 1,
      };
      // 清空validate的验证信息
      this.$refs["ruleForm"].clearValidate(this.rules);
      // 清空规格属性数组
      this.specsArr = [
        {
          value: "",
        },
      ];
      // 子组件去修改父组件的弹框状态  子传父
      this.$emit("closeDialog", false);
    },
    // 触发上商品规格的调取
    ...mapActions(["getSpecsListAction", "getRoleListAction"]),
    //点击弹框获取一条数据
    update(id, changePage) {
      this.editId = id;
      this.changePage = changePage;
      getSpecsInfo({ id }).then((res) => {
        if (res.code === 200) {
          console.log(res, "一条数据");
          this.specsform = res.list[0];
          // 数据二次转化==规格属性
          this.specsform.attrs.map((item, index) => {
            if (index == 0) {
              this.specsArr[0].value = item;
            } else {
              this.specsArr.push({
                value: item,
              });
            }
          });
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
          let arr = this.specsArr.map((item) => item.value);
          this.specsform.attrs = arr ? arr.join(",") : "";
          // 是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            // 调取添加接口
            getSpecsAdd(this.specsform).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                // 关闭弹框并清空
                this.reset();
                //重新调取管理员列表
                this.isShow.getCount();
              }
            });
          } else {
            //id用户编号，必填项  对数据进行编辑
            this.specsform.id = this.editId;
            // 调取添加接口
            getSpecsEdit(this.specsform).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                // 重新调取列表
                this.getSpecsListAction({
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
