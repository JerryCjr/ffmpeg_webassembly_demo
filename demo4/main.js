// var ffmpeg = require("ffmpeg.js");
// var stdout = "";


// input.onchange = function (e) {
//     const file = e.target.files[0];
//     const fr = new FileReader();
//     fr.readAsArrayBuffer(file);
//     fr.onload = function (e) {
//         const fileResult = e.target.result;
//         console.log(fileResult);
//         // Print FFmpeg's version.
//         const result = ffmpeg({
//             MEMFS: [{ name: "test.mp3", data: new Uint8Array(fileResult) }],
//             arguments: ["-i", "test.mp3", "abc.wav"],
//             print: function (data) { stdout += data + "\n"; },
//             printErr: function (data) { stderr += data + "\n"; },
//             onExit: function (code) {
//                 console.log("Process exited with code " + code);
//                 console.log(stdout);
//             },
//         });
//         console.log(result);
//     }
// }

// ffmpeg({
//     // MEMFS: [{ name: "test.mp3", data: fileResult }],
//     MEMFS: [{ name: "test.mp3", data: testData }],
//     arguments: ["-i", "test.mp3", "abc.wav"],
//     print: function (data) { stdout += data + "\n"; },
//     printErr: function (data) { stderr += data + "\n"; },
//     onExit: function (code) {
//         console.log("Process exited with code " + code);
//         console.log(stdout);
//         console.log(111)
//     },
// });


// var result = ffmpeg(module);
// result.forEach(function (file) {
//     getDownloadLink(file.data, file.name);
// });

// const result = ffmpeg({
//     // Mount /data inside application to the current directory.
//     mounts: [{ type: "NODEFS", opts: { root: "." }, mountpoint: "/data" }],
//     arguments: ["-i", "/data/show.mp4", "-c:v", "libvpx", "-crf", "10", "-b:v", "1M", "-c:a", "libvorbis", "/data/output-file.webm"],
//     stdin: function () { },
// });
// console.log(result);
// out.webm was written to the current directory.
