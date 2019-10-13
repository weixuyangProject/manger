<template>
  <div>
    <!-- 面包屑导航 -->
    <mybread name1="数据统计" name2="数据报表"></mybread>
    <!-- 绘制的dom元素 -->
    <div ref="board" style="width:800px;height:500px"></div>
  </div>
</template>

<script>
// 导入
import echarts from "echarts";
// 导入接口
import { reports } from "../api/http";
export default {
  name: "reports",
  mounted() {
    // reports().then(backData => {
    //   // console.log(backData);
    //   // 赋值数据
    //   for (const key in backData.data.data) {
    //     this.option[key] = backData.data.data[key];
    //     // 挨个的把数据 都赋值了一遍
    //   }
    //   // 设置x的一个属性
    //   this.option.xAxis[0].boundaryGap = false;
    //   // 创建
    //   const myChart = echarts.init(this.$refs.board);
    //   // 画
    //   myChart.setOption(this.option);
    // });
    // // 设置x的一个属性
    // this.option.xAxis[0].boundaryGap = false;
    // // 创建
    // const myChart = echarts.init(this.$refs.board);
    // // 画
    // myChart.setOption(this.option);
  },
  data() {
    return {
      // echarts的数据
      option: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  // 生命周期钩子
  created() {
    reports().then(backData => {
      // console.log(backData);
      // 赋值数据
      for (const key in backData.data.data) {
        this.option[key] = backData.data.data[key];
        // 挨个的把数据 都赋值了一遍
      }

      // 强制把代码的执行放到下一次循环中
      // setTimeout(() => {
      //   // 设置x的一个属性
      //   this.option.xAxis[0].boundaryGap = false;
      //   // 创建
      //   const myChart = echarts.init(this.$refs.board);
      //   // 画
      //   myChart.setOption(this.option);
      //   // console.log(1111);
      // }, 0);

      // const p = new Promise((resolve, reject) => {
      //   console.log('pppp111');

      //   resolve('ppppp')
      // })
      // p.then((res) => {
      //   console.log(res);

      // })

      // 通过nextTick 注册一个回调函数 下一次dom更新完毕之后  它属于微任务
      // 类似于 $(function(){})
      this.$nextTick(() => {
        // 设置x的一个属性
        this.option.xAxis[0].boundaryGap = false;
        // 创建
        const myChart = echarts.init(this.$refs.board);
        // 画
        myChart.setOption(this.option);
        // console.log(2222);
      });
     
    });
  }
};
</script>

<style lang='less' scoped>
</style>
