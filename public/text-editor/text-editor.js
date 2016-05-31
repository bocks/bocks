// This event-listener function is to overwrite the default behavior of some keys
// Each key corresponds to a unique keyCode (i.e., ASCII)
// Here is ASCII reference: http://www.asciitable.com/
$(document).on("keydown", "#codeArea", function(e) {
	// read the key code
    var keyCode = e.keyCode || e.which;

    // if the keypress is a horizontal tab
    if( keyCode === 9 ) {
        // insert 5 whitespaces to 'indent'
        document.execCommand("insertText", true, '     ');
        // Each key corresponds to default behavior.
        // In this case, the default behavior is to select another elements.
        // You may login your facebook account, click on any text area and press 'tab' to realize the default behavior
        // We don't want this default behavior, so we invoke the method 'preventDefault'
        e.preventDefault();
    }

    // if the keypress is a 'return'
    if( keyCode === 13 ) {
        // break the line by inserting HTML element <br>
        document.execCommand('insertHTML', false, '<br><br>');
        // Again, prevent default behavior which is to insert <div> element
        e.preventDefault();
    }
});

// The coding box starts with a caption 'Your code here...'
// When a user clicks on the box, the caption should disappear
$(document).on("click", "#codeArea", function(e) {
    if( this.innerText === 'Your code here...' ) {
        this.innerText = '';
    }
});

// Here is the algorithm of highlighting selected code in red
$(document).on('click', '#test', function(e){
    e.preventDefault();

    // Detect highlighted text and split it by newline character
    var code = window.getSelection().toString().split('\n');
    
    // Create a new (but empty) element <span>
    var newNode = document.createElement('span');
    // Insert highlighted code with red background to the new element
    for ( var i = 0; i < code.length; i++ ) {
        // TODO: dynamically fill the background color
        newNode.innerHTML += '<span style=\'background-color:red;\'>' + code[i] + '</span>';
        if ( i < code.length - 1) {
            newNode.innerHTML += '<br>';
        }
    }

    // Get the position where the code is selected
    var range = window.getSelection().getRangeAt(0);
    // Delete selected code
    range.deleteContents();
    // Insert new element
    range.insertNode(newNode);
});


// We only allow users to paste plain text in the coding box.
// Sometimes users copy code from somewhere and paste it with HTML elements.
// We need to filter out all the HTML elements.
// See issue #42
// The following code may be useful for future reference.

// $('body').on('keydown paste', 'div.editfield', function(e) {
//     console.log('paste detected')
//     var $field = $(e.currentTarget);
//     if (e.keyCode===13 && $field.hasClass('multiline')) {
//         return true;
//     } else if (e.keyCode===13 || e.type==='paste') {
//         setTimeout(function() {
//             $field.html($field.text());
//         },0);
//     }
// });