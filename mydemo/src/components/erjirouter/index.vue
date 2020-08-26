<template>
  <div>
    <div class="wrap">
      <div class="header">
        <div class="ligo">
          <img src="../../assets/images/index_images/logo.jpg" alt />
        </div>
        <div class="search">
          <form action="#">
            <router-link tag="div" to="/search">
              <input type="text" />
            </router-link>
          </form>
        </div>
        <div class="set">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav class="clearfix">
        <div class="nav">
          <div>
            推荐
            <span>|</span>
          </div>
          <div>女装</div>
          <div>鞋包</div>
          <div>居家</div>
          <div>母婴儿童</div>
          <!-- <div>美食</div> -->
        </div>
        <div class="a"></div>
      </nav>
      <div class="img"></div>
      <div class="wrap1">
        <div class="son" v-for="value in navList" :key="value.id" @click="goClassify(value.id)">
          <div>
            <img :src="value.img" alt />
          </div>
          <p>{{value.content}}</p>
        </div>
      </div>
      <div class="warp3 clearfix">
        <div class="left fl">
          <div class="top">
            <img src="../../assets/images/index_images/timer.jpg" alt />
            <span>限时秒杀</span>
            <p>今天零点场 好货抢不停</p>
            <div class="box">
              <div>02</div>
              <div>16</div>
              <div>45</div>
            </div>
            <div class="fl">秒杀</div>
          </div>
          <div class="bottom">
            <div class="yuan">￥14.8</div>
          </div>
        </div>
        <div class="right fl">
          <div class="top clearfix">
            <div class="fl">
              <p class="p1">品牌上新</p>
              <p class="p2">每日九点抢大牌</p>
            </div>
            <div class="fl">
              <img src="../../assets/images/index_images/shop_1.jpg" alt />
            </div>
          </div>
          <div class="bottom clearfix">
            <div class="fl">
              <p class="p1">每日十件</p>
              <p class="p2">只为你选好货</p>
              <div>
                <img src="../../assets/images/index_images/shop_2.jpg" alt />
              </div>
            </div>
            <div class="fl">
              <p class="p1">每日十件</p>
              <p class="p2">只为你选好货</p>
              <div>
                <img src="../../assets/images/index_images/shop_3.jpg" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap4"></div>
      <div class="wrap5">
        <div class="nav">
          <div>热门推荐</div>
          <div>发现好货</div>
          <div>只看专场</div>
          <div>只看商品</div>
        </div>
        <router-link tag="div" to="/shopDetail">
          <div class="body clearfix" v-for="item in shopsList" :key="item.id">
            <div class="left fl">
              <img :src="item.img" alt />
            </div>
            <div class="right fl">
              <p class="p1">{{item.name}}{{item.norms}}</p>
              <p class="p2">￥{{item.price}}.00</p>
              <p class="p3">已售800件</p>
              <div>
                <button>立即抢购</button>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkAll: false,
      shopsList: [
        {
          id: 1,
          name: "雅致贵妇素颜霜",
          norms: "50g",
          price: 123,
          img: require("../../assets/images/index_images/pic_8.jpg"),
          checked: false,
        },
        {
          id: 2,
          name: "欧莱雅面霜",
          norms: "50g",
          price: 123,
          img: require("../../assets/images/shopcart_img/shop_4.jpg"),
          checked: false,
        },
        {
          id: 3,
          name: "华为 旗舰芯片 智能手机",
          norms: "213g",
          price: 3099,
          img: require("../../assets/images/shopcart_img/huawei.jpg"),
          checked: false,
        },
        {
          id: 4,
          name: "日本Anessa小金瓶防晒乳",
          norms: "60g",
          price: 288,
          img: require("../../assets/images/shopcart_img/hufu.jpg"),
          checked: false,
        },
      ],
      navList: [
        {
          id: 5,
          img: require("../../assets/images/index_images/icon_1.jpg"),
          content: "限时抢购",
        },
        {
          id: 6,
          img: require("../../assets/images/index_images/icon_2.jpg"),
          content: "积分商城",
        },
        {
          id: 7,
          img: require("../../assets/images/index_images/icon_3.jpg"),
          content: "联系我们",
        },
        {
          id: 8,
          img: require("../../assets/images/index_images/icon_4.jpg"),
          content: "商品分类",
        },
      ],
    };
  },
  methods: {
    goClassify(id) {
      this.$router.push({
        name: "classify",
        params: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/index.css");
</style>