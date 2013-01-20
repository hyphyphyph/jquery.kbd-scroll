$(function () {
  var htmlHeight = $('html').height();
  var keyboardActive = false;

  var setActive = function () {
    $('.kbd-scroll').each(function () {
      var $kbdScroll = $(this);
      var $overscroll = $(this).children('.overscroll');

      var height = $overscroll.children('.content').height();

      $overscroll.height(height);
      // $kbdScroll.scrollTop(height);
      $kbdScroll.scrollTop(0);
    });
  };

  var setInactive = function () {
    $('.kbd-scroll').each(function () {
      var $kbdScroll = $(this);
      var $overscroll = $(this).children('.overscroll');

      var height = $overscroll.children('.content').height();

      $overscroll.height($kbdScroll.height());
      $kbdScroll.scrollTop($kbdScroll.height());
    });
  };

  setTimeout(function () {
    // Detect keyboard based on window size changes
    // TODO: take width into account
    $(window).on('resize', function () {
      var newHeight = $('html').height();

      if (newHeight < htmlHeight) {
        keyboardActive = true;
        setActive();
      }
      else if (newHeight > htmlHeight) {
        keyboardActive = false;
        setInactive();
      }

      htmlHeight = newHeight;
    });

    $('.kbd-scroll').scrollTop(10000);
  }, 1);
});
