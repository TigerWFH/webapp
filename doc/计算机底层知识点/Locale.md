# 记录计算机底层知识点

## Locale(i18N)

> Locale 是软件在运行时的`语言环境`，它包括语言（Language）、地域（Territory）和字符集（Codeset）
>
> locale 的格式：语言[\_地域[.字符集]][@修正值]
>
> zh_CN.GB2312，其中 zh 是中文，CN 是中华人民共和国，字符集是 GB2312

### 分类（12 类）

> locale 把涉及的文化传统的各个方面分成 12 个大类：

- `字符（语言）类别（LC_CTYPE）`
- `数字（LC_NUMERIC）`
- `比较和排序习惯（LC_COLLATE）`
- `时间显示格式（LC_TIME）`
- `货币单位（LC_MONETARY）`
- `各种信息：错误提示、状态等等（LC_MESSAGES）`
- `姓名书写方式（LC_NAME）`
- `地址书写方式（LC_ADDRESS）`
- `电话号码书写方式（LC_TELEPHONE）`
- `度量衡表达方式（LC_MEASUREMENT）`
- `默认纸张尺寸大小（LC_PAPER）`
- `对locale自身信息描述（LC_IDENTIFICATION）`

### 命令行命令：Locale

> 优先级：LC_ALL > LC_XXX > LANG
>
> LANG：为所有未设定的 LC_XX 指定默认的 locale 值
>
> LANGUAGE：是设置应用程序的界面语言
>
> LC_ALL 强制覆盖其它值
