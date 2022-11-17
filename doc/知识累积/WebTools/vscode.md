# VSCode<https://code.visualstudio.com/docs/languages/overview#:~:text=However%2C%20at%20times%20you%20may,language%20for%20the%20current%20file.>

> 内置 js-beautify 为默认格式化工具，但是使用了默认规则，你无法修改
>
> 可以通过安装 beautify 插件（同样使用 js-beautify），配置.jsbeautifyrc 文件，定制格式化规则

- `vscode默认格式化工具配置项`

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## prettier and beautify

### prettier

> Format selection works on several languages depending on what Prettier itself supports. The following languages currently are supported:
>
> 配置项支持：javascript, javascriptreact, typescript, typescriptreact, json, graphql
>
> 支持 JavaScript、TypeScript、Flow、JSX、JSON、CSS、SCSS、Less、HTML、Vue、Angular、GraphQL、Markdown、YAML
>
> 安装：Prettier-Code Formatter

### 禁用 prettier

> If you want to disable Prettier on a particular language you can either create a .prettierignore file or you can use VS Code's editor.defaultFormatter settings

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": null
    // JS不适用prettier
  }
}
{
  "editor.defaultFormatter": null,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
    //   JS才使用prettier
}
```

### 配置 prettier<https://prettier.io/docs/en/configuration.html>

> 可以通过 VS code settings，prettier 配置文件，或者.editorconfig 文件

### beautify<https://github.com/HookyQR/VSCodeBeautify/blob/master/Settings.md>

> 支持 javascript、JSON、css、sass、HTML
>
> Note that the html.format settings will ONLY be used when the document is html. javascript.format settings are included always.
>
> 配置文件优先级

- `根目录下的.jsbeautifyrc文件`
- `vscode扩展配置项指定的文件或规则：beautify.config: "string or objectRules"`
- `根目录以外的.jsbeautifyrc文件`
- `home目录以外的.jsbeautifyrc文件`
  > 可以通过配置项，指定 beautify 可格式化的文件类型、后缀和特定的文件名 beautify.language

```JSON
    // 配置项可以支持css、html、javascript配置项
    // html和js缩进都是4，css缩进是2
    {
        "indent_size": 4,
        "css": {
            "indent_size": 2
        },
        "beautify.language": {
            "js": {
                "type": ["javascript", "json"], // 指定文件类型
                "filename": [".jshintc", ".jsbeautifyrc"], //
                "ext": ["js", "json"]
            },
            "css": ["css", "scss"],
            "html": ["htm", "html"]
        }
    }
```

> 支持 javascript、JSON、CSS、Sass 和 HTML 的格式化

## eslint<https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>

> eslint 插件将 ESlint 集成到 VSCode 编辑器，使用本地或全局的 eslint 库
