var sampleVideoData;
var ffmpeg = require("ffmpeg.js");
var stdout = "";
var stderr = "";

function retrieveSampleVideo() {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "test.mp3", true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function (oEvent) {
    var arrayBuffer = oReq.response;
    if (arrayBuffer) {
      sampleVideoData = new Uint8Array(arrayBuffer);
      console.log(sampleVideoData);
      const result = ffmpeg({
        // MEMFS: [{ name: "test.mp3", data: fileResult }],
        MEMFS: [{ name: "test.mp3", data: sampleVideoData }],
        // arguments: ["-i", "test.mp3", "-filter_complex", "volumedetect", "-c:v", "copy", "-f", "null", "/dev/null"],
        arguments: ["-i", "test.mp3", "test.wav"],
        print: function (data) {
          stdout += data + "\n";
        },
        printErr: function (data) {
          stderr += data + "\n";
        },
        onExit: function (code, data) {
          console.log("Process exited with code " + code);
          console.log(stdout);
          console.log(data);
        },
      });
      console.log(result)
    }
  };

  oReq.send(null);
}
retrieveSampleVideo();

// function getDownloadLink(fileData, fileName) {
//     var a = document.createElement('a');
//     a.download = fileName;
//     var blob = new Blob([fileData]);
//     var src = window.URL.createObjectURL(blob);
//     a.href = src;
//     a.textContent = 'Click here to download ' + fileName + "!";
//     return a;
// }

