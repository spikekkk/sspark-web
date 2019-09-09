<template>
  <div class="spec_select">
    <el-dialog
      :visible.sync="specSelctDialogVisible"
      :modal-apmeipend-to-body= "false"
      title="选择规格"
      width="400px"
    >
      <div class="spec_all">
        <div class="spec_list">
          <div
            v-for= "(item,n) in specList"
            :key= "n"
            class="color_select"
          >
            <div class="color_select_title">{{ item.label }}</div>
            <div class="color_select_list">
              <div
                v-for= "(oItem,index) in item.options"
                :key= "index"
                :class= "{classBg:oItem.key == item.value}"
                class="color_select_item"
                @click = "colorOnchange(oItem, item, n, index)"
              >{{ oItem.label }}</div>
            </div>
          </div>
        </div>
        <div class="price_and_num">
          <div class="remain_num">剩余：{{ remainNum }}</div>
          <div class="total">￥<span>{{ price }}</span></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" plain @click="cancel">取消</el-button>
        <el-button size="mini" type="primary" @click="addToCart">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      specSelctDialogVisible: false,
      remainNum: 0, // 剩余数量
      price: 0.00, // 商品价格
      spuId: '', // 规格接口需要
      selectObj: {}, // 所选中的对象
      newObj: {}, // 新的对象(排序后的选中对象)
      goodInfo: {}, // 点击商品的信息
      checkedNameObj: {}, // 点击添加购物车的规格
      specList: [], // 规格选择列表
      newCheckedNameObj: {}
    }
  },
  methods: {
    /* 显示弹窗*/
    show(item, res) {
      this.spuId = item.spuId
      this.goodInfo = item
      this.specList = []
      if (res.errorCode === 9000) {
        this.specList = res.results.specs
        this.skusList = res.skus
        if (this.specList.length > 0) {
          this.specSelctDialogVisible = true
          this.specList.map(function(item, index) {
            item.value = index + ''
            item.key = item.specId
            delete item.specId
            item.label = item.specName
            delete item.specName
            item.options.map(function(oitem, i) {
              oitem.value = oitem.id
              delete oitem.id
              oitem.key = oitem.optionName + '_' + index + i
              oitem.label = oitem.optionName
              delete oitem.optionName
            })
          })
        }
      } else {
        this.$message.error(res.errorMessage)
      }

      this.newObj = {}
      this.selectObj = {}
      this.checkedNameObj = {}
      this.remainNum = 0
      this.price = 0.00
    },
    /* 规格选择*/
    colorOnchange(optItem, item, n, index) {
      this.$nextTick(() => {
        const option = this.specList[n]
        option.value = optItem.key
        this.specList.splice(n, 1, option) // 变异方法
        if (!JSON.stringify(this.selectObj) === '{}') {
          for (const i in this.selectObj) {
            if (i == item.value) {//eslint-disable-line
              this.selectObj[i] = optItem.optionId
            } else {
              this.selectObj[item.key] = optItem.optionId
            }
          }
        } else {
          this.selectObj[item.key] = optItem.value
        }

        for (const arrItem in this.specList) {
          for (const objItem in this.selectObj) {
            if (this.specList[arrItem].key == objItem) {//eslint-disable-line
              this.newObj[arrItem] = objItem
              for (const i in this.newObj) {
                if (this.newObj[i] == objItem) {//eslint-disable-line
                  // this.newObj[arrItem] = objItem + ':' + this.selectObj[objItem]
                  this.newObj[arrItem] = this.selectObj[objItem]
                }
              }
            }
          }
        }
        /* 获取对象长度*/
        const jsonLength = Object.getOwnPropertyNames(this.newObj).length - 1
        const arr = Object.keys(this.newObj)
        let str = ''
        for (var i = 0; i < arr.length; i++) {
          str += this.newObj['' + i + ''] + ','
        }
        this.remainNum = 0
        this.price = 0.00
        if (jsonLength == this.specList.length) {//eslint-disable-line
          for (const skuItem of this.skusList) {
            const str1 = str.substring(0, str.lastIndexOf(','))
            if (skuItem.specIds == str1) {//eslint-disable-line
              this.remainNum = skuItem.stock
              this.price = skuItem.price
              this.goodInfo.price = this.price
              this.goodInfo.goodsId = skuItem.skuId
            }
          }
        }

        // 取出选中的规格名
        if (!JSON.stringify(this.checkedNameObj) === '{}') {
          for (const i in this.checkedNameObj) {
            if (i == item.value) {//eslint-disable-line
              this.checkedNameObj[i] = optItem.label
            } else {
              this.checkedNameObj[item.key] = optItem.label
            }
          }
        } else {
          this.checkedNameObj[item.key] = optItem.label
        }
        for (const arrItem in this.specList) {
          for (const objItem in this.checkedNameObj) {
            if (this.specList[arrItem].key == objItem) {//eslint-disable-line
              this.newCheckedNameObj[arrItem] = objItem
              for (const i in this.newCheckedNameObj) {
                if (this.newCheckedNameObj[i] == objItem) {//eslint-disable-line
                  // this.newObj[arrItem] = objItem + ':' + this.selectObj[objItem]
                  this.newCheckedNameObj[arrItem] = this.checkedNameObj[objItem]
                }
              }
            }
          }
        }
      })
    },
    /* 添加到购物车*/
    addToCart() {
      const jsonStrLength = Object.getOwnPropertyNames(this.checkedNameObj).length - 1
      if (jsonStrLength == this.specList.length && this.remainNum !== 0) {//eslint-disable-line
        this.$emit('toRetailGoods', this.newCheckedNameObj, this.goodInfo)
        this.specSelctDialogVisible = false
      } else {
        this.$message.error('请选择已有库存的规格')
      }
    },
    /* 取消*/
    cancel() {
      this.specSelctDialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .spec_select /deep/{
   .v-modal{
     opacity: 0.7;
   }
   .el-dialog{
     border-radius: 5px;
     .el-dialog__header{
       padding: 16px 20px;
       border-radius: 5px 5px 0 0;
       background: #2D3D4C;
       .el-dialog__title{
         font-size: 16px;
         line-height: 14px;
         color: #fff;
       }
       .el-dialog__headerbtn{
         top: 16px;
          .el-dialog__close{
           color: #fff;
         }
       }
     }
     .el-dialog__body{
      //  padding: 0px 20px 130px;
      padding: 0;
      color: #333;
       .spec_all{
         .spec_list{
           padding: 0 20px;
           max-height: 350px;
           overflow: auto;
         }
         .color_select{
           margin-top: 20px;
           .color_select_title{
             color: #333;
             font-size: 16px;
             line-height: 20px;
             font-weight: 500;
             margin-bottom: 20px;
           }
           .color_select_list{
             border-bottom: 1px solid #ddd;
            .color_select_item:nth-child(3n){
              margin-right: 0;
            }
            .color_select_item{
              background: #F4F6F8;
              border-radius: 5px;
              width: 110px;
              text-align: center;
              font-size: 14px;
              color: #333;
              font-weight: 500;
              line-height: 20px;
              padding: 4px 0;
              cursor: pointer;
              margin-right: 10px;
              display: inline-block;
              margin-bottom: 20px;
            }
            .classBg{
              background:#E0F1FF;
              border: 1px solid #4887E6;
              color: #4887E6;
              padding: 3px;
            }
           }
         }
         .size_select{
           margin-top: 18px;
           .size_select_title{
             font-size: 16px;
             line-height: 20px;
             color: #333;
             font-weight: 500;
             margin-bottom: 20px;
           }
           .size_select_list{
              border-bottom: 1px solid #ddd;
              .size_select_item:nth-child(3n){
                margin-right: 0;
              }
             .size_select_item{
                background: #F4F6F8;
                border-radius: 5px;
                width: 110px;
                text-align: center;
                font-size: 14px;
                color: #333;
                font-weight: 500;
                line-height: 20px;
                padding: 4px 0;
                cursor: pointer;
                margin-right: 15px;
                display: inline-block;
                margin-bottom: 20px;
             }
             .classBg{
              background:#E0F1FF;
              border: 1px solid #4887E6;
              color: #4887E6;
              padding: 3px;
            }
           }
         }
         .price_and_num{
           margin-top: 38px;
           padding: 0 20px 130px;
           .remain_num{
             color: #999;
             font-size: 16px;
             line-height: 20px;
             font-weight: 500;
             display: inline-block;
           }
           .total{
             font-size: 12px;
             line-height: 12px;
             color: #F04343;
             font-weight: 800;
             float: right;
             span{
               font-size: 22px;
               line-height: 20px;
               font-weight: bold;
             }
           }
         }
       }
     }
     .el-dialog__footer{
       padding: 10px 20px 20px;
       .dialog-footer{
         .el-button--mini{
            border-radius: 5px;
         }
         .el-button--primary{
           background: #5D9CEC;
           border-color: #5D9CEC;
         }
         .el-button--primary:focus, .el-button--primary:hover{
          background: #5D9CEC;
          border-color: #5D9CEC;
        }
        .el-button--primary.is-active, .el-button--primary:active{
          background: #3a8ee6;
          border-color: #3a8ee6;
        }
       }
     }
   }
  }
  /*滚动条样式*/
  .spec_list::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .spec_list::-webkit-scrollbar-thumb {
    /*滚动条里面小方块样式*/
    border-radius: 5px;
    background: #C8E2F8;
  }
  .spec_list::-webkit-scrollbar-track {
    /*滚动条里面轨道样式*/
    border-radius: 0;
    background: #fff;
  }
</style>
