<template>
  <div>
    <div class="wrap">
      <div class="nav">
        <div class="c">
          <div @click="$router.back()">
            <img src="../assets/images/public/arrow.jpg" alt />
          </div>
          <div class="center">商品详情</div>
          <div class="set">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="body">
        <div>
          <img src="../assets/images/detail_images/pic_1.jpg" alt />
        </div>
        <div>
          <img src="../assets/images/detail_images/pic_2.jpg" alt />
        </div>
        <div class="bgColor">
          <div class="bottom">
            <p class="p1">雅致贵妇素颜霜 贵妇膏神仙膏补水保湿懒人霜遮瑕珍珠膏</p>
            <p class="p2">
              ￥123.00
              <span>(此价格不与套装同时优惠)</span>
            </p>
          </div>
          <div class="box">
            <div class="top">
              促销：满两件9折;
              三件8折
            </div>
            <div class="center clearfix">
              <div class="fl">购买数量</div>
              <div class="fr">
                <div class="left">-</div>
                <div class="center1">1</div>
                <div class="right">+</div>
              </div>
            </div>
            <div class="bottom1">
              <p class="p1">商品属性</p>
              <p class="p2">
                规格
                <span class="span1">30g</span>
                <span class="span2">5g</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="body1">
        <div class="nav1 bgColor">商品详情</div>
        <div>
          <img src="../assets/images/detail_images/pic_3.jpg" alt />
        </div>
        <div>
          <img src="../assets/images/detail_images/pic_4.jpg" alt />
        </div>
        <div>
          <img src="../assets/images/detail_images/pic_5.jpg" alt />
        </div>
        <div>
          <img src="../assets/images/detail_images/pic_6.jpg" alt />
        </div>
        <div>
          <img src="../assets/images/detail_images/pic_7.jpg" alt />
        </div>
        <div class="top2 bgColor">商品评价</div>
        <div class="bgColor">
          <div class="center2">
            <p class="p1">1235669fg</p>
            <p class="p2">效果很好物到位</p>
            <p class="p3">
              <img src="../assets/images/detail_images/pic_8.jpg" alt />
              <img src="../assets/images/detail_images/pic_9.jpg" alt />
              <img src="../assets/images/detail_images/pic_10.jpg" alt />
            </p>
            <p class="p4">2020-1-13</p>
          </div>
          <div class="bottom2 clearfix">
            <div class="fl">共100+条评论</div>
            <div class="fr">查看更多&gt;</div>
          </div>
          <div class="foot">
            <div class="left3">
              <div class="tp">
                <img src="../assets/images/public/icon_7.jpg" alt />
                <p>购物车</p>
              </div>
            </div>
            <div class="center3">加入购物车</div>
            <div class="right3">立即购买</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template><script>
export default {
  data() {
    return {};
  },
};
</script><style lang=""scoped>
@import "../assets/css/shopDetail.css";
</style>