<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="starItem"></span>
	</div>
</template>
<script>
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';
 
	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType(){
				return 'star-'+ this.size;
			},
			itemClasses(){
				let result = [];
				let score = Math.floor(this.score);
				let half = this.score % 1 < 0.5 ? 0 : 1;

				for(let i=0;i<score;i++){
					result.push(CLS_ON);
				}
				if(half){
					result.push(CLS_HALF);
				}
				for(let i=0;i<LENGTH;i++){					
					if(result.length < LENGTH){
						result.push(CLS_OFF);
					}
				}
				return result;
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.star
		font-size:0
		&.star-24
			.starItem
				display:inline-block
				width:10px
				height:10px
				margin-right:3px
				background-size:cover
				background-repeat:no-repeat
				&:last-child
					margin-right:0
				&.on
					bg-image('star24_on')
				&.off
					bg-image('star24_off')
				&.half
					bg-image('star24_half')
		&.star-36
			.starItem
				display:inline-block
				width:15px
				height:15px
				margin-right:6px
				background-size:cover
				background-repeat:no-repeat
				&:last-child
					margin-right:0
				&.on
					bg-image('star36_on')
				&.off
					bg-image('star36_off')
				&.half
					bg-image('star36_half')
		&.star-48
			.starItem
				display:inline-block
				width:20px
				height:20px
				margin-right:22px
				background-size:cover
				background-repeat:no-repeat
				&:last-child
					margin-right:0
				&.on
					bg-image('star48_on')
				&.off
					bg-image('star48_off')
				&.half
					bg-image('star48_half')
			
</style>