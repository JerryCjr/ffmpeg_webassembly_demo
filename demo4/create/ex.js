var ffmpeg = require("ffmpeg.js");
const path = require('path');
var fs = require("fs");
var testData = new Uint8Array(fs.readFileSync(path.resolve(__dirname, '../data/test.mp3')));
// Encode test video to VP8.
var result = ffmpeg({
  MEMFS: [{ name: "test.mp3", data: testData }],
  // arguments: ["-i", "show.mp4", "-c:v", "libvpx", "-an", "./out.mp4"],
  // ffmpeg.exe -i "http://asdfasdf.mp3" -filter_complex volumedetect -c:v copy -f null /dev/null
  // -i "../data/test.mp3" -filter_complex volumedetect -c:v copy -f null /dev/null
  // arguments: ["i", 'test.mp3', '-filter_complex', 'volumedetect', '-c:v', 'copy', '-f', 'null', '/dev/null'],
  // Ignore stdin read requests.
  stdin: function () { },
});
// Write out.webm to disk.
var out = result.MEMFS[0];
// fs.writeFileSync(out.name, Buffer(out.data));
