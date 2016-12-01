window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var $el = document.querySelector( '.CG2-articleSeriesNav' );

  if ( !$el ) { return; }

  var lookup = [
    '\uFF10', // 0
    '\uFF11', // 1
    '\uFF12', // 2
    '\uFF13', // 3
    '\uFF14', // 4
    '\uFF15', // 5
    '\uFF16', // 6
    '\uFF17', // 7
    '\uFF18', // 8
    '\uFF19', // 9
    //---
    '\u2469', // (10)
    '\u246A', // (11)
    '\u246B', // (12)
    '\u246C', // (13)
    '\u246D', // (14)
    '\u246E', // (15)
    '\u246F', // (16)
    '\u2470', // (17)
    '\u2471', // (18)
    '\u2472', // (19)
    '\u2473', // (20)
    //---
    '\u3251', // (21)
    '\u3252', // (22)
    '\u3253', // (23)
    '\u3254', // (24)
    '\u3255', // (25)
    '\u3256', // (26)
    '\u3257', // (27)
    '\u3258', // (28)
    '\u3259', // (29)
    '\u325A', // (30)
    '\u325B', // (31)
    '\u325C', // (32)
    '\u325D', // (33)
    '\u325E', // (34)
    '\u325F', // (35)
    //---
    '\u32B1', // (36)
    '\u32B2', // (37)
    '\u32B3', // (38)
    '\u32B4', // (39)
    '\u32B5', // (40)
    '\u32B6', // (41)
    '\u32B7', // (42)
    '\u32B8', // (43)
    '\u32B9', // (44)
    '\u32BA', // (45)
    '\u32BB', // (46)
    '\u32BC', // (47)
    '\u32BD', // (48)
    '\u32BE', // (49)
    '\u32BF'  // (50)
  ];

  var replaceNumber = function () {

    // ”1.5”が"1"と"5"に別れるのを防ぐために小数もマッチさせる
    var _replaceTargetRe = /([0-9]+\.?[0-9]*)/g;
    var _replaceFunc = function ( str, ptn1 ) {

      // Arrayもオブジェクトなので、数値にキャストせずずるく利用する
      return lookup[ptn1] || ptn1;

    };

    return function ( text ) {

      return text.replace( _replaceTargetRe, _replaceFunc );

    }

  }();

  var replaceAbbrWord = function ( text ) {

    return text.replace( /\b([A-Z]+)\b/g, '<abbr>$1</abbr>' );

  }

  var $inner = document.querySelector( '.CG2-articleSeriesNav__inner' );
  var $clone = $inner.cloneNode( true );

  Array.prototype.forEach.call( $clone.querySelectorAll( 'li' ) , function( $li ) {

    var $leaf = $li.querySelector( 'a' ) || $li;

    $leaf.innerHTML = replaceNumber( $leaf.textContent );
    $leaf.innerHTML = replaceAbbrWord( $leaf.textContent );

  } );

  $el.replaceChild( $clone, $inner );

} );
