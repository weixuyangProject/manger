<template>
  <div>
    <!-- 面包屑导航 -->
    <mybread name1="商品管理" name2="商品分类"></mybread>
    <!--  输入框 按钮 栅格-->
    <el-col>
      <el-col :span="2">
        <el-button type="warning" plain>添加分类</el-button>
      </el-col>
    </el-col>

    <!-- table -->
    <el-table :data="tableData" row-key="cat_id" style="width: 100%">
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="cat_level" label="级别" width="180">
        <template slot-scope="scope">{{scope.row.cat_level | formatLevel}}</template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效">
        <template slot-scope="scope">{{scope.row.cat_deleted | formatDeleted}}</template>
      </el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="1"
      :page-sizes="[5, 10,15, 16]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="666"
    ></el-pagination>
  </div>
</template>

<script>
import { categories } from "../api/http";
export default {
  name: "categories",
  data() {
    return {
      // table的数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  filters:{
    formatLevel(value){
      switch (value) {
        case 0:
          return '一级'
          break;
        case 1:
          return '二级'
          break;
        case 2:
          return '三级'
          break;
      
        default:
          break;
      }
    },
    formatDeleted(value){
      return value?'无效':"有效"
    }
  },
  created() {
    categories().then(backData => {
      console.log(backData);
      this.tableData = backData.data.data;
    });
  }
};
</script>

<style lang='less' scoped>
</style>
