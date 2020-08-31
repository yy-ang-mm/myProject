<template>
  <div>
    <el-table :data="get_SeckList" border>
      <el-table-column prop="title" label="活动名称"></el-table-column>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//调用接口
import { getSeckDel } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getSeckListAction();
  },
  computed: {
    ...mapGetters(["get_SeckList"]),
  },
  methods: {
    ...mapActions(["getSeckListAction"]),
    update(id) {
      this.$emit("update", {
        id,
        isAdd: false,
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
          getSeckDel({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表接口
              this.getSeckListAction();
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


