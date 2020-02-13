
使用vscode的过程中 自己或者push代码以后 代码的格式可能会出现错乱,
    作为一个成熟的开发, 当然应该遵守一些代码规范, 首先代码整洁度应该排在第一位
使用vscode 格式化代码 在少量的情况下 可能可以手动去修改格式, 但在大量格式排版不对齐的情况下, 应该怎么做 ?



    {
        // vscode默认启用了根据文件类型自动设置tabsize的选项
        "editor.detectIndentation": false,
        // 重新设定tabsize
        "editor.tabSize": 2,
        // #每次保存的时候自动格式化 
        "editor.formatOnSave": true,
        // #每次保存的时候将代码按eslint格式进行修复
        "eslint.autoFixOnSave": true,
        // 添加 vue 支持
        "eslint.validate": [
            "javascript",
            "javascriptreact",
            {
                "language": "vue",
                "autoFix": true
            }
        ],
        //  #让prettier使用eslint的代码格式进行校验 
        "prettier.eslintIntegration": true,
        //  #去掉代码结尾的分号 
        "prettier.semi": false,
        //  #使用带引号替代双引号 
        "prettier.singleQuote": true,
        //  #让函数(名)和后面的括号之间加个空格
        "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
        // #这个按用户自身习惯选择 
        "vetur.format.defaultFormatter.html": "js-beautify-html",
        // #让vue中的js按编辑器自带的ts格式进行格式化 
        "vetur.format.defaultFormatter.js": "vscode-typescript",
        "vetur.format.defaultFormatterOptions": {
            "js-beautify-html": {
                "wrap_attributes": "force-aligned"
                // #vue组件中html代码格式化样式
            }
        },
        // 格式化stylus, 需安装Manta's Stylus Supremacy插件
        "stylusSupremacy.insertColons": false, // 是否插入冒号
        "stylusSupremacy.insertSemicolons": false, // 是否插入分好
        "stylusSupremacy.insertBraces": false, // 是否插入大括号
        "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
        "stylusSupremacy.insertNewLineAroundBlocks": false // 两个选择器中是否换行
    }