<template>
	<view>
		
	
	<view class="cart-contain" v-if="cart.length !== 0">
		<!-- 自定义组件:收货地址组件 -->
		<my-address></my-address>
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="30"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		
		<!-- 滑动组件 -->	
		<uni-swipe-action>
			<block v-for="(goods,i) in cart" :key="i">
			<uni-swipe-action-item  :right-options="options" @click="swiperClickHandler(goods)" >
				<my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler" @num-change="numChangeHandler"></my-goods>
			</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 自定义组件: 结算组件 -->
		<my-settlement></my-settlement>
	</view>
	
	<!-- 购物车为空时的区域 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text>空空如也~</text>
	</view>
	
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import badgeMix from '@/mixins/tabber-Badge.js'
	export default {
		mixins:[badgeMix],
		computed:{
			...mapState('m_cart',['cart']),
		},
		data() {
			return {
				options:[
					{
						text: '删除',
						style: {
						    backgroundColor: '#C00000'
						}
					}
				]
			};
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsId']),
			// 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
			setBadge(){
				uni.setTabBarBadge({
					index:2,
					text:this.total + ''
				})
			},
			// 商品的勾选状态发生了变化
			radioChangeHandler(e){
				console.log(e)
				this.updateGoodsState(e)
			},
			  // 商品的数量发生了变化
			numChangeHandler(e){
				console.log(e)
				this.updateGoodsCount(e)
			},
			 // 点击了滑动操作按钮
			swiperClickHandler(goods){
				console.log(goods)
				this.removeGoodsId(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.cart-contain{
		padding-bottom: 60px;
	}
.cart-title{
	height: 40px;
	display: flex;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text{
		margin-left: 10px;
	}
}

// 购物车为空时的区域
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
