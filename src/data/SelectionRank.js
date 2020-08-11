// 选品榜数据

// 排序
const orderList = [ '默认', '价格', '佣金', '销量' ]

let goodsList = new Array(10).fill({})
goodsList = goodsList.map((item, index) => {
  return { value: index,
    title: '商品标题标商品标题标商品标题标商品标题标商品标题标商品标题标商品标题标商品标题标商品标题标商品标题标商品标题标',
    img: '',
    amount: '19.99',
    discountedAmount: '9.99',
    coupon: '10',
    commission: '20%',
    salesVolume: 888
  }
})

export {
  orderList,
  goodsList
}
