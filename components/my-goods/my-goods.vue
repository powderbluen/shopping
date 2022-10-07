<template>
	<view class="goods-item">
		<!-- 左侧盒子 -->
		<view class="goods-item-left">
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"  alt=""></image>
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">
			<!-- 商品名称 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			goods:{
				type:Object,
				default:{}
			}
		},
		name:"my-goods",
		data() {
			return {
				// 默认图片
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		// 过滤器
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item{
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		
		// 左侧盒子
		.goods-item-left{
			margin-right: 5px;
			
			// 左侧盒子图片
			.goods-pic{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		
		// 右侧盒子
		.goods-item-right{
			display: flex;
			// 纵向布局
			flex-direction: column;
			justify-content: space-between;
			
			// 商品名称
			.goods-name{
				font-size: 13px;
			}
			.goods-info-box{
				.goods-price{
					font-size: 16px;
					color: #c00000;
				}
			}
		}
	}

</style>