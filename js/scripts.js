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
    expanded : function(e) {
      $("#inner_hsplitter").wijsplitter("refresh");
    },
    collapsed : function(e) {
      $("#inner_hsplitter").wijsplitter("refresh");
    },
    sized : function(e) {
      $("#inner_hsplitter").wijsplitter("refresh");
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
  });
});
// var height = $(".wrapper").outerHeight(true);
// $("#vsplitter").height(height).wijsplitter("refresh");
//$('#inner_hsplitter').wijsplitter({showExpander: true});
$('#inner_hsplitter').wijsplitter("destroy");
// $('#outer_hsplitter').wijsplitter({resizeSettings: {animationOptoins:{ animationDuration: 10}}});
