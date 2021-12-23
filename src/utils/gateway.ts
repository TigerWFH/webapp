import Loading from "Components/Loading";

/*
    对参数进行签名和加密：防止跨站请求伪造攻击
*/

function getChannel() {
  return "IOS|";
}
interface IAnyObj {
  [name: string]: any;
}
// function encrypt(data: IAnyObj, bLogin: boolean) {
//     const baseObj: IAnyObj = {
//         "_chl": getChannel(),   // 约定的渠道
//         "_sm": "md5",           // 约定的签名方式
//         ...data
//     }
//     let plain = "" // 明文键值对，计算hash
//     let params = "" // 传参
//     Object.keys(baseObj).sort().forEach((key: string) => {
//         const value = baseObj[key]
//         if (value !== null && value !== undefined) {
//             const val = typeof value === "object" ? JSON.stringify(value) : value
//             plain += key + "=" + val
//             params += encodeURIComponent(key) + "=" + encodeURIComponent(val) + "&"
//         }
//     })

//     if (bLogin) {
//         plain += "cookie"
//     }
//     else {
//         plain += "私有字符创"
//     }

//     params += "_sig=" + Md5(plain)
// }

export function gateway(data: IAnyObj, bLogin = false, options: IAnyObj = {}) {
  const config: IAnyObj = {
    bLoading: true,
    bToast: false,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    mode: "cors",
    ...options,
  };
  if (bLogin) {
    config.credentials = "include";
  }
  // const params = encrypt(data, bLogin)
  // config.body = params
  const { bLoading, bToast, ...rest } = config;
  if (bLoading) {
    Loading.mount();
  }

  return fetch(config.apiHost, rest)
    .then((res) => {
      //   bLoading && Loading.unmount();
      const contentType = res.headers.get("content-type") || "";
      if (res.ok) {
        // 应该根据content-type，解析成不同的数据
        if (contentType.indexOf("json") > -1) {
          return res.json();
        } else if (contentType.indexOf("text/") > -1) {
          return res.text();
        } else {
          // 还有arrayBuffer(), blob(), formData()等等
        }
      } else {
        // 这里是http status不在[200, 299]之间的response
        return Promise.reject(res);
      }
    })
    .then((data) => {
      // 同样要根据content-type处理返回结果
      const { code } = data;
      if (code === 0) {
        // 表示业务处理成功
        return data;
      } else {
        return Promise.reject(data);
      }
    })
    .catch((err) => {
      // 没有BS通信，fetch异常直接走到这里
      console.log("catch===>", err);
      return Promise.reject(err);
    })
    .finally(() => {
      bLoading && Loading.unmount();
    });
}

/**
 * 关于axios
 *
 */
export default function gateway1() {}
