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

## Configure Language Specific Settings<https://code.visualstudio.com/docs/getstarted/settings#_languagespecific-editor-settings>

> Language-specific editor settings in your user settings override workspace settings.
>
> The following examples customize editor settings for language modes typescript and markdown

```json
{
  "[typescript]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[markdown]": {
    "editor.formatOnSave": true,
    "editor.wordWrap": "on",
    "editor.renderWhitespace": "all",
    "editor.acceptSuggestionOnEnter": "off"
  }
}
```

> 配置优先级问题：Configurations can be overridden at multiple levels by the different setting scopes

```plain
User settings - Apply globally to all VS Code instances.

Workspace setting - Apply to the open folder or workspace and override User settings.

Workspace Folder settings - Apply to a specific folder of a multi-root workspace. Override User and Workspace settings.
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

## eslint

## debug

> vscode 创建的工程有一个.vscode 目录，存放着 launch.json 文件，该文件用于配置调试信息

### launch.json<https://go.microsoft.com/fwlink/?linkid=830387>

- `vscode有两种debug模式，Launch和Attach`
  - `Launch：开启新进程，并附加vscode debugg`
  - `Attach：使用的现有的进程，并附加vscode debug`
- `配置项`

  - `version：`launch.json 文件格式版本号
  - `configurations：`

    - `type：指定语言调试器类型`
    - `request：[attach, launch]`
    - `name：对应调试工具的名字`
    - `presentation：[order, group, hidden]`
    - `preLaunchTask：在调试前执行一个任务(task.json，该文件存放在.vscode中)或默认任务${defaultBuildTask}`
    - `postDebugTask：调试结束前执行一个任务(task.json，该文件存放在.vscode中)`
    - `internalConsoleOptions：控制调试输入面板是否可见`
    - `debugServer：调试vscode插件使用`
    - `serverReadyAction：调试server应用时，打开URI配置`

    - `program：debug时的执行程序或文件`
    - `args：传递给program的参数`
    - `env：环境变量`
    - `envFile：含有环境变量的dotenv文件`
    - `cwd：当前工作目录`
    - `port：attaching正在运行的进程的端口`
    - `stopOnEntry：`
    - `console：使用那种控制台[internalConsole, integratedTerminal, externalTerminal]`
    - `url：`
    - `webroot：`
    - `sourceMapPathOverrides：`

  - `vscode提供了环境变量，可以用在launch.json中，而不用写入绝对路径`<https://code.visualstudio.com/docs/editor/variables-reference>
    - `${workspaceFolder}：工作目录的跟路径`
    - `${file}：active editor中的文件`
    - `${env:Name}：环境变量Name`
  - `系统相关属性`
    - `windows`
    - `osx`

- `compunds：配置多个configurations，可以选择`

## vscode task<https://code.visualstudio.com/docs/editor/tasks>

> VS Code 的任务系统的第一大功能，就是对任务的自动检测。如果你的项目或者文件夹里有 typescript、grunt、jake、gulp、npm 这几个脚本工具的配置文件的话，VS Code 会自动读取当前文件夹下的配置。

- `configure task：配置任务`
- `run task：运行任务，会自动展开搜索到的任务`
- `默认支持的任务，直接从对应的配置文件读取，例如grunt、jake、gulp、npm等`

  - `可以修改默认任务的终端输出`
  - `mix custom tasks with configurations for detected tasks`
  - `script：配置项就是脚本命令，例如package.json中的`

  ```json
  <!-- script就相当于script，对应的值和start作用相同 -->
  {
    "script": {
      "start": "node ./scripts/start.js"
    }
  }
  ```

- `自定义task：`<https://code.visualstudio.com/docs/editor/tasks-appendix>
  - `label：`任务在可视化界面的名称，通过该名称可以执行对应的任务
  - `type：`对于自定义任务，可以是 shell（cmd、bash、powershell）、process。
    - `shell：`将 program 解释成 shell command
    - `process：`将 program 解释成可执行的程序
  - `program：`实际执行的命令
  - `windows：`window 系统特有属性
  - `group：`任务组，例如属于 test，可以执行 run test XXX 进行执行
  - `presentation：`如何处理任务执行输出
    - `reveal: always`
    - `panel: new`
  - `options：`
    - `cwd：`指定工作目录
    - `env：`指定环境变量
    - `shell：`指定新的 shell，代替默认的 shell
  - `runOptions：`
  - `depensOn：`任务依赖
  - `depensOrder：`任务依赖顺序
  - `problemMatcher：`[$eslint-stylish, $tsc, $tsc-watch, $jshint, $jshint-stylish, $eslint-compact, $eslint-stylish, $go, $mscompile, $lessc, $node-sass]

```json
{
  "version": "2.0.0", // 当前文件版本
  "tasks": [
    // 任务列表
    {
      "type": "npm", //任务类型[shell, npm, grunt]
      "script": "hello", //
      "problemMatcher": [], //
      "label": "npm: hello1", // 显示为命令名称
      "detail": "node ./index.js" //
    }
  ]
}
```

### Customizing auto-detected tasks

### Binding keyboard shortcuts to tasks

### Variable substitution

### Character escaping in PowerShell

## vscode workspace：用来对 vscode 进行配置的一个虚拟概念，可以在不同的工作区启用/禁用不同的插件。针对 vscode settings 作用域产生的概念：user settings and workspace settings

> 配置文件优先级：系统设置（不可修改）---用户设置---工作区设置---文件夹设置
