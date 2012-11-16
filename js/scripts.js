/**
 * @author Paul Foster
 */
$(document).ready(function() {
	$("#outer_hsplitter").wijsplitter({
		panel1 : {
			minSize : 50,
			scrollBars : "none"
		},
		panel2 : {
			minSize : 50,
			scrollBars : "none"
		},
		orientation : "horizontal",
		fullSplit : true,
		splitterDistance : 100,

		// TODO: Turn on ghosting so that that panel resizes as you drag, not after you release
		// animationOptions:{ animationDuration: 10000},
		// resizeSettings: {animationOptoins:{ animationDuration: 10000}},

		expanded : function(e) {
			refreshAllSplits();

			// Resize textarea
			fixTextAreas();
		},
		collapsed : function(e) {
			refreshAllSplits();

			// Resize textarea
			fixTextAreas();
		},
		sized : function(e) {
			refreshAllSplits();

			// Resize textarea
			fixTextAreas();
		}
	});
	$("#vsplitter").wijsplitter({
		panel1 : {
			minSize : 50,
			scrollBars : "none"
		},
		panel2 : {
			minSize : 50,
			scrollBars : "none"
		},
		orientation : "vertical",
		fullSplit : true,
		showExpander : false,
		splitterDistance : $(".wrapper").width() / 2,

		// The following refresh functions ensure that after resizing
		// the vertical splitter, each of the horizontal panels shows its
		// contents correctly. This prevents repainting issues.
		sized : function(e) {
			refreshAllSplits();

			// Resize textarea
			fixTextAreas();
		}
	});
	$("#inner_hsplitter").wijsplitter({
		panel1 : {
			minSize : 50,
			scrollBars : "none"
		},
		panel2 : {
			minSize : 50,
			scrollBars : "none"
		},
		orientation : "horizontal",
		fullSplit : true,
		showExpander : false,
		splitterDistance : $("#vsplitter").height() / 2,

		sized : function(e) {
			refreshAllSplits();

			// Resize textarea
			fixTextAreas();
		}
	});

	// Set initial textarea dimensions	fixTextAreas();

	// The following fixes bug when resizing will leave a strip on the right until it is resized again
	refreshAllSplits();

	// TODO: Change color of label when in focus
	
	// Handle info popovers
	(function() {
		$(".btn-info").popover();
	})();

});

// Sets the width and height of the textareas based on the size of their split container
function fixTextAreas()
{
	$("#markup_textarea").css('width', $("#markup_split").width() - 30);
	$("#markup_textarea").css('height', $("#markup_split").height() - 50);

	$("#yahoo_input_textarea").css('width', $("#yahoo_input_split").width() - 30);
	$("#yahoo_input_textarea").css('height', $("#yahoo_input_split").height() - 50);

	// Output doesn't have a border, so its offsets are different
	$("#yahoo_output_textarea").css('width', $("#yahoo_output_split").width() - 30);
	$("#yahoo_output_textarea").css('height', $("#yahoo_output_split").height() - 50);
}

// Refreshes all split containers
function refreshAllSplits()
{
	$("#outer_hsplitter").wijsplitter("refresh");
	$("#vsplitter").wijsplitter("refresh");
	$("#inner_hsplitter").wijsplitter("refresh");
}






