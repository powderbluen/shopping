<template>
	<view class="my-settlement-contain">
		<!-- 左侧区域 -->
		<view class="Radio">
			<radio :checked="isChecked" color="#C00000" @click="selectAll"></radio>
			<text>全选</text>
		</view>
		
		<!-- 合计 -->
		<view>
			合计:<text class="price-count">￥{{goodCountPrice}}</text>
		</view>
		
		<!-- 右侧区域 -->
		<view class="my-settlement-total" @click="settlement">结算({{goodNumtotal}})</view>
	</view>
</template>


<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"my-settlement",
		data() {
			return {
				second:3,
				timer:null
			};
		},
		computed:{
			...mapState('m_cart',['cart']),
			...mapState('m_user',['token','redirectInfo']),
			...mapGetters('m_user',['addstr']),
			...mapGetters('m_cart',['goodNumtotal','total','goodCountPrice']),
			isChecked(){
				return this.total === this.goodNumtotal
			},
		},
		methods:{
			...mapMutations('m_cart',['updateAllState',]),
			...mapMutations('m_user',['UpdateRedirect']),
			selectAll(){
				this.updateAllState(!this.isChecked)
			},
			async settlement(){
				if(!this.goodNumtotal) return uni.$showMsg('请选择要结算的商品')
				if(!this.addstr) return uni.$showMsg('请选择地址')
				// if(!this.token) return uni.$showMsg('请先登录')
				if(!this.token) return this.delayedBranch()
				
				// 订单
				this.order()
				
			},
			
			// 点击结算未登录就跳转到登录页面
			delayedBranch(){
				this.second = 3
				this.Tips(this.second)
				this.timer = setInterval(() => {
					// 让秒数自减
					this.second--
					// 更新倒计时
					this.Tips(this.second)
					
					// 判断是否小于等于0
					if(this.second <= 0) {
						// 小于等于0就清除定时器 然后跳转到登录页面
						clearInterval(this.timer)
						uni.switchTab({
							url:"/pages/my/my",
							success: () => {
								this.UpdateRedirect({
									openType:'switchTab',
									from:'/pages/my/my'
								})
							},
						})
						return
					}
				},1000)
				
				this.Tips(this.second)
				
			},
			
			// 订单
			async order(){
				const orderInfo = {
					// order_price:this.goodCountPrice
					order_price:0.01,
					consignee_addr:this.addstr,
					goods:this.cart.filter(x => x.goods_state).map(x => ({
						goods_id:x.goods_id,
						goods_number:x.goods_count,
						goods_price:x.goods_price
					}))
				}
				//HMDD20200901000000001949
				  // 1.2 发起请求创建订单
				  const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				  if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
				  
				    // 1.3 得到服务器响应的“订单编号”
				    const orderNumber = res.message.order_number
				  // const orderNumber = 'HMDD20200901000000001949'
				  
				   // 2. 订单预支付
				   // 2.1 发起请求获取订单的支付信息
				   const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
				   // 2.2 预付订单生成失败
				   if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
				   // 2.3 得到订单支付相关的必要参数
				   const payInfo = res2.message.pay
				   
				   // const payInfo = {
					  //  nonceStr:'IetkN22VgkIYQr8T',
					  //  package:'prepay_id=wx01124228305228b1aa856d4d868d4b000',
					  //  paySign:'8DA7BDSEA9CCS2CS2046B6CD00B923F5',
					  //  signType:'MD5',
					  //  timeStamp:'1598935352'
				   // }
				   
				    // 3. 发起微信支付
				      // 3.1 调用 uni.requestPayment() 发起微信支付
				      const [err, succ] = await uni.requestPayment(payInfo)
				      // 3.2 未完成支付
				      if (err) return uni.$showMsg('订单未支付！')
				      // 3.3 完成了支付，进一步查询支付的结果
				      const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
				      // 3.4 检测到订单未支付
				      if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
				      // 3.5 检测到订单支付完成
				      uni.showToast({
				        title: '支付完成！',
				        icon: 'success'
				      })
			},
			
			// 倒计时
			Tips(n){
				uni.showToast({
					icon:"none",
					title:'请登录后在结算!' + n +' 秒后跳转到登录页面',
					mask:true,
					duration:1500
				})
			}
		},
		
	}
</script>

<style lang="scss">
.my-settlement-contain{
	position: fixed;
	bottom: 0px;
	// bottom: 50px;
	left: 0;
	width: 100%;
	height: 60px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 5px;
	font-size: 14px;
	
	// 全选
	.Radio{
		display: flex;
		align-items: center;
	}
	
	// 价格
	.price-count{
		color: #C00000;
	}
	
	// 结算
	.my-settlement-total{
		 height: 50px;
		    min-width: 100px;
		    background-color: #c00000;
		    color: white;
		    line-height: 50px;
		    text-align: center;
		    padding: 0 10px;
	}
}
</style>