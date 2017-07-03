<template>
	<div id="ratingsnav">
		<div class="category border-1px">
			<span class="categoryItem" :class="{'active': type == 2}" @click.stop.prevent="selected(2,$event)">
				{{categoryDes.all}}
				<span class="count">{{ratings.length}}</span>
			</span>
			<span class="categoryItem" :class="{'active': type == 0}" @click.stop.prevent="selected(0,$event)">
				{{categoryDes.positive}}
				<span class="count">{{positive.length}}</span>
			</span>
			<span class="categoryItem" :class="{'active': type == 1}" @click.stop.prevent="selected(1,$event)">
				{{categoryDes.negative}}
				<span class="count">{{negative.length}}</span>
			</span>
		</div>
		<div class="select" :class="{'on': contentSwitch}" @click.stop.prevent="switchContent">
			<span class="icon icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default {
		name: 'ratingsnav',
		data(){
			return {
				type: this.categoryShow,
				contentSwitch: this.onlyContent
			}
		},
		props: {
			ratings: {
				type: Array,
				default(){
					return [];
				}
			},
			categoryShow: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type:Boolean,
				default: false
			},
			categoryDes: {
				type: Object,
				default(){
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		computed: {
			positive(){
				return this.ratings.filter((rating) => {
					return rating.rateType == POSITIVE;
				})
			},
			negative(){
				return this.ratings.filter((rating) => {
					return rating.rateType == NEGATIVE;
				})
			}
		},
		methods: {
			selected(type,ev){
				if(!ev._constructed){
					return;
				}
				this.type = type;
				this.$root.eventHub.$emit('changeCategoryType',this.type);
			},
			switchContent(ev){
				if(!ev._constructed){
					return;
				}
				this.contentSwitch = !this.contentSwitch;
				this.$root.eventHub.$emit('changeContentSwitch',this.contentSwitch);
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	#ratingsnav
		.category
			margin:18px 18px 0
			padding-bottom:18px
			font-size:0
			border-1px(rgba(7,17,27,0.1))
			.categoryItem
				display:inline-block
				margin-right:8px
				font-size:12px
				line-height:16px
				padding:8px 12px
				border-radius:2px
				color:rgb(77,85,93)
				background:rgba(0,160,220,0.2)
				&:nth-of-type(1), &:nth-of-type(2)
					&.active	
						color:#fff
						background:rgb(0,160,220)
				&:last-child
					margin-right:0
					color:rgb(77,85,93)
					background:rgba(77,85,93,0.2)
					&.active
						color:#fff
						background:rgb(77,85,93)
				.count
					font-size:8px
					margin-left:2px
		.select
			padding:12px 18px
			line-height:24px
			font-size:0
			color:rgb(147,153,159)
			border-bottom:1px solid rgba(7,17,27,0.1)
			.icon
				display:inline-block
				padding-right:4px
				font-size:24px
				vertical-align:middle				
			.text
				display:inline-block
				font-size:12px
				vertical-align:middle
			&.on
				.icon
					color:#00c850


</style>