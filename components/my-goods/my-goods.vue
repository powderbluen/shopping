<template>
	<view class="goods-item">
		<!-- 左侧盒子 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioChangeHandler"></radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"  alt=""></image>
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">
			<!-- 商品名称 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
				<!-- 商品数量 -->
				<uni-number-box :min="1" :value="goods.goods_count"  v-if="showNum" @change="numChangeHandler"></uni-number-box>
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
			},
			// 是否显示radio勾选框
			showRadio:{
				type:Boolean,
				// 外界不指定showRadio 默认不显示radio勾选框
				default:false
			},
			// 是否显示数字输入框
			showNum:{
				type:Boolean,
				// 外界不指定showRadio 默认不显示数字输入框
				default:false
			}
		},
		name:"my-goods",
		data() {
			return {
				// 默认图片
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		methods:{
			radioChangeHandler(){
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			numChangeHandler(val){
				console.log(val)
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count:val - 0
				})
			}
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
		background-color: #ffffff;
		 // 让 goods-item 项占满整个屏幕的宽度
		  width: 750rpx;
		  // 设置盒模型为 border-box
		  box-sizing: border-box;
		  display: flex;
		  padding: 10px 5px;
		  border-bottom: 1px solid #f0f0f0;
		
		// 左侧盒子
		.goods-item-left{
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
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
				 display: flex;
				    align-items: center;
				    justify-content: space-between;
				.goods-price{
					font-size: 16px;
					color: #c00000;
				}
			}
		}
	}

</style>
