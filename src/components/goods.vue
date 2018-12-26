<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(item,index) in goods" :key="index" ref="menuList" :class="{'current':index===currentIndex}" @click="selectMenu(index)"> 
          <p class="text">
            <span class="icon" v-if="item.type>=0" :class="classMap[item.type]" ></span>{{item.name}}
          </p>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" ref="foodWrapper">
      <ul>
        <li class="food-item" v-for="(item,index) in goods" :key="index" ref="foodList">
          <h1>{{item.name}}</h1>
          <ul>
            <li class="food-detail" v-for="(item,index) in item.foods" :key="index">
              <div class="icon">
                  <img width="57" height="57" :src="item.icon">
              </div>
              <div class="content">
                <p class="name">{{item.name}}</p>
                <p class="description" v-if="item.description">{{item.description}}</p>
                <p class="sell">月售{{item.sellCount}}  好评率{{item.rating}}%</p>
                <p ><span class="price">￥{{item.price}}</span><span v-if="item.oldPrice" class="oldprice">￥{{item.oldPrice}}</span></p>
                <div class="cartcontrol-wrapper">

                </div> 
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  
</template>


<script>
import BScroll from 'better-scroll'
export default {
  data(){
    return {
      goods:{} ,
      currentIndex:0,
      
    }
  },
  methods:{
    initScroll(e){
      this.meunScroll = new BScroll(e, {
          scrollY: true,
          click: true,
          disableMouse:false
        });
    },
    selectMenu(i){
      this.currentIndex=i
    }
  },
  computed:{},
  created(){
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then(res=>{
      if(res.data.errno===0){
        this.goods=res.body.data
        this.$nextTick(() => {
            this.initScroll(this.$refs.menuWrapper);
            this.initScroll(this.$refs.foodWrapper)
            
        });
      }
    }) 
  }
};
</script>

<style lang="stylus">
  .goods{
    display flex
    position absolute 
    top 174px
    bottom 50px
    width 100%
    overflow hidden
    .menu-wrapper{
      flex: 0 0 80px;
      background: #f3f5f7;
      .menu-item{
        display:flex;
        justify-content:center;
        align-items:center;
        box-sizing border-box
        width 80px
        height 54px
        padding 0 12px
        font-size 12px
        color rgb(20,20,20)
        line-height 14px
        &.current{
          background-color #fff
        }
        .text{
          display inline-block
          vertical-align middle
          overflow hidden
          text-align center
          .icon{
            display inline-block
            vertical-align text-top
            width 14px
            height 14px
            background-size 14px 14px
            &.decrease{
              bg-image('../../resource/img/decrease_1') 
            } 
            &.discount{
              bg-image('../../resource/img/discount_1')
            }
            &.special{
               bg-image('../../resource/img/special_1')
            }
            &.invoice{
               bg-image('../../resource/img/invoice_1')
            }
            &.guarantee{
               bg-image('../../resource/img/guarantee_1')
            }
          }
        }
      }  
    }
    .food-wrapper{
      flex 1
      .food-item{
        h1{
          padding-left 14px
          font-size 12px
          height 26px
          line-height 26px
          color rgb(147,153,159)
          background-color #f3f5f7
          border-left 1px solid #d9dde1
        }
        .food-detail{
          padding 18px
          display flex
          .icon{
            flex 0 0 57px
          }
          .content{
            flex 1
            padding 2px 0 0 10px
            font-size 10px
            color rgb(147,153,159) 
            .name{
              font-size 14px
              color rgb(7,17,27)
              line-height 14px
              margin-bottom 8px
              font-weight 500
            }
            .description{
              margin-bottom 8px
            }
            .sell{
               margin-bottom 8px
            }
            .price{
              font-size 14px
              color #f01414
              font-weight 700
              line-height 24px
              margin-right 8px
            }
            .oldprice{
              text-decoration line-through
            }
          }
        }

      }
    }
  }
</style>
