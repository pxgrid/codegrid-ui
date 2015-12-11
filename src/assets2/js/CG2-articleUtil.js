window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var url = location.href.replace( location.hash, '' );
  var html = [
    '<div class="CG2-articleUtil__socialItem CG2-articleUtil__socialItem--twitter">',
      '<a href="http://twitter.com/share" class="twitter-share-button" data-lang="en" data-url="' + url + '" data-text="<%= title %>" data-hashtags="codegrid">Tweet</a>',
    '</div>',
    '<div class="CG2-articleUtil__socialItem CG2-articleUtil__socialItem--facebook">',
      '<iframe src="//www.facebook.com/plugins/like.php?href=' + encodeURIComponent( url ) + '&amp;send=false&amp;layout=standard&amp;show_faces=true&amp;font&amp;colorscheme=light&amp;action=like&amp;height=68" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:68px;" allowTransparency="true"></iframe>',
    '</div>'
  ].join( '' );
  var $elAll = document.querySelectorAll( '.CG2-articleUtil' );

  Array.prototype.forEach.call( $elAll, function( $el ) {

    var $button      = $el.querySelector( '[data-socialitems-append]' );
    var $placeholder = $el.querySelector( '.CG2-articleUtil__socialItems' );

    var append = function ( e ) {
      
      e.preventDefault();

      if ( $button.classList.contains( 'CG2-button--disabled' ) ) {

        return;

      }

      $button.classList.add( 'CG2-button--disabled' );
      $placeholder.innerHTML = html;
      twttr.widgets.load();

    }

    $button.addEventListener( 'click', append );

  } );

} );
