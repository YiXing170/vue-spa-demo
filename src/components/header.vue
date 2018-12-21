<template>
  <div class="header" :class="{blur:pop}">
      <div class="content-wrapper">
          <div class="avatar">
            <img width="64" height="64" :src="seller.avatar" alt="" >
          </div>
          <div class="content">
            <div class="title">
              <span class="brand"></span><span class="name">{{seller.name}}</span>
            </div>
            <div class="description">
              {{seller.description}}/{{seller.deliveryTime}}送达
            </div>
            <div class="support">
              <span class="icon" v-if="seller.supports" :class="support[seller.supports[0].type]"></span><span class="text" v-if="seller.supports">{{seller.supports[0].description}}</span>
            </div>

          </div>
          <div class="count" v-if="seller.supports" @click="pop=!pop">
            {{seller.supports.length}}个 >  
          </div>
      </div>
      <div class="bulletin">
        <span class="bulletin-icon"></span>{{seller.bulletin}}
        <span class="b-about">></span>       
      </div>
      <div class="bgc"> <img :src="seller.avatar" alt=""></div>

      <!-- 弹出层blur背景 -->
      <div v-show="pop" class="pop-blur"></div>
      <!-- 上层内容 -->
      <div v-show="pop" class="pop-wrapper" >
        <div class="stick-wrappper" :style="stick">
          <div class="main" :style="main">
            <h3 class="p-title">{{seller.name}}</h3>
            <v-star :score="seller.score"></v-star>
            <div class="special-offer">
              <h3>优惠信息</h3>
              <p><span class="icon" v-if="seller.supports" :class="support[seller.supports[0].type]"></span>  <span class="text" v-if="seller.supports">{{seller.supports[0].description}},满50减10</span>  </p>
              <p><span class="icon"  v-if="seller.supports" :class="support[seller.supports[1].type]"></span> <span class="text">单人精彩套餐</span>   </p>
              <p><span class="icon"  v-if="seller.supports" :class="support[seller.supports[1].type]"></span> <span class="text">清肺雪梨汤8折抢购</span>   </p>
              <p><span class="icon" v-if="seller.supports" :class="support[seller.supports[2].type]"></span>  <span class="text">特价饮瓶8折抢购</span>  </p>
              <p><span class="icon" v-if="seller.supports" :class="support[seller.supports[2].type]"></span>  <span class="text">单人特色套餐</span>  </p>
            </div> 
            <div class="seller-bulletin">
              <h3>商家公告</h3>
              <div class="infos">
                <p>{{seller.bulletin}}</p>
              </div>
            </div>
          </div>  
        </div>  
        <div class="close" @click="pop=!pop">
            <i class="iconfont icon-close1"></i>
        </div> 
      </div>

     
  </div>
  
</template>

<script>
import star from "./star/star.vue"
export default {
  data() {
   return {
     pop:false ,
     stick:{
       "min-height":'100%',
       'position':'relative'
     },
     main:{
       'overflow':'hidden',
       "margin-bottom":'-64px'
     }
   }

  },
  method:{
  },
  created (){
    this.support=['decrease','discount','special','invoice','guarantee']
  },
  props:{
    seller:{
      type:Object
    }
  },
  components:{
    'v-star':star
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
    
  .header
    color:#fff
    position relative
    background-color rgba(7,17,27,.5)
    .content-wrapper
      box-sizing border-box
      position relative
      width 100%
      padding :24px 12px 18px 24px
      font-size 0
      .avatar
        display :inline-block
        vertical-align top
        img 
          border-radius 2px
      .content
        display :inline-block
        margin-left 16px
        font-size 14px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('../../resource/img/brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
            text-align left 
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .support
          .icon
            display inline-block
            width 12px
            height 12px
            background-size 12px 12px
            &.decrease
              bg-image('../../resource/img/decrease_1') 
            &.discount
              bg-image('../../resource/img/discount_1')
            &.special
              bg-image('../../resource/img/special_1')
            &.invoice
              bg-image('../../resource/img/invoice_1')
            &.guarantee
              bg-image('../../resource/img/guarantee_1')
          .text
            vertical-align top
            display inline-block
            margin-left 4px
            font-size 10px
            line-height 12px
      .count
        position absolute
        width 32px
        height 24px
        right 12px
        bottom 14px
        font-size 10px
        text-align center
        padding 0 8px 0 8px
        line-height 24px
        border-radius 10px
        background-color rgba(0,0,0,.2)
    .bulletin
      position relative
      vertical-align middle
      height 28px
      padding 0 12px 0 12px
      line-height 28px
      font-size 10px
      background-color rgba(7,17,27,.2)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      .bulletin-icon
        margin-right 4px
        display inline-block
        width 22px
        height 12px
        background-size 22px 12px
        bg-image('../../resource/img/bulletin')
      .b-about
        position absolute
        right 10px
        top 0
    .bgc
      width 100%
      height 134px
      position absolute
      left 0
      top 0    
      z-index:-1
      overflow hidden
      img 
        width 100%
        height 134px
        filter blur(10px)
    // 弹出层 (absolute的坑啊 vh(视口高度))   
    .pop-blur{
      position fixed
      left 0
      top 0
      width 100%
      height 100%
      z-index 100
      background-color rgba(7,17,27,0.8)
      // filter blur(10px)
    } 
    .pop-wrapper{
      overflow auto
      position fixed
      box-sizing border-box
      left 0
      top 0
      width 100%
      height  100%
      z-index 999
      font-size 12px
      color rgb(255,255,255)
      .p-title{
        margin 64px 0  16px 0
        text-align center
        font-size 16px
        font-weight 700
        line-height 16px
      }
      // 星星的style
      .star{
        text-align center
        margin-bottom 28px
      }
      .special-offer{
        margin 0 36px 16px 36px
        position relative
        &:after,&:before{
          display: block
          position: absolute
          top :7px
          width :112px
          height 1px
          background-color  rgba(255,255,255,.2)
          content: ""
        }
        &:after{
          right 0
        }
        &:before{
          left 0
        }
        h3{
          text-align center
          font-size 14px
          margin-bottom 24px
          font-weight 700
        }
        p{
          height 16px
          margin-bottom 12px
          font-weight 200
          .icon{
            display inline-block
            margin-left 10px
            margin-right 6px
            width 16px
            height 16px
            background-size 16px 16px
            &.decrease{
              bg-image('../../resource/img/decrease_2') 
              } 
            &.discount{
              bg-image('../../resource/img/discount_2')
              }
            &.special{
               bg-image('../../resource/img/special_2')
              }
            &.invoice{
               bg-image('../../resource/img/invoice_2')
              }
            &.guarantee{
               bg-image('../../resource/img/guarantee_2')
              }    
          }
          .text{
              vertical-align top
              font-weight 200
          }  
        }
      }
      .seller-bulletin{
        margin 0 36px 0 36px
        position relative
        &:after,&:before{
           display: block
           position: absolute
           top :7px
           width :112px
           height 1px
           background-color  rgba(255,255,255,.2)
           content: "" 
        }
        &:after{
          right 0
        }
        &:before{
          left 0
        }
        h3{
          text-align center
          font-size 14px
          margin-bottom 24px
          font-weight 700
        }
        .infos{
          padding 0 12px
          padding-bottom 64px
          p{
            line-height 24px
            font-weight 200
          }
        }
      }
      .close{
        width 100%
        height 64px
        text-align center
        .icon-close1{
        }
        .icon-close1:before{
          font-size 32px
          color rgba(255,255,255,.5)
        }
      } 
    }   
</style>