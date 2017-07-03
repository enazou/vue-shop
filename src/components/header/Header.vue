<template>
	<div id="header">
		<div class="contentWrap">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}} / {{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
				<div v-if="seller.supports" class="supportCount" @click="showDetail">
					<span class="count">
						{{seller.supports.length}}个
					</span>
					<i class="icon-keyboard_arrow_right"></i>
				</div>
			</div>
		</div>
		<div class="bulletinWrap" @click="showDetail">
			<span class="bulletinPic"></span><span class="bulletinText" v-if="seller.bulletin">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div class="detailShow" v-show="detailShow">
				<div class="detailWrap">
					<div class="detailMain">
						<h1 class="name">{{seller.name}}</h1>
						<div class="starWrap">
							<v-star :size="48" :score="seller.score"></v-star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="supportItem" v-for="(item,index) in seller.supports">
								<span class="icon" :class="classMap[item.type]"></span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<p class="bulletin">{{seller.bulletin}}</p>
					</div>
				</div>
				<div class="detailClose">
					<span class="icon-close" @click="closeDetail"></span>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	import Star from '../star/Star.vue'
	export default {
		name: 'header',
		data(){
			return {
				detailShow: false
			}
		},
		components: {
			'v-star': Star
		},
		methods: {
			showDetail(){
				this.detailShow = true;
			},
			closeDetail(){
				this.detailShow = false;
			}
		},
		props:{
			seller: {
				type: Object
			}
		},
		mounted(){
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"

	#header
		position:relative
		color:#fff
		background:rgba(7,17,27,0.5)
		.contentWrap
			padding: 24px 0 18px 24px
			overflow:hidden
			position:relative
			.avatar
				float:left
				margin-right:16px
				border-radius: 4px
				img
					border-radius: 4px
			.content
				float:left
				.title
					margin:2px 0 8px 0
					.brand
						display:inline-block
						width:30px
						height:18px
						bg-image('brand')
						background-repeat:no-repeat
						margin-right:6px
						background-size:30px 18px
						vertical-align:top
					.name
						font-size:16px
						font-weight:bold
						line-height:18px
				.description
					font-size:12px
					line-height:12px
					margin-bottom:10px
				.support
					height:12px
					line-height: 12px
					.icon
						display:inline-block
						width:12px
						height:12px
						margin-right:4px
						background-size:12px 12px
						background-repeat:no-repaet
						vertical-align:middle
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
					.text
						line-height:12px
						font-size:10px
				.supportCount
					position:absolute
					right:12px
					bottom:18px
					height:24px
					line-height:24px
					background-color:rgba(0,0,0,0.2)
					border-radius:16px 14px
					padding:0px 8px
					.count
						font-size:10px
						line-height:24px
					.icon-keyboard_arrow_right
						vertical-align:middle
						font-size:10px
		.bulletinWrap
			position:relative
			height:28px
			line-height:28px
			background:rgba(7,17,27,0.2)
			padding:0 22px 0 12px
			white-space:nowrap
			text-overflow:ellipsis
			overflow:hidden
			.bulletinPic	
				display:inline-block
				width:22px
				height:12px
				bg-image('bulletin')
				background-size:22px 12px
				background-repeat:no-repeat
				vertical-align:middle
			.bulletinText
				height:28px
				font-size:10px
				margin:0 4px
				vertical-align:middle
			.icon-keyboard_arrow_right
				position:absolute
				right:12px
				bottom:8px
				font-size:10px
		.background
			position:absolute
			top:0
			left:0
			right:0
			width:100%
			height:100%
			filter:blur(10px)
			z-index: -1
		.detailShow
			position:fixed
			top:0
			left:0
			width:100%
			height:100%
			overflow:auto
			z-index: 100
			background:rgba(7,17,27,0.8)
			backdrop-filter:blur(10px)
			transition:0.8s all ease
			&.fade-leave, &.fade-enter-active
				opacity: 1
				background:rgba(7,17,27,0.8)
			&.fade-enter, &.fade-leave-active
				opacity: 0
				background:rgba(7,17,27,0)
			.detailWrap
				width:100%
				min-height:100%
				padding:64px 36px 0
				box-sizing:border-box
				.detailMain
					padding-bottom:32px
					.name
						line-height:16px
						font-size:16px
						font-weight:700
						text-align:center
					.starWrap
						margin-top:16px
						text-align:center
					.title
						display:flex
						margin:28px auto 24px
						.line
							flex:1
							position:relative
							top:-7px
							border-bottom:1px solid rgba(255,255,255,0.2)
						.text
							font-size:14px
							font-weight:700
							line-height:14px
							padding:0 12px
					.supports
						.supportItem
							margin-bottom:12px
							font-size:0
							line-height:16px
							padding-right:12px
							&:last-child
								margin:0
							.icon
								display:inline-block
								width:16px
								height:16px
								padding:0 6px
								vertical-align:middle
								background-repeat: no-repeat
								background-size:16px 16px
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
								font-size:12px
								line-height:12px
								vertical-align:middle
					.bulletin
						padding:0 12px
						font-size:12px
						line-height:24px
			.detailClose
				position:relative
				width:32px
				height:32px
				margin:-32px auto 0
				font-size:32px
				color:rgba(255,255,255,0.5)

</style>