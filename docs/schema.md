# Schema

## Bocks Collection

	userName: String,
	title: String,
	code: String,
	highlights: Array,
	isPrivate: Boolean,
	tags: Array,
	createdAt: {type: Date, default: Date.now},
	modifiedAt: {type: Date, default: Date.now}

## Snippets Data Object

	snippet = {
	  userName: "taptapdan",
	  title: "Example Snippet",
	  code: "var imaginaryFunction = function(param1, param2) { return 'foon' + param2; }",
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
	    }
	  ],
	  isPrivate: false,
	  tags: [
	  	'functions',
	  	'examples',
	  	'imaginary'
	  ],
	  createdAt: ISODate("2016-06-06T02:50:24.029Z"),
	  modifiedAt: ISODate("2016-06-06T02:50:24.029Z")
	}

