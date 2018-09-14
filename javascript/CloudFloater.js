// CloudFloater.js
// Purpose: To move cloud images around the screen artistically

$(document).ready(function () {
  // Collect system information
  var dHeight = $(document).height();
  var dWidth = $(document).width();
  var cloudCounter = Math.round(dWidth / 150);

  // For debugging
  console.log("Document height: " + dHeight);
  console.log("Document width: " + dWidth);
  console.log("Creating " + cloudCounter + " clouds.");
  while (cloudCounter > 1) {
    cloud(cloudCounter);
    cloudCounter--;
  }

  // Used to create clouds that can coexist
  function cloud(passedID) {
    // Setup unique cloud configurations
    var myID = passedID;
    var myX = randomIntFromInterval(0, dWidth);
    var myY = dHeight;
    var myZ = randomIntFromInterval(1,99);
    var mySize = randomIntFromInterval((dHeight / 18), (dHeight / 4));
    var myTime = randomIntFromInterval((dHeight / 120), (dHeight / 30));
    var myTimeMS = (myTime*1000);
    var myFadeIn = randomIntFromInterval(150,600);

    // For debugging
    console.log("Creating cloud " + myID + " at spot " + myX + " of size " + mySize + " with a movement speed of " + myTime + " seconds to move across the page");

    // Create cloud and fade in
    $("body").append("<img id=\"" + myID + "\" style=\"position: absolute; z-index: " + myZ + "; height:" + mySize + "px; top:" + (myY) + "px; left:" + myX + "px;\" src=\"/images/docker2.png\">");

    // Float the cloud
    $("#" + myID).animate({
      top: "-" + mySize + "px",
      easing: "linear",
      queue: false
    }, myTimeMS, function() { newCloud(myID); });
  }

  // Kill the old cloud, make a new one
  function newCloud(myID) {
    console.log("Removing cloud number " + myID);
    $('#' + myID).remove();
    cloud(myID);
  }

  // Helper function, bound pseudo random number
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
});

