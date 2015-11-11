window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var CLASS_NAME_CURRENT_TAB = 'CG2-compactNav__item--current';
  var SELECTOR_CURRENT_TAB = '.' + CLASS_NAME_CURRENT_TAB;
  var CLASS_NAME_CURRENT_PANE = 'CG2-tabContent__pane--current';
  var SELECTOR_CURRENT_PANE = '.' + CLASS_NAME_CURRENT_PANE;

  var i, l;
  var $tabs = document.querySelectorAll( '[data-cg2-tab]' );

  // initialize tabs click event
  for ( i = 0, l = $tabs.length; i < l; i++ ) {

    $tabs[i].addEventListener( 'click', onClickTab );

  }

  function onClickTab ( e ) {

    e.preventDefault();

    var $this = e.target;
    var $li = closest( $this, 'li' );
    var $ul = closest( $li, 'ul' );
    var $target = null;
    var selector = $this.getAttribute( 'href' );

    if ( $li.classList.contains( CLASS_NAME_CURRENT_TAB ) ) { return }

    $target = document.querySelector( selector );

    activateTab( $li, $ul );
    activatePane( $target, closest( $target, '.CG2-tabContent' ) );
    syncTab( '[href="' + $this.getAttribute('href') + '"]' );
  }

  // sync current status for other tab set
  function syncTab (selector) {

    var i, l;
    var $tabs = document.querySelectorAll( '[data-cg2-tab]' + selector );

    for ( i = 0, l = $tabs.length; i < l; i++ ) {

      ( function () {

        var $tab = $tabs[i];
        var $li = closest( $tab, 'li' );
        var $ul = closest( $li, 'ul' );

        if ( $li.classList.contains( CLASS_NAME_CURRENT_TAB ) ) { return }

        activateTab( $li, $ul );

      } )();

    }

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

    $active.classList.remove( CLASS_NAME_CURRENT_PANE );
    element.classList.add( CLASS_NAME_CURRENT_PANE );

  }

  // get closest parent node by selector
  function closest (element, selector) {

    var parent = null;

    while ( element !== null ) {

      parent = element.parentElement;

      if ( parent !== null && parent.matches(selector) ) {

        return parent;

      }

      element = parent;

    }

    return null;

  }

} );
