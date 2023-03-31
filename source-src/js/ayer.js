(function ($) {
  // Search
  let $searchWrap = $(".search-form-wrap"),
    isSearchAnim = false,
    searchAnimDuration = 200, 
    $content = $(window);
  
  const innerWidth = () =>  window.innerWidth;

  // 搜索框
  const startSearchAnim = () => isSearchAnim = true;

  const stopSearchAnim = (callback) => {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $(".nav-item-search").on("click", () => {
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass("on");
    stopSearchAnim(function () {
      $(".local-search-input").focus();
    });
  });

  $(document).on("touchstart mousedown", (e) => {
    if (e.target.className == "ri-search-line" || e.target.title == "搜索" ) return;
    const _con = $(".local-search");
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
      $searchWrap.removeClass("on");
    }
  });

  // Not recommended in mobile, /search.xml is actually large.
  if ($(".local-search").length) {
    $.getScript("/js/search.js", function () {
      searchFunc("/search.xml", "local-search-input", "local-search-result");
    });
  }

  // Mobile Detect
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  // Share
  $(".share-outer").on("click", () => $(".share-wrap").fadeToggle());

  // Lazyload
  $("img.lazy").lazyload({
    effect: "fadeIn",
  });

  // JustifiedGallery
  $("#gallery").justifiedGallery({
    rowHeight: 200,
    margins: 5,
  });

  // ScrollDown
  $(document).ready(function ($) {
    $(".anchor").on("click", function (e) {
      e.preventDefault();
      $("main").animate({ scrollTop: $(".cover").height() }, "smooth");
    });
  });

  // To Top
  (() => {
    // When to show the scroll link
    // higher number = scroll link appears further down the page
    const upperLimit = 1000;

    // Our scroll link element
    const scrollElem = $("#totop");

    // Scroll to top speed
    const scrollSpeed = 800;

    // Show and hide the scroll to top link based on scroll position
    scrollElem.hide();
    const scrollElemControll = e => {
      const scrollTop = $(e).scrollTop();
      if (scrollTop > upperLimit) {
        scrollElem.css("display", "block"); // fade back in
        scrollElem.stop().fadeTo(150, 0.6); // fade back in
      } else {
        scrollElem.stop().fadeTo(150, 0); // fade out
        scrollElem.css("display", "none"); // fade out
      }
    }
    
    // listeners
    $content.on("scroll", e => {
      scrollElemControll(e.target);
    });

    // 返回顶部按钮
    let t1 = 0, t2 = 0, timer = null; 
    $content.on("scroll", function(){
      // 监听滚动
      clearTimeout(timer)
      timer = setTimeout(isScrollEnd, 300)
      t1 =  $content.scrollTop()
    })
    function isScrollEnd() {
      t2 = $content.scrollTop();
      if(t2 == t1){
        clearTimeout(timer)
        // 滚动结束后重新添加监听
        scrollElem.unbind("click").one("click", () => {
          $("html, body").animate({ scrollTop: 0 }, scrollSpeed);
        });
      }
    }

  })();

  // Caption
  $(".article-entry").each(function (i) {
    $(this)
      .find("img")
      .each(function () {
        if ($(this).parent().is("a")) return;

        const { alt } = this;

        if (alt) $(this).after('<span class="caption">' + alt + "</span>");
      });
  });

  // Mobile Nav 导航栏
  const $sidebar = $(".sidebar");
  $(".navbar-toggle").on("click", () => {
    $sidebar.toggleClass("on");
    $(".content").toggleClass("on");
  });
  $(".content").on("touchstart mousedown", () => {
    if (innerWidth() <= 768) {
      $sidebar.addClass("on");
      $(".content").addClass("on");
    }
  });

  // Reward
  $("#reward-btn").on("click", () => {
    $("#reward").fadeIn(150);
    $("#mask").fadeIn(150);
  });
  $("#reward .close, #mask").on("click", () => {
    $("#mask").fadeOut(100);
    $("#reward").fadeOut(100);
  });

  // DarkMode
  function setdarkmode(mode) {
    if (mode) {
      $("body").addClass("darkmode");
      $("#todark i").removeClass("ri-moon-line").addClass("ri-sun-line");
    } else {
      $("body").removeClass("darkmode");
      $("#todark i").removeClass("ri-sun-line").addClass("ri-moon-line");
    }
  }
  $("#todark").on("click", () => {
    if (localStorage.getItem("darkmode") == 1) {
      setdarkmode(0);
      localStorage.removeItem("darkmode");
    } else {
      setdarkmode(1);
      localStorage.setItem("darkmode", 1);
    }
  });

  // 修改标题背景
  $("#changebg").on("click", () => {
    let src = $(".bg-img").attr("src");
    let data = $(".bg-img").attr("data").split(",");
    let pos = data.findIndex(i => i == src);
    src = data[pos + 1] ? data[pos + 1] : data[0];
    localStorage.setItem("bg_img_src", src);
    $(".bg-img").attr("src", src);
    Pace.restart();
  })

})(jQuery);
