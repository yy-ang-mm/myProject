<template>
  <div>
    <!-- 点击添加，弹出弹框 -->
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加菜单':'编辑菜单'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="roleform" :rules="rules" ref="ruleForm">
        <el-form-item prop="rolename" label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="roleform.rolename"></el-input>
        </el-form-item>
        <el-form-item prop="power" label="角色权限" :label-width="formLabelWidth">
          <!--             树形结构
            data	展示数据	array
            node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的	String
            props	配置选项，具体看下表	object
            default-expand-all	是否默认展开所有节点	boolean
          show-checkbox	节点是否可被选择	boolean
          
          getCheckedKeys	若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
          setCheckedKeys	通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性	
          -->
          <el-tree
            :data="get_MenuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :props="defaultProps"
            :default-checked-keys="defaultChecked"
            check-strictly
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="roleform.status"
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
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util/axios";
export default {
  data() {
    return {
      editId: 0, //编辑删除用的
      formLabelWidth: "120px", //lable宽度
      defaultChecked: [],
      roleform: {
        rolename: "",
        status: 1,
      },
      // 表单验证（根据产品需求制定）
      rules: {
        rolename: [
          // 代表加红色星标
          { required: true, message: "请输入角色名称", trigger: "blur" },
          // 验证字符数
          { min: 2, max: 9, message: "长度在 2 到 9 个字符", trigger: "blur" },
        ],
      },
      defaultProps: {
        // 树结构的显示配置项
        children: "children",
        label: "title",
      },
    };
  },
  props: ["isShow"],
  mounted() {
    console.log(this.isShow);
    // 组件一加载就获取菜单列表
    this.getMenuListAction();
    // 获取角色列表
    this.getRoleListAction();
  },
  computed: {
    ...mapGetters(["get_MenuList"]),
  },
  methods: {
    // 封装一个清空事件
    reset() {
      // 方法一
      this.roleform = {
        rolename: "",
        status: 1,
      };
      // 清空tree结构权限的选择状态
      this.$refs.tree.setCheckedKeys([]);
      //   子组件关闭弹框要去修改父组件dialogShow这个数据
      this.$emit("closeDialog", false);
      // 方法二
      //  表单域 model 字段，在使用 validate、resetFields 方法的情况下，prop属性是必填的
      //   this.$refs["ruleform"].resetFields();
    },

    // 编辑事件
    update(id) {
      // 赋值 给调取编辑接口用
      this.editId = id;
      getRoleInfo({ id }).then((res) => {
        console.log(res, "一条数据");
        if (res.code === 200) {
          this.roleform = res.list;
          // 得到的数组要做二次装换
          this.defaultChecked = this.roleform.menus
            ? this.roleform.menus.split(",")
            : [];
        }
      });
    },
    // 触发菜单列表的调取
    ...mapActions(["getMenuListAction", "getRoleListAction"]),

    //   添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 菜单权限  存放的是菜单编号，用逗号隔开 '1,2,3,4'
          this.roleform.menus = this.$refs.tree.getCheckedKeys().join(",");
          // 是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            // 调取添加接口
            getRoleAdd(this.roleform).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                // 关闭弹框并清空
                this.reset();
                // 重新调取列表
                this.getRoleListAction();
              }
            });
          } else {
            // id编号，必填项  对数据进行编辑
            this.roleform.id = this.editId;
            // 调取添加接口 编辑成功
            getRoleEdit(this.roleform).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                // 关闭弹框并清空
                this.reset();
                // 重新调取列表
                this.getRoleListAction();
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
