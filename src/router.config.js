import Goods from './components/goods/Goods.vue';
import Ratings from './components/ratings/Ratings.vue';
import Seller from './components/seller/Seller.vue';
import Error from './components/error/Error.vue';


export default {
	mode: 'history',
	routes: [
		{
			path:'/',
			redirect:'/goods'
		},
		{
			path:'/goods', 
			name: 'goods',
			component: Goods 
		},
		{
			path:'/ratings', 
			name: 'ratings',
			component: Ratings
		},
		{
			path:'/seller',
			name: 'seller',
			component: Seller
		},
		{
			path:'*',
			component: Error
		}
	]
};