<template>
  <div>
    <!-- 点击添加，弹出弹框 -->
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加商品管理':'编辑商品管理'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="goodsform" :rules="rules" ref="ruleForm">
        <el-form-item prop="first_cateid" label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="goodsform.first_cateid" @change="changeFirst()">
            <el-option label value disabled>--请选择--</el-option>
            <el-option
              v-for="item in get_CateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="second_cateid" label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="goodsform.second_cateid" placeholder="--请选择--">
            <option label="请选择" value disabled></option>
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="goodsname" label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="goodsform.goodsname"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="价格" :label-width="formLabelWidth">
          <el-input v-model="goodsform.price"></el-input>
        </el-form-item>
        <el-form-item prop="market_price" label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="goodsform.market_price"></el-input>
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
        <el-form-item prop="specsid" label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="goodsform.specsid" placeholder="--请选择--">
            <el-option label="商品规格" :value="0">商品规格</el-option>
            <el-option
              v-for="item in get_GoodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="specsattr" label="商品属性" :label-width="formLabelWidth">
          <el-select v-model="goodsform.specsattr" placeholder="--请选择--">
            <el-option label="商品属性" :value="0">商品属性</el-option>
            <el-option
              v-for="item in get_GoodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="goodsform.isnew" :label="1">是</el-radio>
          <el-radio v-model="goodsform.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="goodsform.ishot" :label="1">是</el-radio>
          <el-radio v-model="goodsform.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item prop="description" label="商品描述" :label-width="formLabelWidth">
          <el-input v-model="goodsform.description"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="goodsform.status"
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
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../util/axios";
export default {
  data() {
    return {
      editId: 0, //用于编辑删除
      changePage: 1,
      formLabelWidth: "120px",
      secondCate: "", //二级分类
      // 图片配置
      imgUrl: "", //上传文件的地址
      fileList: [], //文件上传列表数组
      dialogImageUrl: "", //图片地址
      dialogVisible: false, //是否打开图片弹框
      goodsform: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        status: 1, //状态
      },
      // 表单验证（根据产品需求制定）
      rules: {
        first_cateid: [
          // 代表加红色星标
          { required: true, message: "请输入一级分类名称", trigger: "blur" },
        ],
        second_cateid: [
          // 代表加红色星标
          { required: true, message: "请输入二级分类名称", trigger: "blur" },
        ],
        goodsname: [
          // 代表加红色星标
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [
          // 代表加红色星标
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        market_price: [
          // 代表加红色星标
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        specsid: [
          // 代表加红色星标
          { required: true, message: "请输入商品规格名称", trigger: "blur" },
        ],
        specsattr: [
          // 代表加红色星标
          { required: true, message: "请输入商品规格属性", trigger: "blur" },
        ],
      },
    };
  },
  props: ["isShow"],
  mounted() {
    //获取商品管理列表
    this.getGoodsListAction();
    //获取善商品规格列表
    this.getSpecsListAction();
  },
  computed: {
    // 角色列表
    ...mapGetters(["get_CateList", "get_SpecsList"]),
  },
  methods: {
    // 一级分类触发事件
    changeFirst(n) {
      console.log(n, "一级分类");
      let index = this.get_CateList.findIndex(
        (item) => item.id == this.goodsform.first_cateid
      );
      this.secondCate = this.get_CateList[index].children;
    },

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
      (this.goodsform = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        status: 1, //状态
      }),
        // 清空validate的验证信息
        this.$refs["ruleForm"].clearValidate(this.rules);
      // 清空图片列表
      this.fileList = [];
      // 子组件去修改父组件的弹框状态  子传父
      this.$emit("closeDialog", false);
    },
    // 触发上商品规格的调取
    ...mapActions(["getGoodsListAction", "getSpecsListAction"]),
    //点击弹框获取一条数据
    update(id, changePage) {
      this.editId = id;
      this.changePage = changePage;
      getGoodsInfo({ id }).then((res) => {
        if (res.code === 200) {
          console.log(res, "一条数据");
          this.goodsform = res.list[0];
          // 对图片进行二次转化
          this.fileList = this.goodsform.img
            ? [{ url: `${this.uploadHttp}${this.goodsform.img}` }]
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
          // 文件上传
          let data = this.goodsform;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }

          // 调取接口
          // 是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            // 转化
            file.append("img", this.imgUrl);
            // 调取添加接口
            getGoodsAdd(file).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                // 关闭弹框并清空
                this.reset();
                //重新调取管理员列表
                this.isShow.getCount();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            //id用户编号，必填项  对数据进行编辑
            file.append("id", this.editId);
            // 调取添加接口
            /* getGoodsEdit(this.goodsform).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                // 重新调取列表
                this.getGoodsListAction({
                  size: 2,
                  page: this.changePage,
                });
              }
            }); */
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
