/**
 * MAC 测试浏览器UA
 * safari：Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Safari/605.1.15
 * chrome：Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
 * firefox：Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:63.0) Gecko/20100101 Firefox/63.0
 */
/**
 * Window 测试浏览器UA
 * chrome：
 * firefox：
 */

/**
 * IOS 测试UA
 * chrome：Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/12.1.2 Mobile/15E148 Safari/604.1
 * safari：Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1
 * wechat：Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 MicroMessenger/7.0.12(0x17000c2d) NetType/WIFI Language/zh_TW
 * alipay：Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Alipay
 * toutiao：Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 NewaArticle/7.7 JsSdk/2.0XXXXX
 */
/**
 * Android 测试UA
 * 自带浏览器：
 * QQ浏览器：Mozilla/5.0 (Linux; U; Android 10; zh-cn; MIX 2S Build/QKQ1.19989) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 MQQBrowser/10.3 Mobile Safari/537.36
 * wechat：MicroMessenger
 * alipay：Alipay AliApp
 */

// 待补充各种小程序识别方式
class UaUtils {
  displayName: string;
  ua: string;
  appVersion: string;
  constructor(name?: string) {
    this.displayName = name || "monkey wong's utils";
    this.ua = window.navigator.userAgent || "";
    this.appVersion = window.navigator.appVersion || "";
  }
  // 是否IE内核
  bTridentBrowser = () => {
    return this.ua.indexOf("Trident") > -1;
  };
  // opera内核
  bPrestoBrowser = () => {
    return this.ua.indexOf("Presto") > -1;
  };
  // 苹果、谷歌内核
  bWebkitBrowser = () => {
    return this.ua.indexOf("AppleWebKit") > -1;
  };
  // 火狐内核
  bGeckoBrowser = () => {
    return this.ua.indexOf("Gecko") > -1 && this.ua.indexOf("KHTML") == -1;
  };
  // 是否为移动端
  bMobileBrowser = () => {
    return !!this.ua.match(/AppleWebKit.*Mobile.*/);
  };
  // IOS终端
  bIos = () => {
    return !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  };
  // Android终端或uc浏览器
  bAndroid = () => {
    return this.ua.indexOf("Android") > -1 || this.ua.indexOf("Linux") > -1;
  };
  // iPhone或者QQHD浏览器
  bIphone = () => {
    return this.ua.indexOf("iPhone") > -1;
  };
  // iPad
  bIpad = () => {
    return this.ua.indexOf("iPad") > -1;
  };
  // 是否微信
  bWechat = () => {
    return (
      this.ua.indexOf("MicroMessenger") > -1 ||
      this.ua.indexOf("micromessenger") > -1
    );
  };
  // 是否QQ
  bQQ = () => {
    return this.ua.indexOf("QQ") > -1 || this.ua.indexOf("qq") > -1;
  };
  // 是否UC
  bUc = () => {
    return this.ua.indexOf("UCBrowser") > -1 || this.ua.indexOf("uc") > -1;
  };
  language = () => {
    return window.navigator.language.toLowerCase();
  };
}

export default new UaUtils();
