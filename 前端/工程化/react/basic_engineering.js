完整搭建一个React项目
// 本项目主要让我们是知道一个react项目大概需要哪些东西才能够跑起来。
// 项目中用到了react、react-dom、antd、webpack 系列、babel、以及一堆loader

项目结构
// 新建一个文件夹 demo,目录结构如下
  - demo
    - src  // 应用的所有代码
      - actions     // 处理异步请求
      - assets      // 静态资源
      - components  // 公用组件
      - pages       // 业务逻辑页面
      - reducers    // reducer 状态处理
      - util        // 公用方法
      - index.html  // 项目模板
      - index.js    // 项目入口
    - package.json      // npm init 自动生成
    - webpack.config.js // webpack 配置文件

    初始化NPM
    // 在项目的根目录下打开命令行，输入：
    
    // npm init -y

    安装webpack
// npm i webpack webpack-cli webpack-command --save-dev
// 这里直接将webpack 的三个基本项安装好

// ps:
// --save-dev与--save的区别
// --save-dev表示只是在编译过程中所依赖的包，例如：webpack、sass-loader等 最后在package.json的devDependencies部分显示
// --save 表示编译后在运行时还需要依赖的包，例如 react react-dom等 最后在package.json的dependencies部分显示
// 也可以指定安装webpack的版本
// npm install --save-dev webpack@[version] //version代表版本号

配置webpack.config.js文件
// const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js', // 输出的文件名
    path: path.resolve(__dirname, 'dist')
  }
};
// entry 是入口文件
// output 是编译后文件
// __dirname 全局变量 代表当前文件所在文件夹的完整路径
// path.resolve 返回一个路径 __dirname+'/dist'

安装其他webpack的插件

// 自动创建html文件 html-webpack-plugin
// npm i --save-dev  html-webpack-plugin
// 清除无用文件 clean-webpack-plugin
// npm i --save-dev clean-webpack-plugin
// 在每次编译之前把上一次打包的文件清除

一堆样式编译loader插件

// node-sass和sass-loader 是用来编译scss文件
// style-loader和css-loader 是用来编译css文件
// file-loader url-loader 加载其他文件，比如图片，字体

// npm i --save-dev style-loader css-loader node-sass sass-loader file-loader url-loader
// webpack 服务器 webpack-dev-server
// npm i --save-dev webpack-dev-server

再完善一下webpack.config.js

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动创建html文件
const CleanWebpackPlugin = require('clean-webpack-plugin');//清除多余文件

module.exports = {
    devtool: 'cheap-module-eval-source-map',// 用于开发调试，方便清楚是那个文件出错 (共有7种)
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'bundle.js', // 输出的文件名
        path: path.resolve(__dirname, 'dist') // 
    },
    module: {
        rules: [{
            test: /\.css$/,
            use:"style-loader!css-loader"
        }, {
            test: /\.scss$/,
            use:["style-loader","css-loader","sass-loader"]
           // 加载时顺序从右向左 
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }]
    },
    // 开启一个虚拟服务器
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),//每次编译都会把dist下的文件清除，我们可以在合适的时候打开这行代码，例如我们打包的时候，开发过程中这段代码关闭比较好
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html' //使用一个模板
        })
    ]
};

修改package.json

  "scripts": {
    "watch": "webpack --watch",
    "start": "webpack-dev-server --open",
    "build": "webpack"
  }

  其他文件
//   src/index.html
  
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//       <meta charset="UTF-8">
//       <title>demo</title>
//   </head>
//   <body>
//       <div id="root"></div>
//   </body>
//   </html>

//   src/index.js
//   console.log('hello world')
  
运行

// npm run build
// 编译成功后在根目录下就能看到一个dist文件夹

集成React

// 安装react 的东西,以及antd
// npm i --save react react-dom antd

修改index.js

import React,{Component} from 'react';
import ReactDom from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <p>Hello World</p>
            </div>
        );
    }
}

export default App;

ReactDom.render(<App />,document.getElementById('root'));

babel的使用

// 因为react是使用jsx编写，浏览器无法识别，所以需要一个编译工具，这里使用babel

// 安装babel
// npm i --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react  @babel/plugin-proposal-class-properties
// npm i --save @babel/polyfill
// npm i --save-dev babel-loader

修改webpack.config.js

// 在 module的rules中加入

// {
//    test: /\.(js|jsx)$/,
//    loader: 'babel-loader',
//    exclude: /node_modules/
// }

最终的webpack.config.js文件如下

const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

 module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            loader:['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            loader: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    devServer: {
        contentBase: './build',
        port: 8081,
        inline: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            template: 'src/index.html'
        })
    ]
}

添加babel配置文件

// 在根目录下添加文件 .babelrc

// {
//     "presets": [
//         "@babel/preset-env",
//         "@babel/preset-react"
//     ],
//  "plugins": [
//         "@babel/plugin-proposal-class-properties",
//           ]
// }

运行

// npm run build
// 出现一个警告信息

// warning  The 'mode' option has not been set, webpack will fallback to
//                 'production' for this value. Set 'mode' option to 'development' or
//                 'production' to enable defaults for each environment.

大概的意思是我们没有指定命令的模式是开发还是生产

修改package.json文件

//   "scripts": {
//     "watch": "webpack --watch",
//     "build": "webpack --mode production",
//     "dev": "webpack  --mode development& webpack-dev-server --open  --mode development",
//     "start": "webpack-dev-server --open --mode production"
//   }

// 这次我们可以直接运行

// npm run dev
// 看结果

// 如果在这过程中有出现其他的报错信息，可以直接百度，一般的问题其他人都遇到过！

使用scss

// 在assets目录下新建style.scss文件
// .red{
//     color:red;
// }
// 修改 index.js,导入scss文件

// import './assets/style.scss'

//  return (
//             <div>
//                 <p className="red">Hello World</p>
//             </div>
//         );
// 页面刷新后我就能看到样式改变。

// 但是这样有一个问题就是，css样式是直接编译到bundle.js文件中的。不太符合我们的开发习惯，所以我们要编译后把css样式和js拆分开来，这时我们就需要用到样式分离插件

// 分离文件 extract-text-webpack-plugin
// npm i --save-dev extract-text-webpack-plugin

修改webpack.config.js
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
     module: {
        rules: [{
            test: /\.css$/,
            use:ExtractTextPlugin.extract({
                fallback:"style-loader",
                use:"css-loader"
            })
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback:"style-loader",
                use:"css-loader!sass-loader"
            })
        }
        ],
        ...
        plugins: [
        new ExtractTextPlugin("styles.css")
    ]
    },
}

// 再一次运行，我们就能看到在dist文件夹下出现一个style.css文件

如果出现报错

// DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
// 则是因为当前安装的文件分离插件不支持webpack4，安装最新版的即可

// npm install extract-text-webpack-plugin@next
// 至此，一个简单的react框架就搭建起来了

