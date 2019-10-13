<template>
  <div>
    <!--  输入框 按钮 栅格-->
    <el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click='toGoodsAdd' plain>添加商品</el-button>
      </el-col>
    </el-col>

    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
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
export default {
  name:'goodsIndex',
  data() {
    return {
      input3: "",
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
  // 方法
  methods:{
    toGoodsAdd(){
      this.$router.push('/index/goods/add')
    }
  }
};
</script>

<style>
</style>
