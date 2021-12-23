/*
    关于bfcache：https://developer.mozilla.org/zh-CN/docs/Mozilla/Firefox/Releases/1.5/Using_Firefox_1.5_caching
    按照文档，注册beforeunload和unload事件处理函数，可以阻止触发bfcache，chrome和safary符合这一标准；
    vivo x21内置浏览器和UC浏览器不符合这一标准。
    另外，在beforeunload和unload回调中使用alert、confirm、prompt都会被忽略（界面交互无效window.open,alert,confirm），
    可以通过localStorage做日志
    beforeunload：
    pagehide：
    unload：文档（html）或一个子资源（图片、iframe等）正在被卸载，触发unload事件
 */ 
export default {
    init() {
        try {
            const bfWorker = new Worker(window.URL.createObjectURL(new Blob(['1'])));
            window.addEventListener('pageshow', (e) => {
                if (e.persisted) {
                    window.location.reload(true);
                }
            });
            window.addEventListener('unload', () => {
                // 这里绑个事件，构造一个闭包，以免 worker 被垃圾回收导致逻辑失效
                bfWorker.terminate();
            });
        } catch (e) {
            console.warn(e);
        }
    },

    clear() {
        try {
            window.addEventListener('pageshow', (e) => { });
            window.addEventListener('unload', () => { });
        } catch (e) {
            console.warn(e);
        }
    },
};

