<template>
  <div>
    <!-- 面包屑导航 -->
    <mybread name1="用户管理" name2="用户列表">
      <div></div>
    </mybread>
    <!--  输入框 按钮 栅格-->
    <el-col>
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          @keyup.enter.native="search"
          v-model.trim="sendData.query"
          class="input-with-select"
        >
          <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <!-- 新增按钮 -->
        <el-button @click="dialogFormVisible=true" type="success" plain>添加用户</el-button>
      </el-col>
    </el-col>

    <!-- table -->
    <el-table border :data="tableData" style="width: 100%">
      <!-- 索引 -->
      <el-table-column type="index"></el-table-column>
      <!-- 姓名 -->
      <el-table-column label="姓名" prop="username" width="180"></el-table-column>
      <!-- 邮箱 -->
      <el-table-column label="邮箱" prop="email" width="180"></el-table-column>
      <!-- 电话 -->
      <el-table-column label="邮箱" prop="mobile" width="180"></el-table-column>
      <!-- 用户状态 -->
      <el-table-column label="用户状态" width="180">
        <template slot-scope="scope">
          <!-- 开关 -->
          <el-switch
            @change="sateChange(scope.row)"
            @click.native="doIt"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="180">
        <!-- 获取这一行的数据 -->
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
            @click="enterEdit(scope.row)"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            plain
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            @click="delOne(scope.row)"
            size="mini"
            icon="el-icon-delete"
            plain
          ></el-button>
          <!-- 分配角色按钮 -->
          <el-button
            @click="showRoles(scope.row)"
            type="warning"
            size="mini"
            icon="el-icon-check"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="sendData.pagenum"
      :page-sizes="[5, 10,15, 16]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>

    <!-- 新增的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="120px">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input disabled v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色框 -->
    <el-dialog title="分配角色" :visible.sync="rolesFormVisible">
      <el-form :model="rolesForm">
        <el-form-item label="当前用户" label-width="120px">
          <el-input disabled v-model="rolesForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请选择角色" label-width="120px">
          <el-select v-model="rolesForm.role_name" placeholder="请选择角色">
            <!-- 循环出选项 -->
            <el-option v-for="item in roleList" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignmentRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入方法
import {
  users,
  addUser,
  deleteUser,
  updateUserState,
  updateUserInfo,
  roles,
  assignmentRole
} from "../api/http";
import { type } from "os";
// import { addUser } from "../api/http";
export default {
  name: "users",
  data() {
    return {
      // 角色列表
      roleList: [],
      // 角色框中绑定的数据
      rolesForm: {
        role_name: "",
        username: ""
      },
      // 是否显示角色框
      rolesFormVisible: false,
      // 是否显示
      editFormVisible: false,
      // 编辑的表单数据
      editForm: {
        username: "",
        email: "",
        mobile: "",
        id: 0
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空哦", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空哦", trigger: "blur" },
          { min: 6, max: 24, message: "长度在 6 到 24 个字符", trigger: "blur" }
        ]
      },
      // 对话框绑定的数据
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 是否显示对话框
      dialogFormVisible: false,
      input3: "",
      // table的数据
      tableData: [],
      // 提交给服务器的数据
      sendData: {
        // 查询参数
        query: "",
        // 页码
        pagenum: 1,
        // 页容量
        pagesize: 5
      },
      // 总条数
      total: 0
    };
  },
  created() {
    // 获取数据
    this.search();
  },
  // 方法
  methods: {
    // 分配角色
    assignmentRole() {
      if (typeof this.rolesForm.role_name == "string") {
      } else {
        // 调用接口
        assignmentRole({
          id: this.rolesForm.id,
          // 只要更改了 role_name就是id 不更改就是字符串
          rid: this.rolesForm.role_name
        }).then(backData => {
          // console.log(backData);
          if (backData.data.meta.status == 200) {
            this.search();
            this.$message.success(backData.data.meta.msg);
          }
        });
      }
      // 关闭弹框
      this.rolesFormVisible = false;
    },
    // 显示分配角色对话框
    showRoles(row) {
      roles().then(backData => {
        // console.log(backData);
        this.roleList = backData.data.data;
      });
      // 把row的数据设置给 roleForm即可
      this.rolesForm = row;
      // 弹框
      this.rolesFormVisible = true;
    },
    // 保存修改
    saveEdit() {
      // 提交数据
      updateUserInfo({
        id: this.editForm.id,
        mobile: this.editForm.mobile,
        email: this.editForm.email
      }).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.editFormVisible = false;
          this.$message.success(backData.data.meta.msg);
          // 重新获取数据
          this.search();
        }
      });
    },
    // 进入编辑
    enterEdit(row) {
      this.editFormVisible = true;
      // row 最早定义的位置是 data中，vue在观察着这个数据
      // 这个方式会有应用问题
      // this.editForm = row;
      this.editForm.username = row.username;
      this.editForm.email = row.email;
      this.editForm.mobile = row.mobile;
      this.editForm.id = row.id;
    },
    doIt() {
      console.log("哒哒哒！！！！");
    },
    // 状态改变
    sateChange(row) {
      console.log(row);
      // 调用接口
      updateUserState({
        id: row.id,
        type: row.mg_state
      }).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          // 弹框
          this.$message.success(backData.data.meta.msg);
        }
      });
    },
    // 删除数据
    delOne(row) {
      // console.log(row);
      this.$confirm(
        "此操作将永久删除该管理员, 你想明白了吗！滑稽?",
        "友情提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          // 确定
          deleteUser({ id: row.id }).then(backData => {
            // console.log(backData)
            if (backData.data.meta.status == 200) {
              // 重新获取数据
              this.search();
            }
          });
        })
        .catch(() => {
          // 取消
          this.$message("算你识相！");
        });
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 对
          addUser(this.form).then(backData => {
            // console.log(backData);
            // 添加成功判断
            if (backData.data.meta.status == 201) {
              // 关闭弹框
              this.dialogFormVisible = false;
              // 重新获取数据
              this.search();
            } else if (backData.data.meta.status == 400) {
              this.$message.warning(backData.data.meta.msg);
            }
          });
        } else {
          // 错
          this.$message.waring("数据不太对哦，小老弟！！");
          return false;
        }
      });
    },
    // 抽取的获取数据方法
    search() {
      users(this.sendData).then(backData => {
        // console.log(backData);
        // 设置数据
        if (backData.data.meta.status == 200) {
          // 列表数据
          this.tableData = backData.data.data.users;
          // 总条数
          this.total = backData.data.data.total;
        }
      });
    },
    sizeChange(size) {
      console.log("size:" + size);
      // 保存
      this.sendData.pagesize = size;
      // 重新获取数据
      this.search();
    },
    currentChange(current) {
      // console.log("current:" + current);
      // 保存
      this.sendData.pagenum = current;
      // 重新获取数据
      this.search();
    }
  }
};
</script>

<style lang='less' scoped>
</style>
