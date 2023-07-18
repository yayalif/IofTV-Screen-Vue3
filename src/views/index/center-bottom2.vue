<script setup lang="ts">
import { ref,onMounted} from "vue";
import { currentGET } from "@/api";
import {graphic} from "echarts/core"
const option = ref({});
const getData = () => {
  currentGET("energyConsum", {}).then((res) => {
    console.log("报警次数 ", res);
    if (res.success) {
      setOption(res.data.dateList, res.data.numList, res.data.numList2);
    } else {
      window["$message"]({
        text: res.msg,
        type: "warning",
      });
    }
  });
};
const setOption =async (xData:any[], yData:any[], yData2:any[]) => {
  option.value = {
        legend: {
          data: ["上月处理水量", "本月处理水量"], // Legend data, same as the name specified in the series
          textStyle: {
            color: "#fff", // Set the color of the legend text
          },  
        },
        xAxis: {
          type: "category",
          data: xData,
          boundaryGap: false, // 不留白，从原点开始
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            // show:false,
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
          },
        },
        yAxis: {
          type: "value",
          name: '单位: 度', 
          nameTextStyle: {
            color: "#fff", // Set the color of the y-axis label
            fontWeight: "bold",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
        },
        grid: {
          //布局
          show: true,
          left: "10px",
          right: "30px",
          bottom: "10px",
          top: "32px",
          containLabel: true,
          borderColor: "#1F63A3",
        },
        series: [
          {
            data: yData,
            type: "line",
            smooth: true,
            symbol: "none", //去除点
            name: "月耗电量",
            color: "rgba(108,80,243,1)",
            areaStyle: {
              normal: {
                color: new graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(108,80,243,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(108,80,243,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(108,80,243, 0.9)",
                shadowBlur: 20,
              },
            }
          }
        ],
      };
}
onMounted(()=>{
    getData();

})
</script>

<template>
  <v-chart
    class="chart"
    :option="option"
    v-if="JSON.stringify(option) != '{}'"
  />
</template>

<style scoped lang="scss"></style>
