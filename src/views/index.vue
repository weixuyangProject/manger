<template>
  <!-- 使用饿了么ui的布局容器来实现结构 -->
  <el-container class="my-container">
    <!-- 头部区域 -->
    <el-header class="my-header">
      <el-row>
        <el-col :span="5">
          <img class="my-logo" src="../assets/logo.png" alt />
        </el-col>
        <el-col :span="18">
          <h2 class="my-title">黑牛后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a class="my-logout" href="#" @click.prevent="logOut">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="200px" class="my-aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :unique-opened="false"
          :router="true"
        >
          <!-- 导航1 -->
          <el-submenu v-for="(item,index) in menuList" :index="''+index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <!-- 大标题 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级标题  it.path 设置之后结合 router可以实现跳转-->
            <el-menu-item v-for="(it,i) in item.children" :index="'/index/'+it.path">
              <i class="el-icon-menu"></i>
              {{it.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧区域 -->
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入菜单接口
import { menus } from "../api/http";

export default {
  name: "index",
  // 数据
  data() {
    return {
      // 菜单列表
      menuList: []
    };
  },
  created() {
    menus().then(backData => {
      // console.log(backData);
      // 保存给菜单
      this.menuList = backData.data.data;
    });
  },
  // 方法
  methods: {
    logOut() {
      // 提示用户
      this.$confirm("此操作将立即退出咱们网站, 你真要这样子！！?", "┭┮﹏┭┮", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认
          window.localStorage.removeItem("token");
          this.$router.push("/login");
          // 提示
          this.$message.error("你真狠！！别来了！！");
        })
        .catch(() => {
          //  取消
          this.$message("你真好！");
        });
    }
  }
};
</script>

<style lang='less' scoped>
.my-container {
  height: 100%;
  .my-header {
    height: 60px;
    background-color: #b3c0d1;
    line-height: 60px;
    .my-title {
      text-align: center;
      color: white;
    }
    .my-logout {
      color: white;
      background-color: hotpink;
      padding: 5px;
      border-radius: 4px;
      text-decoration: none;
    }
  }
  .my-main {
    background-color: #e9eef3;
    // 去除顶部的padding
    padding-top: 0;
  }
}
</style>
