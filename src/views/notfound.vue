<template>
  <div @click="toLogin" class="notfound">
    <img src="../assets/404.gif" alt />
  </div>
</template>

<script>
export default {
  name: "notfound",
  created() {
    this.$message.success(
      "你成功的发现了错误页哦！，要不要回去呀！！点页面的任意位置都会返回登录页！"
    );
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang='less' scoped>
.notfound {
  background-color: #0691d2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
