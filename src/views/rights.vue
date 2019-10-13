<template>
  <div>
    <!-- 面包屑导航 -->
    <mybread name1="权限管理" name2="权限列表"></mybread>
    <!-- table -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// 导入方法
import { rightList } from "../api/http";
export default {
  name: "rights",
  data() {
    return {
      // table的数据
      tableData: []
    };
  },
  // 获取数据
  created() {
    rightList().then(backData => {
      // console.log(backData);
      if(backData.data.meta.status==200){
        // level不是我要的 我把他改成我要的
        for(let i=0;i<backData.data.data.length;i++){
          switch (backData.data.data[i].level) {
            case '0':
              backData.data.data[i].level = '一级'
              break;
            case '1':
              backData.data.data[i].level = '二级'
              break;
            case '2':
              backData.data.data[i].level = '三级'
              break;
          
            default:
              break;
          }
        }
        // 保存数据
        this.tableData = backData.data.data
      }
    });
  }
};
</script>

<style lang='less' scoped>
</style>
