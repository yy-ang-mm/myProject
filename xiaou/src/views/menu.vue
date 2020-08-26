<template>
  <!-- 菜单管理页 -->
  <div>
    <!-- 面包屑导航 -->
    <bread-nav></bread-nav>
    <!-- 添加按钮 -->
    <el-row>
      <el-button type="primary" plain size="mini" @click="openDialog">添加</el-button>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="get_MenuList"
      border
      row-key="id"
      default-expand-all
      :tree-props="{children:'children'}"
      style="width: 100%"
    >
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
      <el-table-column prop="pid" label="上级菜单"></el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180"></el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-button type="success" size="mini" v-if="item.row.status==1">正常</el-button>
          <el-button type="danger" size="mini" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
        <template slot-scope="item">
          <el-button type="primary" size="mini" @click="edit(item.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击添加，弹出弹框 -->
    <el-dialog :before-close="reset" :title="isAdd?'添加菜单':'编辑菜单'" :visible.sync="dialogShow" center>
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
console.log(this.$store);
// 引入接口文件
import {
  getMenuAdd,
  getMenuList,
  getMenuInfo,
  getMenuEdit,
  getMenuDel,
} from "../util/axios";
import breadNav from "../components/breadNav";

export default {
  data() {
    return {
      editId: 0, //编辑删除用的
      isAdd: true, //是否是添加
      dialogShow: false, //控制对话框的显示隐藏
      formLabelWidth: "120px", //lable宽度
      menuform: {
        title: "",
        pid: 0,
        type: 1, //类型1目录2菜单
        icon: "",
        url: "",
        status: 1,
      },
      /* options: [
        {
          value: "1",
          label: "系统管理",
        },
        {
          value: "2",
          label: "商城管理",
        },
      ], */
      /* tableData: [
        {
          id: 1, //菜单编号
          title: "用户管理", //菜单名称
          pid: 222, //上级菜单
          icon: "asd", //菜单图标
          url: "1232asdsdf", //菜单地址
          status: true, //状态
          type: "1",
        },
        {
          id: 2, //菜单编号
          title: "系统管理", //菜单名称
          pid: 13, //上级菜单
          icon: "dsfd", //菜单图标
          url: "qwrer34545", //菜单地址
          status: false, //状态
          type: "2",
        },
      ], */
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
  mounted() {
    // 页面一加载就获取菜单列表
    // this.get_menu_list();
    this.getMenuListAction();
  },
  computed: {
    ...mapGetters(["get_MenuList"]),
  },
  methods: {
    // 封装打开弹框事件（新增按钮）
    openDialog() {
      this.isAdd = true;
      this.dialogShow = true;
    },
    // 封装获取菜单列表
    ...mapActions(["getMenuListAction"]),
    /* get_menu_list(){
      getMENUlist().then((res)=>{
        console.log(res,"菜单列表");
        if(res.code===200){
          this.tableData=res.list;
        }
      })
    } */
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
      this.dialogShow = false;
      // 方法二
      //  表单域 model 字段，在使用 validate、resetFields 方法的情况下，prop属性是必填的
      // this.$refs["ruleForm"].resetFields();
    },

    // 编辑事件
    edit(id) {
      this.editId = id;
      // 更改isAdd状态
      this.isAdd = false;
      getMenuInfo({ id }).then((res) => {
        console.log(res, "一条数据");
        if (res.code == 200) {
          this.dialogShow = true;
          this.menuform = res.list;
        }
      });
    },
    // 删除事件
    del(id) {
      this.$confirm("确定要删除该数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调取删除接口
          getMenuDel({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表接口
              this.getMenuListAction();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

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
          if (this.isAdd) {
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
  components: {
    breadNav,
  },
};
</script>

<style lang="stylus" scoped>
.el-row {
  margin-top: 15px;
  margin-bottom: 10px;
}
</style>
