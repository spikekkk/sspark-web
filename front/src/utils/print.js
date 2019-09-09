import Cookies from 'js-cookie'
/**
 * 打印订单小票
 */

export function printReceiptData(orderData) {
  const status = JSON.parse(Cookies.get('printType'))
  const currentShopName = Cookies.get('currentShopName')
  if (window.LODOP) {
    window.LODOP.SET_LICENSES(
      '',
      '4470F7A8FBB8933068DB2CCAF3FC5B6F',
      'C94CEE276DB2187AE6B65D56B3FC2848',
      ''
    )
    window.LODOP.PRINT_INIT('交易小票打印')
    // eslint-disable-next-line
    if (status.orderSetup.receiptSpec == '80mm') {
      window.LODOP.SET_PRINT_PAGESIZE(3, 800)
    } else {
      window.LODOP.SET_PRINT_PAGESIZE(3, 630)
    }
    var html = ''
    html +=
      "<div style='padding: 21px 7px ;color:#333;font-size:12px;line-height:14px;'>"
    html +=
      "<div style='font-size:20px;line-height:20px;font-weight:600;margin-bottom:20px;text-align:center'>" +
      currentShopName +
      '</div>'

    html += "<div style='padding:20px 0 10px;border-bottom:2px solid #333'>"
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px;'>"
    html += "<div style='display:inline-block'>会员名</div>"
    if (orderData.memberName) {
      html += "<div style='float:right'>" + orderData.memberName + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;'>"
    html += "<div style='display:inline-block'>会员手机号</div>"
    if (orderData.memberTel) {
      html += "<div style='float:right'>" + orderData.memberTel + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;'>"
    html += "<div style='display:inline-block'>充值余额</div>"
    if (orderData.rechargeBalance) {
      html += "<div style='float:right'>" + orderData.rechargeBalance + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;'>"
    html += "<div style='display:inline-block'>赠送余额</div>"
    if (orderData.donationBalance) {
      html += "<div style='float:right'>" + orderData.donationBalance + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += '</div>'
    html += '</div>'

    html += '</div>'
    // eslint-disable-next-line
    if (status.orderSetup.receiptSpec == '80mm') {
      //eslint-disable-line
      html +=
        "<div style='padding:10px 0;border-bottom:2px solid #333;font-size:12px;line-height:14px;'>"
      html +=
        "<div style='width:25%;display:inline-block;vertical-align:top'>商品名</div>"
      html +=
        "<span style='display:inline-block;width:25%;text-align:center;'>规格</span>"
      html += "<div style='float:right;width:25%;text-align:right'>单价</div>"
      html +=
        "<span style='width:25%;text-align:center;display:inline-block;'>数量</span>"
      html += '</div>'

      html += "<div style='margin:10px 0 0;border-bottom:2px solid #333;'>"
      for (const item of orderData.goodsList) {
        html +=
          "<div style='font-size:12px;line-height:12px;margin-bottom:20px;'>"
        if (item.goodsName) {
          html +=
            "<div style='width:25%;display:inline-block;vertical-align:top;word-wrap:break-word;word-break:break-all;'>" +
            item.goodsName +
            '</div>'
        } else {
          html += "<div style='float:left;width:25%;'>--</div>"
        }
        if (item.specification) {
          html +=
            "<div style='display:inline-block;color:#666;width:25%;text-align:center;'>" +
            item.specification +
            '</div>'
        } else {
          html +=
            "<div style='display:inline-block;color:#666;width:25%;text-align:center;'>--</div>"
        }
        if (item.price) {
          html += "<div style='float:right'>" + item.price + '</div>'
        } else {
          html += "<div style='float:right;width:25%'>--</div>"
        }
        if (item.num) {
          html +=
            "<div style='width:25%;text-align:center;display:inline-block;vertical-align:top'>" +
            item.num +
            '</div>'
        } else {
          html +=
            "<div style='display:inline-block;width:25%;text-align:center'>--</div>"
        }
        html += '</div>'
      }
      if (orderData.giftList && orderData.giftList.length > 0) {
        for (const item of orderData.giftList) {
          if (item.giftGood) {
            html +=
              "<div style='color:#999;margin-bottom:10px;font-size:12px;line-height:14px'>" +
              item.giftGood +
              '</div>'
          } else {
            html +=
              "<div style='display:inline-block;width:25%;text-align:center'>--</div>"
          }
        }
      } else {
        html +=
          "<div style='color:#999;margin-bottom:10px;font-size:12px;line-height:14px'></div>"
      }

      html += '</div>'
    } else {
      html +=
        "<div style='padding:10px 0;border-bottom:2px solid #333;font-size:12px;line-height:14px;'>"
      html += "<div style='margin-right:15px;float:left'>商品名</div>"
      html += "<span style='margin-right:15px;'>规格</span>"
      html += "<span style='margin-right:15px;'>数量</span>"
      html += "<div style='float:right'>单价</div>"
      html += '</div>'

      html += "<div style='margin:10px 0 0;border-bottom:2px solid #333;'>"
      for (const item of orderData.goodsList) {
        html +=
          "<div style='font-size:12px;line-height:12px;margin-bottom:20px;'>"
        if (item.goodsName) {
          html +=
            "<div style='width:25%;display:inline-block;vertical-align:top;text-align:left;word-wrap:break-word;word-break:break-all;'>" +
            item.goodsName +
            '</div>'
        } else {
          html += "<div style='float:left;width:25%;'>--</div>"
        }
        if (item.specification) {
          html +=
            "<div style='display:inline-block;color:#999;width:25%;'>" +
            item.specification +
            '</div>'
        } else {
          html +=
            "<div style='display:inline-block;color:#999;width:25%;text-align:center;'>--</div>"
        }
        if (item.price) {
          html +=
            "<div style='float:right;width:25%;text-align:right'>" +
            item.price +
            '</div>'
        } else {
          html += "<div style='float:right;width:25%'>--</div>"
        }
        if (item.num) {
          html +=
            "<div style='width:25%;text-align:center;display:inline-block;vertical-align:top'>" +
            item.num +
            '</div>'
        } else {
          html +=
            "<div style='display:inline-block;width:25%;text-align:center'>--</div>"
        }
        html += '</div>'
      }
      if (orderData.giftList && orderData.giftList.length > 0) {
        for (const item of orderData.giftList) {
          // html +=
          //   "<div style='color:#999;margin-bottom:10px;font-size:12px;line-height:14px'>" +
          //   item.giftGood +
          //   '</div>'
          if (item.giftGood) {
            html +=
              "<div style='color:#999;margin-bottom:10px;font-size:12px;line-height:14px'>" +
              item.giftGood +
              '</div>'
          } else {
            html +=
              "<div style='display:inline-block;width:25%;text-align:center'>--</div>"
          }
        }
      } else {
        html +=
          "<div style='color:#999;margin-bottom:10px;font-size:12px;line-height:14px'></div>"
      }

      html += '</div>'
    }

    html +=
      "<div style='margin-top:21px;border-bottom:2px dashed #333;padding-bottom:20px'>"
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>应收金额</div>"
    if (orderData.actAmount) {
      html += "<div style='float:right'>" + orderData.actAmount + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>实收金额</div>"
    if (orderData.amount) {
      html += "<div style='float:right'>" + orderData.amount + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>优惠</div>"
    if (orderData.discounts) {
      html += "<div style='float:right'>" + orderData.discounts + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;'>"
    html += "<div style='display:inline-block'>找零</div>"
    if (orderData.change) {
      html += "<div style='float:right'>" + orderData.change + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += '</div>'

    html +=
      "<div style='margin-top:20px;border-bottom:2px dashed #333;padding-bottom:20px'>"
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>订单号</div>"
    html += "<div style='float:right'>" + orderData.orderNo + '</div>'
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>下单时间</div>"
    html += "<div style='float:right'>" + orderData.createTime + '</div>'
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>打印时间</div>"
    html += "<div style='float:right'>" + orderData.printTime + '</div>'
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;'>"
    html += "<div style='display:inline-block'>收银员</div>"
    if (orderData.cashierName) {
      html += "<div style='float:right'>" + orderData.cashierName + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += '</div>'

    html +=
      "<div style='margin-top:20px;font-size:12px;line-height:14px;border-bottom:2px dashed #333;padding-bottom:20px'>"
    html += "<div style='margin-bottom:10px'>"
    html += "<div style='display:inline-block'>电话</div>"
    if (orderData.shopTel) {
      html += "<div style='float:right'>" + orderData.shopTel + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += '<div>'
    html += "<div style='display:inline-block'>地址</div>"
    if (orderData.address) {
      html += "<div style='float:right;'>" + orderData.address + '</div>'
    } else {
      html += "<div style='float:right;'>--</div>"
    }
    html += '</div>'
    html += '</div>'

    html +=
      "<div style='text-align:center;margin-top:20px;font-size:12px;line-height:14px;'>"
    if (status.orderSetup.qrCodeTips) {
      html += '<div>' + status.orderSetup.qrCodeTips + '</div>'
    }

    if (status.orderSetup.qrCode) {
      html +=
        "<img style='height:90px;width:90px;margin:10px 0'  src=" +
        status.orderSetup.qrCode +
        ' >'
    }

    html += "<div style='margin-bottom:10px'>https://e.lekecloud.cn</div>"
    html += '<div>闪宝科技提供技术支持</div>'
    html += '</div>'

    html += '</div>'
    window.LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', html)
    // window.LODOP.PRINT()
    // 设置选定打印机
    if (status.orderSetup.defaultPrinter) {
      window.LODOP.SET_PRINTER_INDEXA(status.orderSetup.defaultPrinter)
    } else {
      window.LODOP.SET_PRINTER_INDEXA(-1)
    }
    // window.LODOP.PREVIEW()
    window.LODOP.PRINT()
  }
}

/**
 * 打印交接班小票
 */
export function printDutyShiftData(data) {
  const status = JSON.parse(Cookies.get('printType'))
  const currentShopName = Cookies.get('currentShopName')
  const goodsData = [
    {
      type: '储值卡',
      num: data.balanceCount,
      amount: data.balanceAmount
    },
    {
      type: '微信',
      num: data.wxCount,
      amount: data.wxAmount
    },
    {
      type: '支付宝',
      num: data.aliCount,
      amount: data.aliAmount
    },

    {
      type: '现金',
      num: data.cashCount,
      amount: data.cashAmount
    },
    {
      type: 'POS机',
      num: data.posCount,
      amount: data.posAmount
    },
    {
      type: 'OTA',
      num: data.otaCount,
      amount: data.otaAmount
    }
  ]
  if (window.LODOP) {
    window.LODOP.SET_LICENSES(
      '',
      '4470F7A8FBB8933068DB2CCAF3FC5B6F',
      'C94CEE276DB2187AE6B65D56B3FC2848',
      ''
    )
    window.LODOP.PRINT_INIT('交接班小票打印')
    // eslint-disable-next-line
    if (status.shiftSetup.receiptSpec == '80mm') {
      //eslint-disable-line
      window.LODOP.SET_PRINT_PAGESIZE(3, 800)
    } else {
      window.LODOP.SET_PRINT_PAGESIZE(3, 630)
    }
    var html = ''
    html +=
      "<div style='padding: 21px 7px ;color:#333;font-size:12px;line-height:14px;'>"
    html +=
      "<div style='font-size:20px;line-height:20px;font-weight:600;margin-bottom:20px;text-align:center'>" +
      currentShopName +
      '</div>'

    html += "<div style='padding:20px 0 10px;border-bottom:2px solid #333'>"
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px;'>"
    html += "<div style='display:inline-block'>收银员</div>"
    html += "<div style='float:right'>" + data.cashierName + '</div>'
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px;'>"
    html += "<div style='display:inline-block'>上线时间</div>"
    html += "<div style='float:right'>" + data.startTime + '</div>'
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;'>"
    html += "<div style='display:inline-block'>下线时间</div>"
    html += "<div style='float:right'>" + data.endTime + '</div>'
    html += '</div>'
    html += '</div>'
    // eslint-disable-next-line
    if (status.shiftSetup.receiptSpec == '80mm') {
      //eslint-disable-line
      html +=
        "<div style='padding:10px 0;border-bottom:2px solid #333;font-size:12px;line-height:14px;'>"
      html += "<div style='width:33%;display:inline-block'>收款方式</div>"
      html +=
        "<span style='width:33%;display:inline-block;text-align:center'>订单笔数</span>"
      html +=
        "<div style='width:33%;display:inline-block;text-align:right'>收款金额</div>"
      html += '</div>'

      html += "<div style='margin:10px 0 0;border-bottom:2px solid #333;'>"
      for (const item of goodsData) {
        html +=
          "<div style='font-size:12px;line-height:12px;margin-bottom:10px;'>"
        html += "<div style='float:left;width:33%'>" + item.type + '</div>'
        html +=
          "<div style='display:inline-block;width:33%;text-align:center'>" +
          item.num +
          '</div>'
        html +=
          "<div style='float:right;width:33%;text-align:right'>" +
          item.amount +
          '</div>'
        html += '</div>'
      }
      html += '</div>'
    } else {
      html +=
        "<div style='padding:10px 0;border-bottom:2px solid #333;font-size:12px;line-height:14px;'>"
      html += "<div style='margin-right:7px;float:left'>收款方式</div>"
      html += "<span style='margin-right:5px;'>订单笔数</span>"
      html += "<div style='float:right'>收款金额</div>"
      html += '</div>'

      html += "<div style='margin:10px 0 0;border-bottom:2px solid #333;'>"
      for (const item of goodsData) {
        html +=
          "<div style='font-size:12px;line-height:12px;margin-bottom:10px;'>"
        html += "<div style='float:left;width:40%'>" + item.type + '</div>'
        html +=
          "<div style='display:inline-block;width:25%;text-align:center'>" +
          item.num +
          '</div>'
        html +=
          "<div style='float:right;width:33%;word-break:break-all;text-align:right'>" +
          item.amount +
          '</div>'
        html += '</div>'
      }
      html += '</div>'
    }

    html +=
      "<div style='margin-top:21px;border-bottom:2px dashed #333;padding-bottom:20px'>"
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>备用金</div>"
    html += "<div style='float:right'>" + data.spareAmount + '</div>'
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>现金总额</div>"
    html += "<div style='float:right'>" + data.totalCashAmount + '</div>'
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;'>"
    html += "<div style='display:inline-block'>收款总额</div>"
    html += "<div style='float:right'>" + data.totalAmount + '</div>'
    html += '</div>'
    html += '</div>'

    html +=
      "<div style='margin-top:20px;font-size:12px;line-height:14px;border-bottom:2px dashed #333;padding-bottom:20px'>"
    html += '<div>'
    html += "<div style='display:inline-block'>打印时间</div>"
    html += "<div style='float:right'>" + data.printTime + '</div>'
    html += '</div>'
    html += '</div>'

    html +=
      "<div style='text-align:center;margin-top:20px;font-size:12px;line-height:14px;'>"

    if (status.shiftSetup.qrCodeTips) {
      html += '<div>' + status.shiftSetup.qrCodeTips + '</div>'
    }
    if (status.shiftSetup.qrCode) {
      html +=
        "<img style='height:90px;width:90px;margin:10px 0'  src=" +
        status.shiftSetup.qrCode +
        ' >'
    }

    html += "<div style='margin-bottom:10px'>https://e.lekecloud.cn</div>"
    html += '<div>闪宝科技提供技术支持</div>'
    html += '</div>'

    html += '</div>'
    window.LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', html)

    if (status.shiftSetup.defaultPrinter) {
      window.LODOP.SET_PRINTER_INDEXA(status.shiftSetup.defaultPrinter)
    } else {
      window.LODOP.SET_PRINTER_INDEXA(-1)
    }
    // window.LODOP.PREVIEW()
    window.LODOP.PRINT()
  }
}

/**
 * 核销小票
 */
export function printCancelData(cancelData) {
  const status = JSON.parse(Cookies.get('printType'))
  const currentShopName = Cookies.get('currentShopName')
  if (window.LODOP) {
    window.LODOP.SET_LICENSES(
      '',
      '4470F7A8FBB8933068DB2CCAF3FC5B6F',
      'C94CEE276DB2187AE6B65D56B3FC2848',
      ''
    )
    window.LODOP.PRINT_INIT('会员卡核销小票打印')
    // eslint-disable-next-line
    if (status.verifySetup.receiptSpec == '80mm') {
      //eslint-disable-line
      window.LODOP.SET_PRINT_PAGESIZE(3, 800)
    } else {
      window.LODOP.SET_PRINT_PAGESIZE(3, 630)
    }
    var html = ''
    html +=
      "<div style='padding: 21px 7px ;color:#333;font-size:12px;line-height:14px;'>"
    html +=
      "<div style='font-size:20px;line-height:20px;font-weight:600;margin-bottom:20px;text-align:center'>" +
      currentShopName +
      '</div>'

    html += "<div style='padding:20px 0 10px;border-bottom:2px dashed #333'>"
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px;'>"
    html += "<div style='display:inline-block'>会员名</div>"
    html += "<div style='float:right'>" + cancelData.name + '</div>'
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px;'>"
    html += "<div style='display:inline-block'>会员手机号</div>"
    html += "<div style='float:right'>" + cancelData.tel + '</div>'
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px;'>"
    html += "<div style='display:inline-block'>会员卡号</div>"
    html += "<div style='float:right'>" + cancelData.cardId + '</div>'
    html += '</div>'
    html += '</div>'

    html +=
      "<div style='margin-top:21px;border-bottom:2px dashed #333;padding-bottom:20px'>"
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>票种</div>"
    html += "<div style='float:right'>票码</div>"
    html += '</div>'
    for (const item of cancelData.ticketList) {
      html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
      html +=
        "<div style='display:inline-block;width:50%;word-break:break-all;'>" +
        item.ticketName +
        '</div>'
      html += "<div style='float:right'>" + item.ticketNo + '</div>'
      html += '</div>'
    }
    html += '</div>'

    html +=
      "<div style='margin-top:20px;border-bottom:2px dashed #333;padding-bottom:20px'>"
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>剩余次数</div>"
    html += "<div style='float:right'>" + cancelData.reminTimes + '</div>'
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>会员卡有效期</div>"
    if (cancelData.validDate) {
      html += "<div style='float:right'>" + cancelData.validDate + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>核销时间</div>"
    if (cancelData.verifyDate) {
      html += "<div style='float:right'>" + cancelData.verifyDate + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;'>"
    html += "<div style='display:inline-block'>打印时间</div>"
    if (cancelData.printDate) {
      html += "<div style='float:right'>" + cancelData.printDate + '</div>'
    } else {
      html += "<div style='float:right'></div>"
    }
    html += '</div>'
    html += '</div>'

    html +=
      "<div style='margin-top:20px;font-size:12px;line-height:14px;border-bottom:2px dashed #333;padding-bottom:20px'>"
    html += "<div style='margin-bottom:10px'>"
    html += "<div style='display:inline-block'>收银员</div>"
    if (cancelData.cashierName) {
      html += "<div style='float:right'>" + cancelData.cashierName + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += "<div style='margin-bottom:10px'>"
    html += "<div style='display:inline-block'>电话</div>"
    if (cancelData.shopTel) {
      html += "<div style='float:right'>" + cancelData.shopTel + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += '<div>'
    html += "<div style='display:inline-block'>地址</div>"
    if (cancelData.address) {
      html += "<div style='float:right;'>" + cancelData.address + '</div>'
    } else {
      html += "<div style='float:right;'>--</div>"
    }
    html += '</div>'
    html += '</div>'

    html +=
      "<div style='text-align:center;margin-top:20px;font-size:12px;line-height:14px;'>"
    html += '<div>' + status.verifySetup.qrCodeTips + '</div>'
    html +=
      "<img style='height:90px;width:90px;margin:10px 0'  src=" +
      status.verifySetup.qrCode +
      ' >'
    html += "<div style='margin-bottom:10px'>https://e.lekecloud.cn</div>"
    html += '<div>闪宝科技提供技术支持</div>'
    html += '</div>'

    html += '</div>'
    window.LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', html)

    if (status.verifySetup.defaultPrinter) {
      window.LODOP.SET_PRINTER_INDEXA(status.verifySetup.defaultPrinter)
    } else {
      window.LODOP.SET_PRINTER_INDEXA(-1)
    }
    // window.LODOP.PREVIEW()
    window.LODOP.PRINT()
  }
}

/**
 * 核销门票小票
 */
export function printCancelTicketData(ticketData, time) {
  const status = JSON.parse(Cookies.get('printType'))
  const currentShopName = Cookies.get('currentShopName')
  if (window.LODOP) {
    window.LODOP.SET_LICENSES(
      '',
      '4470F7A8FBB8933068DB2CCAF3FC5B6F',
      'C94CEE276DB2187AE6B65D56B3FC2848',
      ''
    )
    window.LODOP.PRINT_INIT('核销门票小票打印')
    // eslint-disable-next-line
    if (status.verifySetup.receiptSpec == '80mm') {
      window.LODOP.SET_PRINT_PAGESIZE(3, 800)
    } else {
      window.LODOP.SET_PRINT_PAGESIZE(3, 630)
    }
    var html = ''
    html +=
      "<div style='padding: 21px 7px ;color:#333;font-size:12px;line-height:14px;'>"
    html +=
      "<div style='font-size:20px;line-height:20px;font-weight:600;margin-bottom:20px;text-align:center'>" +
      currentShopName +
      '</div>'

    html +=
      "<div style='margin-top:21px;border-bottom:2px dashed #333;border-top:2px dashed #333;padding-bottom:20px;padding-top:20px'>"
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px;'>"
    html += "<div style='display:inline-block'>票种</div>"
    html += "<div style='float:right'>票码</div>"
    html += '</div>'
    html += '<div>'
    if (ticketData.results.length > 0) {
      for (const item of ticketData.results) {
        html +=
          "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
        html +=
          "<div style='display:inline-block;width:50%;word-wrap:break-word;word-break:break-all;'>" +
          item.name +
          '</div>'
        html +=
          "<div style='float:right;width:45%;word-wrap:break-word;word-break:break-all;text-align:right'>" +
          item.skuNo +
          '</div>'
        html += '</div>'
      }
    }
    html += '</div>'
    html += '</div>'

    html +=
      "<div style='margin-top:20px;border-bottom:2px dashed #333;padding-bottom:20px'>"
    html += "<div style='font-size:12px;line-height:14px;margin-bottom:10px'>"
    html += "<div style='display:inline-block'>核销时间</div>"
    html += "<div style='float:right'>" + time + '</div>'
    html += '</div>'
    html += "<div style='font-size:12px;line-height:14px;'>"
    html += "<div style='display:inline-block'>打印时间</div>"
    html += "<div style='float:right'>" + ticketData.printDate + '</div>'
    html += '</div>'
    html += '</div>'

    html +=
      "<div style='margin-top:20px;font-size:12px;line-height:14px;border-bottom:2px dashed #333;padding-bottom:20px'>"
    html += "<div style='margin-bottom:10px'>"
    html += "<div style='display:inline-block'>收银员</div>"
    if (ticketData.cashierName) {
      html += "<div style='float:right'>" + ticketData.cashierName + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += "<div style='margin-bottom:10px'>"
    html += "<div style='display:inline-block'>电话</div>"
    if (ticketData.tel) {
      html += "<div style='float:right'>" + ticketData.tel + '</div>'
    } else {
      html += "<div style='float:right'>--</div>"
    }
    html += '</div>'
    html += '<div>'
    html += "<div style='display:inline-block'>地址</div>"
    if (ticketData.address) {
      html += "<div style='float:right;'>" + ticketData.address + '</div>'
    } else {
      html += "<div style='float:right;'>--</div>"
    }
    html += '</div>'
    html += '</div>'

    html +=
      "<div style='text-align:center;margin-top:20px;font-size:12px;line-height:14px;'>"
    html += '<div>' + status.verifySetup.qrCodeTips + '</div>'
    html +=
      "<img style='height:90px;width:90px;margin:10px 0'  src=" +
      status.verifySetup.qrCode +
      ' >'
    html += "<div style='margin-bottom:10px'>https://e.lekecloud.cn</div>"
    html += '<div>闪宝科技提供技术支持</div>'
    html += '</div>'

    html += '</div>'
    window.LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', html)

    if (status.verifySetup.defaultPrinter) {
      window.LODOP.SET_PRINTER_INDEXA(status.verifySetup.defaultPrinter)
    } else {
      window.LODOP.SET_PRINTER_INDEXA(-1)
    }
    // window.LODOP.PREVIEW()
    window.LODOP.PRINT()
  }
}
