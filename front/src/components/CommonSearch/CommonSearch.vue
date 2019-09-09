/**
 * 搜索栏
 * props:
 *   isInline           是否在一行        Boolean
 *   params             绑定表单的元素    Object
 *   formInline:        表单搜索元素      Object
 *     {
 *        searchMethod   搜索触发事件     Function
 *        forms: [{
 *          type            类型                Str       值：input 输入/select 选择/datePicker/timeRangePicker/timeSelect/timeRangePicker
 *          modelValue      表单id              Str
 *          name            表单Name            Array|Str 默认为modelValue 可以为数组
 *          clearable       清空                Bool
 *          placeholder     占位                Str       当为日期或是时间范围时，设置startPlaceholder和endPlaceholder
 *          apiService      获取下拉列表                   当type='select'时使用，用于接口获取数据
 *          isFilterable    是否可搜索           Bool      当为select时使用
 *          selectOption    本地显示的下拉数据    Array     当select中写死数据可使用
 *          disabled        是否禁用             Bool
 *          format          日期格式             Str       当type='datePicker/timeRangePicker/timeSelect'时使用,默认yyyy-MM-dd
 *          valueFormat     日期值的格式         Str       同format
 *          pickerOptions   日期和时间特有选项    Obj       当type='datePicker / timeRangePicker'时使用  比如：禁选日期 / 时间的选择
 *          isRange         是否时间范围         Bool      当type='timeRangePicker'时使用
 *          itemStyle       样式设置             Str
 *          rangeSeparator  日期范围选择的中间    Str       当type='datePicker/timeSelect/timeRangePicker'使用
 *        }]
 *     }
 * methods:
 *   resetForm    重置   Function
 */
