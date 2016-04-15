// 埋め込みコードの遅延開始
// CGMDから出力された
// 
//   <div class="CG2-livecode" data-livecode-deferred>
//     <header class="CG2-livecode__header">
//       <div class="CG2-livecode__label">
//         DEMOタイトル
//       </div>
//       <div class="CG2-livecode__nav">
//         <ul>
//           <li>
//             <a href="http://example.com/demo.html" target="_blank">
//               <span class="CG2-icon-tool"></span> 新規タブで開く
//             </a>
//           </li>
//         </ul>
//       </div>
//     </header>
//     <div class="CG2-livecode__body">
//       <iframe src="http://example.com/demo.html" data-deferred></iframe>
//     </div>
//   </div>
// 
// を
// 
//   <div class="CG2-livecode" data-livecode-deferred>
//     <header class="CG2-livecode__header">
//       <div class="CG2-livecode__label">
//         DEMOタイトル
//       </div>
//       <div class="CG2-livecode__nav">
//         <ul>
// +         <li>
// +           <a href="#" data-livecode-play>
// +             サンプルを停止する
// +           </a>
// +         </li>
//           <li>
//             <a href="http://example.com/demo.html" target="_blank">
//               <span class="CG2-icon-tool"></span> 新規タブで開く
//             </a>
//           </li>
//         </ul>
//       </div>
//     </header>
//     <div class="CG2-livecode__body">
// +     <iframe data-src="http://example.com/demo.html" data-deferred></iframe>
// +     <div class="CG2-livecode__clickToPlay" data-livecode-play></div>
//     </div>
//   </div>
// 
// にする



window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var fragment = document.createElement( 'div' );
  var modifier = 'CG2-livecode--isRunning';
  var $elAll   = document.querySelectorAll( '.CG2-livecode[data-livecode-deferred]:not( [data-livecode-from-oldjade] )' );

  fragment.innerHTML = '<li><a href="#" data-livecode-play>サンプルを停止する</a></li>';
  var $button = fragment.querySelector( 'li' );

  fragment.innerHTML = '<div class="CG2-livecode__clickToPlay" data-livecode-play></div>';
  var $cover = fragment.querySelector( 'div' );

  var attach   = function( $el ) {

    // build template
    var isCGMD = $el.getAttribute( 'data-livecode-from-oldjade' ) === null;

    if ( isCGMD ) {

      var $navUl = $el.querySelector( '.CG2-livecode__nav ul' );
      $navUl.insertBefore( $button.cloneNode( true ), $navUl.firstElementChild );
      var $body = $el.querySelector( '.CG2-livecode__body' );
      $body.appendChild( $cover.cloneNode( true ) );

    }

    //

    var isRunning = false;
    var $play   = $el.querySelectorAll( '[data-livecode-play]' );
    var $iframe = $el.querySelector( 'iframe' );
    var src = $iframe.src || $iframe.getAttribute( 'data-src' );

    var toggle = function ( e ) {

      e.preventDefault();

      if ( isRunning ) {

        $iframe.removeAttribute( 'src' );
        $el.classList.remove( modifier );
        isRunning = false;

      } else {

        $iframe.setAttribute( 'src', src );
        $el.classList.add( modifier );
        isRunning = true;

      }

    }

    $iframe.removeAttribute( 'src' );

    Array.prototype.forEach.call( $play, function( $item ) {

      $item.addEventListener( 'click', toggle );

    } );

  }

  if ( $elAll.length !== 0 ) {

    Array.prototype.forEach.call( $elAll, attach );
    
  }
  
  CG2.vent.addEventListener( 'livecode-converted', function ( e ) {

    var deferredplay = e.element.getAttribute( 'data-livecode-deferred' ) !== null;

    if ( deferredplay ) { attach( e.element ); }

  } );

} );
