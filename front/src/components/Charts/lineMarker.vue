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
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
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
    xname: {
      type: String,
      default: '日期'
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
      var that = this
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          backgroundColor: '#FFFFFF', // 背景颜色（此时为默认色）
          borderRadius: 8, // 边框圆角,
          formatter: function(params) {
            var htmlStr = '<div>'
            htmlStr += '<span style="color:#666666">' + params.name + '</span>' + '       ' + '<span style="color:#5D9CEC">' + params.data + '</span > '
            htmlStr += '</div>'
            return htmlStr
          }

        },
        xAxis: {

          splitLine: {
            show: false
          },

          name: this.xname,
          data: value ? value.map(function(item) {
            return that.xname === '小时' ? item.hour : item.dayOfMonth
          }) : null,
          axisLine: {
            lineStyle: {
              // 设置x轴颜色
              color: '#666666'

            }

          }
        },
        yAxis: {
          type: 'value',
          name: '销售额（元）',
          axisLine: {
            lineStyle: {
              // 设置x轴颜色
              color: '#666666',
              fontWeight: 500
            }
          },
          /* 虚线*/
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dotted'
            }
          }
        },
        series: [{
          smooth: true,
          // data: [220, 182, 191, 234, 290, 330, 310]
          type: 'line',
          // lineStyle: {
          //   normal: {
          //     color: '#5D9CEC',
          //     width: 2,
          //     symbolSize: 8, // 拐点圆圈大小
          //     borderColor: '#5D9CEC' // 拐点边框颜
          //   }
          // },

          // symbol: 'circle',
          symbolSize: 6,
          itemStyle: {
            normal: {
              color: '#5D9CEC',
              borderColor: '#5D9CEC' // 拐点边框颜色
            }
          },

          data: value.map(function(item) {
            return item.amount
          })

          /* 追向线条*/
          // markLine: {
          //   silent: true,
          //   data: [{
          //     yAxis: 50
          //   }, {
          //     yAxis: 100
          //   }, {
          //     yAxis: 150
          //   }, {
          //     yAxis: 200
          //   }, {
          //     yAxis: 300
          //   }]
          // }
        }],
        // x轴拖动
        dataZoom: [
          {
            type: 'slider',
            realtime: true, // 拖动滚动条时是否动态的更新图表数据
            height: 25, // 滚动条高度
            start: 1, // 滚动条开始位置（共100等份）
            end: 27 // 结束位置（共100等份）
          }
        ]

      })
    }
  }
}
</script>
