export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart:JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  
  mutations:{
	  // 添加到购物车
	  addToCart(state,goods){
		  // 根据提交的商品id 查询购物车中是否存在这件商品
		  // 如果不存在 则findResult为undifined 否则，为查找到的商品信息对象
		  const findResult = state.cart.find((x) =>x.goods_id === goods.goods_id)
		  console.log(findResult)
		  if(!findResult){
			  // 如果购物车中没有这件商品 直接Push
			  state.cart.push(goods)
		  } else{
			  // 如果有 只更新数量
			  findResult.goods_count++
		  }
		  console.log(state.cart)
		  // 将数据持久化存储到本地
		  this.commit('m_cart/saveToStorage')
	  },
	  // 存储到本地
	  saveToStorage(state){
		  uni.setStorageSync('cart',JSON.stringify(state.cart))
	  },
	  // 改变购物车中的选中状态
	  updateGoodsState(state,goods){
		  const goodsResult = state.cart.find(x => x.goods_id === goods.goods_id)
		  if(goodsResult){
			  // 更新对应商品的勾选状态
			  goodsResult.goods_state = goods.goods_state
			  this.commit('m_cart/saveToStorage')
		  }
	  },
	  // 改变购物车中商品的数量
	  updateGoodsCount(state,goods){
		  const goodsNumResult = state.cart.find(x => x.goods_id === goods.goods_id)
		  if(goodsNumResult){
			  goodsNumResult.goods_count = goods.goods_count
			  this.commit('m_cart/saveToStorage')
		  }
	  },
	  // 删除购物车中的商品
	  removeGoodsId(state,goods_id){
		
		  // 把不匹配的Id过滤掉 然后重新赋给cart数组
		  state.cart = state.cart.filter(x => x.goods_id !== goods_id)
		  this.commit('m_cart/saveToStorage')
	  },
	  // 全选 取消全选
	  updateAllState(state,newState){
		  state.cart.forEach(x => x.goods_state = newState)
		  this.commit('m_cart/saveToStorage')
	  }
  },
  
  getters:{
	  // 统计购物车中商品的总数量
	  total(state){
		  // let c = 0
		  // state.cart.forEach(goods => c += goods.goods_count)
		  // return c
		  
		  // 用reduce方法写
		  return state.cart.reduce((total,item) => total += item.goods_count,0)
	  },
	  // 勾选商品的总数量
	  goodNumtotal(state){
		  return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count ,0)
	  },
	  // 勾选商品的总价格
	  goodCountPrice(state){
		  return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_price * item.goods_state ,0)
	  }
  }
}