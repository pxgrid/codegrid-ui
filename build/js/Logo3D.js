var CG2 = {};

CG2.Logo3D = ( function () {

  'use strict';

  var BREAK_POINT = 768 - 1;
  var isSmallScreen = function () {

    return window.matchMedia( '(max-width: ' + BREAK_POINT + 'px)' ).matches;

  };

  var isWindowHidden = function () {

     if ( typeof ( document.hidden || document.msHidden || document.webkitHidden ) === 'undefined' ) {

      // if the API is not supported, always returns false
      return false;

     }

     return document.hidden || document.msHidden || document.webkitHidden;

  };

  var isWindowUnfocused = ( function () {

    var isUnfocused = false;
    window.addEventListener( 'focus', function () { isUnfocused = false; } );
    window.addEventListener( 'blur',  function () { isUnfocused = true; } );

    return function () {

      return isUnfocused;

    };

  } )();

  var Logo3D = function ( containerElement ) {

    var that = this;

    this.aspect = new THREE.Vector3( 16, 9 );
    this.height = 1;
    this.width  = 1;

    this.containerElement = containerElement;
    this.scene  = new THREE.Scene();
    this.scene.fog = new THREE.Fog( 0x000000, 600, 1000 );
    this.camera = new THREE.PerspectiveCamera( 60, this.width / this.height , 1, 10000 );
    this.camera.position.set( 0, 0, 600 );
    this.renderer = new THREE.WebGLRenderer();
    // this.renderer.setSize( this.width, this.height );
    this.containerElement.appendChild( this.renderer.domElement );
    this.running = false;
    // this.maxFPS = Infinity;
    // this.lastUpdate = 0;
    this.mousePointer = new THREE.Vector2( 0, 0 );
    this.balance = new THREE.Vector2( 0, 0 );
    this.letterMeshes = [];
    this.isNoWrap = true;

    var grid = new THREE.Points( Logo3D.gridGeometry, Logo3D.gridMaterial );
    this.scene.add( grid );

    for ( var i = 0, l = Logo3D.logoGeometries.length; i < l; i ++ ) {

      var mesh = new THREE.Line( Logo3D.logoGeometries[ i ], Logo3D.lineMaterial );
      mesh.position.y = 50;
      this.scene.add( mesh );
      this.letterMeshes.push( mesh );

    }

    this.onmousemove = onmousemove.bind( this );
    this.onscroll    = onscroll.bind( this );
    this.setSize     = onresize.bind( this );
    this.onvisibleModeChange = onvisibleModeChange.bind( this );

    this.setSize();
    this.onscroll();

    if ( this.isVisible() ) { this.play(); }

    this.containerElement.addEventListener( 'mousemove', this.onmousemove );
    window.addEventListener( 'scroll', this.onscroll );
    window.addEventListener( 'resize', this.setSize );

    window.addEventListener( 'focus', function () { if ( that.isVisible() ) { that.play(); } } );
    window.addEventListener( 'blur',  function () { that.stop(); } );
    window.addEventListener( 'visibilitychange',       this.onvisibleModeChange );
    window.addEventListener( 'mozvisibilitychange',    this.onvisibleModeChange );
    window.addEventListener( 'msvisibilitychange',     this.onvisibleModeChange );
    window.addEventListener( 'webkitvisibilitychange', this.onvisibleModeChange );

  };

  Logo3D.prototype = {

    linebrake: function ( state ) {

      if (
         state && !this.isNoWrap ||
        !state &&  this.isNoWrap
      ) {

        return;

      }

      var m = new THREE.Matrix4();

      if ( state ) {

        m.set(
          1, 0, 0, 290 - 70,
          0, 1, 0, 100,
          0, 0, 1,   0,
          0, 0, 0,   1
        );

        this.letterMeshes[ 0 ].geometry.applyMatrix( m );
        this.letterMeshes[ 1 ].geometry.applyMatrix( m );
        this.letterMeshes[ 2 ].geometry.applyMatrix( m );
        this.letterMeshes[ 3 ].geometry.applyMatrix( m );

        m.set(
          1, 0, 0, -290 - 70,
          0, 1, 0, -100,
          0, 0, 1,    0,
          0, 0, 0,    1
        );
        this.letterMeshes[ 4 ].geometry.applyMatrix( m );
        this.letterMeshes[ 5 ].geometry.applyMatrix( m );
        this.letterMeshes[ 6 ].geometry.applyMatrix( m );
        this.letterMeshes[ 7 ].geometry.applyMatrix( m );

        this.isNoWrap = false;

      } else {
        
        m.set(
          1, 0, 0, -290 + 70,
          0, 1, 0, -100,
          0, 0, 1,    0,
          0, 0, 0,    1
        );

        this.letterMeshes[ 0 ].geometry.applyMatrix( m );
        this.letterMeshes[ 1 ].geometry.applyMatrix( m );
        this.letterMeshes[ 2 ].geometry.applyMatrix( m );
        this.letterMeshes[ 3 ].geometry.applyMatrix( m );

        m.set(
          1, 0, 0,  290 + 70,
          0, 1, 0,  100,
          0, 0, 1,    0,
          0, 0, 0,    1
        );
        this.letterMeshes[ 4 ].geometry.applyMatrix( m );
        this.letterMeshes[ 5 ].geometry.applyMatrix( m );
        this.letterMeshes[ 6 ].geometry.applyMatrix( m );
        this.letterMeshes[ 7 ].geometry.applyMatrix( m );

        this.isNoWrap = true;

      }

    },

    play: function () {

      if ( this.running ) { return; }

      this.running = true;
      this.animate();

    },

    stop: function () {

      this.running = false;

    },

    intro: function () {

      requestAnimationFrame( this.intro.bind( this ) );

    },

    animate: ( function () {

      var maxRotateX = THREE.Math.degToRad( 40 );
      var maxRotateY = THREE.Math.degToRad( 75 );

      return function () {

        if ( !this.running ) { return; }

        // console.log( 'running' );

        requestAnimationFrame( this.animate.bind( this ) );

        this.balance.x += ( -this.mousePointer.y - this.balance.x ) * 0.1;
        this.balance.y += (  this.mousePointer.x - this.balance.y ) * 0.1;

        var that = this;
        var elapsed = Logo3D.clock.getElapsedTime();
        var intensity = 0;

        this.scene.children.forEach( function ( mesh ) {

          mesh.rotation.set(
            that.balance.x * maxRotateX,
            that.balance.y * maxRotateY,
            0
          );

        } );

        var cameraPosition = this.camera.position.clone();
        var viewMatrix = this.scene.children[ 0 ].matrixWorld;
        var viewMatrixInverse = new THREE.Matrix4().getInverse( viewMatrix );

        var viewNormal = cameraPosition.applyMatrix4( viewMatrixInverse ).normalize();
        intensity = 1 - Math.abs( viewNormal.z );


        Logo3D.lineMaterial.uniforms.time.value = elapsed;
        Logo3D.gridMaterial.uniforms.time.value = elapsed;
        Logo3D.lineMaterial.uniforms.intensity.value = intensity;

        this.renderer.render( this.scene, this.camera );

      }

    } )(),

    isVisible: function () {

      var bb = this.containerElement.getBoundingClientRect();
      return !( window.innerHeight < bb.top || 0 > bb.bottom );

    },

    dispose: function () {

      // this.scene.remove( mesh );
      this.containerElement.removeEventListener( 'mousemove', this.onmousemove );
      window.removeEventListener( 'scroll', this.onscroll );
      window.removeEventListener( 'resize', this.setSize );

    }

  };



  // SVG の polyline 要素の points 属性を配列にしてロゴ部分に使う
  // 1グリッドはSVG内で10刻み
  Logo3D.SVGPolylines = [
    [ [ 90, 0 ], [ 0, 0 ], [ 0, 180 ], [ 90, 180 ] ], // C
    [ [ 140, 70 ], [ 230, 70 ], [ 230, 180 ], [ 140, 180 ], [ 140, 70 ] ], // o
    [ [ 350, 0 ], [ 350, 180 ], [ 280, 180 ], [ 280, 70 ], [ 350, 70 ] ],  // d
    [ [ 400, 120 ], [ 490, 120 ], [ 490, 70 ], [ 400, 70 ], [ 400, 180 ], [ 490, 180 ] ], // e

    [ [ 670, 0 ], [580, 0 ], [ 580, 180 ], [ 670, 180 ], [ 670, 80 ] ], //G
    [ [ 760, 70 ], [720, 70 ], [ 720, 180 ] ], //r
    [ [ 800, 70 ], [800, 180 ] ], //i
    [ [ 920, 0 ], [920, 180 ], [850, 180 ], [ 850, 70 ], [ 920, 70 ] ]//d
  ];

  // LOGO C
  // Logo3D.SVGPolylines = [
  //   [ [90, 0 ], [ 80, 0 ], [ 70, 0 ], [ 60, 0 ], [ 50, 0 ], [ 40, 0 ], [ 30, 0 ], [ 20, 10 ], [ 10, 20 ], [ 0, 30 ], [ 0, 40 ], [ 0, 50 ], [ 0, 60 ], [ 0, 70 ], [ 0, 80 ], [ 0, 90 ], [ 0, 100 ], [ 0, 110 ], [ 0, 120 ], [ 0, 130 ], [ 0, 140 ], [ 0, 150 ], [ 10, 160 ], [ 20, 170 ], [ 30, 180 ], [ 40, 180 ], [ 50, 180 ], [ 60, 180 ], [ 70, 180 ], [ 80, 180 ], [ 90, 180 ] ],
  //   [ [170, 70 ], [ 180, 70 ], [ 190, 70 ], [ 200, 70 ], [ 210, 80 ], [ 220, 90 ], [ 230, 100 ], [ 230, 110 ], [ 230, 120 ], [ 230, 130 ], [ 230, 140 ], [ 230, 150 ], [ 220, 160 ], [ 210, 170 ], [ 200, 180 ], [ 190, 180 ], [ 180, 180 ], [ 170, 180 ], [ 160, 170 ], [ 150, 160 ], [ 140, 150 ], [ 140, 140 ], [ 140, 130 ], [ 140, 120 ], [ 140, 110 ], [ 140, 100 ], [ 150, 90 ], [ 160, 80 ], [ 170, 70 ], [ 170, 70 ] ],
  //   [ [350, 0 ], [ 350, 10 ], [ 350, 20 ], [ 350, 30 ], [ 350, 40 ], [ 350, 50 ], [ 350, 60 ], [ 350, 70 ], [ 350, 80 ], [ 350, 90 ], [ 350, 100 ], [ 350, 110 ], [ 350, 120 ], [ 350, 130 ], [ 350, 140 ], [ 350, 150 ], [ 350, 160 ], [ 350, 170 ], [ 350, 180 ], [ 340, 180 ], [ 330, 180 ], [ 320, 180 ], [ 310, 180 ], [ 300, 170 ], [ 290, 160 ], [ 280, 150 ], [ 280, 140 ], [ 280, 130 ], [ 280, 120 ], [ 280, 110 ], [ 280, 100 ], [ 290, 90 ], [ 300, 80 ], [ 310, 70 ], [ 320, 70 ], [ 330, 70 ], [ 340, 70 ], [ 350, 70 ] ],
  //   [ [490, 140 ], [ 490, 150 ], [ 480, 160 ], [ 470, 170 ], [ 460, 180 ], [ 450, 180 ], [ 440, 180 ], [ 430, 180 ], [ 420, 170 ], [ 410, 160 ], [ 400, 150 ], [ 400, 140 ], [ 400, 130 ], [ 400, 120 ], [ 400, 110 ], [ 400, 100 ], [ 410, 90 ], [ 420, 80 ], [ 430, 70 ], [ 440, 70 ], [ 450, 70 ], [ 460, 70 ], [ 470, 80 ], [ 480, 90 ], [ 490, 100 ], [ 490, 110 ], [ 480, 110 ], [ 470, 110 ], [ 460, 110 ], [ 450, 110 ], [ 440, 110 ], [ 430, 110 ], [ 420, 110 ], [ 410, 110 ], [ 400, 110 ] ],
  //   [ [670, 0 ], [ 660, 0 ], [ 650, 0 ], [ 640, 0 ], [ 630, 0 ], [ 620, 0 ], [ 610, 0 ], [ 600, 10 ], [ 590, 20 ], [ 580, 30 ], [ 580, 40 ], [ 580, 50 ], [ 580, 60 ], [ 580, 70 ], [ 580, 80 ], [ 580, 90 ], [ 580, 100 ], [ 580, 110 ], [ 580, 120 ], [ 580, 130 ], [ 580, 140 ], [ 580, 150 ], [ 590, 160 ], [ 600, 170 ], [ 610, 180 ], [ 620, 180 ], [ 630, 180 ], [ 640, 180 ], [ 650, 180 ], [ 660, 180 ], [ 670, 180 ], [ 670, 170 ], [ 670, 160 ], [ 670, 150 ], [ 670, 140 ], [ 670, 130 ], [ 670, 120 ], [ 670, 110 ], [ 670, 100 ], [ 670, 90 ], [ 660, 90 ], [ 650, 90 ], [ 640, 90 ], [ 630, 90 ] ],
  //   [ [720, 70 ], [ 720, 80 ], [ 720, 90 ], [ 720, 100 ], [ 720, 110 ], [ 720, 120 ], [ 720, 130 ], [ 720, 140 ], [ 720, 150 ], [ 720, 160 ], [ 720, 170 ], [ 720, 180 ] ],
  //   [ [760, 70 ], [ 750, 70 ], [ 740, 80 ], [ 730, 90 ], [ 720, 100 ] ],
  //   [ [800, 70 ], [ 800, 80 ], [ 800, 90 ], [ 800, 100 ], [ 800, 110 ], [ 800, 120 ], [ 800, 130 ], [ 800, 140 ], [ 800, 150 ], [ 800, 160 ], [ 800, 170 ], [ 800, 180 ] ],
  //   [ [920, 0 ], [ 920, 10 ], [ 920, 20 ], [ 920, 30 ], [ 920, 40 ], [ 920, 50 ], [ 920, 60 ], [ 920, 70 ], [ 920, 80 ], [ 920, 90 ], [ 920, 100 ], [ 920, 110 ], [ 920, 120 ], [ 920, 130 ], [ 920, 140 ], [ 920, 150 ], [ 920, 160 ], [ 920, 170 ], [ 920, 180 ], [ 910, 180 ], [ 900, 180 ], [ 890, 180 ], [ 880, 180 ], [ 870, 170 ], [ 860, 160 ], [ 850, 150 ], [ 850, 140 ], [ 850, 130 ], [ 850, 120 ], [ 850, 110 ], [ 850, 100 ], [ 860, 90 ], [ 870, 80 ], [ 880, 70 ], [ 890, 70 ], [ 900, 70 ], [ 910, 70 ], [ 920, 70 ] ]
  // ];


  // // LOGO B
  // Logo3D.SVGPolylines = [
  //   [ [90, 0 ], [ 80, 0 ], [ 70, 0 ], [ 60, 0 ], [ 50, 0 ], [ 40, 0 ], [ 30, 0 ] ],
  //   [ [90, 180 ], [ 80, 180 ], [ 70, 180 ], [ 60, 180 ], [ 50, 180 ], [ 40, 180 ], [ 30, 180 ] ],
  //   [ [100, 10 ], [ 90, 10 ], [ 80, 10 ], [ 70, 10 ], [ 60, 10 ], [ 50, 10 ], [ 40, 10 ], [ 30, 10 ], [ 20, 10 ] ],
  //   [ [90, 170 ], [ 90, 170 ], [ 80, 170 ], [ 70, 170 ], [ 60, 170 ], [ 50, 170 ], [ 40, 170 ], [ 30, 170 ], [ 20, 170 ] ],
  //   [ [20, 20 ], [ 10, 20 ] ],
  //   [ [20, 160 ], [ 10, 160 ] ],
  //   [ [10, 30 ], [ 0, 30 ] ],
  //   [ [10, 40 ], [ 0, 40 ] ],
  //   [ [10, 50 ], [ 0, 50 ] ],
  //   [ [10, 60 ], [ 0, 60 ] ],
  //   [ [10, 70 ], [ 0, 70 ] ],
  //   [ [200, 70 ], [ 190, 70 ], [ 180, 70 ], [ 170, 70 ] ],
  //   [ [350, 70 ], [ 340, 70 ], [ 330, 70 ], [ 320, 70 ], [ 310, 70 ] ],
  //   [ [350, 180 ], [ 340, 180 ], [ 330, 180 ], [ 320, 180 ], [ 310, 180 ] ],
  //   [ [200, 180 ], [ 190, 180 ], [ 180, 180 ], [ 170, 180 ] ],
  //   [ [210, 80 ], [ 200, 80 ], [ 190, 80 ], [ 180, 80 ], [ 170, 80 ], [ 160, 80 ] ],
  //   [ [460, 70 ], [ 450, 70 ], [ 440, 70 ], [ 430, 70 ] ],
  //   [ [470, 80 ], [ 460, 80 ], [ 450, 80 ], [ 440, 80 ], [ 430, 80 ], [ 420, 80 ] ],
  //   [ [350, 80 ], [ 340, 80 ], [ 330, 80 ], [ 320, 80 ], [ 310, 80 ], [ 300, 80 ] ],
  //   [ [490, 110 ], [ 480, 110 ], [ 470, 110 ], [ 460, 110 ], [ 450, 110 ], [ 440, 110 ], [ 430, 110 ], [ 420, 110 ], [ 410, 110 ], [ 400, 110 ] ],
  //   [ [350, 170 ], [ 340, 170 ], [ 330, 170 ], [ 320, 170 ], [ 310, 170 ], [ 300, 170 ] ],
  //   [ [210, 170 ], [ 200, 170 ], [ 190, 170 ], [ 180, 170 ], [ 170, 170 ], [ 160, 170 ] ],
  //   [ [10, 80 ], [ 0, 80 ] ],
  //   [ [10, 90 ], [ 0, 90 ] ],
  //   [ [160, 90 ], [ 150, 90 ] ],
  //   [ [300, 90 ], [ 290, 90 ] ],
  //   [ [420, 90 ], [ 410, 90 ] ],
  //   [ [410, 100 ], [ 400, 100 ] ],
  //   [ [490, 100 ], [ 480, 100 ] ],
  //   [ [480, 90 ], [ 470, 90 ] ],
  //   [ [350, 90 ], [ 340, 90 ] ],
  //   [ [720, 70 ], [ 710, 70 ] ],
  //   [ [800, 70 ], [ 790, 70 ] ],
  //   [ [800, 80 ], [ 790, 80 ] ],
  //   [ [800, 90 ], [ 790, 90 ] ],
  //   [ [800, 100 ], [ 790, 100 ] ],
  //   [ [800, 110 ], [ 790, 110 ] ],
  //   [ [800, 120 ], [ 790, 120 ] ],
  //   [ [800, 130 ], [ 790, 130 ] ],
  //   [ [800, 140 ], [ 790, 140 ] ],
  //   [ [800, 150 ], [ 790, 150 ] ],
  //   [ [800, 160 ], [ 790, 160 ] ],
  //   [ [800, 170 ], [ 790, 170 ] ],
  //   [ [800, 180 ], [ 790, 180 ] ],
  //   [ [720, 80 ], [ 710, 80 ] ],
  //   [ [720, 90 ], [ 710, 90 ] ],
  //   [ [740, 90 ], [ 730, 90 ] ],
  //   [ [750, 80 ], [ 740, 80 ] ],
  //   [ [760, 70 ], [ 750, 70 ] ],
  //   [ [730, 100 ], [ 720, 100 ], [ 710, 100 ] ],
  //   [ [720, 110 ], [ 710, 110 ] ],
  //   [ [720, 120 ], [ 710, 120 ] ],
  //   [ [720, 130 ], [ 710, 130 ] ],
  //   [ [720, 140 ], [ 710, 140 ] ],
  //   [ [720, 150 ], [ 710, 150 ] ],
  //   [ [720, 160 ], [ 710, 160 ] ],
  //   [ [720, 170 ], [ 710, 170 ] ],
  //   [ [720, 180 ], [ 710, 180 ] ],
  //   [ [350, 60 ], [ 340, 60 ] ],
  //   [ [350, 50 ], [ 340, 50 ] ],
  //   [ [350, 40 ], [ 340, 40 ] ],
  //   [ [350, 30 ], [ 340, 30 ] ],
  //   [ [350, 20 ], [ 340, 20 ] ],
  //   [ [350, 10 ], [ 340, 10 ] ],
  //   [ [350, 0 ], [ 340, 0 ] ],
  //   [ [350, 100 ], [ 340, 100 ] ],
  //   [ [350, 110 ], [ 340, 110 ] ],
  //   [ [350, 120 ], [ 340, 120 ] ],
  //   [ [350, 130 ], [ 340, 130 ] ],
  //   [ [350, 140 ], [ 340, 140 ] ],
  //   [ [350, 150 ], [ 340, 150 ] ],
  //   [ [350, 160 ], [ 340, 160 ] ],
  //   [ [300, 160 ], [ 290, 160 ] ],
  //   [ [290, 100 ], [ 280, 100 ] ],
  //   [ [290, 110 ], [ 280, 110 ] ],
  //   [ [290, 120 ], [ 280, 120 ] ],
  //   [ [290, 130 ], [ 280, 130 ] ],
  //   [ [290, 140 ], [ 280, 140 ] ],
  //   [ [290, 150 ], [ 280, 150 ] ],
  //   [ [920, 70 ], [ 910, 70 ], [ 900, 70 ], [ 890, 70 ], [ 880, 70 ] ],
  //   [ [920, 180 ], [ 910, 180 ], [ 900, 180 ], [ 890, 180 ], [ 880, 180 ] ],
  //   [ [920, 80 ], [ 910, 80 ], [ 900, 80 ], [ 890, 80 ], [ 880, 80 ], [ 870, 80 ] ],
  //   [ [920, 170 ], [ 910, 170 ], [ 900, 170 ], [ 890, 170 ], [ 880, 170 ], [ 870, 170 ] ],
  //   [ [870, 90 ], [ 860, 90 ] ],
  //   [ [920, 90 ], [ 910, 90 ] ],
  //   [ [920, 60 ], [ 910, 60 ] ],
  //   [ [920, 50 ], [ 910, 50 ] ],
  //   [ [920, 40 ], [ 910, 40 ] ],
  //   [ [920, 30 ], [ 910, 30 ] ],
  //   [ [920, 20 ], [ 910, 20 ] ],
  //   [ [920, 10 ], [ 910, 10 ] ],
  //   [ [920, 0 ], [ 910, 0 ] ],
  //   [ [920, 100 ], [ 910, 100 ] ],
  //   [ [920, 110 ], [ 910, 110 ] ],
  //   [ [920, 120 ], [ 910, 120 ] ],
  //   [ [920, 130 ], [ 910, 130 ] ],
  //   [ [920, 140 ], [ 910, 140 ] ],
  //   [ [920, 150 ], [ 910, 150 ] ],
  //   [ [920, 160 ], [ 910, 160 ] ],
  //   [ [870, 160 ], [ 860, 160 ] ],
  //   [ [860, 100 ], [ 850, 100 ] ],
  //   [ [860, 110 ], [ 850, 110 ] ],
  //   [ [860, 120 ], [ 850, 120 ] ],
  //   [ [860, 130 ], [ 850, 130 ] ],
  //   [ [860, 140 ], [ 850, 140 ] ],
  //   [ [860, 150 ], [ 850, 150 ] ],
  //   [ [220, 90 ], [ 210, 90 ] ],
  //   [ [160, 160 ], [ 150, 160 ] ],
  //   [ [220, 160 ], [ 210, 160 ] ],
  //   [ [150, 100 ], [ 140, 100 ] ],
  //   [ [150, 110 ], [ 140, 110 ] ],
  //   [ [150, 120 ], [ 140, 120 ] ],
  //   [ [150, 130 ], [ 140, 130 ] ],
  //   [ [150, 140 ], [ 140, 140 ] ],
  //   [ [150, 150 ], [ 140, 150 ] ],
  //   [ [230, 100 ], [ 220, 100 ] ],
  //   [ [230, 110 ], [ 220, 110 ] ],
  //   [ [230, 120 ], [ 220, 120 ] ],
  //   [ [230, 130 ], [ 220, 130 ] ],
  //   [ [230, 140 ], [ 220, 140 ] ],
  //   [ [230, 150 ], [ 220, 150 ] ],
  //   [ [10, 100 ], [ 0, 100 ] ],
  //   [ [10, 110 ], [ 0, 110 ] ],
  //   [ [10, 120 ], [ 0, 120 ] ],
  //   [ [10, 130 ], [ 0, 130 ] ],
  //   [ [10, 140 ], [ 0, 140 ] ],
  //   [ [10, 150 ], [ 0, 150 ] ],
  //   [ [670, 0 ], [ 660, 0 ], [ 650, 0 ], [ 640, 0 ], [ 630, 0 ], [ 620, 0 ], [ 610, 0 ] ],
  //   [ [670, 180 ], [ 660, 180 ], [ 650, 180 ], [ 640, 180 ], [ 630, 180 ], [ 620, 180 ], [ 610, 180 ] ],
  //   [ [670, 10 ], [ 660, 10 ], [ 650, 10 ], [ 640, 10 ], [ 630, 10 ], [ 620, 10 ], [ 610, 10 ], [ 600, 10 ] ],
  //   [ [670, 170 ], [ 660, 170 ], [ 650, 170 ], [ 640, 170 ], [ 630, 170 ], [ 620, 170 ], [ 610, 170 ], [ 600, 170 ] ],
  //   [ [600, 20 ], [ 590, 20 ] ],
  //   [ [600, 160 ], [ 590, 160 ] ],
  //   [ [670, 160 ], [ 660, 160 ] ],
  //   [ [670, 150 ], [ 660, 150 ] ],
  //   [ [670, 140 ], [ 660, 140 ] ],
  //   [ [670, 130 ], [ 660, 130 ] ],
  //   [ [670, 120 ], [ 660, 120 ] ],
  //   [ [670, 110 ], [ 660, 110 ] ],
  //   [ [670, 100 ], [ 660, 100 ], [ 650, 100 ], [ 640, 100 ], [ 630, 100 ] ],
  //   [ [670, 90 ], [ 660, 90 ], [ 650, 90 ], [ 640, 90 ], [ 630, 90 ] ],
  //   [ [590, 30 ], [ 580, 30 ] ],
  //   [ [590, 40 ], [ 580, 40 ] ],
  //   [ [590, 50 ], [ 580, 50 ] ],
  //   [ [590, 60 ], [ 580, 60 ] ],
  //   [ [590, 70 ], [ 580, 70 ] ],
  //   [ [590, 80 ], [ 580, 80 ] ],
  //   [ [590, 90 ], [ 580, 90 ] ],
  //   [ [590, 100 ], [ 580, 100 ] ],
  //   [ [590, 110 ], [ 580, 110 ] ],
  //   [ [590, 120 ], [ 580, 120 ] ],
  //   [ [590, 130 ], [ 580, 130 ] ],
  //   [ [590, 140 ], [ 580, 140 ] ],
  //   [ [590, 150 ], [ 580, 150 ] ],
  //   [ [490, 120 ], [ 480, 120 ], [ 470, 120 ], [ 460, 120 ], [ 450, 120 ], [ 440, 120 ], [ 430, 120 ], [ 420, 120 ], [ 410, 120 ], [ 400, 120 ] ],
  //   [ [410, 130 ], [ 400, 130 ] ],
  //   [ [410, 140 ], [ 400, 140 ] ],
  //   [ [410, 150 ], [ 400, 150 ] ],
  //   [ [490, 150 ], [ 480, 150 ] ],
  //   [ [490, 140 ], [ 480, 140 ] ],
  //   [ [420, 160 ], [ 410, 160 ] ],
  //   [ [480, 160 ], [ 470, 160 ] ],
  //   [ [470, 170 ], [ 460, 170 ], [ 450, 170 ], [ 440, 170 ], [ 430, 170 ], [ 420, 170 ] ],
  //   [ [460, 180 ], [ 450, 180 ], [ 440, 180 ], [ 430, 180 ] ]
  // ];


  Logo3D.clock = new THREE.Clock();

///////////////////////////////
// lineMaterial
///////////////////////////////
  Logo3D.lineMaterial = new THREE.ShaderMaterial( {

    vertexShader : [
      'attribute float randomSeeds;',
      'uniform float time;',
      'uniform float intensity;',

      'void main() {',

        'float waveFactor = 0.0;',

        'if ( randomSeeds != 0.0 ) {',

          'waveFactor = sin( randomSeeds + time * 10. ) * intensity * 4.0;',

        '}',

        'vec3 pos = vec3( position.x + waveFactor, position.y + waveFactor, position.z * intensity * 8.0 );',
        'vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );',
        'gl_Position = projectionMatrix * mvPosition;',

      '}'
    ].join( '\n' ),

    fragmentShader: [
      'uniform vec3 diffuse;',

      THREE.ShaderChunk[ 'common' ],
      THREE.ShaderChunk[ 'fog_pars_fragment' ],

      'void main() {',

      ' vec3 outgoingLight = diffuse;',
        THREE.ShaderChunk[ 'fog_fragment' ],
      ' gl_FragColor = vec4( outgoingLight, 1.0 );',

      '}'
    ].join( '\n' ),

    uniforms: THREE.UniformsUtils.merge( [
      THREE.UniformsLib[ 'common' ],
      THREE.UniformsLib[ 'fog' ],
      {
        time: { type: 'f', value: 0 },
        intensity: { type: 'f', value: 0 }
      }
    ] ),

    defines: {},
    fog: true,
    linewidth: 2.0
  } );

  Logo3D.lineMaterial.uniforms.diffuse.value.setRGB( 0.5, 0.5, 0.5 );

///////////////////////////////
// gridMaterial
///////////////////////////////
  Logo3D.gridMaterial = new THREE.ShaderMaterial( {

    vertexShader : [
      'attribute float rand;',
      'uniform float size;',
      'uniform float scale;',
      'uniform float time;',

      'void main() {',

        'float z = sin( rand * 3.1415 + time * 3.0 ) * scale * 0.5;',
        'vec4 mvPosition = modelViewMatrix * vec4( position.xy, z, 1.0 );',
        'gl_PointSize = size * ( scale / length( mvPosition.xyz ) );',
        'gl_Position = projectionMatrix * mvPosition;',

      '}'
    ].join( '\n' ),

    fragmentShader: [
      'uniform vec3 psColor;',
      THREE.ShaderChunk[ 'fog_pars_fragment' ],

      'void main() {',

        'vec3 outgoingLight = vec3( 0.0 );',
        'vec4 diffuseColor = vec4( psColor, 1.0 );',
        'outgoingLight = diffuseColor.rgb;',
        THREE.ShaderChunk[ 'fog_fragment' ],
        'gl_FragColor = vec4( outgoingLight, 1.0 );',

      '}'
    ].join('\n'),

    uniforms: THREE.UniformsUtils.merge( [
      THREE.UniformsLib[ 'points' ],
      {
        time: { type: 'f', value: 0 },
        intensity: { type: 'f', value: 0 }
      }
    ] ),

    defines: {},
    fog: true,

  } );

  Logo3D.gridMaterial.uniforms.size.value = 100;
  Logo3D.gridMaterial.uniforms.scale.value = 0.8 * 10;
  Logo3D.gridMaterial.uniforms.psColor.value.setRGB( 0.15, 0.15, 0.15 );


///////////////////////////////
// grid geometry
///////////////////////////////
  Logo3D.gridGeometry = ( function () {

    var GRID_WIDTH   = 160;
    var GRID_HEIGHT  = 60;
    var GRID_STEP    = 10;
    var GRID_STEP_HALF = GRID_STEP * 0.5;
    var i, l, posV, posH;
    var gridGeometry = new THREE.BufferGeometry();
    var position     = [];
    var rand         = [];
    var vertexBuffer, randBuffer;

    for ( i = 0, l = GRID_WIDTH * GRID_HEIGHT; i < l; i ++ ) {

      posV = ( ( i / GRID_HEIGHT )|0 ) * GRID_STEP - GRID_WIDTH  * GRID_STEP_HALF;
      // posV = ( ( i / GRID_HEIGHT )|0 ) * GRID_STEP - GRID_WIDTH  * GRID_STEP_HALF + GRID_STEP_HALF;
      // posH = i % GRID_HEIGHT           * GRID_STEP - GRID_HEIGHT * GRID_STEP_HALF;
      posH = i % GRID_HEIGHT           * GRID_STEP - GRID_HEIGHT * GRID_STEP_HALF + GRID_STEP_HALF;
      position.push( posV, posH , 0 );
      rand.push( Math.random() );

    }

    vertexBuffer = new THREE.BufferAttribute( new Float32Array( position ), 3 );
    randBuffer   = new THREE.BufferAttribute( new Float32Array( rand ),     1 );
    gridGeometry.addAttribute( 'position', vertexBuffer );
    gridGeometry.addAttribute( 'rand',     randBuffer );

    return gridGeometry;

  } )();



///////////////////////////////
// logo geometry
///////////////////////////////
  Logo3D.logoGeometries = ( function () {

    var NUM_OF_LAYERS = 3;
    var geometries = [];
    var createLinePoints = function ( start, end ) {

      var gridStep = 1;
      var randMin  = gridStep * 4;
      var randMax  = gridStep * 8;
      var line     = new THREE.Line3( start, end );
      var length   = line.distance();
      var points   = [ start.x, start.y, start.z ];
      var randomSeeds = [ 0 ];
      var totalDistance = 0;
      var rand, distance, point;

      while ( length - randMax > totalDistance ) {

        rand = THREE.Math.randFloat( randMin, randMax );
        distance = rand;
        totalDistance += distance;
        point = line.at( totalDistance / length );
        points.push( point.x, point.y, point.z );
        randomSeeds.push( rand );

      }

      points.push( end.x, end.y, end.z );
      randomSeeds.push( 0 );

      return {
        points: points,
        randomSeeds: randomSeeds
      };

    };

    // SVGの座標系は左上が原点
    // これをWebGLの座標系に変換しつつ、
    // センタリング
    var polylinesToCoords = function ( polylines ) {

      var i, ii, l, ll;
      var x, y;
      var coords = [];
      var boundingBox = ( function () {

        var i, ii, l, ll;
        var boundingBox = new THREE.Box2();

        for ( i = 0, l = polylines.length; i < l; i ++ ) {

          for ( ii = 0, ll = polylines[ i ].length; ii < ll; ii ++ ) {

            boundingBox.min.x = Math.min( boundingBox.min.x, polylines[ i ][ ii ][ 0 ] );
            boundingBox.min.y = Math.min( boundingBox.min.y, polylines[ i ][ ii ][ 1 ] );
            boundingBox.max.x = Math.max( boundingBox.max.x, polylines[ i ][ ii ][ 0 ] );
            boundingBox.max.y = Math.max( boundingBox.max.y, polylines[ i ][ ii ][ 1 ] );

          }

        }

        return boundingBox;

      } )();

      var center = boundingBox.center();

      for ( i = 0, l = polylines.length; i < l; i ++ ) {

        coords.push( [] );

        for ( ii = 0, ll = polylines[ i ].length; ii < ll; ii ++ ) {

          x =    polylines[ i ][ ii ][ 0 ] - center.x;
          y = -( polylines[ i ][ ii ][ 1 ] - center.y );
          coords[ i ].push( new THREE.Vector3( x, y ) );

        }

      }

      return coords;

    };

    var i, ii, iii;
    var coords = polylinesToCoords( Logo3D.SVGPolylines );
    var vertices, randomSeeds;
    var isReverse;
    var lineStart, lineEnd;
    var lineStartX, lineStartY, lineEndX, lineEndY;
    var linePoints;
    var geometry;
    var vertexBuffer, randomSeedsBuffer;

    for ( i = 0; i < coords.length; i ++ ) {

      vertices = [];
      randomSeeds  = [];

      for ( ii = 0; ii < NUM_OF_LAYERS; ii ++ ) {

        for ( iii = 0; iii < coords[ i ].length - 1; iii ++ ) {

          isReverse = ( ii % 2 === 1 );

          lineStartX = !isReverse ? coords[ i ][ iii ].x : coords[ i ][ coords[ i ].length - iii - 1 ].x;
          lineStartY = !isReverse ? coords[ i ][ iii ].y : coords[ i ][ coords[ i ].length - iii - 1 ].y;
          lineEndX   = !isReverse ? coords[ i ][ iii + 1 ].x : coords[ i ][ coords[ i ].length - iii - 2 ].x;
          lineEndY   = !isReverse ? coords[ i ][ iii + 1 ].y : coords[ i ][ coords[ i ].length - iii - 2 ].y;

          lineStart = new THREE.Vector3( lineStartX, lineStartY, ii * 2 - 2 );
          lineEnd   = new THREE.Vector3( lineEndX,   lineEndY,   ii * 2 - 2 );

          linePoints = createLinePoints( lineStart, lineEnd );
          vertices = vertices.concat( linePoints.points );
          randomSeeds  = randomSeeds.concat( linePoints.randomSeeds );

        }

      }

      vertexBuffer      = new THREE.BufferAttribute( new Float32Array( vertices ),    3 );
      randomSeedsBuffer = new THREE.BufferAttribute( new Float32Array( randomSeeds ), 1 );
      geometry = new THREE.BufferGeometry();
      geometry.addAttribute( 'position',    vertexBuffer );
      geometry.addAttribute( 'randomSeeds', randomSeedsBuffer );
      geometries.push( geometry );

    }

    return geometries;

  } )();


  function onmousemove ( event ) {

    var bb = this.containerElement.getBoundingClientRect();
    var x =  ( ( event.clientX - bb.left ) / this.width  ) * 2 - 1;
    var y = -( ( event.clientY - bb.top  ) / this.height ) * 2 + 1;
    this.mousePointer.set( x, y );

  };

  function onvisibleModeChange ( event ) {

    if ( isWindowHidden() ) {

      this.stop();
      return;

    }

    if ( that.isVisible() ) {

      this.play();
      return;

    }

  };

  var _5_6 = 5 / 6;
  var _3_1 = 3 / 1;

  function onresize ( event ) {

    var aspect;
    var cameraZ = 600;

    if ( !isSmallScreen() ) {

      this.width  = Math.max( document.documentElement.clientWidth, 1052 );
      this.height = document.documentElement.clientHeight - 120;
      this.linebrake( false );
      aspect = this.width / this.height;

      if ( aspect <= _3_1 ) {

        cameraZ = ( aspect * 1.1 ) * cameraZ;

      }

    } else {

      this.width  = document.documentElement.clientWidth;
      this.height = document.documentElement.clientHeight - 30;
      this.linebrake( true );
      aspect = this.width / this.height;

      if ( aspect <= _5_6 ) {

        cameraZ = ( 2 - aspect ) * ( 2 - aspect ) * cameraZ;

      }


    }

    this.renderer.setSize( this.width, this.height );
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    
    this.containerElement.style.width  = this.width  + 'px';
    this.containerElement.style.height = this.height + 'px';

    this.scene.fog.near = cameraZ;
    this.scene.fog.far  = cameraZ + 400;
    this.camera.position.z = cameraZ;

  };

  function onscroll ( event ) {

    if ( this.isVisible() && !isWindowUnfocused() ) {

      this.play();
      return;

    } else {

      this.stop();
      return;

    }

  };

  return Logo3D;

} )();


( function () {

  var header    = document.querySelector( '.CG2-pageHeader' );
  var logo3d    = document.querySelector( '.CG2-logo3d' );
  var clickable = logo3d.querySelector( '.CG2-logo3d__overlayText' );

  var cubicOut = function ( t ) {

    var f = t - 1.0;
    return f * f * f + 1.0;

  }

  var scroll = function () {

    var top  = ( document.documentElement && document.documentElement.scrollTop )  || document.body.scrollTop;
    var left = ( document.documentElement && document.documentElement.scrollLeft ) || document.body.scrollLeft;
    var headerH = header.clientHeight;
    var y = logo3d.clientHeight;
    var distanceY = y - headerH - top;
    var progress = 0;

    ( function animation () {

      if  ( 1 <= progress ) { return; }

      requestAnimationFrame( animation );

      window.scrollTo( left, top + distanceY * cubicOut( progress ) );

      progress += 0.03;

    } )();

  }

  clickable.addEventListener( 'click', scroll );

} )();
