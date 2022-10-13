export default {
	namespaced:true,
	
	state:() => ({
		//收货地址
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		// 用户登录凭证
		token:uni.setStorageSync('token') || '',
		// 用户信息
		userInfo:JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		redirectInfo:null
	}),
	
	mutations:{
		setAddressStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		// 更新收货地址
		updateAddress(state,address){
			state.address = address
			this.commit('m_user/setAddressStorage')
		},
		
		// 将token持久化到本地
		saveTokenStorage(state){
			uni.setStorageSync('token',JSON.stringify(state.token))
		},
		
		// 更新token
		updateToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenStorage')
		},
		
		// 将用户信息持久化存储到本地
		saveUserInfo(state){
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
		},
		
		// 更新用户信息
		updateUserInfo(state,userInfo){
			state.userInfo = userInfo
			this.commit('m_user/saveUserInfo')
		},
		
		// 重定向
		UpdateRedirect(state,redirectInfo){
			state.redirectInfo = redirectInfo
			console.log(state.redirectInfo)
		}
	},
	
	getters:{
		addstr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}
