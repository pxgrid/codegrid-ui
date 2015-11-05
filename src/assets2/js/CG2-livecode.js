window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var $elAll   = document.querySelectorAll( '.CG2-livecode[data-livecode-deferredplay]:not( [data-livecode-from-oldjade] )' );
  var modifire = 'CG2-livecode--isRunning';

  var attach   = function( $el ) {

    var isRunning = false;
    var $play   = $el.querySelectorAll( '[data-livecode-play]' );
    var $iframe = $el.querySelector( 'iframe[data-livecode-src]' );
    var src = $iframe.getAttribute( 'data-livecode-src' );

    var toggle = function ( e ) {

      e.preventDefault();

      if ( isRunning ) {

        $iframe.removeAttribute( 'src' );
        $el.classList.remove( modifire );
        isRunning = false;

      } else {

        $iframe.setAttribute( 'src', src );
        $el.classList.add( modifire );
        isRunning = true;

      }

    }

    Array.prototype.forEach.call( $play, function( $item ) {

      $item.addEventListener( 'click', toggle );

    } );

  }

  Array.prototype.forEach.call( $elAll, attach );
  
  CGUI.vent.addEventListener( 'livecode-converted', function ( e ) {

    var deferredplay = e.element.getAttribute( 'data-livecode-deferredplay' ) !== null;

    if ( deferredplay ) { attach( e.element ); }

  } );

} );
