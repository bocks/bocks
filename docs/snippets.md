## Snippets Data Object

	snippet = {
	  author: "taptapdan",
	  title: "Example Snippet",
	  code: "var imaginaryFunction = function(param1, param2) { return 'foon' + param2; }",
	  isPrivate: false,
	  highlights = [
	    {
	      startRow: 0
	      endRow: 0,
	      startCol: 33,
	      endCol: 38,
	      text: "param1 isn't actually used in this example."
	    },
	    {
	      startRow: 0
	      endRow: 0,
	      startCol: 41,
	      endCol: 46,
	      text: "param2 is concatenated with the string 'foon' and returned."
	    },
	    
	  ]
	}

## Server Endpoints

	GET /snippets
	Retreive a list of all snippets
	
	POST /snippets
	Create a new snippet
	
	GET /snippets/:id
	Retreieve a specific snippet
	
	PATCH /snippets/:id
	Edit a specific snippet
	
	DELETE /snippets/:id
	Delete a specific snippet