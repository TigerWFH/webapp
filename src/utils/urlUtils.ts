class UrlUtils {
  displayName: string;
  constructor(name?: string) {
    this.displayName = name || "monkey wong's utils";
  }
  getParamByName = (name: string) => {
      const regexp = new RegExp(`[?&]${name}(=([^#&]*)|&|#|$)`)
  };
}

function getUrlParamByName(name: string, url?: string) {
  const reg = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  if (!url) {
    url = window.location.href;
  }
  let res = url.match(reg);
  if (res != null && res[2]) {
    return decodeURIComponent(res[2]);
  }
  return undefined;
}

export default new UrlUtils();
