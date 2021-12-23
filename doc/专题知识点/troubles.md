# 移动端开发问题与解决方案

## 1、IOS 部分手机 input 弹起键盘，造成其它元素无法捕捉到事件

- 问题描述：部分 IOS 手机上，input 获取焦点弹出键盘，在不主动收起键盘，直接点击 Button，无响应
- 问题原因：IOS 弹起键盘，造成 webview 位置发生变更，致使对应元素无法正确捕获到事件
- 解决方案：当 Input 失去焦点时，手动滚动 body，解决该问题

## 2、bfcache 问题

- 问题描述：微信小程序、字节跳动小程序、部分 ios 手机，使用 back 时，会触发 bfcache，在跨应用 back 会造成白屏现象
- 问题原因：部分 userAgent 实现了 bfcache，当跨应用 back 时，上一页面的状态和 js、页面都会从缓存中取出并使用，且不会执行 js。但是，跨应用销毁了状态树和 js 生成的 dom，进而造成了白屏
- 解决方案：使用 pageshow 响应，reload 页面

## 3、IOS 页面 input 弹起键盘，收起键盘页面却无法恢复，下面空白

- 问题描述：部分 IOS 手机上，input 获取焦点弹出键盘，收起键盘依然无法恢复页面
- 问题原因：
- 解决方案：当 Input 失去焦点时，手动滚动 body 一下，恢复页面

## 4、fetch 坑：当代理或者服务器返回 html 文件时，response.json 函数会跑出异常

- 问题描述：找不到服务器，代理服务器会返回一个 status=500，直接调用 response.json 会抛出异常
- 问题原因：代理或者其它返回了非 json 数据，例如 404 返回 html 等等
- 解决方案：需要判断 response 的内容类型

## 5、H5 获取 Geolocation.getCurrentPosition()经纬度

- 问题描述：H5 接口获取经纬度返回数据所属坐标系问题（属于 WGS-84,地心坐标系，GPS 原始坐标系）
- 问题原因：w3c 标准描述如下<https://w3c.github.io/geolocation-api/##position_interface%EF%BC%89>

```plain
    The Geolocation API defines a high-level interface to location information associated only with the device hosting the implementation, such as latitude and longitude. The API itself is agnostic of the underlying location information sources. Common sources of location information include Glob al Positioning System (GPS) and location inferred from network signals such as IP address, RFID, WiFi and Bluetooth MAC addresses, and GSM/CDMA cell IDs, as well as user input. No guarantee is given that the API returns the device's actual location.
    The geographic coordinate reference system used by the attributes in this interface is the World Geodetic System (2d) [WGS84]. No other reference system is supported.
```

- 解决方案 ：国内的 地图产品 需要符合国家火星坐标系标准（GCJ-02），而非接口层次。使用国内的地图产品进行转换。

## 6、H5 在 IOS 隐藏滚动条问题

- 问题描述：H5 overflow 属性，在一些机型上会出现滚动条，而且是有的有有的没有
- 问题原因：H5 本身有滚动条
- 解决方案：
  只是用 overfow 可能滚动不流畅，甚至出现无法滚动现象，可以添加-webkit-overflow-scrolling: touch 属性
  -webkit-scrollbar {
  display: none;
  background-color:transparent;
  }
  增加-webkit-overflow-scrolling 属性，有可能会造成-webkit-scrollbar 属性无效，只能隐藏滚动条（没有-webkit-overflow-scrolling 属性，滚动条也会出现，有的出现有的不出现）

## 7、H5 在 IOS 上，禁止橡皮筋效果问题
