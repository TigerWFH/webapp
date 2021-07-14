// 最好后台全部包好，前端只根据错误码做交互的东西
const UNDEFINED_TEXT = "未定义错误码";
const ERROR_CODE_TO_MESSAGE: any = {
  pegasus: {
    1: "1",
    2: "2",
    3: "3",
  },
  unicorn: {
    1: "1",
    2: "2",
    3: "3",
  },
};
/*
    一、cookie包装工具
*/
// cookie值不能存在逗号，分号，空格等特殊符号；
// encodeURIComponent会编码这些特殊符号；但是JSON.stringify不会编码这些特殊符号
export function setCookie(
  key: string,
  value: string,
  domain?: string,
  expire?: number
) {
  let expires = "";
  let date = new Date();
  let days = expire || 30;
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  expires = "; expires=" + date.toUTCString();

  let cookie = domain
    ? `${key}=${encodeURIComponent(value)}${expires}; path=/; domain=${domain}`
    : `${key}=${encodeURIComponent(value)}${expires}; path=/`;
  console.log("cookie===>", cookie);
  document.cookie = cookie;
}

export function setCookieWithout(key: string, value: string, path?: string) {
  console.log("path===>", path);

  document.cookie = `${key}=${encodeURIComponent(value)};path=${
    path ? path : "/"
  }`;
}

export function getCookie(key: string) {
  let arr,
    reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
  arr = document.cookie.match(reg);

  if (!arr) {
    return null;
  } else {
    let value = decodeURIComponent(arr[2]);
    try {
      return value ? JSON.parse(value) : null;
    } catch (e) {
      return value;
    }
  }
}
/*
    二、错误码处理工具
 */
export function getMsgWithCode(name: string = "pegasus", code: number) {
  const code_to_msg = ERROR_CODE_TO_MESSAGE[name];
  if (code_to_msg === undefined) {
    return UNDEFINED_TEXT;
  }

  if (code_to_msg[code] === undefined) {
    return UNDEFINED_TEXT;
  }

  return code_to_msg[code];
}

/*
    三、LOG工具
 */
export function log(msg: any) {
  console.log("%c " + msg + " ", "background: #00a3fe;color: #fff");
}

export function warning(msg: any) {
  console.log("%c " + msg + " ", "background: #ffff00;color: #000");
}

export function error(msg: any) {
  console.log("%c " + msg + " ", "background: #ff0000;color: #fff");
}
/*
    四、URL工具
 */
export function getUrlParamByName(name: string, url?: string) {
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

export function compressImage(
  imgSrc: string,
  width: number = 300,
  mimeType: string = "image/jpeg",
  quality: number = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = function () {
      const scale = img.height / img.width;
      const canvas = document.createElement("canvas");
      // 使用目标图像大小指定画布大小，默认是300*150，会出现黑边
      canvas.width = width;
      canvas.height = width * scale;
      const ctx = canvas.getContext("2d");
      // canvas画布大小
      // drawImage将图片在画布上以width和width*scale为尺寸进行绘制
      ctx && ctx.drawImage(img, 0, 0, width, width * scale);
      canvas.toBlob(
        function (blob: any) {
          if (blob) {
            resolve(blob);
          } else {
            reject();
          }
        },
        mimeType,
        quality
      );
    };
  });
}
