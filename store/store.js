import Vue from 'vue'
import Vuex from 'vuex'
import modeleCart from '@/store/cart.js'
import userCart from './user.js'

Vue.use(Vuex)

const store =  new Vuex.Store({
	modules:{
		'm_cart':modeleCart,
		"m_user":userCart
	}
})

export default store