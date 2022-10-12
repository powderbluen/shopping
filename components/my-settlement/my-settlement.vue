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
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-settlement",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_cart',['updateAllState']),
			selectAll(){
				this.updateAllState(!this.isChecked)
			},
			settlement(){
				// console.log(this.goodNumtotal)
			}
		},
		computed:{
			...mapGetters('m_cart',['goodNumtotal','total','goodCountPrice']),
			isChecked(){
				return this.total === this.goodNumtotal
			}
		}
	}
</script>

<style lang="scss">
.my-settlement-contain{
	position: fixed;
	// bottom: 0px;
	bottom: 50px;
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