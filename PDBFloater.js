// CloudFloater.js
// Purpose: To move cloud images around the screen artistically

$(document).ready(function () {
  // Collect system information
  var dHeight = $(document).height();
  var dWidth = $(document).width();
  var pdbImageCounter = Math.round(dWidth / 150);

  // For debugging
  console.log("Document height: " + dHeight);
  console.log("Document width: " + dWidth);
  console.log("Using " + pdbImageCounter + " PDB images.");

  $.getJSON("http://www.rcsb.org/pdb/json/latestStructures.do", function (structureData) {
    var NodeNumber = structureData.length;
    var ImageURLs = [];
    for (var i = 0; i < NodeNumber; i++) {
      // Build array of image URL's
      if (structureData[i].type == "EMDB") {
        // Pre-construct most of the variables
        ImageURLs.push("http://staticwest.rcsb.org/emdb-images/all/fixed/" + structureData[i].altid + ".png");
      }
      else {
        //Assume PDB structure
        ImageURLs.push("http://rcsb.org/pdb/images/" + structureData[i].id + "_bio_r_500.jpg");
      }
    }

    // Make sure you don't index beyond the end of the array
    if (pdbImageCounter > NodeNumber)
      pdbImageCounter = (NodeNumber-1);

    while (pdbImageCounter > 1) {
      cloud(pdbImageCounter,ImageURLs[pdbImageCounter]);
      pdbImageCounter--;
    }
  });

  // Used to create clouds that can coexist
  function cloud(passedID,passedURL) {
    // Setup unique cloud configurations
    var myID = passedID;
    var myX = randomIntFromInterval(0, dWidth);
    var myY = dHeight;
    var myZ = randomIntFromInterval(1,99);
    var mySize = randomIntFromInterval((dHeight / 15), (dHeight / 2));
    var myTime = randomIntFromInterval((dHeight / 120), (dHeight / 20));
    var myTimeMS = (myTime*1000);
    var myFadeIn = randomIntFromInterval(150,600);
    var myIMGurl = passedURL;

    // For debugging
    console.log("Creating cloud " + myID + " at spot " + myX + " of size " + mySize + " with a movement speed of " + myTime + " seconds to move across the page");

    // Create cloud and fade in
    $("body").append("<img id=\"" + myID + "\" style=\"position: absolute; z-index: " + myZ + "; height:" + mySize + "px; top:" + (myY) + "px; left:" + myX + "px;\" src=\"" + myIMGurl + "\">");

    // Float the cloud
    $("#" + myID).animate({
      top: "-" + mySize + "px",
      easing: "linear",
      queue: false
    }, myTimeMS, function() { newCloud(myID, myIMGurl); });
  }

  // Kill the old cloud, make a new one
  function newCloud(myID, myIMGurl) {
    console.log("Removing cloud number " + myID);
    $('#' + myID).remove();
    cloud(myID, myIMGurl);
  }

  // Helper function, bound pseudo random number
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
});




$(document).ready(function () {

});