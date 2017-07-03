<template>	
	<transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
		<div id="food" v-show="foodShow" @click.stop.prevent="hideDetails" ref="foodPage">
			<div class="contentWrap">
				<div class="imageWrap">
					<img class="image" :src="selectedFood.image">
				</div>
				<div class="content">
					<h2 class="name" v-text="selectedFood.name"></h2>
					<div class="desc">
						<span class="sellCount" v-text="`月售${selectedFood.sellCount}份`"></span>
						<span></span>
						<span class="sellRating" v-text="`好评率${selectedFood.rating}%`"></span>
					</div>
					<div class="extra">
						<div class="price">
							<span class="nowPrice" v-text="`￥${selectedFood.price}`"></span>
							<span class="oldPrice" v-show="selectedFood.oldPrice" v-text="`￥${selectedFood.oldPrice}`"></span>
						</div>
						<div class="cartcontrolWrap">
							<v-cartcontrol :food="selectedFood"></v-cartcontrol>
						</div>
						<transition enter-active-class="animated rollIn" leave-active-class="animated rollOut">
							<div class="addCart" @click.stop.prevent="addGoods" v-show="!selectedFood.count || selectedFood==0">
								加入购物车
							</div>
						</transition>
					</div>
				</div>
				<v-split v-show="selectedFood.info"></v-split>
				<div class="info" v-show="selectedFood.info">
					<h3 class="title">商品介绍</h3>
					<p class="text" v-text="selectedFood.info"></p>
				</div>
				<v-split></v-split>
				<div class="ratings">
					<h3 class="title">商品评价</h3>
					<div class="ratingsNavWrap">
						<v-ratingsnav :ratings="selectedFood.ratings" :categoryShow="categoryShow" :categoryDes="categoryDes" :onlyContent="onlyContent"></v-ratingsnav>
					</div>
					<div class="ratingList">
						<ul v-show="selectedFood.ratings && selectedFood.ratings">
							<li v-show="showList(item.rateType,item.text)" class="item" v-for="item in selectedFood.ratings">
								<div class="time">
									{{item.rateTime | formatTime}}
								</div>
								<div class="msg">
									<span class="icon" :class="{'icon-thumb_up': item.rateType == 0,'icon-thumb_down': item.rateType == 1}"></span>
									<span class="text" v-text="item.text"></span>
								</div>
								<div class="user">
									<span class="username" v-text="item.username"></span>
									<img class="avatar" :src="item.avatar">
								</div>
							</li>
						</ul>
						<div class="noRatings" v-show="!selectedFood.ratings || !selectedFood.ratings.length">
							暂无评价
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>		
</template>
<script>
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import CartControl from '../cartcontrol/CartControl.vue'
	import Split from '../split/Split.vue'
	import RatingsNav from '../ratingsnav/RatingsNav.vue'
	import {formatTime} from '../../common/js/base.js'

	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default {
		name: 'food',
		data(){
			return {
				foodShow: false,
				onlyContent: false,
				categoryShow: ALL,
				categoryDes: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		props: {
			selectedFood: {
				type: Object
			}
		},
		updated(){			
			this.$root.eventHub.$on('changeCategoryType', (type) => {
				this.categoryShow = type;

				//更新better-scroll 滚动距离
				this.$nextTick(() => {	//异步更新
					this.scroll.refresh();
				});
			});
			this.$root.eventHub.$on('changeContentSwitch',(type) => {
				this.onlyContent = type;

				this.$nextTick(() => {
					this.scroll.refresh();
				});
			});
		},
		methods: {
			showDetails(){
				this.foodShow = true;
				this.categoryShow = ALL;
				this.onlyContent = false;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.foodPage,{
							click: true
						})
					}else{
						this.scroll.refresh();
					}
				});
			},
			hideDetails(){
				this.foodShow = false;
			},
			addGoods(ev){
				if(!ev._constructed){
					return;
				}

				//全局方法对对象添加属性
				Vue.set(this.selectedFood,'count',1);
			},
			showList(type,text){
				if(this.onlyContent && !text){
					return false;
				}
				if(this.categoryShow == ALL){
					return true;
				}else{
					return type == this.categoryShow;
				}
			}

		},
		filters: {
			formatTime(time){
				let date = new Date(time);
				return formatTime(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components: {
			'v-cartcontrol': CartControl,
			'v-split': Split,
			'v-ratingsnav': RatingsNav
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	#food
		position:fixed
		top:0
		left:0
		bottom:48px
		right:0
		width:100%
		height:100%
		background:#fff
		z-index:29
		.contentWrap
			padding-bottom:66px
			.imageWrap
				position:relative
				width:100%
				height:0
				padding-top:100%
				.image
					position:absolute
					top:0
					left:0
					width:100%
					height:100%
			.content
				padding:18px
				.name
					padding-bottom:8px
					font-size:14px
					line-height:14px
					font-weight:700
					color:rgb(7,17,27)
				.desc
					font-size:10px
					height:10px
					line-height:10px
					color:rgb(147,153,159)
					padding-bottom:18px
					.sellCount
						padding-right:12px
				.extra
					position:relative
					.price			
						font-weight:700
						line-height:24px
						.nowPrice
							font-size:14px
							color:rgb(240,20,20)
						.oldPrice
							text-decoration:line-through
							font-size:10px
							color:rgb(147,153,159)
					.cartcontrolWrap
						position:absolute;
						right:-3px
						bottom:-6px
						z-index:5
					.addCart
						position:absolute
						right:0
						bottom:0
						z-index:10
						width:74px
						height:24px
						font-size:10px
						line-height:24px
						text-align:center
						color:#fff
						border-radius:24px
						background:rgb(0,160,220)
			.info
				padding:18px
				.title
					font-size:14px
					line-height:14px
					padding-bottom:6px
					color:rgb(7,17,27)
				.text
					padding:0 8px
					font-size:12px
					color:rgb(77,85,93)
					line-height:24px
			.ratings
				.title
					padding:18px 0 0 18px
					font-size:14px
					line-height:14px
					padding-bottom:6px
					color:rgb(7,17,27)
				.ratingList
					padding:0 18px
					.item
						position:relative
						padding:16px 0
						border-1px(rgba(7,17,27,0.1))
						.time
							font-size:10px
							color:rgb(147,153,159)
							line-hegiht:12px
						.msg
							.icon
								padding-right:4px
								font-size:12px
								line-height:24px
								&.icon-thumb_up
									color:rgb(0,160,220)
								&.icon-thumb_down
									color:rgb(147,153,159)
							.text
								font-size:12px
								color:rgb(7,17,27)
								line-height:16px
						.user
							position:absolute
							top:16px
							right:18px				
							line-height:12px
							font-size:0		
							.username
								display:inline-block
								padding-right:6px
								font-size:10px
								color:rgb(147,153,159)
								vertical-align:middle
							.avatar
								width:12px
								height:12px
								vertical-align:middle
								border-radius:6px
				.noRatings
					padding:10px 0 20px
					font-size:12px
					color:rgb(7,17,27)
					line-height:16px
</style>