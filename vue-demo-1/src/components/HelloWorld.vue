<template>
  <div class="hello">
    <h2>FFmpeg + worker + vue</h2>
    <input id='file' type='file' @change=handlerChange :disabled="!readied" multiple>

    <div class="filelist">
      <h3>filelist</h3>
      <p v-for="(item) in ffmEvent">
        {{item.name}}
      </p>
    </div>

    <h3>terminal</h3>
    <div class='terminal' v-for="(item, index) in ffmEvent">
      <p id="output">{{item.outputText}}</p>
    </div>
  </div>
</template>

<script>
import Worker from '../lib/worker-asm.worker'
export default {
  name: 'HelloWorld',
  data() {
    return {
      worker: null,
      readied: false,
      activeIndex: 0,
      ffmEvent: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 解析参数
    parseArguments: function (text) {
      text = text.replace(/\s+/g, ' ');
      var args = [];
      // Allow double quotes to not split args.
      text.split('"').forEach(function (t, i) {
        t = t.trim();
        if ((i % 2) === 1) {
          args.push(t);
        } else {
          args = args.concat(t.split(" "));
        }
      });
      return args;
    },
    // 运行命令
    runCommand(_value, _file) {
      if (this.readied) {
        this.worker.postMessage({
          type: 'command',
          arguments: this.parseArguments(_value),
          files: [_file]
        })
      } else {
        console.log('error worker is not readied')
      }
    },
    // 文件变动
    async handlerChange(e) {
      const _this = this;
      let fileLists = e.target.files;
      let arr = await Promise.all([...fileLists].map(async(item) => {
        return _this.promiseReadFile(item);
      }))
      if (arr && arr.length) {
        arr.map(item => {
          item.outputText = '',
          item.audiodetect = null
        })
        _this.activeIndex = 0;
        _this.runCommand(`-i ${arr[_this.activeIndex].name} -filter_complex volumedetect -c:v copy -f null /dev/null`, arr[_this.activeIndex])
      }
      this.$set(this, 'ffmEvent', arr);
    },
    // promise wrapper filereader
    promiseReadFile(_file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = function (result) {
          const r = result.target.result;
          const file = new Uint8Array(r);
          resolve({
            name: _file.name,
            data: file,
          })
        }
        fr.onerror = reject;
        fr.readAsArrayBuffer(_file);
      })
    },
    // get db info
    getDBInfo(_data) {
      const volumeDetectReg = /^(\[Parsed_volumedetect_0.*)/;
      const groupReg = /(?<=\]\s)(.*(?=\:\s)).*/;
      if (volumeDetectReg.test(_data)) {
        if (groupReg.test(_data)) {
          const group = _data.match(groupReg)
          const completeValue = group[0];
          const key = group[1];
          const value = completeValue.replace(key+': ', '');
          return {
            [key]: value
          }
        }
      }
    },
    // 初始化
    init() {
      const _this = this;
      _this.worker = new Worker();
      _this.readied = false;
      _this.worker.onmessage = function (event) {
        const message = event.data;
        switch (message.type) {
          case 'ready':
            _this.readied = true;
            // _this.runCommand('-filters');
            break;
          case 'stdout':
            _this.ffmEvent[_this.activeIndex].outputText += `[${message.type}: ]${message.data}\n`;
            _this.ffmEvent[_this.activeIndex].audiodetect = {
              ..._this.getDBInfo(message.data),
              ..._this.ffmEvent[_this.activeIndex].audiodetect
            };
            break;
          case 'start':
            _this.ffmEvent[_this.activeIndex].outputText = `[${message.type}: ]Worker has received command ${message.data}\n`;
            // _this.outputText = `[${message.type}: ]Worker has received command\n`;
            break;
          case 'done':
            _this.activeIndex ++;
            if (_this.activeIndex <= _this.ffmEvent.length - 1) {
              _this.runCommand(`-i ${_this.ffmEvent[_this.activeIndex].name} -filter_complex volumedetect -c:v copy -f null /dev/null`, _this.ffmEvent[_this.activeIndex])
            }
            console.log(_this.ffmEvent);
          default:
            break;
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#output {
  white-space: pre-wrap;
  word-break: break-all;
  text-align: left;
}
.filelist {
  min-height: 30px;
  border: 1px dashed red;
}
.terminal {
  border: 1px dashed grey;
  margin: 10px 0;
}
</style>
