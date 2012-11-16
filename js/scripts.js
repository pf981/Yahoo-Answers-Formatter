/**
 * @author Paul Foster
 */
var opts = {
  lines: 9, // The number of lines to draw
  length: 3, // The length of each line
  width: 2, // The line thickness
  radius: 3, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  color: '#000', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 1, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};
var inputSpinnerTarget = document.getElementById('refresh_input');
var outputSpinnerTarget = document.getElementById('refresh_output');
var inputSpinner = new Spinner(opts).spin(inputSpinnerTarget);
var outputSpinner = new Spinner(opts).spin(outputSpinnerTarget);
var inputSpinnerTimeout;
var outputSpinnerTimeout;

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

	// Handle info popovers
	(function() {
		$(".btn-info").popover();
	})();

	// Handle textarea selection
	$(function() {
		$('#markup_textarea').focus(function() {
			$('#markup_label').removeClass('label-inverse');
			$('#markup_label').addClass('label-success');
		});
		$('#markup_textarea').focusout(function() {
			$('#markup_label').removeClass('label-success');
			$('#markup_label').addClass('label-inverse');
		});
		
		$('#yahoo_input_textarea').focus(function() {
			$('#yahoo_input_label').removeClass('label-inverse');
			$('#yahoo_input_label').addClass('label-success');
		});
		$('#yahoo_input_textarea').focusout(function() {
			$('#yahoo_input_label').removeClass('label-success');
			$('#yahoo_input_label').addClass('label-inverse');
		});
		
		$('#yahoo_output_textarea').focus(function() {
			$('#yahoo_output_label').removeClass('label-inverse');
			$('#yahoo_output_label').addClass('label-success');
		});
		$('#yahoo_output_textarea').focusout(function() {
			$('#yahoo_output_label').removeClass('label-success');
			$('#yahoo_output_label').addClass('label-inverse');
		});
	});
	
	
	// ZeroClipboard stuff for the copy button
	//set path
	ZeroClipboard.setMoviePath('./assets/ZeroClipboard.swf');
	//create client
	var clip = new ZeroClipboard.Client();
	//event
	clip.addEventListener('mousedown', function() {		clip.setText($('#yahoo_input_textarea').val());
	});
	clip.addEventListener('complete', function(client, text) {
		// Create a notification in the top right
		$('.top-right').notify({
			message : {
				text : 'Sucessfully copied text to clipboard - just paste it into your Yahoo! Answers post'
			}
		}).show();
	});
	//glue it to the button
	clip.glue('copy');
	
	// Update while typing
	$('#markup_textarea').keydown(function(event) {
		setTimeout(updateInput, 1);
		setTimeout(updateOutput, 1);
	});
	$('#yahoo_input_textarea').keydown(function(event) {
		setTimeout(updateOutput, 1);
	});

	// This doesn't work with the check in the function
	// stopInputSpinner();
	// stopOutputSpinner();
	inputSpinner.stop();
	outputSpinner.stop();
	
	
	$("#refresh_input").click(function() {
		updateInput();
	}); 
	$("#refresh_output").click(function() {
		updateOutput();
	}); 

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


function updateInput(){
	clearTimeout(inputSpinnerTimeout);
	startInputSpinner();
    $("#yahoo_input_textarea").val($('#markup_textarea').val());
	inputSpinnerTimeout = setTimeout(stopInputSpinner, 1000);
	
	// Changing the input will change the output, so update that too
	updateOutput();
}

function updateOutput(){
	clearTimeout(outputSpinnerTimeout);
	startOutputSpinner();
    $("#yahoo_output_textarea").val($('#yahoo_input_textarea').val());
	outputSpinnerTimeout = setTimeout(stopOutputSpinner, 1000);
}
// TODO: Add refresh button on input and output. Make it spin
function startInputSpinner() {
	if (!$('#refresh_input_icon').is(":visible"))
		return;
	inputSpinner.spin(inputSpinnerTarget);
	$('#refresh_input_icon').hide();
}
function stopInputSpinner() {
	if ($('#refresh_input_icon').is(":visible"))
		return;
	inputSpinner.stop();
	$('#refresh_input_icon').show();
}
function startOutputSpinner() {
	if (!$('#refresh_output_icon').is(":visible"))
		return;
	outputSpinner.spin(outputSpinnerTarget);
	$('#refresh_output_icon').hide();
}
function stopOutputSpinner() {
	if ($('#refresh_output_icon').is(":visible"))
		return;
	outputSpinner.stop();
	$('#refresh_output_icon').show();
}


