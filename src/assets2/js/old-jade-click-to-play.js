;( function () {


  //     UNDERSCORE PARTIAL (_.template)
  //
  //     Underscore.js 1.8.3
  //     http://underscorejs.org
  //     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
  //     Underscore may be freely distributed under the MIT license.

  var _ = {};

  // Current version.
  _.VERSION = '1.8.3_partial';

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    //settings = _.defaults({}, settings, _.templateSettings);
    settings = _.templateSettings;

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // -------------------------

  var template = _.template( [
    '<section class="CG2-livecode" <% if ( isDeferredPlay ) { %>data-livecode-deferredplay<% } %> data-livecode-from-oldjade>',
      '<h1><%= title %></h1>',
      '<p><%= text %></p>',
      '<header class="CG2-livecode__header">',
        '<div class="CG2-livecode__nav">',
          '<ul>',
            '<% if ( isDeferredPlay ) { %>',
              '<li><a href="#" data-livecode-play>',
                'サンプルを停止する',
              '</a></li>',
            '<% } %>',
            // '<li><a href="#">',
            //   'ソースコード：<%= fileName %>',
            // '</a></li>',
            '<li><a href="<%= iframeSrc %>" target="_blank">',
              '<span class="CG2-icon-tool"></span> 新規タブで開く',
            '</a></li>',
          '</ul>',
        '</div>',
      '</header>',
      '<div class="CG2-livecode__body">',
        '<iframe ',
          '<% if ( !isDeferredPlay ) { %> src="<%= iframeSrc %>" <% } %> ',
          'data-livecode-src="<%= iframeSrc %>" ',
          'width="<%= iframeWidth %>" ',
          'height="<%= iframeHeight %>" ',
          'allowfullscreen="allowfullscreen" ',
        '></iframe>',
        '<% if ( isDeferredPlay ) { %>',
          '<div class="CG2-livecode__clickToPlay" data-livecode-play></div>',
        '<% } %>',
      '</div>',
    '</section>'
  ].join( '' ) );

  var $div = document.createElement( 'div' );

  var attach = function () {}

  window.addEventListener( 'DOMContentLoaded', function () {

    var $elAll = document.querySelectorAll( 'div.Demo' );

    Array.prototype.forEach.call( $elAll, function( $el ) {

      var $iframe        = $el.querySelector( 'iframe' );
      var $title         = $el.querySelector( 'div.Demo-title' );
      var $text          = $el.querySelector( 'div.Demo-comment' );
      var title          = $title ? $title.innerHTML : '';
      var text           = $text  ? $text.innerHTML  : '';
      var iframeSrc      = $iframe.getAttribute( 'src' );
      var iframeWidth    = $iframe.getAttribute( 'width' );
      var iframeHeight   = $iframe.getAttribute( 'height' );
      var isDeferredPlay = $iframe.getAttribute( 'data-trigger' ) === 'data-trigger';

      var data = {
        title          : title,
        text           : text,
        iframeSrc      : iframeSrc,
        iframeWidth    : iframeWidth,
        iframeHeight   : iframeHeight,
        isDeferredPlay : isDeferredPlay
      }

      var html = template( data );
      $div.innerHTML = html;
      var $livecore = $div.querySelector( '.CG2-livecode' );
      $el.parentNode.replaceChild( $livecore, $el );
      CG2.vent.dispatchEvent( { type: 'livecode-converted', element: $livecore } );

    } );

  } );

} )();
