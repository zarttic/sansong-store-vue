<template>

<!--  <div style="width: 500px;height: 100px;border: 1px solid red;">-->
    <div id="linechart"  style="width: 1500px;height:600px; text-align: center;margin:auto;border: 1px solid gold" />
<!--  </div>-->
</template>
<script>
import * as echarts from "echarts";

export default {
  props: ["id"],
  data() {
    return {
      charts: "",
      dateTime: [],
      saleSum:[],
    };
  },
  mounted() {
    this.request.get('/dataShow/getData').then(res =>{
      this.dataInit(res.data)
      this.$nextTick(() => {
        this.initChart("linechart");
      });
    })


  },
  methods: {
    dataInit(tem){
      let res = Object.entries(tem)
      console.log(res)
      let temTime = [];
      let temSum = [];
      for (let i = 0; i < res.length; i++) {
        temTime[i] = res[i][0]
        temSum[i] = res[i][1]
      }
      this.dateTime = JSON.parse(JSON.stringify(temTime))
      this.saleSum = JSON.parse(JSON.stringify(temSum))
    },
    initChart(id) {
      this.charts = echarts.init(document.getElementById(id), "blue");

      this.option = {
        title:{
          text:'三松商城销售额'
        },
        color: ["#00D8FF"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          y: "bottom",
          itemGap: 30,
          itemWidth: 8000,
          itemHeight: 1000,
          fontSize: 13, //字体大小
          color: "rgb(142, 199, 220)", //字体颜色
        },
        calculable: true,

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // data: [
            //   "06:00",
            //   "09:00",
            //   "12:00",
            //   "15:00",
            //   "18:00",
            //   "21:00",
            //   "24:00",
            // ],
            // data:['2022-11-28', '2022-11-29'],
            // data:[],
            axisLabel: {
              color: ["rgb(142, 199, 220)"],
              show: true,
            },
            axisLine: {
              lineStyle: {
                color: "#023c7a",
                width: 2,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} 元",
              show: true,
              color: ["rgb(142, 199, 220)"],
            },
            splitLine: {
              lineStyle: {
                color: "#023c7a",
                width: 1,
              },
            },
            axisLine: {
              lineStyle: {
                color: "#023c7a",
                width: 1,
              },
            },
          },
        ],
        series: [

          {
            //绘制平滑曲线
            smooth: true,
            symbolSize: 0, //折线点的大小
            type: "line",
            // data: [6000, 4000, 8000, 10000, 4000, 2000, 4000, 2000, 6000],
            // data: [6797, 17491],
            // data: [],
            areaStyle: {

              //前四个参数代表位置 左下右上，暗青色到亮青色，
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(12,180,250, 1)" }, //从上往下的渐变
                { offset: 1, color: "rgba(63, 208, 249, 0)" },
              ]),
            },

            lineStyle: {
              shadowColor: "#5cfbff", //透明的颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1, //透明度
              shadowBlur: 8, //阴影大小
              type: "solid", //实线
              width: 2,
            },
          },
        ],
      }
      var Xdata = [];
      var ydata = [];
      for (let i = 0; i < this.dateTime.length; i++) {
        ydata.push(this.saleSum[i])
        Xdata.push(this.dateTime[i])
      }
      this.option.series[0].data = ydata;
      this.option.xAxis[0].data = Xdata;
      console.log(this.option.xAxis.data)
      console.log("cur")
      console.log(Xdata)
      console.log(ydata)
      setTimeout(()=>{
        this.charts.setOption(this.option);
      },100)
    },
  },
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
