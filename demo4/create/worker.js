
var stdout = "";
var stderr = "";
var worker = new Worker("./node_modules/ffmpeg.js/ffmpeg-worker-webm.js");


function retrieveSampleVideo(_worker) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "test.mp3", true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function (oEvent) {
    var arrayBuffer = oReq.response;
    if (arrayBuffer) {
      sampleVideoData = new Uint8Array(arrayBuffer);
      console.log(sampleVideoData);
      _worker.postMessage({
        type: "run",
        MEMFS: [{ name: "test.mp3", data: sampleVideoData }],
        arguments: ["-version"]
      });
    }
  };

  oReq.send(null);
}
worker.onmessage = function (e) {
  var msg = e.data;
  switch (msg.type) {
    case "ready":
      // retrieveSampleVideo(worker);
      sampleVideoData = new Uint8Array();
      console.log(sampleVideoData);
      worker.postMessage({
        type: "run",
        MEMFS: [{ name: "test.mp3", data: sampleVideoData }],
        arguments: ["-version"]
      });
      break;
    case "stdout":
      stdout += msg.data + "\n";
      break;
    case "stderr":
      stderr += msg.data + "\n";
      break;
    case "done":
      stdout += msg.data + "\n";
      stderr += msg.data + "\n";
      break;
    case "exit":
      console.log("Process exited with code " + msg.data);
      console.log(stdout);
      console.log(msg);
      worker.terminate();
      break;
  }
};
