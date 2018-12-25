<template>
  <div >
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"> <router-link to="/goods">商品</router-link> </div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from "./components/header.vue";
  export default {
    data() {
      return {
        seller: {

        }
      }
    },
    methods:{
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('/api/seller').then((res) => {
         res=res.data
         if(res.errno===0){
           this.seller=res.data
         }
          
      })
    },
    components:{
      'v-header':header
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" >
  
    .tab
      display :flex
      width:100%
      height :40px
      line-height :40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex:1
        text-align :center
        &>a 
          display :block
          font-size :14px
          color :rgb(77,85,93)
          &.active
            color :rgb(240,20,20)
</style>
