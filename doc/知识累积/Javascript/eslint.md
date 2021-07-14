# eslint

## 参考资料

## 同类型工具以及现状

- `JSLint(Douglas Crockford)：Javascript语法校验工具，不支持自定义配置规则`<https://github.com/douglascrockford/JSLint/blob/master/README>
- `JSHint(Anton Kovalyov)：基于JSLint代码实现的开源项目，不支持自定义配置规则`<https://github.com/jshint/jshint>
- `TSLint：已经弃用，转向ESLint`<https://github.com/palantir/tslint>
- `ESLint(Nicholas C. Zakas)：支持开发者自定义rules，速度慢`<https://github.com/eslint/eslint>

## ESLint 一些特点

- `ESLint使用Espree解析JavaScript`
- `ESLint使用AST计算代码模式`
- `ESLing是插件化架构设计，每一个rule就是一个插件`
- `规则错误级别：off或0关闭规则，warn或1打开规则并警告提示，error或2打开规则并报错提示`
- `支持注释Comments`
- `支持共享字段配置：settings`

```js
    {
        "settings": {
            "sharedData": "hello"
        }
    }
```

```yaml
settings:
  sharedData: 'hello'
```

- `Cascading and Hierarchy：涉及配置项root，拥有该配置项文件的目录就是根目录`
- `Extending Configuration Files：extends，`extends 属性值可以是字符串，配置文件的路径或者名字，可以是字符串数组，可以继承 rules、plugins、language 等配置项

```json
{
  "extends": ["eslint:recommended", "eslint:all"]
}
```

- `shareable configuration package：就是一个npm包，导出一个配置对象。要想继承，需要安装对应依赖包`
- `eslint:recommended`

```js
module.exports = {
  extends: 'eslint:recommended',
  rules: [('indent': ['error', 4])]
};
```

- `使用plugin的配置。插件是一个npm包，可以给eslint增加不同的扩展。plugins属性值可以省略eslint-plugin-前缀，例如react就是eslint-plugin-react的简写形式。extends属性的值可以是plugin:包名/configName，其中包名可以省去前缀例如react`

```js
{
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "react/no-set-state": "off"
    }
}
```

- `使用配置文件extends：该属性值可以是路径，可以是配置文件名，可以是plugin:包名/配置we年名`
- `eslint:all`
- `Configuration Based on Glob Patterns`
- `overrides：覆盖已有规则`

## 安装使用

```shell
    npm install eslint --save-dev
    ./node_modules/.bin/eslint --init #生成配置文件.eslintrc
    ./node_modules/.bin/eslint config.js
```

## 配置文件

### 文件类型，可以使用 JavaScript、JSON、YAML 文件进行配置, .eslintrc.\*

> 优先级从上到下排列

- `.eslintrc.js，导出一个包含配置的对象`
- `.eslintrc.cjs`
- `.eslintrc.yaml, .eslintrc.yml`
- `.eslintrc.json`
- `package.json中的eslintConfig字段`

### 可使用配置项

#### Languages Options：也可以使用注释语句指定

```js
// 在JS文件使用注释指定
/* eslint-env node, mocha */
// 在配置文件指定
{
    "env": {
        "node": true,
        "mocha": true
    }
    // 使用插件
    "plugins": ["example"],
    "env": {
        "example/custom": true
    }
}
```

- `env：`指定 eslint 运行环境
- `globals：`管理全局变量的规则。全局变量是否可以被重写

```js
    {
        "globals": {
            "var1": "writable", // 允许被override
            "var2": "readonly" // 只读
        }
    }
```

- `parserOptions：`默认支持 ES5 语法，如果支持非 JS 标准语法可以使用插件，例如 React 使用 eslint-plugin-react。支持 es6 语法和支持 es5 内置类型也是不同的事情。语法支持配置在 parserOptions 下，内置类型配置在 env 变量下

```js
    {
        env: { // 该配置自动启动es6语法和es6内置类型检测
            "es6": true
        }
    }
    {
        parserOptions: { // 仅仅支持es6语法检测
            "ecmaVersion": true,
            "sourceType": "script | module",
            "ecmaFeatures": {
                "gloablReturn": "允许global scope返回statements",
                "impliedStrict": "严格模式",
                "JSX": true
            }
        }
    }
```

#### Rules

- `comments`

```js
/* eslint eqeqeq: "off", culy: "error" */
/* eslint-disable no-alert, no-console */
/* eslint-enable no-alert, no-console */
/* eslint-disable-line example/rule-name */
{
    "rules": {
        "eqeqeq": "off",
        "culy": "error"
    }
}
```

#### PLugins

- `parser属性：指定JS语法解析器`

```js
    {
        "parser": "espree, Esprima, @babel/eslint-parser, @typescript-eslint/parser"
    }
```

- `processor：指定处理器，从其他文件抽取js代码，甚至修改javascript，一般都是插件支持`

```js
    {
        "plugins": ["a-plugin"],
        "processor": "a-plugin/a-processor"
    }
    {
        "plugins": ["a-plugin"],
        "override": {
            "files": ["*.md"],
            "processor": "a-plugin/markdown",
            "rules": {
                "strict": "off"
            }
        }
    }
```

- `plugins：配置插件，可以省略eslint-plugin-前缀`
- `使用插件`

```js
    {
        "plugins": [
            "jquery", // eslint-plugin-jquery
            "@foo/foo", // @foo/eslint-plugin-foo
            "@bar"    // @bar/eslint-plugin
        ],
        "extends": [
            "plugin:@foo/foo/recommended",
            "plugin:@bar/recommeded"
        ],
        "rules": {
            "jquery/a-rule": "error",
            "@foo/foo/some-rule": "error",
            "@bar/another-rule": "error"
        },
        "env": {
            "jquery/jquery": true,
            "@foo/foo/en-foo": true,
            "@bar/env-bar": true
        }
    }
```

#### Ignoring Code

```js
// 配置文件 .eslintignore
    {
        "ignorePatterns": []
    }

```
