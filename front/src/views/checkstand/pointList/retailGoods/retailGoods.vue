<template>
  <div class="retail_good">
    <div class="retail_left">
      <div class="goods_tab">
        <el-tabs tab-position="left" style="height: 200px;" @tab-click="tabOnchange">
          <el-tab-pane
            v-for="(item,index) in tabList"
            :key="index"
            :label="item.name"
          >
            <div class="goods_List">
              <div
                v-for= "(item,index) in foodList"
                :key= "index"
                class="goods_left_cont_item"
                @click="specSelect(item)"
              >
                <div class="goods_item_name">
                  <img src="//img.ishanshan.com/gimg/n/20181107/70443cabf9dabca693f2fc6f674d21a9" >
                  <div class="goods_name">{{ item.skuName }}</div>
                </div>
                <div class="remain">剩余{{ item.stock }}</div>
                <div class="price">￥<span>{{ item.price }}</span></div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <cart ref="cart"/>
    <spec-select ref="select" @toRetailGoods="getSpecData"/>
  </div>
</template>

<script src='./retailGoods.js'></script>

<style rel="stylesheet/scss" lang="scss" scoped>
.retail_good{
  height: calc(100vh - 88px);
  width: 100%;
  min-width: 1000px;
  .retail_left{
    height: calc(100vh - 88px);
    overflow: auto;
    background: #fff;
    width: calc(100% - 372px);
    float: left;
    .goods_tab /deep/{
      .el-tabs.el-tabs--left{
        height: calc(100vh - 88px) !important;
        .el-tabs__header.is-left{
          width: 180px !important;
          margin-right: 0;
          .el-tabs__nav.is-left{
            margin-top: 11px;
            .el-tabs__item.is-left{
              text-align: left;
              padding: 0;
              line-height: 50px;
              height: auto;
              padding-left: 31px;
              color: #666;
            }
            .el-tabs__item:hover{
              color: #666;
            }
            .el-tabs__item.is-active{
              background: #E0F0FF;
            }
            .el-tabs__active-bar{
              background: #ddd;
            }
          }
        }
        .el-tabs__content{
          padding-top: 20px;
          .goods_List{
            .goods_left_cont_item:last-child{
              margin-right: 0;
            }
            .goods_left_cont_item{
              background: #F4F6F8;
              border-radius: 5px;
              width: 33%;
              min-width: 196px;
              max-width: 216px;
              height: 120px;
              padding: 20px;
              float: left;
              margin: 0 0 20px 20px;
              cursor: pointer;
              .goods_item_name{
                margin-bottom: 18px;
                font-size: 14px;
                line-height: 24px;
                color: #333;
                font-weight: 400;
                img{
                  float: left;
                  margin-right: 5px;
                }
                .goods_name{
                  display: -webkit-box;
                  // width: 81%;
                  // min-width: 147px;
                  // max-width: 251px;
                  height: 40px;
                  line-height: 20px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  padding-top: 2px;
                  word-break: break-all;
                }
              }
              .remain{
                color: #888;
                font-size: 12px;
                line-height: 20px;
                display: inline-block;
              }
              .price{
                font-size: 12px;
                float: right;
                span{
                  font-size: 20px;
                  line-height: 20px;
                  color: #333;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
  }
}
/*滚动条样式*/
.cartList::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.cartList::-webkit-scrollbar-thumb {
  /*滚动条里面小方块样式*/
  border-radius: 5px;
  background: #E8EBED;
}
.cartList::-webkit-scrollbar-track {
  /*滚动条里面轨道样式*/
  border-radius: 0;
  background: #F4F6F8;
}
/*滚动条样式*/
.retail_left::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.retail_left::-webkit-scrollbar-thumb {
  /*滚动条里面小方块样式*/
  border-radius: 5px;
  background: #C8E2F8;
}
.retail_left::-webkit-scrollbar-track {
  /*滚动条里面轨道样式*/
  border-radius: 0;
  background: #fff;
}
</style>
