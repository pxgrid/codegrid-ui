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

  var replace = function ( text ) {

    return text.replace( /50/g, lookup[ 50 ] )
               .replace( /49/g, lookup[ 49 ] )
               .replace( /48/g, lookup[ 48 ] )
               .replace( /47/g, lookup[ 47 ] )
               .replace( /46/g, lookup[ 46 ] )
               .replace( /45/g, lookup[ 45 ] )
               .replace( /44/g, lookup[ 44 ] )
               .replace( /43/g, lookup[ 43 ] )
               .replace( /42/g, lookup[ 42 ] )
               .replace( /41/g, lookup[ 41 ] )
               .replace( /40/g, lookup[ 40 ] )
               .replace( /39/g, lookup[ 39 ] )
               .replace( /38/g, lookup[ 38 ] )
               .replace( /37/g, lookup[ 37 ] )
               .replace( /36/g, lookup[ 36 ] )
               .replace( /35/g, lookup[ 35 ] )
               .replace( /34/g, lookup[ 34 ] )
               .replace( /33/g, lookup[ 33 ] )
               .replace( /32/g, lookup[ 32 ] )
               .replace( /31/g, lookup[ 31 ] )
               .replace( /30/g, lookup[ 30 ] )
               .replace( /29/g, lookup[ 29 ] )
               .replace( /28/g, lookup[ 28 ] )
               .replace( /27/g, lookup[ 27 ] )
               .replace( /26/g, lookup[ 26 ] )
               .replace( /25/g, lookup[ 25 ] )
               .replace( /24/g, lookup[ 24 ] )
               .replace( /23/g, lookup[ 23 ] )
               .replace( /22/g, lookup[ 22 ] )
               .replace( /21/g, lookup[ 21 ] )
               .replace( /20/g, lookup[ 20 ] )
               .replace( /19/g, lookup[ 19 ] )
               .replace( /18/g, lookup[ 18 ] )
               .replace( /17/g, lookup[ 17 ] )
               .replace( /16/g, lookup[ 16 ] )
               .replace( /15/g, lookup[ 15 ] )
               .replace( /14/g, lookup[ 14 ] )
               .replace( /13/g, lookup[ 13 ] )
               .replace( /12/g, lookup[ 12 ] )
               .replace( /11/g, lookup[ 11 ] )
               .replace( /10/g, lookup[ 10 ] )
               .replace( /9/g, lookup[ 9 ] )
               .replace( /8/g, lookup[ 8 ] )
               .replace( /7/g, lookup[ 7 ] )
               .replace( /6/g, lookup[ 6 ] )
               .replace( /5/g, lookup[ 5 ] )
               .replace( /4/g, lookup[ 4 ] )
               .replace( /3/g, lookup[ 3 ] )
               .replace( /2/g, lookup[ 2 ] )
               .replace( /1/g, lookup[ 1 ] )
               .replace( /0/g, lookup[ 0 ] );
  }

  var $inner = document.querySelector( '.CG2-articleSeriesNav__inner' );
  var $clone = $inner.cloneNode( true );

  Array.prototype.forEach.call( $clone.querySelectorAll( 'li' ) , function( $li ) {

    $li.innerText = replace( $li.innerText );

  } );

  $el.replaceChild( $clone, $inner );

} );
