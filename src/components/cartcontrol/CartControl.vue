<template>
	<div id="cartcontrol">
		<transition name="move">
			<span class="cartRemove icon-remove_circle_outline" v-show="food.count" @click.stop.prevent="removeCount"></span>
		</transition>
		<span class="cartCount" v-show="food.count">{{food.count}}</span>
		<span class="cartAdd icon-add_circle" @click.stop.prevent="addCount($event)"></span>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		name: 'cartcontrol',
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCount(ev){
				if(ev._constructed){
					if(!this.food.count){
						Vue.set(this.food,'count',1);  //给不存在的属性赋值，需要调用Vue.set方法，才能实现实时更新
					}else{
						this.food.count++;				
					}					
				}
			},
			removeCount(ev){
				if(!ev._constructed) return;
				this.food.count--;
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	#cartcontrol
		font-size:0
		.cartRemove
			display:inline-block
			padding:6px	
			display:inline-block
			vertical-align:middle
			line-height:24px
			font-size:24px
			color:rgb(0,160,220)		
			transition:0.4s all linear
			transform:translate3d(0,0,0) rotate(0deg)
			opacity:1
			&.move-enter-active, &.move-leave
				transform:translate3d(0,0,0) rotate(0deg)
				opacity:1
			&.move-leave-active, &.move-enter
				transform:translate3D(24px,0,0) rotate(270deg)
				opacity:0
		.cartAdd
			display:inline-block
			vertical-align:middle
			padding:6px
			font-size:24px
			color:rgb(0,160,220)
			line-height:24px
		.cartCount
			display:inline-block
			width:12px
			text-align:center
			vertical-align:middle
			font-size:10px
			color:rgb(147,153,159)
			line-height:24px
</style>