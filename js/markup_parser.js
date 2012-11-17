/**
 * @author Paul Foster
 */

// This function converts the markup string into the yahoo input string. It returns the input string.
function parseMarkup(markup) {
	return markup; // FIXME: TODO: This is just a placeholder
}

// This function converts the yahoo input string into the preiview output string.
function parseYahooInput(yahooInput) {
	var output = yahooInput;
	
	// Convert all Javascript unicode sequences to their unicode characters
	// e.g "\u0065" -> "e"
	// return yahooInput.replace(/\\u([0-9a-fA-F]{4})/g, function($0, $1) {
		// return String.fromCharCode(parseInt($1, 16));
	// });
	
	// Convert HTML unicode sequences to their unicode characters
	// e.g "&#160;" -> " "
	output  = output.replace(/&#([0-9]{1,5});/g, function($0, $1) {
		return String.fromCharCode(parseInt($1, 10));
	});

	return output;
}



// TODO: Do Yahoo! Answers weird truncating thing when the line is too long without a space









