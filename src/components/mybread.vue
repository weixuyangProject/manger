<template>
  <el-breadcrumb class="my-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{name1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{name2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "mybread",
  // 让外部传递进来的参数
  props: ["name1", "name2", "food1"],
  created() {
    console.log(this.name1);
    console.log(this.name2);
    console.log(this.food1);
  }
};
</script>

<style lang='less' scoped>
.my-breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
}
</style>
