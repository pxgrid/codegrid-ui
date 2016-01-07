window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  // Prism
  var $elAll = document.querySelectorAll( 'pre.code' );

  if ( $elAll.length === 0 ) { return; }

  // http://prismjs.com/extending.html#api
  Array.prototype.forEach.call( $elAll, function( $el ) {

    Array.prototype.some.call( $el.classList, function( className ) {

      if ( className !== 'code' ) {

        var lang = className === 'html' ? 'markup' : className;
        var src = Prism.highlight( $el.innerText, Prism.languages[ lang ] );
        $el.innerHTML = src;
        return true;

      }

    } );

  } );

} );
