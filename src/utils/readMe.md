# 工具集合涉及的知识点

## 图片压缩功能知识点

## 统一资源标识符，参考资料<https://www.zhihu.com/question/19557151>

[WSC_URL](https://danielmiessler.com/study/difference-between-uri-url/)
[blog](https://danielmiessler.com/study/difference-between-uri-url/)

> 就是在某一规则下，哪一个资源独一无二的标识出来。是一个抽象的概念。在不同的规则下，可以使用不同的方法实现资源的唯一标识
> IETF 倾向于使用 URI 这个名词作为这个通用形式的名称，而 WHATWG 倾向于使用 URL 这个名词作为通用形式的名称

### 统一资源标识符 URI(IETF，标准制定组织的 RFC 3986), Uniform Resource Identifier<https://tools.ietf.org/html/rfc3986>

### 统一资源定位符 URL(WHATWG，实现组织), Uniform Resource Locator, URI 的一种实现方案，用地址定位<https://url.spec.whatwg.org>

### 统一资源命名 URN, Uniform Resource Name， URI 的一种实现方案，用名字定位（似乎无人认领）

### URI 和 URL 的字符串表现形式或者说 URL 或 URI 语法: `<schema>://<user>:<password>@<host>:<port><path>;<params>?<query>#<frag>`

- `schema:`协议，分隔符是冒号:
- `user:`用户名，冒号:
- `password:`用户名密码，@
- `host:`主机:
- `port:`端口/
- `path:`路径
- `params:`键值对，分号;
- `query:`键值对，?和&
- `flag:`哈希值，#
- `web URL接口：用于解析、构造、规范化和编码URLs`
- `URL或URI语法标准或保留字符`

```js
/*
五种类型：
    1、保留字符：; / ? : @ & = + $ , 共计10个
    2、非转义字符：
        大小写字母52个，十进制数字10个，标记符号8个：- _ . ! ~ * ' ()
    3、#
    4、其它字符
    5、被转义字符(url escaped)，%后跟两个16进制数0，1，2，3，4，5，6，7，8，9，A，B，C，D，E，F
        %HexDigit HexDigit
    
    encodeURI非转义字符包括：52个字母，10个十进制数字，保留字符和~ ! * () ' #
    encodeURIComponent非转义字符包括：52个字母，10个十进制数字和~ ! * () '
    base64使用的字符包括：52个字母、10个十进制数字和 + /

    data URLs中允许/的存在

    # %23
    / %2F
    ? %3F
*/
```

```js
/*
    构造函数URL或者window.URL
    URL(url[, base])
        url： DOMString，表示绝对或相对URL的DOMString
        base：表示基准url的DOMString，默认是""
        返回一个URL对象
    属性：
        protocol：协议
        hostname：域名
        port：端口
        pathname：路径
        search：查询参数
        searchParams：URLSearchParams，查询参数对象
        username：用户名
        password：密码
        hash：hash片段
        href：完整URL
        origin：protocol+hostname+port
        host：hostname+port
    方法：
        toString()，返回一个USVString，与URL.href同义
        toJSON()
    静态方法：
        URL.createObjectURL(object: File | Blob | MediaSource)，返回一个对象URL，该URL指定对象的内容
        URL.revokeObjectURL()，释放createObjectURL创建的对象
    ------------------------------------------------------------------------------------------
    URL 有安全字符集的概念：所以产生了encodeURIComponent和codeURI
    encodeURIComponent：
    encodeURI：
*/
```

- `Data URLs：既前缀是Data:协议的URL，是一种特殊的URL，允许内容创建者向文档嵌入小文件`
  > 一种外部资源引用方式

```js
/*
        Data URLs语法：
            data:[<mediatype>][;base64],<data>
            前缀(data:)、指示数据类型的MIME类型、base64标记、数据本身
        <mediaType>是MIME类型的字符串：默认为text/plain;charset=US-ASCII
        对于文本数据，可以直接嵌入数据，使用合适的实体字符或转义字符，纯文本要进行转义编码encodeURIComponent或encodeURI
        对于二进制数据，使用base64进行编码
        例如：
            data:,Hello%2C%20World!
            data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D
            data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E
            data:text/html,<script>alert('hi');</script>
    */
```

- `对象URLs：URL.createObjectURL(param: Blob | File)返回的字符串，获取的是当前文档的内存URL`
  > 指向 Blob 或 File 内容的 URL
  > 对象 URLs 是一个字符创，格式是: "blob:当前链接/data"没搞明白？？？？？？

## Canvas

- `Blob、File和ReadableStream`

```js
/*
    FileReader、ReadableStream等等
    ReadableStream：流操作，呈现了一个可读取的二进制流操作。Fetch API的Response的body就是一个ReadableStream对象
    Blob：表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转成ReadableStream
        Blob.stream()返回一个ReadableStream
    File：特殊的Blob对象
        1、input上传文件后的FileList对象
        2、拖放操作生成的DataTransfer对象
        3、HTMLCanvasElement上的mozGetAsFile()API

    File(bits, name[, options])
        bits：ArrayBuffer、ArrayBufferView、Blob、[DOMString]
        name：文件名称或路径
        options：
            type：文件mime类型
            lastModified：数值，文件最后的Unix时间戳，毫秒。默认Date.now()
 */
```

- `Canvas`

```js
/*
HTMLCanvasElement API：
    getContext()
    toBlob(callback, mimeType, qualityArgument)：创建一个包含在canvas中的图片数据的blob对象，无返回值，blob对象通过callback返回
    toDataURL()
    captureStream()
CanvasRenderingContext2D API
    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    image：绘制元素的上下文。允许任何的canvas图像源CanvasImageSource，例如CSSImageValue、HTMLImageElement、SVGImageElement，HTMLVideoElement，HTMLCanvasElement，ImageBimap
Image：创建图片，支持的mime类型：image/apng,avif,git,jpeg,png,svg,webp
    crossorigin: anonymous | use-credentials
    decoding: sync | async | auto
    sizes:
    src:
    srcset: 指定图片资源来源
*/
```
