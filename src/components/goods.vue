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
    <div class="food-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-item" v-for="(item,index) in goods" :key="index" ref="foodList">
          <h1>{{item.name}}</h1>
          <ul>
            <li class="food-detail" v-for="(item,index) in item.foods" :key="index" @click="selectFood(item)">
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
      listHeight:[],
      scrollY:0,
      selectedFood:null
    }
  },
  methods:{
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
          // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
      })
    },
    selectMenu(index){
      let foodList = this.$refs.foodList;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood(food){
      this.selectedFood=food
      this.$refs.food.show();
    },
    _calculateHeight(){
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _followScroll(index) {
      let menuList = this.$refs.menuList;
      let el = menuList[index];
      this.meunScroll.scrollToElement(el, 300, 0, -100);
    }
  },
  computed:{
    currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            this._followScroll(i);
            return i;
          }
        }
        return 0;
    },
    selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
    }
  },
  created(){
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then(res=>{
      if(res.data.errno===0){
        this.goods=res.body.data
        this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
            
        });
      }
    }) 
  }
};
</script>

<style lang="stylus" scoped>
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
          color #3299CC
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
