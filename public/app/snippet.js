angular.module('app.snippet', [])
.controller('SnippetController', function($scope) {
  
  var colorCount = 0; 
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/solarized_dark");
  editor.session.setMode("ace/mode/javascript");

  // use Ace's Range instead of the window's
  var Range = ace.require('ace/range').Range;

  // stop the browser's warning message
  editor.$blockScrolling = 0; 

  // font size is customizable, could have an +/- button
  editor.setFontSize(18);

  // this script fires when the user releases the mouse after highlighting something in the editor
  $scope.mouseUp = function() {

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
      var note = document.createElement('div');
      note.classList.add('contentEditable');
      note.setAttribute("contentEditable", "true");
      note.classList.add('highlighted-' + colorCount);
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
 

      return;
  };
});
