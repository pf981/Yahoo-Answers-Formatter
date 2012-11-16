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
    },
    collapsed : function(e) {
      $("#vsplitter").wijsplitter("refresh");
      $("#inner_hsplitter").wijsplitter("refresh");
    },
    sized : function(e) {
      $("#vsplitter").wijsplitter("refresh");
      $("#inner_hsplitter").wijsplitter("refresh");
      
      // Resize textarea
      $("#markup_textarea").css('height', $("#markup_split").height() - 30);
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
      $("#inner_hsplitter").wijsplitter("refresh");
      $("#outper_hsplitter").wijsplitter("refresh");

      // Resize textarea
      $("#markup_textarea").css('width', $("#markup_split").width() - 30);
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
    }
  });
  
  // Set initial textarea dimensions
  $("#markup_textarea").css('width', $("#markup_split").width() - 30);
  $("#markup_textarea").css('height', $("#markup_split").height() - 30);
});
