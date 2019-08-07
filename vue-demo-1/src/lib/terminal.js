worker = new Worker("worker-asm.js");
console.log(worker)
worker.onmessage = function (event) {
  var message = event.data;
  console.log(message.type, message.data)
  if (message.type == "ready") {
    // isWorkerLoaded = true;
    worker.postMessage({
      type: "command",
      arguments: ["-help"]
    });
  } else if (message.type == "stdout") {
    // outputElement.textContent += message.data + "\n";
  } else if (message.type == "start") {
    // outputElement.textContent = "Worker has received command\n";
  } else if (message.type == "done") {
    // stopRunning();
    // var buffers = message.data;
    // if (buffers.length) {
    //   outputElement.className = "closed";
    // }
    // buffers.forEach(function (file) {
    //   filesElement.appendChild(getDownloadLink(file.data, file.name));
    // });
  }
};
