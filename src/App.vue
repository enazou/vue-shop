<template>
  <div id="app">

    <v-header :seller="seller"></v-header>

    <div class="tab border-1px">
        <router-link  class="tab-item" to="goods">
          <div>
            商品          
          </div>          
        </router-link> 
        <router-link  class="tab-item" to="ratings">
          <div>
            评论
          </div>
        </router-link> 
        <router-link  class="tab-item" to="seller">
          <div>
            商家
          </div>
        </router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import Header from './components/header/Header.vue'
import {urlParse} from './common/js/base.js'

const dataUrl = './src/common/data.json'

export default {
  name: 'app',
  data () {
    return {
      seller: {
        id: (() => {
          let queryParams = urlParse();
          return queryParams.id;
        })()
      }
    }
  },
  created(){
    this.$http.get(dataUrl).then(function(res){
        var data = res.data;

        //seller对象扩展属性（id）方法
        this.seller = Object.assign({},this.seller,data.seller);

    }.bind(this)).catch(function(err){
      console.log(err);
    });
  },
  components: {
    'v-header': Header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/base.styl"
  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display:flex
      width:100%
      height:40px
      line-height:40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex:1
        text-align:center
        font-size:14px
        color:rgb(77,85,93)  
      .router-link-active
          color:rgb(240,20,20) 
</style>
