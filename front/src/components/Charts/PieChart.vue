<template>
  <div
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
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
    operationData: {
      type: Array,
      default: null
    },
    dataColor: {
      type: Array,
      default: null
    },

    pieStyle: {
      type: Object,
      default: null
    },
    centerTitle: {
      type: String,
      default: '消费商品总额'
    }
  },
  data() {
    return {
      chart: null

    }
  },

  watch: {
    operationData(newVal, oldVal) {
      if (this.chart) {
        if (newVal) {
          this.initChart(newVal)
        } else {
          this.initChart(oldVal)
        }
      } else {
        this.initChart()
      }
    }

  },
  mounted() {
    this.initChart(this.operationData)
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
    this.getArrarySum()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getArrarySum() {
      let allSum = 0
      this.operationData.forEach(v => {
        allSum += Number(v.value)
      })
      return allSum.toFixed(2)
    },

    isNan(val, total) {
      if (val === 0) {
        return '暂无数据'
      } else {
        return ((val / total) * 100).toFixed(2) + '%'
      }
    },
    initChart(value) {
      var that = this
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({

        tooltip: {
          extraCssText: 'box-shadow:0px 2px 2px 2px #747474',
          trigger: 'item',
          backgroundColor: '#FFFFFF', // 背景颜色（此时为默认色）
          borderRadius: 8, // 边框圆角,
          // formatter: '{a} <br/>{b}: {c}   {d}%'
          formatter: function(params) {
            // var color = params.color// 图例颜色
            var htmlStr = '<div>'

            htmlStr += '<span style="color:#666666">' + params.data.name + '</span>' + '<span style="color:#5D9CEC">' + '￥' + params.value + '     ' + params.percent + '%' + '</span > '

            htmlStr += '</div>'

            return htmlStr
          }

        },
        legend: {
          orient: 'vertical',
          x: '60%',
          y: 'center',
          itemWidth: 15, // 图例的宽度
          itemHeight: 15, // 图例的高度
          itemGap: 25,
          selectedMode: 'false', // 取消图例上的点击事件
          data: value,
          formatter: function(name) {
            var total = 0
            var target
            if (value) {
              for (var i = 0, l = value.length; i < l; i++) {
                total += value[i].value
                if (value[i].name === name) {
                  target = value[i].value
                }
              }
              var arr = [
                '{b|' + name + '}',
                '{c|' + '营业额:' + '}',
                '{d|' + '￥' + target + '}',
                '{a|' + that.isNan(target, total) + '}'
              ]

              return arr.join('')
            }
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                color: '#333333',
                fontWeight: 500,
                align: 'center',
                padding: [0, 0, 0, 0]
              },
              d: {
                fontSize: 14,
                color: '#333333',
                align: 'center',
                padding: [0, 10]
              },
              b: {
                fontSize: 14,
                width: 100,
                align: 'center',
                padding: [0, 10, 0, 0],
                lineHeight: 25
              },
              c: {
                fontSize: 14,
                color: '#999999',
                align: 'center',
                fontWeight: 500,
                padding: [0, 0, 0, 0]
              }
            }
          }

        },
        graphic: [{
          type: 'text',
          left: '26.5%',
          top: '40%',
          style: {
            text: '￥' + that.getArrarySum(),
            fill: '#000',
            width: 30,
            height: 30,
            fontSize: 18
          }
        }, {
          type: 'text',
          left: '26.5%',
          top: '50%',
          style: {
            text: that.centerTitle,
            fill: '#000',
            width: 14,
            height: 14,
            fontSize: 14
          }
        }],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: that.pieStyle.radius,
            avoidLabelOverlap: false,
            hoverAnimation: false,
            silent: that.pieStyle.silent, // 圆形是否不响应触发鼠标事件
            label: {
              normal: that.pieStyle.normal,
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            center: ['30%', '50%'],
            labelLine: {
              normal: {
                show: false
              }
            },
            color: that.dataColor,
            data: value

          }
        ]
      })
    }
  }
}
</script>
