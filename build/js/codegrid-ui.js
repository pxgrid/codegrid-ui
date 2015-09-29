/**
 * @author yomotsu / http://yomotsu.net
 * repository: https://github.com/yomotsu/PXG-drawer
 *
 */
window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var i = 0;
  var modifier = 'js-drawer--show';
  var html = document.documentElement;
  var body = document.body;
  var scrollTop;
  var scrollbarWidth = ( function () {

    // http://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript

    var outer = document.createElement( 'div' );
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar';

    document.body.appendChild( outer );

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

  var isHidden = true;
  var openEl, closeEl, toggleEl;
  var openEls   = document.querySelectorAll( '[data-drawer-show]' );
  var closeEls  = document.querySelectorAll( '[data-drawer-hide]' );
  var toggleEls = document.querySelectorAll( '[data-drawer-toggle]' );

  for ( i = 0, openEl; openEl = openEls[ i ]; i = ( i + 1 )|0 ) {

    openEl.addEventListener( 'click', navOpen );

  }

  for ( i = 0, closeEl; closeEl = closeEls[ i ]; i = ( i + 1 )|0 ) {

    closeEl.addEventListener( 'click', navClose );

  }

  for ( i = 0, toggleEl; toggleEl = toggleEls[ i ]; i = ( i + 1 )|0 ) {

    toggleEl.addEventListener( 'click', navToggle );

  }

  function navOpen () {

    if ( !isHidden ) { return; }

    isHidden = false;
    scrollTop = html.scrollTop || body.scrollTop;
    html.className += ' ' + modifier;
    html.style.paddingRight  = scrollbarWidth + 'px';
    body.style.marginTop     = -scrollTop     + 'px';
    body.style.paddingBottom =  scrollTop     + 'px';

  };

  function navClose () {

    if ( isHidden ) { return; }

    var re = new RegExp( ' ' + modifier );
    isHidden = true;
    html.className = html.className.replace( re, '' );
    html.style.paddingRight  = 0;
    body.style.marginTop     = 0;
    body.style.paddingBottom = 0;
    window.scrollTo( 0, scrollTop );

  };

  function navToggle () {

    if ( isHidden ) {

      navOpen();

    } else {

      navClose();

    }

  };

} );

window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var $el = document.querySelector( '.CG2-compactNav' );

  if ( !$el ) { return; }
  
  var $current = $el.querySelector( '.CG2-compactNav__item--current a' );
  var $trigger = $el.querySelector( '.CG2-compactNav__navOpener' );
  var modifier = 'CG2-compactNav--show';

  $current.addEventListener( 'click', toggle );
  $trigger.addEventListener( 'click', toggle );

  function toggle ( e ) {

    e.preventDefault();
    $el.classList.toggle( modifier );

  }

} );

window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var $el = document.querySelector( '.CG2-searchOption' );

  if ( !$el ) { return; }

  var $open  = $el.querySelector( '.CG2-searchOption__opener' );
  var $close = $el.querySelector( '.CG2-searchOption__button' );
  var modifier = 'CG2-searchOption--show';

  $open.addEventListener( 'click', show );
  $close.addEventListener( 'click', hide );

  function show ( e ) {

    e.preventDefault();
    $el.classList.add( modifier );

  }

  function hide ( e ) {

    e.preventDefault();
    $el.classList.remove( modifier );

  }

} );
