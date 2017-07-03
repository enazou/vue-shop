<template>
	<div id="seller" ref="seller">
		<div class="contentWrap">
			<div class="sellerInfo">
				<h1 class="title" v-text="seller.name"></h1>
				<div class="sellSituation">
					<div class="starWrap">
						<v-star :size="36" :score="seller.score"></v-star>
					</div>
					<span class="ratingCount" v-text="`(${seller.ratingCount})`"></span>
					<span class="sellCount" v-text="`月售${seller.sellCount}单`"></span>
				</div>
				<div class="collect" @click="collected">
					<span class="icon icon-favorite" :class="{'active': collect}"></span>
					<span class="text" v-text="collectText"></span>
				</div>
			</div>
			<div class="delivery">
				<ul class="deliveryList">
					<li class="item">
						<p class="text">起送价</p>
						<p class="price">{{seller.minPrice}}<span class="unit">元</span></p>
					</li>
					<li class="item">
						<p class="text">商家配送</p>
						<p class="price">{{seller.deliveryPrice}}<span class="unit">元</span></p>
					</li>
					<li class="item">
						<p class="text">平均配送时间</p>
						<p class="price">{{seller.deliveryTime}}<span class="unit">分钟</span></p>
					</li>
				</ul>
			</div>
			<v-split></v-split>
			<div class="bulletin">
				<div class="resume">
					<h2 class="title">公告与活动</h2>
					<p class="text" v-text="seller.bulletin"></p>
				</div>
				<div class="activity">
					<ul class="supports">
						<li class="item" v-if="seller.supports" v-for="item in seller.supports">
							<span class="icon" :class="classMap[item.type]"></span>
							<span class="text" v-text="item.description"></span>
						</li>
					</ul>
				</div>
			</div>			
			<v-split></v-split>
			<div class="sellerPic">
				<h2 class="title">商家实景</h2>
				<div class="picWrap" ref="picWrap">
					<ul class="picList" ref="picList">
						<li class="item" v-for="(pic,index) in seller.pics"><img class="img" :src="pic" @click.stop.prevent="viewPic(index,$event)"></li>
					</ul>
				</div>
			</div>
			<v-split></v-split>
			<div class="sellerMsg">
				<h2 class="title">商家信息</h2>
				<div class="msgWrap">
					<ul>
						<li class="item" v-for="item in seller.infos">
							<p class="text" v-text="item"></p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div class="picView" v-show="view" @click.stop.prevent="closePic">
				<div class="pic">
					<img class="img" v-if="seller.picsView" :src="seller.picsView[picIndex]">
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import Star from '../../components/star/Star.vue'
	import Split from '../../components/split/Split.vue'
	import {saveToLocal, loadFromLocal} from '../../common/js/base.js'

	//let dataUrl = '../../src/common/data.json'

	export default {
		name: 'seller',
		props: {
			seller: {
				type: Object
			}
		},
		data(){
			return {
				classMap: [],
				view: false,
				picIndex: -1,
				collect: (() => {
					return loadFromLocal(this.seller.id, 'collect', false);
				})()
			}
		},
		created(){
			/*this.$http.get(dataUrl).then(function(res){
				let data = res.data;
				this.seller = data.seller;

				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.seller,{
							click: true
						})
					}else{
						this.scroll.refresh();
					}
				});
			}.bind(this)).catch(function(err){
				console.log(err)
			});	*/

			this.classMap = ['decrease','discount','special','invoice','guarantee'];

		},
		computed: {
			collectText(){
				return this.collect ? '已收藏':'收藏';
			}
		},
		watch: {
			'seller'(){
				this._initScroll();
				this._initPicScroll();
			}
		},
		methods: {
			_initScroll(){
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.seller,{
							click: true
						})
					}else{
						this.scroll.refresh();
					}
				});
			},
			_initPicScroll(){
				if(this.seller.pics){
					let picW = 120;
					let marginR = 6;
					let listW = (picW + marginR) * this.seller.pics.length - marginR;

					this.$refs.picList.style.width = listW +'px';
					this.$nextTick(() => {
						this.picScroll = new BScroll(this.$refs.picWrap,{
							scrollX: true,
							eventPassthrough: 'vertical'
						})
					})
				}
			},
			viewPic(index,ev){
				if(!ev._constructed){
					return;
				}
				this.view = true;
				this.picIndex = index;				
			},
			closePic(){
				this.view = false;
				this.picIndex = -1;
			},
			collected(ev){
				if(!ev._constructed){
					return;
				}
				this.collect = !this.collect;

				saveToLocal(this.seller.id, 'collect', this.collect);		
			}
		},
		components: {
			'v-star': Star,
			'v-split': Split
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	#seller
		position:fixed
		top:174px
		left:0
		right:0
		bottom:0
		width:100%
		overflow:hidden
		.contentWrap
			.sellerInfo
				position:relative
				padding:18px 0
				margin:0 18px
				border-1px(rgba(7,17,27,0.1))
				.title
					padding-bottom:8px
					font-size:14px
					color:rgb(7,17,27)
					line-height:14px
				.sellSituation
					line-height:18px
					font-size:0
					.starWrap
						display:inline-block
						vertical-align:middle
						height:18px
						padding-right:8px
					.ratingCount, .sellCount
						display:inline-block
						vertical-align:middle
						padding-right:12px
						font-size:10px
						color:rgb(77,85,93)
					.sellCount
						padding-right:0
				.collect
					position:absolute
					top:18px
					right:-2px
					width:40px
					text-align:center
					.icon
						display: block
						font-size:24px
						color:#d5d7d9
						line-height:24px
						&.active
							color:rgb(240,20,20)
					.text
						font-size:10px
						color:rgb(77,85,93)
						line-height:10px
			.delivery
				padding:18px
				.deliveryList
					display:flex
					.item
						flex:1
						border-right:1px solid rgba(7,17,27,0.1)
						text-align:center
						&:last-child
							border:none
						.text
							font-size:10px
							color:rgb(147,153,159)
							line-height:10px
							padding-bottom:4px
						.price
							font-size:24px
							color:rgb(7,17,27)
							line-hegiht:24px
							.unit
								font-size:10px
			.bulletin
				padding:18px 18px 0
				.resume
					.title
						padding-bottom:8px
						font-size:14px
						color:rgb(7,17,27)
						line-height:14px
					.text
						padding:0 12px 16px
						line-height:24px
						font-size:12px
						color:rgb(240,20,20)
				.activity
					.supports
						.item
							padding:16px 12px
							height:16px
							line-height:16px
							font-size:0
							border-top:1px solid rgba(7,17,27,0.1)
							.icon
								display:inline-block
								vertical-align:middle
								width:16px
								height:16px
								background-size:16px 16px
								background-repeat:no-repeat
								padding-right:6px
								&.decrease
									bg-image('decrease_2')
								&.discount
									bg-image('discount_2')
								&.guarantee
									bg-image('guarantee_2')
								&.invoice
									bg-image('invoice_2')
								&.special
									bg-image('special_2')
							.text
								display:inline-block
								vertical-align:middle
								height:16px
								line-height:16px
								font-size:12px
								color:rgb(7,17,27)
			.sellerPic
				padding:18px 0 18px 18px
				.title
					padding-bottom:12px
					font-size:14px
					color:rgb(7,17,27)
					line-height:14px
				.picWrap
					width:100%
					overflow:hidden
					white-space:nowrap
					font-size:0
					.picList
						height:90px
						.item
							display:inline-block
							margin-right:6px
							width:120px
							height:90px
							&:last-child
								margin:0
							.img
								width:120px
								height:90px
			.sellerMsg
				padding:18px 18px 0
				color:rgb(7,17,27)
				.title
					padding-bottom:12px
					font-size:14px
					line-height:14px
				.msgWrap
					.item
						border-top:1px solid rgba(7,17,27,0.1)
						padding:16px 12px
					.text
						font-size:12px
						line-height:16px
		.picView
			position:fixed
			top:0
			left:0
			right:0
			bottom:0
			display: flex
			justify-content:center
			align-items:center
			width:100%
			z-index: 50
			background:rgba(7,17,27,0.2)
			.pic
				.img
					width:100%
					height:100%

</style>