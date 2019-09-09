<template>
  <div class="look_shop">
    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body= "false"
      title="切换门店"
      width="400px"
    >
      <div class="shopList" >
        <div
          v-for="(item,index) in shopListArr"
          :key= "index"
          style="cursor:pointer"
          class="shop_item"
          @click = "addClassifySubmit(item)"
        >
          <div>
            <div style="padding-left:20px;display: inline-block;">{{ item.name }}</div>
            <div :class="item.id==currentShopId? 'classBg':'pay_type_select'">
              <i v-if="item.id==currentShopId" style="float:right;font-size:12px;margin:2px 1px 0 0" class="el-icon-check"/>
            </div>
          </div>
          <div class="line"/>
        </div>
      </div>
      <!-- <div slot="footer" class="dialog-footer footer_button">
        <el-button size="mini" plain @click="cancleAddShow()">取消</el-button>
        <el-button type="primary" size="mini" @click="addClassifySubmit()">确定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
// import { switchShop } from '@/api/login'

export default {
  data() {
    return {
      dialogVisible: false, // 弹窗显示
      shopListArr: [],
      currentItem: '', // 当前选中某项
      // shopChangeId: '' // 当前选中的id
      currentShopName: '', // 当前门店名称
      currentShopId: ''// 当前门店的id
    }
  },
  created() {
    this.getShopList()
  },
  mounted() {
  },
  methods: {
    /* 获取所有的门店列表 */
    getShopList() {
      const shopList = Cookies.get('shopInfos')
      this.shopListArr = JSON.parse(shopList)
      this.currentShopName = Cookies.get('currentShopName')
      this.currentShopId = Cookies.get('currentShopId')
    },
    /* 显示切换门店弹框 */
    show() {
      this.dialogVisible = true
    },
    /* 取消*/
    cancleAddShow() {
      this.dialogVisible = false
    },
    /* 确定切换门店 */
    addClassifySubmit(item) {
      Cookies.set('currentShopId', item.id)
      this.$store.dispatch('SwitchShop').then(() => {
        this.$store.dispatch('delAllViews').then(() => {
          this.$router.push({ path: '/', replace: true, query: { noGoBack: true }})
          location.reload()
        })
      }).catch(() => {
        this.loading = false
      })
    }
    /* 选中某条数据*/
    /* onchange(item) {
      this.currentItem = item
      this.shopChangeId = item.id
    } */
  }
}
</script>
<style lang="scss" scoped>
  .look_shop /deep/{
    .v-modal{
     opacity: 0.7;
    }
    .el-dialog{
      border-radius: 5px;
    }
    .el-dialog__header{
       padding: 11px 20px;
       border-radius: 5px 5px 0 0;
       background: #2D3D4C;
       text-align: start;
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
    .el-dialog__body {
      padding: 0 !important;
      color: #606266;
      font-size: 14px;
      text-align: start;
      .shopList{
        font-size: 14px;
        color: #333;
        line-height: 50px;
        font-weight: 400;
        height: 200px;
        overflow: auto;
      }
      .active{
        background:#E0F0FF;
        color: #5D9CEC;
      }
      .pay_type_select{
        float: right;
        width: 16px;
        height: 16px;
        border: 1px solid #CCCCCC;
        border-radius: 50%;
        margin-top: 17px;
        cursor: pointer;
        padding-left: 3px;
        margin-right: 20px;
      }
      .classBg{
        float: right;
        width: 16px;
        height: 16px;
        border: 1px solid #5D9CEC;
        background: #5D9CEC;
        border-radius: 50%;
        margin-top: 17px;
        cursor: pointer;
        color: #fff;
        margin-right: 20px;
      }
      .line{
        height: 1px ;
        background: #eee;
        margin: 0 18px;
      }
      .shop_item:hover{
        background: #E0F0FF;
        color: #5D9CEC;
        .pay_type_select{
          border-color: #5D9CEC;
        }
      }
    }
    .el-dialog__footer{
      padding: 2px 20px 20px;
      .dialog-footer{
        .el-button--mini{
          border-radius: 5px;
        }
        .el-button--primary{
          border-color: #5D9CEC;
          background: #5D9CEC;
          padding: 7px 17px;
        }
        .el-button.is-plain{
          padding: 7px 17px;
        }
      }
    }
     /*滚动条样式*/
  .shopList::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .shopList::-webkit-scrollbar-thumb {
    /*滚动条里面小方块样式*/
    border-radius: 5px;
    background: #C8E2F8;
  }
  .shopList::-webkit-scrollbar-track {
    /*滚动条里面轨道样式*/
    border-radius: 0;
    background: #fff;
  }
  }
</style>

