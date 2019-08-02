(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

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
},{}]},{},[1]);
