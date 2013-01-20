(function ($) {
  $.fn.kbdScroll = function () {
    var $root = $(this);

    var htmlHeight = $('html').height();
    var htmlWidth = $('html').width();

    // Detect keyboard based on window size changes
    $(window).on('resize', function () {
      // Take into account rotation
      var newWidth = $('html').width();
      if (newWidth === htmlWidth) {
        var newHeight = $('html').height();

        if (newHeight < htmlHeight) {
          setActive();
        }
        else if (newHeight > htmlHeight) {
          setInactive();
        }

        htmlHeight = newHeight;
      }
      else {
        setInactive();
      }
      htmlWidth = newWidth;
    });

    var setActive = function () {
      $('.kbd-scroll').each(function () {
        var $kbdScroll = $root;
        var $overscroll = $(this).children('.overscroll');

        var height = $overscroll.children('.content').height();

        $overscroll.height(height);
        $kbdScroll.scrollTop(0);
      });
    };

    var setInactive = function () {
      $('.kbd-scroll').each(function () {
        var $kbdScroll = $root;
        var $overscroll = $kbdScroll.children('.overscroll');

        var height = $overscroll.children('.content').height();

        // If the content is actually taller than the page,
        // it should scroll. This is particularly relevant
        // in landscape mode.
        if (height > $kbdScroll.height()) {
          $overscroll.height(height);
          $kbdScroll.scrollTop(0);
        }
        else {
          $overscroll.height($kbdScroll.height());
          $kbdScroll.scrollTop($kbdScroll.height());
        }
      });
    };

    // Hack to circumvent the Android initial page size bug.
    setTimeout(function () {
      $root.scrollTop(10000);
      $root.children('.overscroll').css('height', '100%');
    }, 1);
  };
})(jQuery);