<template>
  <div class="commonSearch">
    <el-form
      ref="form"
      :model="formValue"
      :inline="isInline"
    >
      <el-form-item
        v-for="(form, index) in forms.forms"
        :key="index"
        :prop="form.modelValue"
      >
        <template v-if="form.itemType === 'input' || form.itemType === undefined">
          <el-input
            v-model="formValue[form.modelValue]"
            :size="form.size"
            :readonly="form.readonly"
            :disabled="form.disabled"
            :clearable="form.isClearable === undefined ? true : form.isClearable "
            :placeholder="form.placeholder"
            :style="form.itemStyle"
          />
        </template>
        <CommonSelect
          v-else-if="form.itemType === 'select'"
          :form="form"
          :params="formValue"
        />
        <template v-else-if="form.itemType === 'datePicker'">
          <el-date-picker
            v-model="formValue[form.modelValue]"
            :size="form.size"
            :type="form.datePickerType"
            :placeholder="form.placeholder"
            :range-separator="form.rangeSeparator || '~'"
            :start-placeholder="form.startPlaceholder"
            :end-placeholder="form.endPlaceholder"
            :format="form.format"
            :value-format="form.valueFormat"
            :picker-options="form.pickerOption"
            :style="form.itemStyle"
            :clearable="form.isClearable === undefined ? true : form.isClearable"
          />
        </template>
        <template v-else-if="form.itemType === 'datePickerChange'">
          <el-date-picker
            v-model="formValue[form.modelValue]"
            :size="form.size"
            :type="form.datePickerType"
            :placeholder="form.placeholder"
            :range-separator="form.rangeSeparator || '~'"
            :start-placeholder="form.startPlaceholder"
            :end-placeholder="form.endPlaceholder"
            :format="form.format"
            :value-format="form.valueFormat"
            :picker-options="form.pickerOption"
            :style="form.itemStyle"
            :clearable="form.isClearable === undefined ? true : form.isClearable"
            @change="form.toChange"
          />
        </template>
        <template v-else-if="form.itemType === 'timeSelect'">
          <el-time-select
            v-model="formValue[form.modelValue]"
            :size="form.size"
            :placeholder="form.placeholder"
            :range-separator="form.rangeSeparator || '~'"
            :start-placeholder="form.startPlaceholder"
            :end-placeholder="form.endPlaceholder"
            :arrow-control="form.isArrowControl"
            :value-format="form.valueFormat"
            :format="form.format"
            :style="form.itemStyle"
            :clearable="form.isClearable === undefined ? true : form.isClearable "
          />
        </template>
        <template v-else-if="form.itemType === 'timeRangePicker'">
          <el-time-picker
            v-model="formValue[form.modelValue]"
            :size="form.size"
            :range-separator="form.rangeSeparator"
            :placeholder="form.placeholder"
            :start-placeholder="form.startPlaceholder"
            :end-placeholder="form.endPlaceholder"
            :arrow-control="form.isArrowControl"
            :value-format="form.valueFormat"
            :format="form.format"
            :is-range="form.isRange"
            :picker-options="form.pickerOption"
            :style="form.itemStyle"
            :clearable="form.isClearable === undefined ? true : form.isClearable "
          />
        </template>
      </el-form-item>
      <el-form-item :style="{marginRight: 0}">
        <div class="common_search_btn">
          <el-button
            size="mini"
            type="primary"
            class="search_btn"
            @click="search"
          >
            <img src="https://img.ishanshan.com/gimg/img/77ed55e16b08f3a7b9d986e75a2c1d7c">
          </el-button>
          <!-- <el-button
            size="mini"
            type="primary"
            class="search_btn"
            @click="search"
          >
            <img src="https://img.ishanshan.com/gimg/img/77ed55e16b08f3a7b9d986e75a2c1d7c">
          </el-button> -->
          <el-button
            size="mini"
            class="search_btn cancel_btn"
            style="float:right"
            @click="resetForm('form')"
          >
            <img src="http://img.ishanshan.com/gimg/n/20181114/4967edad7d0d83947070c9a404a3b216">
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import CommonSelect from './CommonSelect'
export default {
  components: {
    CommonSelect
  },
  props: {
    /* 是否换行 */
    isInline: {
      type: Boolean,
      default: false
    },
    /* 表单绑定的元素 */
    params: {
      type: Object,
      default: {} // eslint-disable-line
    },
    /* 表单搜索元素 */
    forms: {
      type: Object,
      default: {} // eslint-disable-line
    }
  },
  data() {
    const params = {}
    this.forms && this.forms.forms.map(item => {
      if (item.default) {
        params[item.modelValue] = this.forms[item.modelValue]
      } else {
        params[item.modelValue] = ''
      }
    })
    return {
      formValue: params
    }
  },
  methods: {
    /* 重置 */
    resetForm(formName) {
      const params = {}
      this.forms && this.forms.forms.map(item => {
        if (item.default) {
          params[item.modelValue] = this.forms[item.modelValue]
        } else {
          params[item.modelValue] = ''
        }
      })
      this.formValue = params
      this.$nextTick(() => {
        this.$forceUpdate()
        // this.$refs[formName].resetFields()
        this.$emit('toParent')
      })
    },
    search() {
      const params = {}
      this.forms.forms.forEach(field => {
        const value = this.formValue[field.modelValue]
        if (value) {
          const fieldName = field.name || field.modelValue
          if (fieldName instanceof Array) {
            fieldName.forEach((name, index) => {
              params[name] = value[index]
            })
          } else {
            params[fieldName] = value
          }
        }
      })
      this.forms.searchMethod(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-refresh {
  color: #666;
  font-size: 14px;
}
.cancel_btn:hover .icon-refresh {
  color: #46b6ee;
}
.commonSearch /deep/ {
  .el-form--inline .el-form-item {
    float: left;
  }
}
</style>

<style scoped>
.commonSearch {
  display: inline-block;
}
.commonSearch >>> .el-form-item--mini .el-form-item__content,
.el-form-item--mini .el-form-item__label {
  /* height: 28px; */
}
.commonSearch >>> .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 20px;
}
/* .common_search_btn .el-button--mini {
  padding: 5px 12px;
  border-radius: 5px;
}
.common_search_btn .el-button--primary {
  background: #46b6ee;
  border-color: #46b6ee;
}
.common_search_btn .el-button--primary:active {
  background: #46b6ee;
  border-color: #46b6ee;
}
.common_search_btn .el-button.is-plain:active {
  border-color: #46b6ee !important;
}
.common_search_btn .el-button.is-plain:focus,
.el-button.is-plain:hover {
  border-color: #ddd;
}
.commonSearch .el-select {
  width: 100px;
}
.commonSearch .el-form--inline .el-form-item {
  margin-right: 0;
  margin-bottom: 15px;
  margin-left: 10px;
} */
/* .commonSearch >>> .el-form-item__content {
  line-height: 28px;
} */
</style>
