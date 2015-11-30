var CG2 = CG2 || {};

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
    this.noise = CG2.makePNoise1D( 32, 512 );

    var grid = new THREE.Points( Logo3D.gridGeometry, Logo3D.gridMaterial );
    this.scene.add( grid );

    for ( var i = 0, l = Logo3D.logoGeometries.length; i < l; i ++ ) {

      var mesh = new THREE.Line( Logo3D.logoGeometries[ i ], Logo3D.lineMaterial );
      mesh.renderOrder = 1;
      mesh.position.y  = 50;
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
          1, 0, 0, -290 - 70 + 40,
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

        var noise = Math.max( this.noise[ ( ( elapsed * 50 )|0 ) % this.noise.length ], 0.05 ) - 0.05;


        Logo3D.lineMaterial.uniforms.time.value = elapsed;
        Logo3D.gridMaterial.uniforms.time.value = elapsed;
        Logo3D.lineMaterial.uniforms.intensity.value = intensity;

        Logo3D.lineMaterial.uniforms.intensity2.value = noise;

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

    [ [ 670 - 40, 0 ], [580 - 40, 0 ], [ 580 - 40, 180 ], [ 670 - 40, 180 ], [ 670 - 40, 80 ] ], //G
    [ [ 760 - 40, 70 ], [720 - 40, 70 ], [ 720 - 40, 180 ] ], //r
    [ [ 800 - 40, 70 ], [800 - 40, 180 ] ], //i
    [ [ 920 - 40, 0 ], [920 - 40, 180 ], [850 - 40, 180 ], [ 850 - 40, 70 ], [ 920 - 40, 70 ] ]//d
  ];


  Logo3D.clock = new THREE.Clock();

///////////////////////////////
// lineMaterial
///////////////////////////////
  Logo3D.lineMaterial = new THREE.ShaderMaterial( {

    vertexShader : [
      'attribute float randomSeeds;',
      'uniform float time;',
      'uniform float intensity;',
      'uniform float intensity2;',

      'void main() {',

        'float waveFactor = 0.0;',

        'if ( randomSeeds != 0.0 ) {',

          'waveFactor = sin( randomSeeds + time * 10. ) * intensity2 * 20.0;',

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
        intensity: { type: 'f', value: 0 },
        intensity2: { type: 'f', value: 0 }
      }
    ] ),
    defines: {},
    fog: true,
    depthTest: false
    // linewidth: 2.0
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
  Logo3D.gridMaterial.uniforms.psColor.value.setRGB( 0.20, 0.20, 0.20 );


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

  function onresize ( event ) {

    var aspect;
    var cameraZ = 600;

    if ( !isSmallScreen() ) {

      this.width  = Math.max( document.documentElement.clientWidth, 1052 );
      this.height = document.documentElement.clientHeight - 120;
      this.linebrake( false );
      aspect = this.width / this.height;

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
