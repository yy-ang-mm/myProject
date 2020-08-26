<template>
  <div>
    <div class="wrap">
      <div class="nav">
        <div class="c">
          <div @click="$router.back()">
            <img src="../../assets/images/public/arrow.jpg" alt />
          </div>
          <div class="center">确认订单</div>
          <div class="set">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="head">
        <div class="son">
          <div class="pos">
            <p>收货人：yousu</p>
            <p>100000000</p>
          </div>
          <div class="posTwo">
            <p>收货地址：</p>
            <p>北京市海定区引泉路清林苑6号楼中公教育总部三楼</p>
            <p>
              <img src="../../assets/images/order/arrow.jpg" alt />
            </p>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="top clearfix">
          <div class="fl">
            <img src="../../assets/images/index_images/shop_4.jpg" alt />
          </div>
          <div class="center fl">
            <p class="p1">雅诗兰黛护肤霜</p>
            <p class="p2">规格：50g</p>
          </div>
          <div class="right fr">￥120.00</div>
        </div>
        <div class="cent clearfix">
          <div class="fl num">购买数量:</div>
          <div class="fr">
            <div class="a">-</div>
            <div class="b">1</div>
            <div class="c">+</div>
          </div>
        </div>
        <div class="bottom clearfix">
          <div class="fl">配送方式</div>
          <div class="fr">XX快递</div>
        </div>
      </div>
      <div class="body1">
        <div class="top1">
          <div class="son clearfix">
            <div class="fl">优惠券</div>
            <div class="fr">无可用</div>
          </div>
        </div>
        <div class="bottom1">
          <div class="son1">
            <div class="fl">使用积分</div>
            <div class="fr">
              <input type="text" />
              <button>使用</button>
              可用50积分
            </div>
          </div>
        </div>
      </div>
      <div class="body2">
        <div class="son clearfix">
          <ul class="fl">
            <li>商品金额</li>
            <li>运费</li>
            <li>优惠券</li>
            <li>会员优惠</li>
            <li>积分抵扣</li>
          </ul>
          <ul class="fr">
            <li>￥68.00</li>
            <li>+￥0.00</li>
            <li>-￥0.00</li>
            <li>-￥0.00</li>
            <li>-￥0.00</li>
          </ul>
        </div>
        <div class="son1">
          实付金额：
          <span>￥68.00</span>
        </div>
        <button>提交订单</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/order.css";
</style>
