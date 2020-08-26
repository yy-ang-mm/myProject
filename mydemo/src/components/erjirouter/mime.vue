<template>
  <div>
    <div class="wrap">
      <div class="nav">
        <div class="c">
          <div>
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
      <div class="head" @click="$router.push('/login')">
        <div class="son clearfix">
          <div class="fl">
            <img src="../../assets/images/mine_images/head.jpg" alt />
          </div>
          <div class="fl">
            <p class="p1">请登录</p>
            <p class="p2">
              <em>V1</em>
            </p>
          </div>
          <div class="fr">每日签到</div>
        </div>
      </div>
      <div class="body">
        <div class="box">
          <div>
            <img src="../../assets/images/mine_images/icon_1.jpg" alt />
          </div>
          <p>全部订单</p>
        </div>
        <div class="box">
          <div>
            <img src="../../assets/images/mine_images/icon_2.jpg" alt />
          </div>
          <p>代付款</p>
        </div>
        <div class="box">
          <div>
            <img src="../../assets/images/mine_images/icon_3.jpg" alt />
          </div>
          <p>代收款</p>
        </div>
      </div>
      <div class="body1">
        <div class="son">
          <div class="left">
            <div class="fl">
              <img src="../../assets/images/mine_images/icon_4.jpg" alt />
            </div>
            <div class="fl wz">地址管理</div>
          </div>
          <div class="fr">
            <img src="../../assets/images/public/right.jpg" alt />
          </div>
        </div>
      </div>
      <div class="body1">
        <div class="son">
          <div class="left">
            <div class="fl">
              <img src="../../assets/images/mine_images/icon_5.jpg" alt />
            </div>
            <div class="fl wz">我的钱包</div>
          </div>
          <div class="fr">
            <div class="wz1 fl">200余额</div>
            <img src="../../assets/images/public/right.jpg" alt />
          </div>
        </div>
      </div>
      <div class="body1">
        <div class="son">
          <div class="left">
            <div class="fl">
              <img src="../../assets/images/mine_images/icon_6.jpg" alt />
            </div>
            <div class="fl wz">我的优惠券</div>
          </div>
          <div class="fr">
            <img src="../../assets/images/public/right.jpg" alt />
          </div>
        </div>
      </div>
      <div class="body1">
        <div class="son">
          <div class="left">
            <div class="fl">
              <img src="../../assets/images/mine_images/icon_7.jpg" alt />
            </div>
            <div class="fl wz">我的二维码</div>
          </div>
          <div class="fr">
            <img src="../../assets/images/public/right.jpg" alt />
          </div>
        </div>
      </div>
      <div class="body1">
        <div class="son">
          <div class="left">
            <div class="fl">
              <img src="../../assets/images/mine_images/icon_8.jpg" alt />
            </div>
            <div class="fl wz">我的小伙伴</div>
          </div>
          <div class="fr">
            <img src="../../assets/images/public/right.jpg" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("../../assets/css/mime.css");
</style>