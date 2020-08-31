<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加限时秒杀':'编辑限时秒杀'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="seckForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="title" label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="seckForm.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <!-- type	显示类型	string	year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange -->
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="first_cateid" label="一级分类：" :label-width="formLabelWidth">
          <el-select v-model="seckForm.first_cateid" @change="changeFristId()">
            <option value label disabled>---请选择---</option>
            <el-option
              v-for="item in get_CateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="second_cateid" label="二级分类：" :label-width="formLabelWidth">
          <el-select v-model="seckForm.second_cateid" @change="changeshop()">
            <option value label="请选择" disabled></option>
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="goodsid" label="商品：" :label-width="formLabelWidth">
          <el-select v-model="seckForm.goodsid">
            <option value label="请选择" disabled></option>
            <el-option
              v-for="item in goodArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="seckForm.status"
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
//引入接口
import {
  getSeckAdd,
  getSeckInfo,
  getSeckEdit,
  getGoodsList,
} from "../../util/axios";
export default {
  data() {
    return {
      secondCate: [], //二级分类
      goodArr: [], //商品数组
      editId: 0,
      value1: "",
      formLabelWidth: "120px", //lable宽度
      seckForm: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态
      },
      rules: {
        title: [
          //代表加红色星标
          { required: true, message: "请填写活动名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    //获取商品列表
    this.getGoodsListAction();
    //获取规格列表
    this.getCateListAction();
  },
  computed: {
    ...mapGetters(["get_GoodsList", "get_SeckList", "get_CateList"]),
  },
  props: ["isShow"],
  methods: {
    //选择一级分类触发事件
    changeFristId(n) {
      console.log(n, "参数");
      //查找id在数组中匹配出的索引下标
      let index = this.get_CateList.findIndex(
        (item) => item.id == this.seckForm.first_cateid
      );
      this.secondCate = this.get_CateList[index].children;
      //如果n不是true 清空双向数据绑定
      if (!n) {
        this.seckForm.second_cateid = "";
        this.seckForm.goodsid = "";
      }
    },
    // 二级联动渲染商品列表
    changeshop(n) {
      getGoodsList({
        fid: this.seckForm.first_cateid,
        sid: this.seckForm.second_cateid,
      }).then((res) => {
        if (res.code === 200) {
          console.log(res.list, "qwertu");
          this.goodArr = res.list;
        }
      });
      // 如果n不是true清空双向数据绑定
      if (!n) {
        this.seckForm.goodsid = "";
      }
    },
    reset() {
      //清空表单信息
      (this.seckForm = {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态  1正常2禁用
      }),
        // 清空validate的验证信息
        this.$refs["ruleForm"].clearValidate(this.rules);
      //重置日期
      this.value1 = [];

      //子组件去修改父组件的弹框状态
      this.$emit("closeDialog", false);
    },
    //触发列表的调取
    ...mapActions([
      "getSeckListAction",
      "getCateListAction",
      "getGoodsListAction",
    ]),
    //点击弹框获取一条数据
    update(id) {
      console.log(id);
      this.editId = id;
      getSeckInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.seckForm = res.list;
          //数据二次转化 调用一级的change事件。不让二级置空
          this.changeFristId(true);
          this.changeshop(true);
          //转化日期
          this.value1 = [
            new Date(parseFloat(this.seckForm.begintime)),
            new Date(parseFloat(this.seckForm.endtime)),
          ];
        }
      });
    },
    //添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 对时间进行转化，转化成时间戳
          this.seckForm.begintime = new Date(this.value1[0]).getTime();
          this.seckForm.endtime = new Date(this.value1[1]).getTime();
          console.log(this.seckForm.begintime);
          //调取接口
          //是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            //调取添加接口
            getSeckAdd(this.seckForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getSeckListAction();
                console.log(this.get_SeckList, "限时秒杀列表");
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            //id用户编号，必填项  对数据进行编辑
            this.seckForm.id = this.editId;
            // //调取添加接口
            getSeckEdit(this.seckForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getSeckListAction();
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

<style  lang="" scoped>
</style>
