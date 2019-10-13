<template>
  <div>
    <!-- alert -->
    <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="+active" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tabs -->
    <el-tabs v-model="active" tab-position="left">
      <el-tab-pane name="1" label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane name="4" label="商品图片">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers="sendHeaders"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
          :on-success="success"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane name="5" label="商品内容">
        <!-- 使用富文本组件 -->
        <quillEditor></quillEditor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  name: "goodsAdd",
  components: {
    quillEditor
  },
  data() {
    return {
      active: "1",
      // 文件信息
      fileList: [],
      // 携带去服务器的headers
      sendHeaders: {
        Authorization: window.localStorage.getItem("token")
      }
    };
  },
  // 方法
  methods: {
    handlePreview() {},
    handleRemove() {},
    success() {
      console.log("成功啦！！！");
    }
  }
};
</script>

<style>
.quill-editor{
  height: 500px;
}
</style>
