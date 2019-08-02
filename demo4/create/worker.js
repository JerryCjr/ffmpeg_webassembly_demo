
var stdout = "";
var stderr = "";
var worker = new Worker("./node_modules/ffmpeg.js/ffmpeg-worker-webm.js");
worker.onmessage = function (e) {
    var msg = e.data;
    switch (msg.type) {
        case "ready":
            worker.postMessage({ type: "run", arguments: ["-version"] });
            break;
        case "stdout":
            stdout += msg.data + "\n";
            break;
        case "stderr":
            stderr += msg.data + "\n";
            break;
        case "exit":
            console.log("Process exited with code " + msg.data);
            console.log(stdout);
            worker.terminate();
            break;
    }
};