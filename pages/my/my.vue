<template>
	<view class="my-container">
		<my-login v-if="!token"></my-login>
		
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import badgeMix from '@/mixins/tabber-Badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				
			};
		},
		
		computed:{
			...mapState('m_user',['token'])
		}
	}
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
