<template>
  <div>
    <!-- 面包屑导航 -->
    <mybread name1="权限管理" name2="角色列表"></mybread>
    <!--  输入框 按钮 栅格-->
    <el-row>
      <el-col :span="2">
        <el-button type="danger" plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- table -->
    <el-table :data="tableData" style="width=100%">
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 最外层栅格 顶级栅格 -->
          <el-row v-for="item in scope.row.children">
            <el-col :span="6">
              <el-tag closable type @close="delOne(scope.row,item)">{{item.authName}}</el-tag>
              <!-- 小箭头 -->
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <el-col :span="18">
              <!-- 二级栅格 -->
              <el-row v-for="level2 in item.children">
                <el-col :span="6">
                  <el-tag
                    closable
                    type="success"
                    @close="delOne(scope.row,level2)"
                  >{{level2.authName}}</el-tag>
                  <!-- 小箭头 -->
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <el-col :span="18">
                  <!-- 三级 生成标签即可 -->
                  <el-tag
                    v-for="level3 in level2.children"
                    closable
                    type="warning"
                    class="my-tag"
                    @close="delOne(scope.row,level3)"
                  >{{level3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column label="操作">
        <!-- 获取这一行的数据 -->
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button type="primary" size="mini" icon="el-icon-edit" plain></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" size="mini" icon="el-icon-delete" plain></el-button>
          <!-- 分配角色按钮 -->
          <el-button
            type="warning"
            size="mini"
            @click="showRightsDialog(scope.row)"
            icon="el-icon-check"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 权限分配对话框 -->
    <el-dialog title="权限分配" :visible.sync="dialogFormVisible">
      <!-- 树形菜单 -->
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
        ref="tree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRight">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入接口
import {
  roles,
  delRoleRight,
  getRightsTree,
  giveRoleRights
} from "../api/http";
export default {
  name: "roles",
  data() {
    return {
      // table的数据
      tableData: [
        {
          date: "2016-05-02",
          name: "小老虎",
          address: "上海市普陀区金沙江路 1518 弄",
          cartoon: ["葫芦娃", "黑猫警长"]
        },
        {
          date: "2016-05-04",
          name: "王小二",
          address: "上海市普陀区金沙江路 1517 弄",
          cartoon: ["海尔兄弟", "舒克贝塔"]
        },
        {
          date: "2016-05-01",
          name: "王小猫",
          address: "上海市普陀区金沙江路 1519 弄",
          cartoon: ["蓝猫淘气三千问", "虹猫蓝兔七侠传"]
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          cartoon: ["火影忍者", "银魂！", "海贼王", "死神", "龙珠"]
        }
      ],
      // 是否显示对话框
      dialogFormVisible: false,
      // 树形菜单的数据
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      // 数据的对应关系
      // label是文本的意思
      // children 后代节点的意思
      defaultProps: {
        label: "authName",
        children: "children"
      },
      // 选中的节点
      checkedKeys: [],
      // 当前的角色id
      roleId: 0
    };
  },
  // 获取数据
  created() {
    // 调用获取数据的方法
    this.getData();
  },
  methods: {
    // 角色授权
    submitRight() {
      // 获取选中的权限
      // console.log(this.$refs.tree.getCheckedKeys());
      // 把数组的每一项 使用给定的值进行平级
      // console.log(this.$refs.tree.getHalfCheckedKeys())
      // console.log(this.$refs.tree.getCheckedKeys())

      // 使用es6中的展开运算符 进行数组的合并 ... 把数组展开  [1,2,3]=> 1,2,3
      const rids = [...this.$refs.tree.getHalfCheckedKeys(),...this.$refs.tree.getCheckedKeys()].join(',')
      // console.log(rids);


      // 提交数据到服务器
      giveRoleRights({ roleId: this.roleId, rids }).then(backData => {
        // console.log(backData);
        if(backData.data.meta.status==200){
          this.getData()
          // 关闭弹框
          this.dialogFormVisible = false;
        }
      });
      // 根据提示执行逻辑
    },
    // 显示权限对话框
    showRightsDialog(row) {
      getRightsTree().then(backData => {
        console.log(backData);
        this.data = backData.data.data;
        // 清空数组
        this.checkedKeys = [];
        // 设置选中的值
        // 获取选中的值 生成一个数组
        // 挨个获取选中的值

        // for (let i = 0; i < row.children.length; i++) {
        //   this.checkedKeys.push(row.children[i].id);
        //   // 二级
        //   let level2 = row.children[i];
        //   for (let i = 0; i < level2.children.length; i++) {
        //     this.checkedKeys.push(level2.children[i].id);
        //     // 三级
        //     let level3 = level2.children[i];
        //     for (let i = 0; i < level3.children.length; i++) {
        //       this.checkedKeys.push(level3.children[i].id);
        //     }
        //   }
        // }

        // 递归实现
        const getCheckedKeys = row => {
          // 如果没有后代，添加
          if (row.children == undefined) {
            // 没有后代
            this.checkedKeys.push(row.id);
          } else {
            // 如果有后代,继续调用
            for (let i = 0; i < row.children.length; i++) {
              getCheckedKeys(row.children[i]);
            }
          }
        };

        getCheckedKeys(row);

        console.log(this.checkedKeys);

        // 显示对话框
        this.dialogFormVisible = true;
      });
      // 保存当前编辑的角色id
      this.roleId = row.id;
    },
    // 抽取方法 获取数据
    getData() {
      roles().then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.tableData = backData.data.data;
        }
      });
    },
    // 删除指定权限
    delOne(row, tag) {
      // console.log(row,tag)
      // 角色id
      const roleId = row.id;
      // 权限id
      const rightId = tag.id;
      // 弹框 对话框
      this.$confirm("此操作将暂时删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 对删除
          delRoleRight({ roleId, rightId }).then(backData => {
            // console.log(backData);
            // 服务器已经返回了最新权限信息 直接使用即可
            if (backData.data.meta.status == 200) {
              // 重新赋值
              row.children = backData.data.data;

              // 重新获取数据
              // this.getData()
            }
          });
        })
        .catch(() => {
          // 错取消
        });
    }
  }
};
</script>

<style lang='less' scoped>
.my-tag {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
