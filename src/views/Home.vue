<!--
 * @Description: 首页组件
 -->
<template>
  <div class="home" id="home" name="home">
    <!-- 轮播图 -->
    <div class="swiper-box" >
      <el-carousel :height="carouselHigh + 'px'" type="card">
        <el-carousel-item v-for="item in carousel" :key="item.carouselId"  >
          <img  :src="require('../../'+item.imgpath)" :alt="item.describes" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图END -->
    <div class="main-box">
      <div class="main">
        <!-- 手机商品展示区域 -->
        <div class="phone">
          <div class="box-hd">
            <div class="title">手机</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link to>
                <img :src="require('../../public/imgs/phone/phone.png')"/>
              </router-link>
            </div>
            <div class="list">
              <MyList :list="phoneList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- 手机商品展示区域END -->

        <!-- 家电商品展示区域 -->
        <div class="appliance" id="promo-menu">
          <div class="box-hd">
            <div class="title">家电</div>
            <div class="more" id="more">
              <MyMenu :val="2" @fromChild="getChildMsg">
                <span slot="1">热门</span>
                <span slot="2">电视影音</span>
              </MyMenu>
            </div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img :src="require('../../public/imgs/appliance/appliance-promo1.png')" />
                </li>
                <li>
                  <img :src="require('../../public/imgs/appliance/appliance-promo2.png')" />
                </li>
              </ul>
            </div>
            <div class="list">
              <MyList :list="applianceList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- 家电商品展示区域END -->

        <!-- 配件商品展示区域 -->
        <div class="accessory" id="promo-menu">
          <div class="box-hd">
            <div class="title">配件</div>
            <div class="more" id="more">
              <MyMenu :val="3" @fromChild="getChildMsg2">
                <span slot="1">热门</span>
                <span slot="2">保护套</span>
                <span slot="3">充电器</span>
              </MyMenu>
            </div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img :src="require('../../public/imgs/accessory/accessory-promo1.png')" alt />
                </li>
                <li>
                  <img :src="require('../../public/imgs/accessory/accessory-promo2.png')" alt />
                </li>
              </ul>
            </div>
            <div class="list">
              <MyList :list="accessoryList" :isMore="true"> </MyList>
            </div>
          </div>
        </div>
        <!-- 配件商品展示区域END -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.carouselHigh = window.innerWidth * 450 / 1800;
    window.onresize = () =>{
      this.carouselHigh = window.innerWidth * 450 / 1800;
    }
  },
  data() {
    return {
      carousel: "", // 轮播图数据
      phoneList: "", // 手机商品列表
      miTvList: "", // 小米电视商品列表
      applianceList: "", // 家电商品列表
      applianceHotList: "", //热门家电商品列表
      accessoryList: "", //配件商品列表
      accessoryHotList: "", //热门配件商品列表
      protectingShellList: "", // 保护套商品列表
      chargerList: "", //充电器商品列表
      applianceActive: 1, // 家电当前选中的商品分类
      accessoryActive: 1, // 配件当前选中的商品分类
      carouselHigh: 600
    };
  },
  watch: {
    // 家电当前选中的商品分类，响应不同的商品数据
    applianceActive: function(val) {
      // 页面初始化的时候把applianceHotList(热门家电商品列表)直接赋值给applianceList(家电商品列表)
      // 所以在切换商品列表时判断applianceHotList是否为空,为空则是第一次切换,把applianceList赋值给applianceHotList
      if (this.applianceHotList === "") {
        this.applianceHotList = this.applianceList;
      }
      if (val === 1) {
        // 1为热门商品
        this.applianceList = this.applianceHotList;
        return;
      }
      if (val === 2) {
        // 2为电视商品
        this.applianceList = this.miTvList;
      }
    },
    accessoryActive: function(val) {
      // 页面初始化的时候把accessoryHotList(热门配件商品列表)直接赋值给accessoryList(配件商品列表)
      // 所以在切换商品列表时判断accessoryHotList是否为空,为空则是第一次切换,把accessoryList赋值给accessoryHotList
      if (this.accessoryHotList === "") {
        this.accessoryHotList = this.accessoryList;
        this.shuffle(this.accessoryHotList);

      }
      if (val === 1) {
        // 1为热门商品
        this.accessoryList = this.accessoryHotList;
        return;
      }
      if (val === 2) {
        // 2为保护套商品
        this.accessoryList = this.protectingShellList;
        return;
      }
      if (val === 3) {
        //3 为充电器商品
        this.accessoryList = this.chargerList;

      }
    }
  },
  created() {
    // 获取轮播图数据
    this.request
      .get(this.$lc +"carouselController/getPic", {})
      .then(res => {
        this.carousel = res.data;
      })
      .catch(err => {
        return Promise.reject(err);
      });
    // 获取各类商品数据
    this.getPromo("手机", "phoneList",1);

    this.getPromo("电视机", "miTvList",1);
    this.getPromo("保护套", "protectingShellList",1);
    this.getPromo("充电器", "chargerList",1);
    // this.getPromo(
    //   ["电视机", "空调", "洗衣机"],
    //   "applianceList",
    //
    //   "/productController/getHotProduct",
    //
    // );
    // this.getPromo(
    //   ["保护套", "保护膜", "充电器", "充电宝"],
    //   "accessoryList",
    //     2,
    //   "/productController/getHotProduct"
    // );
  },
  methods: {

    // 获取家电模块子组件传过来的数据
    getChildMsg(val) {
      this.applianceActive = val;
    },
    // 获取配件模块子组件传过来的数据
    getChildMsg2(val) {
      this.accessoryActive = val;
    },
    // 获取各类商品数据方法封装
    getPromo(categoryName, val,tag,api) {
      api = api !== undefined ? api : "/productController/getPromoProduct";
      if (tag === 1){
        console.log("len = 1" + categoryName )

        this.request
            .get(api, {
              params:{
                categoryName
              }
            })
            .then(res => {
              this[val] = res.data;

              if (categoryName === "手机"){
                console.log(this.phoneList)
              }
            })
            .catch(err => {
              return Promise.reject(err);
            });

      }else {
        this.request
            .post(api, {
                categoryName
            })
            .then(res => {
              this[val] = res.data;
              console.log(categoryName+" ___"+this[val])
            })
            .catch(err => {
              return Promise.reject(err);
            });
      }
    },
    shuffle(arr){
      let length = arr.length,
          randomIndex,
          temp;
      while (length) {
        randomIndex = Math.floor(Math.random() * (length--));
        temp = arr[randomIndex];
        arr[randomIndex] = arr[length];
        arr[length] = temp
      }
      return arr;
    }
  }
};
</script>
<style scoped>
@import "../assets/css/index.css";
img{
  width: 100%;
  height: inherit;
}
</style>
