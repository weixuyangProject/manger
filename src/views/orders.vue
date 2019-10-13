<template>
  <div>
    <!-- 面包屑导航 -->
    <mybread name1="订单管理" name2="订单列表"></mybread>

    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="180">
        <!-- 获取这一行的数据 -->
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
            @click="dialogFormVisible=true"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="1"
      :page-sizes="[5, 10,15, 16]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="666"
    ></el-pagination>
    <!-- 对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <!-- 级联选择器 -->
      <el-cascader v-model="value" :options="options" :props="{ expandTrigger: 'hover' }"></el-cascader>
      <!-- 专门的插件 -->
      <VDistpicker></VDistpicker>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入数据
import options from "../assets/city_data_2017";
import VDistpicker from "v-distpicker";

export default {
  name: "orders",
  // 局部注册省市联动
  components: { VDistpicker },
  data() {
    return {
      // 级联选择器用到的数据
      value: [],
      options,
      // 对话框是否显示
      dialogFormVisible: false,
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
  }
};
</script>

<style lang='less' scoped>
</style>
