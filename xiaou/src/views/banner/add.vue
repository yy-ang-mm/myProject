<template>
  <div>
    <!-- 点击添加，弹出弹框 -->
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加轮播图':'编辑轮播图'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="bannerform" :rules="rules" ref="ruleForm">
        <el-form-item prop="title" label="标题" :label-width="formLabelWidth">
          <el-input v-model="bannerform.title"></el-input>
        </el-form-item>
        <el-form-item prop="img" label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :on-change="changeInfo"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="bannerform.status"
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
import { mapActions } from "vuex";
// 引入接口
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../util/axios";
export default {
  data() {
    return {
      editId: 0, //用于编辑删除
      formLabelWidth: "120px",
      // 图片配置
      imgUrl: "", //上传文件的地址
      fileList: [], //文件上传列表数组
      dialogImageUrl: "", //图片地址
      dialogVisible: false, //是否打开图片弹框
      bannerform: {
        title: "", //商品分类名称名称
        img: "", //图片（文件，一般用于二级分类）
        status: 1,
      },
      // 表单验证（根据产品需求制定）
      rules: {
        title: [
          // 代表加红色星标
          { required: true, message: "请输入分类名称", trigger: "blur" },
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
    this.getBannerListAction();
    // console.log(this.isShow, "父组件传递的内容");
  },
  methods: {
    // 图片移除时的钩子函数
    handleRemove(file, fileList) {
      // console.log(file, fileList, "移除触发的钩子函数");
    },
    // 查看图片时触发的钩子函数
    handlePreview(file) {
      // console.log(file, "点击查看时回调的钩子函数");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 文件超出选择之后的提示
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择一个文件，本次选择了${files.length}个文件，共选择了${
          files.length + fileList.length
        }个文件`
      );
    },
    // 当上传文件图片发生变化时出发的函数
    changeInfo(file) {
      // console.log(file.raw, "文件详情");
      this.imgUrl = file.raw;
    },
    //  封装关闭弹框并清空事件
    reset() {
      // 清空表单信息
      this.bannerform = {
        title: "", //用户名称
        img: "", //图片
        status: 1,
      };

      // 清空图片列表
      this.fileList = [];
      // 清空validate的验证信息
      this.$refs["ruleForm"].clearValidate(this.rules);
      // 子组件去修改父组件的弹框状态  子传父
      this.$emit("closeDialog", false);
    },
    // 触发列表的的调取
    ...mapActions(["getBannerListAction"]),
    //点击弹框获取一条数据
    update(id) {
      this.editId = id;
      getBannerInfo({ id }).then((res) => {
        if (res.code === 200) {
          console.log(res, "一条数据");
          this.bannerform = res.list;
          // 对图片进行二次转化
          this.fileList = this.bannerform.img
            ? [{ url: `${this.uploadHttp}${this.bannerform.img}` }]
            : [];
          console.log(this.fileList, "列表数组");
        }
      });
    },

    // 添加表单事件
    add(formName) {
      // validate	对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      //   valid 有效的，正确的
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.bannerform;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          // 转化
          file.append("img", this.imgUrl);
          // 调取接口
          // 是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            // 调取添加接口
            getBannerAdd(file).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                // 关闭弹框并清空
                this.reset();
                //重新调取商品分类列表
                this.getBannerListAction();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            //id编号，必填项  对数据进行编辑
            file.append("id", this.editId);
            // 调取修改接口
            getBannerEdit(file).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                // 重新调取列表
                this.getBannerListAction();
              } else {
                this.$message.error(res.msg);
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
