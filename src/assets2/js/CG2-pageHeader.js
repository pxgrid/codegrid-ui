window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var modifier = 'CG2-pageHeader__userMenu--show';
  var $head = document.querySelector( '.CG2-pageHeader__userHeader' );
  var $nav  = document.querySelector( '.CG2-pageHeader__userMenu' );

  var navToggle = function () {

    $nav.classList.toggle( modifier );

  }

  $head.addEventListener( 'click', navToggle );

} );
