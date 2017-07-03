<template>
	<div id="ratings"  ref="ratings">
		<div class="contentWrap">
			<div class="serve">
				<div class="side">
					<h3 class="score" v-text="seller.serviceScore"></h3>
					<p class="text">综合评分</p>
					<p class="rankRate" v-text="`高于周边商家${seller.rankRate}%`"></p>
				</div>
				<div class="main">
					<div class="serviceScore">
						<span class="text">服务态度</span>
						<div class="starWrap">
							<v-star :size="36" :score="seller.serviceScore"></v-star>
						</div>
						<span class="score" v-text="seller.serviceScore"></span>
					</div>
					<div class="foodScore">
						<span class="text">商品评分</span>
						<div class="starWrap">
							<v-star :size="36" :score="seller.foodScore"></v-star>
						</div>
						<span class="score" v-text="seller.foodScore"></span>
					</div>
					<div class="deliveryTime">
						<span class="text">送达时间</span>
						<span class="time" v-text="`${seller.deliveryTime}分钟`"></span>
					</div>
				</div>
			</div>
			<v-split></v-split>
			<v-ratingsnav :ratings="ratings" :onlyContent="onlyContent" :categoryShow="categoryShow"></v-ratingsnav>
			<div class="ratingsListWrap">
				<ul>
					<li v-show="showList(item.rateType,item.text)" class="item" v-for="item in ratings">
						<div class="user">
							<div class="avatar">
								<img class="img" :src="item.avatar">
							</div>
							<div class="info">
								<h2 class="name" v-text="item.username"></h2>
								<div class="desc">
									<div class="starWrap">
										<v-star :size="36" :score="item.score"></v-star>
									</div>
									<span v-show="item.deliveryTime" class="delivery" v-text="`${item.deliveryTime}分钟送达`"></span>
								</div>
							</div>
						</div>
						<div class="date">
							<span >{{item.rateTime | formatTime}}</span>
						</div>
						<div class="textCon">
							<p class="text" v-text="item.text"></p>
						</div>
						<div class="recommend" v-show="item.recommend.length">
							<span class="icon-thumb_up"></span>
							<span class="foodName" v-for="name in item.recommend" v-text="name"></span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import Star from '../../components/star/Star.vue'
	import Split from '../../components/split/Split.vue'
	import RatingsNav from '../../components/ratingsnav/RatingsNav.vue'
	import {formatTime} from '../../common/js/base.js'

	const dataUrl = '../../src/common/data.json'
	const ALL = 2;

	export default {
		name: 'ratings',
		data(){
			return {
				seller: {},
				ratings: [],
				onlyContent: false,
				categoryShow: ALL
			}
		},
		methods: {
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
		created(){			
			this.$http.get(dataUrl).then(function(res){
				let data = res.data;
				this.seller = data.seller;
				this.ratings = data.ratings;

				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.ratings,{
						click: true
					});
				})
			}.bind(this)).catch(function(err){
				console.log(err);
			});

			this.$root.eventHub.$on('changeCategoryType',(type) => {
				this.categoryShow = type;
				
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			});

			this.$root.eventHub.$on('changeContentSwitch',(type) => {
				this.onlyContent = type;

				this.$nextTick(() => {
					this.scroll.refresh();
				})
			})
		},
		filters: {
			formatTime(time){
				let date = new Date(time);
				return formatTime(date,'yyyy-MM-dd hh-mm');
			}
		},
		components: {
			'v-star': Star,
			'v-split': Split,
			'v-ratingsnav': RatingsNav
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	#ratings
		position:fixed
		top:174px
		left:0
		right:0
		bottom:0
		width:100%
		overflow:hidden
		.contentWrap
			width:100%
			.serve
				display:flex
				padding:18px 24px 18px 0
				@media only screen and (max-width:320px)
					padding:18px 12px 18px 0
				text-align:center
				.side
					flex:0 0 138px
					@media only screen and (max-width:320px)
						flex:0 0 118px
					border-right:1px solid rgba(7,17,27,0.1)
					.score
						font-size:24px
						color:rgb(255,153,0)
						line-height:28px
						padding-bottom:6px
					.text
						font-size:12px
						color:rgb(70,74,79)
						line-height:12px
						padding-bottom:8px
					.rankRate
						font-size:10px
						color:rgb(147,153,159)
						line-height:10px
						padding-bottom:6px
				.main
					flex:1
					padding-left:24px
					@media only screen and (max-width:320px)
						padding-left:12px
					.serviceScore, .foodScore
						padding-bottom:8px
					.serviceScore, .foodScore, .deliveryTime
						height:18px
						line-height:18px
						font-size:0
						text-align:left
						.text
							display:inline-block
							vertical-align:top
							color:rgb(7,17,27)
							padding-right:12px
							font-size:12px
							@media only screen and (max-width:320px)
								padding-right:6px
								font-size:10px
						.starWrap			
							display:inline-block
							vertical-align:top
							padding-right:12px
							height:18px
							@media only screen and (max-width:320px)
								padding-right:6px
						.score						
							display:inline-block
							vertical-align:top
							font-size:12px
							color:rgb(255,153,0)
							@media only screen and (max-width:320px)
								font-size:10px
						.time
							font-size:12px
							color:rgb(147,153,159)
							@media only screen and (max-width:320px)
								font-size:10px
			.ratingsListWrap
				padding:0 18px
				.item
					position:relative
					padding:18px 0
					border-1px(rgba(7,17,28,0.1))
					.user
						position:relative
						.avatar							
							width:28px
							.img
								width:28px
								height:28px
								border-radius:50%
						.info
							position:absolute
							top:0px
							left:40px
							.name
								padding-bottom:4px
								font-size:10px
								color:rgb(7,17,27)
								line-height:12px
							.desc
								font-size:0
								.starWrap
									display:inline-block
									padding-right:6px
									vertical-align:top
								.delivery
									position:relative
									top:3px
									display:inline-block
									font-size:10px
									color:rgb(147,153,159)
									line-height:12px
									vertical-align:top
					.date
						position:absolute
						top:18px
						right:0
						font-size:10px
						color:rgb(147,153,159)
						line-height:12px
					.textCon
						padding:6px 0 8px 40px
						.text
							font-size:12px
							color:rgb(7,17,27)
							line-height: 18px
					.recommend
						position:relative
						padding-left:60px;
						font-size:0
						.icon-thumb_up
							position:absolute
							left:40px
							top:4px
							font-size:12px
							color:rgb(0,160,220)
						.foodName
							display:inline-block
							padding:0 6px
							margin:0 8px 4px 0
							width:63px
							font-size:9px
							color:rgb(147,153,159)
							border:1px solid rgba(7,17,27,0.1)
							border-radius:1px
							white-space:nowrap
							text-overflow:ellipsis
							box-sizing:border-box
							overflow:hidden
							line-height:16px
							&:last-child
								margin-right:0

</style>