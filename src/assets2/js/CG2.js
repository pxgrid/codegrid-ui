var CG2 = {};

CG2.vent = new EventDispatcher();

;( function () {

  var win = window;

  var BREAK_POINT = {
    large  : Infinity,
    base   : 980 - 1,
    middle : 768 - 1,
    small  : 640 - 1
  };

  var onresize = function () {

    var _screenType = CG2.screenType;

    for ( var i in BREAK_POINT ) {

      if ( window.matchMedia( '(max-width: ' + BREAK_POINT[ i ] + 'px)' ).matches ) {

        CG2.screenType = i;

      }

    }

    if ( CG2.screenType !== _screenType ) {

      CG2.vent.dispatchEvent( { type: 'onmediachange', screenType: CG2.screenType } );

    }

  }

  onresize();
  win.addEventListener( 'resize', onresize );

} )();
