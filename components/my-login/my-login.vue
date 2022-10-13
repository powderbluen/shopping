<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" withCredentials="true"   @tap="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
	<!-- @getuserinfo="getUserInfo" -->
    <view class="tips-text">登录后尽享更多权益</view>
	<!-- <button class="bottom" type="primary" withCredentials="true" @click="qwer">授权登录</button> -->

  </view>
</template>

<script>
	import {mapMutations ,mapState} from 'vuex'
	
	export default {
		name:"my-login",
		data() {
			return {
			};
		},
		computed:{
			...mapState('m_user',['token','userInfo','redirectInfo']),
		},
		created(){
			console.log(this.redirectInfo)
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','UpdateRedirect' ]),
			
			// 调用登录授权API
			 getUserProfile() {
							 uni.getUserProfile({
								desc: '登录',
								success: async (info) => {
									// console.log(info)
			                        //这里取到的是用户的信息，自己安排自己的业务
									this.getUserInfo()
								},
								fail: (err) => {
									console.log(err);
									if(err.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('您取消了用户授权')
								}
							})
						},
						
						// 登录
						async getToken(info){
							const [err , res] = await uni.login().catch(err => err)
							console.log(res)
							
							if(err || res.errMsg !== "login:ok") return uni.$showMsg('登录失败')
							
							  // const qeury = {
							  //   code: res.code,
							  //   encryptedData: info.encryptedData,
							  //   iv: info.iv,
							  //   rawData: info.rawData,
							  //   signature: info.signature
							  // }
							
							// const  {data:result} = await uni.$http.post('/api/public/v1/users/wxlogin',qeury)
							// console.log(result)
							// if(result.meta.status !== 200) return uni.$showMsg('登录失败')
							// if(this.token === '') return uni.$showMsg('登录失败')
						
							uni.$showMsg('登录成功')
							// 登录成功将token存到vuex中
							this.updateToken('token')
							this.redirect()
						},
						
						// 用户信息
						 async getUserInfo(){ 
							const res = await uni.getUserInfo()
							// console.log(res)
							console.log(res[1])
							this.updateUserInfo(res.userInfo)
							this.getToken(res[1])
						},
						
						// 重定向
						redirect(){
							if(this.redirectInfo && this.redirectInfo.openType ==='switchTab'){
								uni.switchTab({
									url:this.redirectInfo.from,
									complete: () => {
										this.UpdateRedirect(null)
									}
								})
								
							}
						},
						
		},
	}
</script>

<style lang="scss">
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>