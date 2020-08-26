<template>
  <div>
    <el-table
      :data="get_CateList"
      border
      row-key="id"
      default-expand-all
      :tree-props="{children:'children'}"
    >
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="item">
          <div>
            <!-- 因为图片在列表中显示的是字符串，因此要给图片拼接域名，组成一个完整的图片地址 -->
            <img class="img" :src="item.row.img?uploadHttp+item.row.img:''" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="item">
          <el-button type="primary" size="mini" @click="update(item.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 引入接口
import {
  getCateCount,
  getCateDel,
  getCateAdd,
  getCateEdit,
} from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getCateListAction(this.pageInfo);
  },
  computed: {
    ...mapGetters(["get_CateList"]),
  },
  methods: {
    ...mapActions(["getCateListAction"]),
    // 点击编辑按钮传id
    update(id) {
      this.$emit("update", {
        id,
        isAdd: false,
      });
    },
    del(id) {
      this.$confirm("确定要删除改数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调取删除接口
          getCateDel({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 重新调取列表接口
              this.getCateListAction();
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
  },
};
</script>

<style lang="stylus" scoped>
.el-pagination {
  float: right;
  margin: 15px 0;
}

.img {
  width: 200px;
}
</style>
