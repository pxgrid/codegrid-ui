window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var CLASS_NAME_CURRENT_TAB = 'CG2-compactNav__item--current';
  var SELECTOR_CURRENT_TAB = '.' + CLASS_NAME_CURRENT_TAB;
  var ATTR_NAME_CURRENT_PANE = 'data-cg2-tab-pane';
  var SELECTOR_CURRENT_PANE = '[' + ATTR_NAME_CURRENT_PANE + '="current"]';

  var i, l;
  var $tabs = document.querySelectorAll( '[data-cg2-tab-button]' );

  if ( $tabs.length === 0 ) { return; }

  // elementMatches(element, selector)
  // Element.matches for unsupported browsers
  var elementMatches = function () {

    var proto = Element.prototype;
    var matches = proto.matches = proto.msMatchesSelector || proto.webkitMatchesSelector;

    return function( element, selector ) {

      return matches.call( element, selector );

    };

  }();

  // initialize tabs click event
  Array.prototype.forEach.call( $tabs, function ( $tab ) {

    $tab.addEventListener( 'click', onClickTab );

  } );

  function onClickTab ( e ) {

    e.preventDefault();

    var $this   = e.target;
    var $li     = closest( $this, 'li' );
    var $ul     = closest( $li,   'ul' );
    var $target = null;
    var selector = $this.getAttribute( 'href' );

    if ( $li.classList.contains( CLASS_NAME_CURRENT_TAB ) ) { return }

    $target = document.querySelector( selector );

    activateTab( $li, $ul );
    activatePane( $target, closest( $target, '[data-cg2-tab-content]' ) );
    syncTab( '[href="' + $this.getAttribute( 'href' ) + '"]' );

  }

  // sync current status for other tab set
  function syncTab ( selector ) {

    var i, l;
    var $tabs = document.querySelectorAll( '[data-cg2-tab-button]' + selector );

    Array.prototype.forEach.call( $tabs, function ( $tab ) {

      var $li  = closest( $tab, 'li' );
      var $ul  = closest( $li,  'ul' );

      if ( $li.classList.contains( CLASS_NAME_CURRENT_TAB ) ) { return }

      activateTab( $li, $ul );

    } );

  }

  // switch current tab
  function activateTab ( element, container ) {

    var $active = container.querySelector( SELECTOR_CURRENT_TAB );

    $active.classList.remove( CLASS_NAME_CURRENT_TAB );
    element.classList.add( CLASS_NAME_CURRENT_TAB );

  }

  // switch current pane
  function activatePane ( element, container ) {

    var $active = container.querySelector( SELECTOR_CURRENT_PANE );

    $active.setAttribute( ATTR_NAME_CURRENT_PANE, '' );
    element.setAttribute( ATTR_NAME_CURRENT_PANE, 'current' );

  }

  // get closest parent node by selector
  function closest ( element, selector ) {

    var parent = null;

    while ( element !== null ) {

      parent = element.parentElement;

      if ( parent !== null && elementMatches( parent, selector ) ) {

        return parent;

      }

      element = parent;

    }

    return null;

  }

} );
