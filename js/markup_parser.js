/**
 * @author Paul Foster
 */

var tabWidth = 4; // The number of spaces to convert tabs to

// This function converts the markup string into the yahoo input string. It returns the input string.
function parseMarkup(markup) {
	var input = markup;
	
	// Convert tabs to 4 spaces FIXME: use tabWidth
	input  = input.replace(/\t/g, '    '); // function - 4 spaces
	
	
	// Convert spaces to their unicode sequences
	input  = input.replace(/^ /g, '&#160;').replace(/\n /g, '\n&#160;');
	input  = input.replace(/  /g, ' &#160;');
	
	// Parse simple markup (\infty etc.)
	// TODO: May need optimisation later on
  $.each(entities, function(category, rows) {
    $.each(rows, function(index, row) {
      // FIXME: Need to make it check the longest markup first. E.g. check "\infty" befor "\in"
      // FIXME: Need mechanism for when someone wants to write "\in"+"fty"
      // Need the preceeding "\\" even though the markup variable has the backslash in it.
      input  = input.replace(new RegExp("\\"+row.markup, "gi" ), String.fromCharCode(parseInt(row.entity_num, 10)));
    });
  }); 

	
	// TODO: Parse functions
	
	return input; // FIXME: TODO: This is just a placeholder
}

// This function converts the yahoo input string into the preiview output string.
function parseYahooInput(yahooInput) {
	var output = yahooInput;
	
	// Convert all Javascript unicode sequences to their unicode characters
	// e.g "\u0065" -> "e"
	// return yahooInput.replace(/\\u([0-9a-fA-F]{4})/g, function($0, $1) {
		// return String.fromCharCode(parseInt($1, 16));
	// });
	
	// Convert tabs to a space
	output  = output.replace(/\t+/g, ' ');
	
	// Remove neighboring white-space
	output  = output.replace(/ {2,}/g, ' ');
	
	// Remove trailing white-space FIXME: Not sure if Y!A actually does this
	output  = output.replace(/ +\n/g, '\n');
	
	// Remove spaces at the begining of the line
	output  = output.replace(/^ +/g, '').replace(/\n +/g, '\n');
	
	// Convert HTML unicode sequences to their unicode characters
	// e.g "&#160;" -> " "
	output  = output.replace(/&#([0-9]{1,5});/g, function($0, $1) {
		return String.fromCharCode(parseInt($1, 10));
	});
	

	return output;
}



// TODO: Do Yahoo! Answers weird truncating thing when the line is too long without a space
// TODO: Highlight marked-up strings.
// TODO: Make LATEX-like lists. Each item will word wrap e.g.
//             1) This will word wrap in the
//                current way as demonstrated
//                    a) This is a sub-list
//                    b) Cool
//             2) Beans








