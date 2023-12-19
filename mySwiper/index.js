// 如果想变换轮播方式等，进阶的话，可以看这个 https://github.surmon.me/vue-awesome-swiper/
// 当然你也可以引入jquery插件，都可以的, 不只是轮播图，其他特效也可以
new Vue({
  el: "#mySwiper",
  data: function () {
    return {
      swiperOption: {
        direction: "vertical", // 这个是竖着的
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        // 注释上面的四个，则水平方向轮播
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // 注释掉上面这个，则不显示小点点
        loop: true, // 循环
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        }, // 自动播放,注释掉则不自动播放
        on: {
          init: function () {
            swiperAnimateCache(this); //隐藏动画元素
            swiperAnimate(this); //初始化完成开始动画
          },
          slideChangeTransitionEnd: function () {
            swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
          },
        },
        // or data-swiper-parallax="-100"
        // 上面是文字动画效果，注释则取消文字动画，动画效果参见 https://www.swiper.com.cn/usage/animate/index.html
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.myswiper.$swiper;
    },
  },
  methods: {
    // 鼠标移入停止轮播
    stopAutoPlay() {
      this.swiperOption.autoplay && this.swiper.autoplay.stop();
    },
    // 鼠标移出开始轮播
    startAutoPlay() {
      this.swiperOption.autoplay && this.swiper.autoplay.start();
    },
    // 获取 知乎热榜数据
    getHotData() {
      // https://www.zhihu.com/hot
      fetch('https://api.gmit.vip/Api/ZhiHuHot?format=json').then(data=>data.json()).then((json)=>{
        console.log('Hello a 树哥', json)
        let html = ''
        html += '<swiper class="myswiper" ref="myswiper" style="height:350px;" :options="swiperOption">'
        var i = 1 
        for (let item of json.data) {
          // '<div class="zhihu-list-item"><div class="zhihu-hotness">' + i + '</div>' + '<span class="zhihu-title"><a title="' + item.title + '"href="' + item.url + '" target="_blank" rel="external nofollow noreferrer">' + item.title + '</a></span>' + '<div class="zhihu-hot"><span>' + item.hot + '</span></div></div>'
          html += '<swiper-slide><a href="' + item.url + '" class="toPath"><img class="no-lazy" src="https://api.dujin.org/pic/ghibli/" style="width:100%;height:100%;object-fit: cover;"><h2 class="ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="0.5s" swiper-animate-delay="0.3s">' + item.title + '</h2><p class="ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="0.5s" swiper-animate-delay="0.3s">' + item.title + '</p></a></swiper-slide>'
          i++
        }
        html += '<div class="swiper-pagination" slot="pagination"></div></swiper>'
        document.getElementById('mySwiper').innerHTML = html
      }).catch(function(error) {
        console.log(error);
      });
    },
  },
  mounted() {
    this.getHotData();
  },
});
