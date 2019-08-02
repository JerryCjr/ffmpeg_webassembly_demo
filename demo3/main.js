const ffmpegjs = require('ffmpeg.js');

input.onchange = async (e) => {
    let file = e.target.files[0];
    let data = await new Response(file).arrayBuffer();
    let stderr = "";
    let stdout = "";
    let result = ffmpegjs({
        arguments: ['-y', '-i', file.name, 'output.webm'],
        MEMFS: [{ name: file.name, data: data }],
        stdin: () => { },
        onfilesready: (e) => {
            let data = e.MEMFS[0].data;
            output.src = URL.createObjectURL(new Blob([data]))
            console.log('ready', e)
        },
        print: function (data) { console.log(data); stdout += data + "\n"; },
        printErr: function (data) { console.log('error', data); stderr += data + "\n"; },
        postRun: function (result) { console.log('DONE', result); },
        onExit: function (code) {
            console.log("Process exited with code " + code);
            console.log(stdout);
        },
    });
    console.log(result);
};