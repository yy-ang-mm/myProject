<template>
  <div>
    <el-table :data="get_GoodsList" border>
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column label="图片" width="120">
        <template slot-scope="item">
          <div>
            <img class="uploadImg" :src="item.row.img? uploadHttp+item.row.img : ''" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="item">
          <el-tag v-if="item.row.isnew ==1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="item">
          <el-tag v-if="item.row.ishot ==1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="item">
          <el-button type="primary" size="mini" @click="update(item.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageInfo.size"
      @current-change="getChange"
      @prev-click="prevInfo"
      @next-click="nextInfo"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//调用接口
import {
  getGoodsDel,
  getGoodsCount,
  getGoodsAdd,
  getGoodsEdit,
} from "../../util/axios";
export default {
  data() {
    return {
      total: 0, //总条数
      pageInfo: {
        //分页的信息
        size: 2, //查询条数
        page: 1, //页码数
      },
      changePage: 1,
    };
  },
  mounted() {
    //页面一加载调取总条数
    this.getCount();
    this.getGoodsListAction(this.pageInfo);
  },
  computed: {
    ...mapGetters(["get_GoodsList"]),
  },
  methods: {
    ...mapActions(["getGoodsListAction"]),
    //点击编辑按钮传id
    update(id) {
      this.$emit("update", {
        id,
        isAdd: false,
        changePage: this.changePage,
      });
    },
    //删除数据
    del(id) {
      this.$confirm("确定要删除该数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getGoodsDel({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表接口
              this.getCount();
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
    //获取总条数
    getCount() {
      getGoodsCount().then((res) => {
        if (res.code === 200) {
          console.log(res, "总条数");
          this.total = res.list[0].total;

          if (this.pageInfo.page != 1 && this.get_GoodsList.length == 1) {
            this.pageInfo.page--;
          }
          //重新调取列表
          this.getGoodsListAction(this.pageInfo);
        }
      });
    },
    //当页面发生变化的时候会调用当前方法
    getChange(n) {
      console.log(n, "当前的页面");
      this.pageInfo.page = n;
      this.changePage = n;
      this.getGoodsListAction(this.pageInfo);
    },
    //上一页事件
    prevInfo(n) {
      console.log(n, "当前页");
      this.pageInfo.page = n;
      this.changePage = n;
      this.getGoodsListAction(this.pageInfo);
    },
    //下一页事件
    nextInfo(n) {
      console.log(n, "当前页");
      this.pageInfo.page = n;
      this.changePage = n;
      this.getGoodsListAction(this.pageInfo);
    },
  },
};
</script>

<style  lang="" scoped>
.el-pagination {
  float: right;
  margin: 15px 0;
}
.el-button + .el-button {
  margin: 0 1px;
}
.uploadImg {
  width: 100px;
}
</style>


