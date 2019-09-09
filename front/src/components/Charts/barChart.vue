<template>
  <div
    :class="className"
    :id="id"
    :style="{height:height,width:width}"
  />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'barchart'
    },
    id: {
      type: String,
      default: 'barchart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    dataArrary: {
      type: Array,
      default: null
    },
    xData: {
      type: Array,
      default: null
    }

  },
  data() {
    return {
      dataNum: null,
      chart: null

    }
  },

  watch: {
    dataArrary(newVal, oldVal) {
      if (this.chart) {
        if (newVal) {
          this.initChart(newVal)
        } else {
          this.initChart(oldVal)
        }
      } else {
        this.initChart()
      }
    },
    deep: true // 对象内部属性的监听，关键。

  },
  mounted() {
    this.initChart(this.dataArrary)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {

    initChart(value) {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        color: ['#5D9CEC'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '15%',
          top: '10%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            splitLine: { show: false },
            name: '线下门店',
            type: 'category',
            data: value ? value.map(function(item) {
              return item.name
            }) : null,
            axisTick: {
              alignWithLabel: true
            },

            axisLabel: {
              interval: 0
            }
          }

        ],
        yAxis: [
          { name: '销售额（元）',
            type: 'value'
          }
        ],
        series: [
          {
            name: '门店销量',
            type: 'bar',
            barWidth: '20%',
            itemStyle: { // 上方显示数值
              normal: {
                label: {
                  show: true, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: { // 数值样式
                    color: '#666666',
                    fontSize: 16
                  }
                }
              }
            },
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'top',
            //     textStyle: {
            //       color: 'white'
            //     }
            //   }
            // },
            data: value.map(function(item) {
              return item.value
            })
          }

        ]

      })
    }
  }
}
</script>
