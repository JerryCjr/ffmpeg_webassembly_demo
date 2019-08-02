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


// var result = ffmpeg(module);
// result.forEach(function (file) {
//     getDownloadLink(file.data, file.name);
// });
