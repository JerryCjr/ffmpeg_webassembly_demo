// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Worker from './lib/worker-asm.worker';

const worker = new Worker();
worker.onmessage = function (event) {
  var message = event.data;
  console.log(message.type, message.data);
  if (message.type == "ready") {
    worker.postMessage({
      type: "command",
      arguments: ["-codesc"]
    });
  }
};

console.log(worker);

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
