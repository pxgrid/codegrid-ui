window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var i, l;
  var $navs = document.querySelectorAll( '.CG2-compactNav' );

  if ( $navs.length === 0 ) { return; }
  
  for ( i = 0, l = $navs.length; i < l; i = ( i + 1 )|0 ) {

    ( function () {

      var $nav     = $navs[ i ];
      var $current = $nav.querySelector( '.CG2-compactNav__item--current a' );
      var $trigger = $nav.querySelector( '.CG2-compactNav__navOpener' );
      var modifier = 'CG2-compactNav--show';

      $current.addEventListener( 'click', toggle );
      $trigger.addEventListener( 'click', toggle );

      function toggle ( e ) {

        if ( CG2.screenType !== 'middle' ) { return; }

        e.preventDefault();
        $nav.classList.toggle( modifier );

      }

    } )();

  }

} );
