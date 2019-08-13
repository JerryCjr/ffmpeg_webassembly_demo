function env() {
  return new Promise((resolve, reject) => {
    try {
      if (/MicroMessenger/i.test(navigator.userAgent)) {
        // web-view下的页面内
        function ready() {
          if (window.__wxjs_environment === "miniprogram") {
            resolve("wx_miniprogram");
          } else {
            resolve("wx_native");
          }
        }
        if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
          document.addEventListener("WeixinJSBridgeReady", ready, false);
        } else {
          ready();
        }
      } else {
        resolve("browser");
      }
    } catch (error) {
      reject(error);
    }
  });
}

(async function() {
  let r = await env();
  console.log(r);
  oenv.innerHTML = r;
  // alert(r);
})();
