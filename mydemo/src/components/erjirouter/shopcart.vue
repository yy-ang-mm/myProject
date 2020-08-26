<template>
  <div>
    <div id="app" v-cloak>
      <div class="wrap">
        <div class="nav">
          <div class="c">
            <div @click="$router.back()">
              <img src="../../assets/images/public/arrow.jpg" alt />
            </div>
            <div class="center">购物车</div>
            <div class="set">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div class="body clearfix" v-for="(Item,index) in shopsList" :key="Item.id">
          <div class="left fl">
            <input type="checkbox" name id class="tui-checkbox" v-model="Item.checked" />
          </div>
          <div class="center fl">
            <img :src="Item.img" alt />
          </div>
          <div class="a">
            <p class="p1">{{Item.name}}</p>
            <p class="p2">规格 ： {{Item.norms}}</p>
            <p class="p3">￥{{Item.price.toFixed(2)}}</p>
          </div>
          <div class="right fl">
            <div class="a">
              <div class="left" @click="add(index)">+</div>
              <div class="center">{{Item.num}}</div>
              <div class="right" @click="reduce(index)">-</div>
            </div>
          </div>
        </div>

        <div class="foot clearfix">
          <div class="foot_inp">
            <input type="checkbox" class="tui-checkbox" v-model="checkAll" @change="allCheck" />&nbsp;&nbsp;全选
          </div>
          <div class="center fl">
            <p class="p1">总计{{total}}</p>
            <p class="p2">不含运费，已优惠￥0.00</p>
          </div>
          <router-link tag="div" to="/order">
            <div class="right fr">去结算（{{numAll}}件）</div>
          </router-link>
        </div>
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
          name: "欧莱雅面霜",
          norms: "50g",
          price: 123,
          img: require("../../assets/images/shopcart_img/shop_4.jpg"),
          num: 1,
          checked: false,
        },
        {
          id: 2,
          name: "华为 旗舰芯片 智能手机",
          norms: "213g",
          price: 3099,
          img: require("../../assets/images/shopcart_img/huawei.jpg"),
          num: 1,
          checked: false,
        },
        {
          id: 3,
          name: "日本进口 Anessa小金瓶防晒乳",
          norms: "60g",
          price: 288,
          img: require("../../assets/images/shopcart_img/hufu.jpg"),
          num: 1,
          checked: false,
        },
        {
          id: 4,
          name: "三只松鼠零食大礼包",
          norms: "750g",
          price: 159,
          img: require("../../assets/images/shopcart_img/eat.jpg"),
          num: 1,
          checked: false,
        },
      ],
    };
  },
  // 深监听 全部选则全选，有一个没选则不全选
  watch: {
    shopsList: {
      deep: true,
      handler() {
        this.checkAll = this.shopsList.every((item) => item.checked);
      },
    },
  },
  methods: {
    // 封装全选
    allCheck() {
      // 循环遍历，给每一项checked赋值
      this.shopsList.map((item) => {
        console.log(item);
        item.checked = this.checkAll;
      });
    },
    // 封装点击数量++
    add(i) {
      this.shopsList[i].num++;
    },
    // 封装点击数量--
    reduce(i) {
      if (this.shopsList[i].num == 1) {
        return;
      }
      this.shopsList[i].num--;
    },
  },
  computed: {
    // 计算总价
    total() {
      let sum = 0;
      this.shopsList.map((item) => {
        if (item.checked) {
          sum += item.price * item.num;
        }
      });
      return sum.toFixed(2);
    },
    // 计算件数
    numAll() {
      let sum = 0;
      this.shopsList.map((item) => {
        if (item.checked) {
          sum += item.num;
        }
      });
      return sum;
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/shopcart.css");
[v-cloak] {
  display: none;
}
</style>