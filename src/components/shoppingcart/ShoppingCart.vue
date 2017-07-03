<template>
	<div id="shoppingcart">
		<div class="main" @click="toggleList">
			<div class="icon">
				<div class="iconWrap"  :class="{hasCount: totolCount > 0 }">
					<span class="icon-shopping_cart" :class="{hasCount: totolCount > 0 }"></span>
				</div>
				<div v-show="totolCount" class="count">{{totolCount}}</div>
			</div>
			<div class="text">
				<span class="price" :class="{hasCount: totolPrice > 0 }">
					￥{{totolPrice}}
				</span>
				<span class="desc">
					另需配送费￥{{deliveryPrice}}元
				</span>
			</div>
		</div>
		<div class="side" :class="{payBg: payDesc== '去结算'}" @click="pay">
			<span class="tips">
				{{payDesc}}
			</span>
		</div>
		<transition enter-active-class="animated fadeInUp" leave-active-class="animated flipOutX">
			<div v-show="listShow" class="detailsWrap">
				<div class="header">
					<p class="title">购物车</p>
					<span class="clear" @click="clearAll">清空</span>
				</div>
				<div class="content" ref="detialsContent">
					<ul>
						<li class="item" v-for="item in selectFoods">
							<h2 class="name">{{item.name}}</h2>
							<span class="price">￥{{item.price * item.count}}</span>
							<div class="cartControlWrap">
								<v-cartcontrol :food="item"></v-cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>

		<transition enter-active-class="animated slideInDown" leave-active-class="animated flipOutY">
			<div class="bg" v-show="listShow" @click="hideList"></div>
		</transition>
	</div>

</template>
<script>
	import BScroll from 'better-scroll'
	import CartControl from '../cartcontrol/CartControl.vue'
	export default {
		name: 'shoppingcart',
		data(){
			return {
				fold: true
			}
		},
		props: {
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			},
			selectFoods: {
				type: Array,
				default(){
					return [];
				}
			}
		},
		methods: {
			toggleList(){
				if(!this.totolCount){
					return;
				}			
				this.fold = !this.fold;
			},
			clearAll(){
				this.selectFoods.forEach((item) => {
					item.count = 0;
				});
			},
			hideList(){
				this.fold = true;
			},
			pay(){
				if(this.totolPrice < this.minPrice){
					return;
				}
				alert(`共计：${this.totolPrice}元`);
			}
		},
		computed: {
			totolPrice(){
				let totol = 0;
				this.selectFoods.forEach((item) => {
					totol += item.price * item.count;
				});
				return totol;
			},
			totolCount(){
				let count = 0;
				this.selectFoods.forEach((item) => {
					count += item.count;
				})
				return count;
			},
			payDesc(){
				if(this.totolPrice == 0){
						return `￥${this.minPrice}起送`;
				}else if(this.minPrice - this.totolPrice > 0 ){
					let priceDiffrence = this.minPrice - this.totolPrice;
					return `还差￥${priceDiffrence}元起送`;
				}else{
					return '去结算';
				}
			},
			listShow(){
				if(!this.totolCount){
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if(show){
					this.$nextTick(() => {
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.detialsContent,{
								click: true
							})
						}else{
							this.scroll.refresh();
						}
					})
				}
				return show
			}
		},
		components: {
			'v-cartcontrol': CartControl
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	#shoppingcart
		position:fixed
		left:0
		bottom:0
		right:0
		display:flex
		width:100%
		height:48px
		z-index:30
		color:rgba(255,255,255,0.4)
		.main
			position:relative
			flex:1
			background:#141d27
			.icon
				position:absolute
				left:18px
				bottom:8px
				padding:6px
				width:56px
				height:56px
				border-radius:28px
				background:#141d27
				box-sizing:border-box
				.iconWrap
					width:44px
					height:44px
					line-height:44px
					background:rgba(0,0,0,0.2)
					text-align:center
					border-radius:22px
					&.hasCount
						background:rgb(0,160,220)
					.icon-shopping_cart
						font-size:24px
						line-height:24px
						background:rgba(0,0,0,0.2)
						vertical-align:middle
						&.hasCount
							background:none
							color:#fff
				.count
					position:absolute
					top:0px
					right:0px
					width:24px
					height:16px
					line-height:16px
					text-align:center
					border-radius:6px
					font-size:9px
					font-weight:700
					color:rgb(255,255,255)
					background:rgb(240,20,20)
					box-shadow:0px 4px 8px 9px rgba(0,0,0,0.4)
			.text
				position:absolute
				left:80px
				@media only screen and (max-width:320px)
					left:70px
				bottom:12px
				font-size:0
				.price
					display:line-block
					vertical-align:middle
					padding-right:12px
					@media only screen and (max-width:320px)
						padding-right:4px
					font-size:16px
					font-weight:700
					line-height:24px
					border-right:1px solid rgba(255,255,255,0.1)
					box-sizing:border-box
					&.hasCount
						color:#fff
				.desc
					display:inline-block
					vertical-align:middle
					padding-left:12px
					@media only screen and (max-width:320px)
						padding-left:4px
					font-size:10px
					line-height:24px
		.side
			flex:0 0 105px
			width:105px
			background:#2b333b
			line-height:48px
			text-align:center
			font-size:0
			&.payBg
				background:#00b43c
				color:#fff
			.tips
				display:inline-block
				vertical-align:middle
				padding:0 8px
				font-size:12px
				font-weight:700
				line-height:24px
		.detailsWrap
			position:absolute
			bottom:48px
			left:0
			width:100%
			z-index:-1
			background:#fff
			.header
				height:40px
				line-height:40px
				background:#f3f5f7
				padding:0 18px
				border-1px(rgba(7,17,27,0.1))
				box-sizing:border-box
				.title
					float:left
					font-size:14px
					color:rgb(7,17,27)
				.clear
					float:right
					font-size:12px
					color:rgb(0,160,220)
			.content
				padding:0 18px
				max-height:216px
				overflow: hidden
				.item
					position:relative
					height:48px
					line-height:48px
					padding:12px 0
					border-1px(rgba(7,17,27,0.1))
					box-sizing:border-box		
					.name
						line-height:24px
						font-size:14px
						color:rgb(7,17,27)
					.price
						position:absolute
						right:90px
						bottom:12px
						font-size:14px
						line-height:24px
						font-weight:700
						color:rgb(240,20,20)					
					.cartControlWrap
						position:absolute
						right:0
						bottom:0
		.bg
			position:fixed
			top:0
			left:0
			rigght:0
			bottom:0
			width:100%
			height:100%
			z-index: -2
			background:rgba(7,17,27,0.6)
			backdrop-filter:blur(10px)		
</style>