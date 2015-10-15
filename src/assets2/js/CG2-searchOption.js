window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var $el = document.querySelector( '.CG2-searchOption__body' );

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
