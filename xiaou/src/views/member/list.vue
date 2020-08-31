<template>
  <div>
    <el-table :data="get_MemberList" border>
      <el-table-column prop="uid" label="会员编号"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="item">
          <el-button type="primary" size="mini" @click="update(item.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getMemberListAction();
  },
  computed: {
    ...mapGetters(["get_MemberList"]),
  },
  methods: {
    ...mapActions(["getMemberListAction"]),
    // 点击编辑按钮传id
    update(uid) {
      this.$emit("update", {
        uid,
        isAdd: false,
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
</style>
