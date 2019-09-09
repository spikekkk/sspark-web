<template>
  <div class="ticket">
    <div class="ticket_left">
      <div class="ticket_left_content">
        <div
          v-for= "(item,index) in ticketList"
          :key= "index"
          class="ticket_left_cont_item"
          @click="toCart(item)"
        >
          <div class="item_name">
            <img src="//img.ishanshan.com/gimg/n/20181107/61cf5356d211b8db3c9f345dbde56342">
            <div class="ticket_name">{{ item.skuName }}</div>
          </div>
          <div>
            <div v-if="item.saleChannel == '9'" class="ota_img">OTA</div>
            <div class="price">￥<span>{{ item.price }}</span></div>
          </div>
        </div>
      </div>
    </div>
    <cart ref="cart"/>
  </div>
</template>

<script src='./ticket.js'></script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ticket{
  height: calc(100vh - 88px);
  width: 100%;
  min-width: 1000px;
  .ticket_left{
    height: calc(100vh - 88px);
    overflow: auto;
    background: #fff;
    width: calc(100% - 372px);
    float: left;
    padding: 20px 20px 0 0;
    .ticket_left_content{
      .ticket_left_cont_item{
        background: #F4F6F8;
        border-radius: 5px;
        width: 33%;
        min-width: 116px;
        max-width: 216px;
        height: 120px;
        padding: 20px;
        float: left;
        margin: 0 0px 20px 20px;
        cursor: pointer;
        .item_name{
          margin-bottom: 18px;
          font-size: 14px;
          line-height: 24px;
          color: #333;
          font-weight: 400;
          img{
            float: left;
            margin-right: 5px;
          }
          .ticket_name{
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
        .ota_img{
          width: 45px;
          height: 20px;
          background: #8960E0;
          border-radius: 5px;
          color: #fff;
          font-size: 14px;
          line-height: 12px;
          text-align: center;
          padding: 4px 0;
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
.ticket_left::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.ticket_left::-webkit-scrollbar-thumb {
  /*滚动条里面小方块样式*/
  border-radius: 5px;
  background: #C8E2F8;
}
.ticket_left::-webkit-scrollbar-track {
  /*滚动条里面轨道样式*/
  border-radius: 0;
  background: #fff;
}
</style>
