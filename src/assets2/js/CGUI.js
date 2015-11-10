var CGUI = {};

CGUI.vent = new EventDispatcher();

;( function () {

  var win = window;

  var BREAK_POINT = {
    large  : Infinity,
    base   : 980 - 1,
    middle : 768 - 1,
    small  : 640 - 1
  };

  var onresize = function () {

    var _screenType = CGUI.screenType;

    for ( var i in BREAK_POINT ) {

      if ( window.matchMedia( '(max-width: ' + BREAK_POINT[ i ] + 'px)' ).matches ) {

        CGUI.screenType = i;

      }

    }

    if ( CGUI.screenType !== _screenType ) {

      CGUI.vent.dispatchEvent( { type: 'onmediachange', screenType: CGUI.screenType } );

    }

  }

  onresize();
  win.addEventListener( 'resize', onresize );

} )();
