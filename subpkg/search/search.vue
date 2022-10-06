<template>
	<view>
		<uni-search-bar class="uni-mt-10" @input="input" :radius="20" placeholder="搜索" clearButton="auto" cancelButton="none"  />
		
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
		  <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item)">
		    <view class="goods-name">{{item.goods_name}}</view>
		    <uni-icons type="arrowright" size="16"></uni-icons>
		  </view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="hisitory-box" v-else>
			<!-- 标题区域 -->
			<view class="hisitory-title">
				<text>搜索历史</text>
				<uni-icons type="trash-filled" size="20" @click="cleanHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="hisitory-list">
				<uni-tag :text="item" v-for="(item,i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:'',
				// 搜索建议
				searchResults:[],
				// 搜索历史
				historyList:[]
			};
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods:{
			input(e){
				// 清除timer对应的延时器
				clearTimeout(this.timer)
				// 重新启动一个延时器，并把timerId赋值给this.timer
				this.timer = setTimeout(() =>{
					// 如果500毫秒内 没有触发新的输入事件，则为搜索关键词赋值
					this.kw = e
					console.log(this.kw)
					this.getSearchList()
				},500)
			},
			// 根据搜索关键词，搜索商品建议列表
			async getSearchList() {
			  // 判断关键词是否为空
			  if (this.kw === '') {
			    this.searchResults = []
			    return
			  }
			  // 发起请求，获取搜索建议列表
			  const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
			  if (res.meta.status !== 200) return uni.$showMsg()
			  this.searchResults = res.message
			  console.log(res)
			  this.saveSearchHistory()
			},
			saveSearchHistory(){
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				console.log(set)
				this.historyList = Array.from(set)
				//调用uni.setStorageSync(key,value)将搜素历史记录持久化存储到本地
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			}, 
			// 清空搜索历史
			cleanHistory(){
				// 清空data里保存的搜素历史
				this.historyList = []
				// 清空本地存储里的搜素历史
				uni.setStorageSync('kw',[])
			},
			gotoGoodsList(item){
				console.log(item)
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + item
				})
			},
			//跳转到商品详情页面
			gotoDetail(item){
				console.log(item.goods_id)
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		computed:{
			historys(){
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
.uni-mt-10{
	margin: 0;
	position: sticky;
	top: 0;
	z-index: 999;
}


.sugg-list{
	padding: 0 5px;
	
	.sugg-item{
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.goods-name{
			// 文字不允许换行
			white-space: nowrap;
			//溢出部分隐藏
			overflow: hidden;
			//文本溢出后，使用 ... 代替
			text-overflow: ellipsis;
			
			margin-right: 3px;
		}
	}
}
.hisitory-box{
	padding: 0 5px;
	
	.hisitory-title{
		display: flex;
		justify-content: space-between;
		height: 40px;
		align-items: center;
		border-bottom: 1px solid #efefef;
	}
	.hisitory-list{
		display: flex;
		flex-wrap: wrap;
		.uni-tag{
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}
</style>
