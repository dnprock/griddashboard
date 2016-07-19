var gs;

var vizIds = ['2JJNnG24xxznm5b6B', 'dW8migJMe7J9FQ9Ed', 'ohwSdN3usxSCWFaS7', 'Po3d34kknSywj7ce8', 'YPrKeBgdSybuvhpDr', 'sy7vzWW7BJEvKdZeL']

attachCloseHandler = function() {
  $('.gs-close-handle').on('click', function() {
    gs.removeWidget($(this).parent().parent());
  });
}

addWidget = function(vizId) {
  var template = $('.grid-stack-item-template').clone();
  template.removeClass('grid-stack-item-template');
  template.css('display', '');
  template.find('.grid-stack-item-content').append('<iframe src="https://vida.io/embed/' + vizId + '" width="100%" height="95%" seamless frameBorder="0" scrolling="no"></iframe>');
  gs.addWidget(template);
  attachCloseHandler();
}

$(document).ready(function () {
    // add visualizations
    var row = $('<div class="row"></div>');
    $('#visualization-tiles').append(row);
    for (var i = 0; i < vizIds.length; i++) {
      row.append($('<a class="viz-thumbnail thumbnail" href="#" data-viz-id="' + vizIds[i] +
        '"><img src="https://vida-production.s3.amazonaws.com/thumbnails/' + vizIds[i] +
        '" class="viz-thumbnail-img" width="150" height="150"/></a>'));
    }

    $('.viz-thumbnail').on('click', function() {
      addWidget($(this).attr('data-viz-id'));
      return false;
    });

    var options = {
        cell_height: 80,
        vertical_margin: 20
    };

    for (var i = 1; i <= 3; i++) {
      var template = $('.grid-stack-item-template').clone();
      template.removeClass('grid-stack-item-template');
      template.css('display', '');
      template.attr('data-gs-x', (i - 1) % 2 * 6);
      template.attr('data-gs-y', parseInt(i / 2) * 6);
      template.find('.grid-stack-item-content').append('<iframe src="https://vida.io/embed/' + vizIds[i - 1] + '" width="100%" height="95%" seamless frameBorder="0" scrolling="no"></iframe>');
      $('.grid-stack').append(template);
    }

    gs = $('.grid-stack').gridstack(options).data('gridstack');
    $('.grid-stack-item-content').append('<span class="gs-close-handle"></span>');
    $('.grid-stack-item-content').append('<span class="gs-move-handle"></span>');

    attachCloseHandler();
});
