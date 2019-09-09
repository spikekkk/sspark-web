/*
* 下拉搜索
* props:
*   params   绑定表单的数据     Obj
*   form     select渲染数据    Obj
*    {

             itemType: 'select',
            placeholder: '游戏类型',
            modelValue: 'gameCode',
            isClearable: true,
            selectOption: this.list
            apiService: queryGameInfos,
            labelKey: 'gameTitle',
            valueKey: 'gameCode',
            params: { status: 1, pageSize: 10000 }

*      disabled        是否可用             Bool
*      placeholder     占位符               Str
*      filterable      是否可搜索           Bool
*      clearable       是否清除             Bool
*      itemStyle       样式设置             Str
*      visible-change  下拉显示触发         Function
*      apiService      下拉列表的接口
*      selectOption    写死的下拉数据        Obj
*      isVisibleList   是否需要刷新下拉列表  bool
*      defaultFirst    是否进页面显示下拉第一项 bool
*    }
* data:
*   {
*     list   下拉列表的数据   Obj
*   }
*/
<template>
  <div>
    <el-select
      v-if="form.itemType === 'select'"
      v-model="params[form.modelValue]"
      :size="form.size"
      :disabled="form.disabled"
      :placeholder="form.placeholder"
      :filterable="form.isFilterable"
      :clearable="form.isClearable"
      :style="form.itemStyle"
      @visible-change="visibleChange"
      @change="selectChange"
    >
      <el-option
        v-for="(option, optionIndex) in list"
        :key="optionIndex + '_remote'"
        :value="(typeof option === 'object') ? option[form.valueKey || 'value'] : option"
        :label="(typeof option === 'object') ? option[form.labelKey || 'label'] : option"
      />
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => { }
    },
    params: {
      type: Object,
      default: {} // eslint-disable-line
    }
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    const { defaultFirst, modelValue, valueKey } = this.form
    if (this.form.apiService) {
      const func = this.form.apiService
      let params = {}
      if (this.form.params) {
        params = this.form.params
      } else {
        params = {}
      }
      func(params).then(res => {
        const data = res
        this.list = data[this.form.listKey || 'results']
        if (defaultFirst) {
          this.params[modelValue] = data.results[0][valueKey || 'value']
        }
      })
    } else {
      this.list = this.form.selectOption
      if (defaultFirst) {
        this.params[modelValue] = this.form.selectOption[0][valueKey || 'value']
      }
    }
  },
  methods: {
    selectChange(val) {
      this.$forceUpdate()
    },
    visibleChange(val) {
      if (val && this.form.isVisibleList) {
        if (this.form.apiService) {
          const func = this.form.apiService
          let params = {}
          if (this.form.params) {
            params = this.form.params
          } else {
            params = {}
          }
          func(params).then(res => {
            const data = res.data
            this.list = data[this.form.listKey || 'results']
          })
        }
      }
    }
  }
}
</script>
