/**
 * @author yomotsu / http://yomotsu.net
 * repository: https://github.com/yomotsu/PXG-drawer
 *
 */
window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var DISTANCE_THRESHOLD = 5;
  var ANGLE_THREHOLD = 60;
  var WILL_CLOSE_X = 30;

  var ua = ( function () {
    return {
      pointer: window.navigator.pointerEnabled,
      touch: typeof document.ontouchstart !== 'undefined'
    }
  } )();
  var _pointerstart = ua.pointer   ? 'pointerdown' :
                      ua.touch     ? 'touchstart' :
                      'mousedown';
  var _pointermove  = ua.pointer   ? 'pointermove' :
                      ua.touch     ? 'touchmove' :
                      'mousemove';
  var _pointerend   = ua.pointer   ? 'pointerup' :
                      ua.touch     ? 'touchend' :
                      'mouseup';

  var modifier = {
    show    : 'js-drawer--show',
    dragging: 'js-drawer--dragging'
  };
  var $win  = window;
  var $html = document.documentElement;
  var $body = document.body;
  var scrollTop;
  var scrollbarWidth = ( function () {

    // http://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript

    var outer = document.createElement( 'div' );
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar';

    $body.appendChild( outer );

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    var inner = document.createElement( 'div' );
    inner.style.width = '100%';
    outer.appendChild( inner );

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild( outer );

    return widthNoScroll - widthWithScroll;

  } )();

  var isDragReady  = false;
  var isDragging   = false;
  var isHidden     = true;
  var isTouchVScrolling = false;

  var _pointerId = null;
  var dragStartCoord = { x: 0|0, y: 0|0 };
  var $openEl, $closeEl, $toggleEl;
  var $panel     = document.querySelector( '.CG2-drawer__panel' );
  var $openEls   = document.querySelectorAll( '[data-drawer-show]' );
  var $closeEls  = document.querySelectorAll( '[data-drawer-hide]' );
  var $toggleEls = document.querySelectorAll( '[data-drawer-toggle]' );

  if ( !$panel ) { return; }

  Array.prototype.forEach.call( $openEls, function( $openEl ) {

    $openEl.addEventListener( 'click', navOpen );

  } );

  Array.prototype.forEach.call( $closeEls, function( $closeEl ) {

    $closeEl.addEventListener( 'click', navClose );

  } );

  Array.prototype.forEach.call( $toggleEls, function( $toggleEl ) {

    $toggleEl.addEventListener( 'click', navToggle );

  } );

  $panel.addEventListener( _pointerstart, dragstart );

  if ( ua.touch ) {

    $panel.addEventListener( _pointerstart, handleTouchVScrollStart );
    $panel.addEventListener( _pointermove,  handleTouchVScrollMove );
    $panel.addEventListener( _pointerend,   handleTouchVScrollEnd );

  }

  $win.addEventListener( 'keyup', keyup );

  //

  function navOpen () {

    if ( !isHidden ) { return; }

    isHidden = false;
    scrollTop = $html.scrollTop || $body.scrollTop;
    $html.className += ' ' + modifier.show;
    $html.style.paddingRight  = scrollbarWidth + 'px';
    $body.style.marginTop     = -scrollTop     + 'px';
    $body.style.paddingBottom =  scrollTop     + 'px';
    $panel.style.marginLeft   = 0;

  }

  function navClose () {

    if ( isHidden ) { return; }

    var re = new RegExp( ' ' + modifier.show );
    isHidden = true;
    $html.className = $html.className.replace( re, '' );
    $html.style.paddingRight  = 0;
    $body.style.marginTop     = 0;
    $body.style.paddingBottom = 0;
    window.scrollTo( 0, scrollTop );

  }

  function navToggle () {

    if ( isHidden ) {

      navOpen();

    } else {

      navClose();

    }

  }

  function keyup ( event ) {

    if ( event.keyCode === 27 ) {

      navClose();

    }
    
  }

  function dragstart ( event ) {

    var eventCoord;

    if ( !ua.touch ) {

      if ( /A|BUTTON|INPUT|TEXTAREA|SELECT/.test( event.target.nodeName ) ) {

        return;

      }

      // prevent text/element selection with cursor drag
      event.stopPropagation();
      event.preventDefault();
      event.cancelBubble = true;
      event.returnValue = false;

    }

    if ( event.pointerId ) {

      _pointerId = event.pointerId;

    } else if ( event.changedTouches ) {

      _pointerId = event.changedTouches[ event.changedTouches.length - 1 ].identifier;

    }

    eventCoord = getEventCoord( event );
    dragStartCoord.x = eventCoord.x;
    dragStartCoord.y = eventCoord.y;

    isDragReady = false;
    isDragging  = false;

    $panel.addEventListener( _pointermove, dragmove );
    $panel.addEventListener( _pointerend,  dragend );

  }

  function dragmove ( event ) {

    var eventCoord;

    if ( !ua.touch ) {

      // prevent text/element selection with cursor drag
      event.stopPropagation();
      event.preventDefault();
      event.cancelBubble = true;
      event.returnValue = false;

    }

    eventCoord = getEventCoord( event );
    var x = Math.max( eventCoord.x - dragStartCoord.x, 0 );

    if ( !isDragReady ) {

      var triangle = getTriangleSide(
        dragStartCoord.x,
        dragStartCoord.y,
        eventCoord.x,
        eventCoord.y
      );

      if ( triangle.z > DISTANCE_THRESHOLD ) {

        if ( getAngle( triangle ) > ANGLE_THREHOLD ) {

          isDragReady = true;

        } else {

          dragend( event );
          return;

        }

      } else {

        return;

      }

    }

    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;
    event.returnValue = false;

    if ( !isDragging ) {

      $html.className += ' ' + modifier.dragging;
      isDragging = true;

    }

    $panel.style.marginLeft = x + 'px';

  }

  function dragend ( event ) {

    var x, re, i, l;

    if ( event.pointerId && pointerId !== event.pointerId ) {

      return;

    } else if ( event.changedTouches ) {

      for ( i = 0, l = event.changedTouches.length; i < l; i ++ ) {

        if ( _pointerId === event.changedTouches[ i ].identifier ) {

          break;

        }

        if ( i === event.changedTouches.length ) {

          return;

        }

      }

    }

    x = Math.max( getEventCoord( event ).x - dragStartCoord.x, 0 );

    if ( WILL_CLOSE_X < x ) {

      navClose();

    } else {

      $panel.style.marginLeft = 0;

    }

    re = new RegExp( ' ' + modifier.dragging );
    $html.className = $html.className.replace( re, '' );

    $panel.removeEventListener( _pointermove, dragmove );
    $panel.removeEventListener( _pointerend,  dragend );

    isDragReady = false;
    isDragging  = false;

  }

  function handleTouchVScrollStart ( event ) {

    isTouchVScrolling = true;

  }

  function handleTouchVScrollEnd ( event ) {

    isTouchVScrolling = false;

  }

  function handleTouchVScrollMove ( event ) {

    if ( !isTouchVScrolling ) { return; }

    // console.log( event );

  }

  function getEventCoord ( event ) {

    var x, y, i, l, _event = null;

    if ( event.pointerId ) {

      if ( _pointerId === event.pointerId ) {

        _event = event;

      }

    } else if ( event.changedTouches ) {

      for ( i = 0|0, l = event.changedTouches.length; i < l; i = ( i + 1 )|0 ) {

        if ( _pointerId === event.changedTouches[ i ].identifier ) {

          _event = event.changedTouches[ i ];

        }

      }

    } else {

      _event = event;

    }

    if ( _event === null ) {

      return false;

    }

    x = _event.clientX|0;
    y = _event.clientY|0;

    return { x: x, y: y };

  };

  function getTriangleSide ( x1, y1, x2, y2 ) {

    var x = Math.abs( x1 - x2 );
    var y = Math.abs( y1 - y2 );
    var z = Math.sqrt( x * x + y * y );

    return {
      x: x,
      y: y,
      z: z
    };

  }

  function getAngle ( triangle ) {

    var cos = triangle.y / triangle.z;
    var radian = Math.acos( cos );

    return 180 / ( Math.PI / radian );

  }


} );
