<template>
  <div>
    <div class="wrap">
      <div class="nav">
        <div class="c">
          <div @click="$router.back()">
            <img src="../assets/images/public/arrow.jpg" alt />
          </div>
          <div class="center">商品分类</div>
          <div class="set">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="body clearfix">
        <div class="left fl">
          <ul v-for="item in titleList" :key="item.id">
            <li>{{item.title}}</li>
          </ul>
        </div>
        <div class="right fl">
          <div class="top clearfix">
            <div class="son fl">洗发类</div>
            <div class="son1 fr">更多&gt;</div>
          </div>
          <div class="center">
            <div class="box">
              <div v-for="item in shampooList" :key="item.id">
                <img :src="item.img" alt />
                <p>{{item.title}}</p>
              </div>
            </div>
          </div>
          <div class="top clearfix">
            <div class="son fl">染发类</div>
            <div class="son1 fr">更多&gt;</div>
          </div>
          <div class="center">
            <div class="box">
              <div v-for="item in tintList" :key="item.id">
                <img :src="item.img" alt />
                <p>{{item.title}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleList: [
        {
          id: 1,
          title: "施华蔻",
        },
        {
          id: 2,
          title: "沙宣",
        },
        {
          id: 3,
          title: "欧莱雅",
        },
        {
          id: 4,
          title: "潘婷",
        },
        {
          id: 5,
          title: "资生堂",
        },
        {
          id: 6,
          title: "阿道夫",
        },
        {
          id: 7,
          title: "卡诗",
        },
        {
          id: 8,
          title: "海飞丝",
        },
        {
          id: 9,
          title: "丝蓓绮",
        },
      ],
      shampooList: [
        {
          id: 1,
          img: require("../assets/images/list_images/1.jpg"),
          title: "护亮泽洗发水",
        },
        {
          id: 2,
          img: require("../assets/images/list_images/2.jpg"),
          title: "滋养洗发水",
        },
        {
          id: 3,
          img: require("../assets/images/list_images/pic.jpg"),
          title: "柔顺洗发露",
        },
        {
          id: 4,
          img: require("../assets/images/list_images/3.jpg"),
          title: "去屑洗发露",
        },
        {
          id: 5,
          img: require("../assets/images/list_images/4.jpg"),
          title: "柔顺洗发露",
        },
        {
          id: 6,
          img: require("../assets/images/list_images/5.jpg"),
          title: "焕彩洗发水",
        },
      ],
      tintList: [
        {
          id: 1,
          img: require("../assets/images/list_images/6.jpg"),
          title: "施华蔻染色",
        },
        {
          id: 2,
          img: require("../assets/images/list_images/7.jpg"),
          title: "施华蔻双氧乳",
        },
        {
          id: 3,
          img: require("../assets/images/list_images/8.jpg"),
          title: "施华蔻染发膏",
        },
      ],
    };
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/classify.css";
</style>
