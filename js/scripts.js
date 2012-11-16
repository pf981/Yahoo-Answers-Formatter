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

	// FIXME: When contracting, the textbox becomes too short
    expanded : function(e) {
      $("#vsplitter").wijsplitter("refresh");
      $("#inner_hsplitter").wijsplitter("refresh");
      
      // Resize textarea
      $("#markup_textarea").css('height', $("#markup_split").height() - 50);
    },
    collapsed : function(e) {
      $("#vsplitter").wijsplitter("refresh");
      $("#inner_hsplitter").wijsplitter("refresh");
      
      // Resize textarea
      $("#markup_textarea").css('height', $("#markup_split").height() - 50);
    },
    sized : function(e) {
      $("#vsplitter").wijsplitter("refresh");
      $("#inner_hsplitter").wijsplitter("refresh");
      
      // Resize textarea
      $("#markup_textarea").css('height', $("#markup_split").height() - 50);
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
      $("#outper_hsplitter").wijsplitter("refresh");
      $("#inner_hsplitter").wijsplitter("refresh");

      // Resize textarea
      $("#markup_textarea").css('width', $("#markup_split").width() - 30);
      $("#yahoo_input_textarea").css('width', $("#yahoo_input_split").width() - 30);
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
      $("#outer_hsplitter").wijsplitter("refresh");
      $("#vsplitter").wijsplitter("refresh");
      
      // Resize textarea
      $("#yahoo_input_textarea").css('height', $("#yahoo_input_split").height() - 50);
    }
  });
  
  // Set initial textarea dimensions
  $("#markup_textarea").css('width', $("#markup_split").width() - 30);
  $("#markup_textarea").css('height', $("#markup_split").height() - 50);
  
  $("#yahoo_input_textarea").css('width', $("#yahoo_input_split").width() - 30);
  $("#yahoo_input_textarea").css('height', $("#yahoo_input_split").height() - 50);
  
  // The following fixes bug when resizing will leave a strip on the right until it is resized again
  $("#outer_hsplitter").wijsplitter("refresh");
  $("#vsplitter").wijsplitter("refresh");
  
  // TODO: Change color of label when in focus
  

	// Handle info popovers
	(function() {
		// FIXME: Make popovers hide when you click away
		// $("[rel=popover_bottom]").tooltip();
		// $("[rel=popover_bottom]").popover({placement:'bottom'});

		// $("[rel=popover]").popover();
		$(".btn-info").popover();

	})(); 

});
