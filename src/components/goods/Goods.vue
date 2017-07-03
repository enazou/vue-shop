<template>
	<div id="goods">
		<div class="menuWrap" ref="menuWrap">
			<ul>
				<li class="menuItem" v-if="goods.length" v-for="(item, index) in goods" :class="{current : index == currentIndex}" @click.stop.prevent="selectMenu(index,$event)">
					<span class="name border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="goodsWrap" ref="goodsWrap">
			<ul>
				<li class="foodList foodListHook" v-for="item in goods">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li class="foodItem" v-if="item.foods.length" v-for="(food,index) in item.foods"  @click.stop.prevent="selectFood(food,$event)">
							<div class="icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="discription">{{food.description}}</p>
								<div class="extra">
									<span class="sellCount">月售{{food.sellCount}}份</span>
									<span class="rating">好评率{{food.rating}}%</span>
								</div>
								<div class="foodPrice">
									<span class="price">￥{{food.price}}</span>
									<span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
							<div class="cartControlWrap">
								<v-cartcontrol :food="food"></v-cartcontrol>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<v-food :selectedFood="selectedFood" ref="details"></v-food>		
		<v-shoppingcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></v-shoppingcart>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import ShoppingCart from '../shoppingcart/ShoppingCart.vue'
	import CartControl from '../cartcontrol/CartControl.vue'
	import Food from '../food/Food.vue'
	const dataUrl = '../../src/common/data.json'

	export default {
		name: 'goods',
		data(){
			return {
				seller: {},
				goods: [],
				listHeight: [],
				scrollY:0,
				selectedFood: {},
				foodShow: false
			}
		},
		created(){
			this.$http.get(dataUrl).then(function(res){
				let data = res.data;
				this.seller = data.seller;
				this.goods = data.goods;

				this.$nextTick(() => {
					this._initScroll();
					this._claclateHeight();
				});

			}.bind(this)).catch(function(err){
				console.log(err);
			});

			this.classMap = ['discount','decrease','special','invoice','guarantee'];
		},
		computed: {
			currentIndex(){
				let scrollY = Math.abs(Math.round(this.scrollY));
				for(let i=0;i<this.listHeight.length;i++){
					if(!this.listHeight[i+1] || (scrollY >= this.listHeight[i] && scrollY < this.listHeight[i+1])){
						return i;
					}
				}
				return 0;
			},
			selectFoods(){
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count){
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		methods: {
			_initScroll(){
				this.menuScroll = new BScroll(this.$refs.menuWrap,{
					click: true
				});
				this.goodsScroll = new BScroll(this.$refs.goodsWrap,{
						click: true,
						probeType: 3
				});

				this.goodsScroll.on('scroll',(posi) => {
					this.scrollY = posi.y;
				})
			},
			_claclateHeight(){
				let list = this.$refs.goodsWrap.querySelectorAll('.foodListHook');

				let height = 0;
				this.listHeight.push(height);
				for(let i=0;i<list.length;i++){
					height += list[i].offsetHeight;
					this.listHeight.push(height);
				};
			},
			selectMenu(index,ev){
				if(!ev._constructed){ //Bscroll 自定义click事件，原生无—ev._constructed
					return;
				}

				let list = this.$refs.goodsWrap.querySelectorAll('.foodListHook');
			 	let el = list[index];

			 	this.goodsScroll.scrollToElement(el,300);
			},
			selectFood(food,ev){
				if(!ev._constructed) return;
				this.selectedFood = food;
				this.$refs.details.showDetails();
			}
		},
		components: {
			'v-shoppingcart': ShoppingCart,
			'v-cartcontrol': CartControl,
			'v-food': Food
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	#goods
		position:absolute
		top:174px
		left:0
		right:0
		bottom:46px
		display:flex
		width:100%
		overflow:hidden
		.menuWrap
			flex:0 0 80px
			width:80px
			background:#f3f5f7
			.menuItem
				&.current
					font-size:12px
					font-weight:700
					color:rgb(44,50,56)
					line-height: 14px
					margin-top:-1px
					z-index: 10
					background:#fff
					border-none()
				display:table
				padding:0 12px
				width:56px
				height:54px
				line-height:14px
				text-align:center
				.name
					display:table-cell
					font-size:12px
					vertical-align:middle
					border-1px(rgba(7,17,27,0.1))				
					.icon
						display:inline-block
						width:12px
						height:12px
						vertical-align:middle
						background-repeat:no-repeat
						background-size:12px 12px
						&.discount
							bg-image('discount_3')
						&.decrease
							bg-image('decrease_3')
						&.special
							bg-image('special_3')
						&.invoice
							bg-image('invoice_3')
						&.guarantee
							bg-image('guarantee_3')
		.goodsWrap
			flex:1
			.title
				height:26px
				line-height:26px
				padding-left:14px
				border-left:2px solid #d9dde1
				background:#f3f5f7
				font-size:12px
				color:rgb(147,153,159)
			.foodItem
				position:relative
				display:flex
				padding:18px
				border-1px(rgba(7,17,27,0.1))
				&:last-child
					border-none()
				.icon	
					flex:0 0 57px					
					width:57px
					height:57px
					padding-right:10px;
				.content
					flex:1
					.name
						font-size:14px
						color:rgb(7,17,27)
						line-height:14px
						padding:2px 0 8px
					.discription
						font-size:10px
						color:rgb(147,153,159)
						line-height:12px
						padding-bottom:8px
					.extra
						font-size:0
						color:rgb(147,153,159)
						line-height:10px
						.sellCount
							font-size:10px
							margin-right:12px
						.rating
							font-size:10px
					.foodPrice
						font-weight:700
						line-height:24px
						.price
							font-size:14px
							color:rgb(240,20,20)
							margin-right:8px
						.oldPrice
							font-size:10px
							color:rgb(147,153,159)
							text-decoration:line-through
				.cartControlWrap
					position:absolute
					right:14px
					bottom:13px

</style>