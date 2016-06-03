angular.module('app.snippet', [])
.controller('SnippetController', function($scope, $http) {

  var ranges = [];
  var rangeCount = 0;
  var colorCount = 0;
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/solarized_dark");
  editor.session.setMode("ace/mode/javascript");

  // use Ace's Range instead of the window's
  var Range = ace.require('ace/range').Range;

  // stop the browser's warning message
  editor.$blockScrolling = 0;

  // Adjust font size in editor when +/- button is clicked
  $scope.fontSize = 12;
  editor.setFontSize($scope.fontSize);

  $scope.enlargeText = function () {
    $scope.fontSize += 2;
    editor.setFontSize($scope.fontSize);
  };
  $scope.reduceText = function () {
    $scope.fontSize -= 2;
    editor.setFontSize($scope.fontSize);
  };

  // Highlight selected text and create an annotation
  $scope.annotate = function() {
      $('.sortable').sortable();
      // find the perimeter of the highlighted area
      var startRow = editor.session.selection.selectionLead.row;
      var startCol = editor.session.selection.selectionLead.column;
      var endRow = editor.session.selection.selectionAnchor.row;
      var endCol = editor.session.selection.selectionAnchor.column;

      /* Mario: depending on the direction we highlight the text (using cursor),
      * these values can be different even though we highlight the same range: */
      console.log('startRow ======>', startRow);
      console.log('endRow ========>', endRow);
      console.log('startCol ======>', startCol);
      console.log('endCol ========>', endCol);

      // if no text was highlighted, do nothing
      if (startRow === endRow && startCol === endCol ) {
        return;
      }

      // otherwise highlight the specified range
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
      var range = new Range(startRow, startCol, endRow, endCol);
      range.id = rangeCount;
      range.color = colorCount;
      ranges.push(range);

      console.log(ranges);

      // addMarker supports "fullLine", "line" and "text"
      editor.session.addMarker(range, "highlighter-" + colorCount, "line");

      console.log('So, here\'s some of the stuff that\'s available to us:');
      console.log('The text we just highlighted:');
      console.log(editor.getSelectedText());
      console.log('The entire snippet:');
      console.log(editor.session.doc);
      console.log('The session object:');
      console.log(editor.session);

      console.log('Also notice that the cursor automatically jumped over to the annotations text box, so we can just start typing our annotation immediately');
      var elem = document.getElementById('annotations');
      // var elem = document.getElementById('sortable');
      // var list = document.createElement('li');
      var note = document.createElement('div');
      note.setAttribute('id', 'annotation-' + rangeCount);
      note.setAttribute('data-id', 'annotation-' + rangeCount)
      note.classList.add('note');
      note.setAttribute("contenteditable", "true");
      note.setAttribute("spellcheck", "false");
      note.setAttribute("draggable", "true");
      note.classList.add('highlighted-' + colorCount);
      // list.appendChild(note);
      elem.appendChild(note);
      note.focus();

      // increment the colorCount for next annotation
      colorCount++;
      if (colorCount === 4) {
        colorCount = 0;
      }

      // To extract snippets from editor, do this: editor.getValue();
      console.log('Text in editor =========> ', editor.getValue());

      // To repopulate editor: editor.setValue( < saved snippet > );
      // We can play this on the borwser console

      // Note: Yet we can only do with plain text. We may need to create other variables to store all data about highlights.
      /*
        Suggested data structure: an array of object
        $scope.highlight = [
          {
            startRow: <num>,
            endRow: <num>,
            startCol: <num>,
            endCol: <num>,
            highlighter: <string>
          },
          {
            // another highlight data
          },
          ......
        ];

        Then we can use for-loop to traverse the array and do the following to highlight the text
        for ( var i = 0; i < arr.length; i++ ) {
          var range = new Range(startRow[i], startCol[i], endRow[i], endCol[i]);
          editor.session.addMarker(range, highlighter[i], "line");
        }
      */

      rangeCount++;

      return;
  };

  $scope.snippetsCreate = function() {
    console.log('Snippets Create');

    ranges.forEach(function(range) {
      range.text = document.getElementById('annotation-' + range.id).innerText;
    });

    var snippet = {
      title: $scope.title,
      isPrivate: $scope.isPrivate,
      code: editor.getValue(),
      highlights: ranges
    };

    $http({
      method: 'POST',
      url: '/snippets',
      data: snippet
    })
    .then(function(res) {
      console.log(res.data);
    });
  };
});
