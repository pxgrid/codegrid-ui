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
