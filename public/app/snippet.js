angular.module('app.snippet', [])
.controller('SnippetController', function($scope, $http, $location, $rootScope, Snippets) {

  // set the 'private' radio button to disabled
  document.getElementById('isPrivate').disabled = true;

  // a collection of highlighted ranges belonging to the current snippet
  $scope.ranges = [];
  $scope.rangeId = -1;
  $scope.colorCount = -1;

  // the ace editor instance
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/solarized_dark");
  editor.session.setMode("ace/mode/javascript");

  // use Ace's Range instead of the window's
  var Range = ace.require('ace/range').Range;

  // stop the browser's warning message
  editor.$blockScrolling = Infinity;

  // Adjust font size in editor when +/- button is clicked
  $scope.fontSize = 16;
  editor.setFontSize($scope.fontSize);

  $scope.enlargeText = function () {
    $scope.fontSize += 2;
    editor.setFontSize($scope.fontSize);
  };
  $scope.reduceText = function () {
    $scope.fontSize -= 2;
    editor.setFontSize($scope.fontSize);
  };

  $scope.removeAnnotation = function() {

    // remove this range from the ranges collection
    var r = $scope.ranges.filter( function(range) {
      return range.id !== this.annotation.id;
    }.bind(this));
    $scope.ranges = r;
    editor.session.removeMarker(this.annotation.marker);

    // remove the annotation from the dom
    var el = document.getElementById('annotation-'+ this.annotation.id);
    el.parentNode.removeChild(el);
  };

  // Highlight selected text and create an annotation
  $scope.annotate = function() {

    // increment the colorCount and rangeId for next annotation
    $scope.colorCount++;
    if ($scope.colorCount === 4) {
      $scope.colorCount = 0;
    }
    $scope.rangeId++;

    // find the perimeter of the highlighted area
    var startRow = editor.session.selection.selectionLead.row;
    var startCol = editor.session.selection.selectionLead.column;
    var endRow = editor.session.selection.selectionAnchor.row;
    var endCol = editor.session.selection.selectionAnchor.column;

    // if no text was highlighted, do nothing
    if (startRow === endRow && startCol === endCol ) {
      return;
    }

    /* Mario: The start and end values depend on the direction we highlight the text
    * To highlight text, we need startRow < startCol and startCol < endCol.
    * To ensure that swap start and end values if necessary. */
    var temp;
    if ( startRow > endRow ) {
      temp = startRow;
      startRow = endRow;
      endRow = temp;
    }
    if ( startCol > endCol ) {
      temp = startCol;
      startCol = endCol;
      endCol = temp;
    }

    // create the new range object
    var range = new Range(startRow, startCol, endRow, endCol);

    // highlight the specified range in the editor
    var marker = editor.session.addMarker(range, "highlighter-" + $scope.colorCount, "text");

    // append pertinent info to this range object
    range.id = $scope.rangeId;
    range.color = $scope.colorCount;
    range.marker = marker;
    range.text = '';
    $scope.ranges.push(range);

    // TODO: focus cursor to new annotation
    return;
  };

  $scope.snippetsCreate = function() {
    // $scope.ranges.forEach(function(range) {
    //   range.text = document.getElementById('annotation-' + range.id).childNodes[1].innerText;
    // });

    var tags = [];
    if ($scope.tags1) { tags.push($scope.tags1); }
    if ($scope.tags2) { tags.push($scope.tags2); }
    if ($scope.tags3) { tags.push($scope.tags3); }

    var snippet = {
      title: $scope.title,
      isPrivate: $scope.isPrivate,
      code: editor.getValue(),
      highlights: $scope.ranges,
      tags: tags
    };
    console.log('Data of snippet that need to be saved into database =======>', snippet);
    $http({
      method: 'POST',
      url: '/snippets',
      data: snippet
    })
    .then(function(res) {
      if (res.data._id) {
        $location.path('/snippet/' + res.data._id);
      }
      $rootScope.successMsg = ['Successfully saved ' + res.data.title];
    }, function(err) {
      console.log('an error occurred in snippetsCreate');
    });
  };

  // download an editor screenshot
  $scope.exportImage = function() {
    Snippets.exportImage($scope.title);
  };

  // Make editor of adjustable height
  interact('.editor-wrap')
  .resizable({
    preserveAspectRatio: true,
    edges: { left: false, right: false, bottom: true, top: false }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.height = event.rect.height + 'px';

    target.style.webkitTransform = target.style.transform =
        'translate(' + 0 + 'px,' + y + 'px)';

    $( "#annotations, #editor" ).height(event.rect.height)
    editor.resize();

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  });

  $(document).on('click', '.note', function(e){
      if (! $(this).is(":focus") ) {
        this.focus();
      }
  });

  var start_pos;
  var end_pos;
  $( "#annotations" ).sortable({
    start: function(event, div) {
      start_pos = div.item.index();
      // console.log('starting position ===========>', start_pos);
    },

    change: function(event, div) {
      end_pos = div.placeholder.index();
      if ( start_pos < end_pos ) {
        end_pos -= 1;
      }
    },

    stop: function(event) {
      // console.log('ending position =============>', end_pos);
      // reorder $scope.ranges based on the order of annotations
      var draggedAnnotation = $scope.ranges[start_pos];
      if ( start_pos > end_pos ) {
        for ( var i = start_pos; i > end_pos; i-- ) {
          $scope.ranges[i] = $scope.ranges[i - 1];
        }
      } else {
        for ( var i = start_pos; i < end_pos; i++ ) {
          $scope.ranges[i] = $scope.ranges[i + 1];
        }
      }
      $scope.ranges[end_pos] = draggedAnnotation;
      // console.log('Ranges =======>', $scope.ranges);
    }
  });

})

// This directive allows two-way data binding in contenteditable div
.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});
