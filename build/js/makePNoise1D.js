var CG2 = CG2 || {};


CG2.makePNoise1D = function () {

  var fade = function () {

    'use asm';

    function fade ( t ) {

      t = +t;
      return t * t * t * ( t * ( 6.0 * t - 15.0 ) + 10.0 );

    }

    return fade;

  }();


  return function ( length, step ) {

    length = length|0;
    step   = step|0;

    var noise = [];
    var gradients = [];

    for ( var i = 0|0; i < length; i = ( i + 1 )|0 ) {

      gradients[ i ] = Math.random() * 2 - 1;

    };


    for ( var t = 0|0; t < step; t = ( t + 1 )|0 ) {

      var x = ( length - 1 ) / ( step - 1 ) * ( t );
      
      var i0 = x|0;
      var i1 = ( i0 + 1 )|0;

      var g0 = gradients[ i0 ];
      var g1 = gradients[ i1 ] || gradients[ i0 ];

      var u0 = x - i0;
      var u1 = u0 - 1;

      var n0 = g0 * u0;
      var n1 = g1 * u1;

      noise.push( n0 * ( 1 - fade( u0 ) ) + n1 * fade( u0 ) );

    }

    return noise;

  }

}();
