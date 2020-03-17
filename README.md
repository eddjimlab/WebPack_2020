###Run development
npm run dev

#Мануал
https://webpack.js.org/loaders/css-loader/

####В корне делаем 
npm init
Устанавливаем webpack для разработки только
npm i -D webpack webpack-cli
создаем конфигурационный файл в корне
webpack.config.js

####Простейшая конфигурация для запуска
где __dirname это корневая директория
```
const path = require('path')

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    }
}
```
####Запускаем npx webpack
Но лучше:
Для запуска нужно в package.json
npm run dev
```
"scripts": {
  "dev": "webpack",
```
но лучше так
```
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production",
```
а чаще лучше так
```
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production",
  "watch": "webpack --mode development --watch",
```
И еще вместо "main"": "index.js"
для безопасности, это нужно только для публичных npm  пакетов
```
"private": true,
```

---

####Если есть дополнительные файлы js, то можно усложнить конфигурацию
где есть две точки входи
а для работы вэбпака с чанками нужно добавить паттерн имени как вариант, тогда к названию бандла будет добавляться main or analytics
```
module.exports = {
    mode: "development",
    entry: {
        main: './src/index.js',
        analytics: './src/analytics.js'
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    }
}
```
При этом не забыть изменить ссылки в index.html
```
<script src="analytics.bundle.js"></script>
</head>
<body>
<div class="container">
    <h1>Webpack Course</h1>
</div>
<!-- /.container -->
<script src="main.bundle.js"></script>
```

####Далее необходимо установить для работы html
npm i -D html-webpack-plugin
```
},
plugins: [
    new HTMLWebpackPlugin({
        template: "./src/index.html"
    })
]
```
npm i -D clean-webpack-plugin
для чистки бандлов
```
plugins: [
    new HTMLWebpackPlugin({
        template: "./src/index.html"
    }),
    new CleanWebpackPlugin()
]
```
####Далее можно добавить контекст,  который как бы будет говорить где лежат все наши файлы и тогда в строке пути можно опустить src
```
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: {
        main: './index.js',
        analytics: './analytics.js'
```

###Работа с css
Устанавливаем
npm i -D style-loader css-loader

Подключаем
где / / обозначение регулярки
\.css$ любой файл с расширением css
внимание в том, что сначала подкл css-loder  а затем style-loader
```
],
module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader','css-loader']
        }
    ]
}
```
Подключаем в index.js
```
import './styles/styles.css'

```
Все работает

###Работа с разными типами файлов
JSON
Просто подключаем в js
```
import json from './assets/json'

```
####IMAGES 
Загружаем
npm i -D file-loader
Подключаем, где обозначаем расширения файлов
```
module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader','css-loader']
        },
        {
            test: /\.(png|jpg|jpeg|svg|gif)$/,
            use: ['file-loader']
        }
    ]
}
```

####Шрифты
Добавляем настройку шрифтов
```
},
{
    test: /\.(ttf|woff|woff2|eot)$/,
    use: ["file-loader"]
}
```
Скачиваем шрифты сохраняем в папку
Создаем отдельный файл roboto.css
```
@font-face {
    font-family: 'Roboto';
    src: url("../assets/fonts/Roboto-Regular.ttf") format('truetype');
}
```
подключаем его в основном css
```
@import "roboto.css";
```
все работает!
```
body {
    font-family: 'Roboto', 'sans-serif';
}
```

####Подключение npm библиотек
Например
Загружаем
этот пакет позволяет всем браузерам работать с современными стандартами
```
npm install normalize.css
```
Подключаем
```
@import "~normalize.css";
@import "roboto.css";
```

####XML files

Загружаем
npm i -D xml-loader
Подключаем
```
{
    test: /\.xml$/,
    use: ["xml-loader"]
}
```
Импортируем например  index.js
```
import xml from './assets/data.xml'

```
все работает
```
console.log('XML', xml)
```

####CSV files
загружаем
npm i -D csv-loader
и
npm i -D papaparse

Подключаем
```
{
    test: /\.csv$/,
    use: ["csv-loader"]
}
```

###Resolve extensions
позволяет обозначать расширения, которые не нужно прописывать в импортах
```
resolve: {
    extensions: ['.js', '.json', '.png', '.css']
},
```
###Resolve alias
можно сделать ярлыки
```
alias: {
    '@models': path.resolve(__dirname, 'src/models'),
    '@': path.resolve(__dirname, 'src')
}
```
и тогда импорты могут быть
```
import Post from "@models/post";

```
Но нужно ОБЯЗАТЕЛЬНО пересобирать!!!

###Подключение например JQUERY
Загружаем
npm i -S jquery
Импортируем
```
import * as $ from 'jquery'

```
используем
```
$('pre').html(post.toString())
```

###Оптимизация
В конфигурации добавляем
```
},
optimization: {
    splitChunks: {
        chunks: "all"
     }
},
```
И теперь, jquery например будет грузиться отдельным чанком и использоваться во всех файлах, то оптимизируя загрузку

###Webpack Dev-server
загружа
npm i -D webpack-dev-server
добавляем настройку с любым портом
```
},
devServer: {
    port: 4200
},
```
Добавляем скрипт в package.json
где --open означает открывать окно браузера
```
"start": "webpack-dev-server --mode development --open"

```
ВАЖНО что файлы при этом находятся не в dist  а в операционной памяти

###Копирование статичесчких файлов
plugin copy-webpack

загружаем
npm i -D copy-webpack-plugin
подключаем
```
const CopyPlugin = require('copy-webpack-plugin')

```

```
new CopyPlugin([
        {
            from: path.resolve(__dirname, 'src/full.ico'),
            to: path.resolve(__dirname, 'dist')
        }
    ])
],
```
подключаем index.html
Это кстати подключает иконку к вкладке
```
<link rel="icon" href="full.ico" type="image/png">

```

###Подключение внешних файлов css

загружаем
```
npm install --D mini-css-extract-plugin
```
подключаем
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

```

```
new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css'
})
```
меняем правила
```
module: {
    rules: [
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
```
до этого было
rules: [
        {
            test: /\.css$/,
            use: ['style-loader','css-loader']
        }
    ]

###Подключение переменной mode

Создаем переменную, консоль только для проверки
```
const isDev = process.env.NODE_ENV === 'development'
console.log('Is DEV', isDev)
```
загружаем пакет
npm i -D cross-env

Меняем скрипты в package.json
корректно задаем системную переменную
```
"scripts": {
  "dev": "cross-env NODE_ENV=development webpack --mode development",
  "build": "cross-env NODE_ENV=production webpack --mode production",
  "watch": "cross-env NODE_ENV=development webpack --mode development --watch",
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "cross-env NODE_ENV=development webpack-dev-server --mode development --open"
```
Теперь можем применять эту переменную
```
devServer: {
    port: 4200,
    hot: isDev
},
```
и добавить
```
const isProd = !isDev
```

```
loader: MiniCssExtractPlugin.loader,
options: {
    hmr: isDev,
    reloadAll: true
},
```
Минимизируем html
```
new HTMLWebpackPlugin({
    template: "./index.html",
    minify: {
        collapseWhitespace: isProd
    }
}),
```

Минимизация css

загружаем
```
npm install terser-webpack-plugin --save-dev
```
npm install --save-dev optimize-css-assets-webpack-plugin

Подключаем
```
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
```
В конфиге создаем функцию
в которую помещаем объект splintChunks
```
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}
```
А поле optimization заменяем на 
те вызываем эту функцию
```
optimization: optimization(),
```
Теперь при загрузке в продакшен все файлы будут минимизированы


###Работа с препроцессорами
###LESS
загружаем
npm i -D less-loader
npm i -D less

В конфиге добавляем правило для less
```
{
    test: /\.less$/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDev,
            reloadAll: true
        },
    },
        'css-loader',
        'less-loader'
    ]
},
```
Еще нужно поменять [contenthash] на [hash
```
output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, 'dist')
},
```
Не забываем добавить стили теги  :)

Добавим еще оптимизации hash

создаем еще одну функцию
где мы будем добавлять hash  в зависимости от mode
```
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
```
И теперь меняем
```
output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
```

```
new MiniCssExtractPlugin({
    filename: filename('css')
})
```

###SASS
загружаем
npm i -D node-sass sass-loader

Добавляем правила
```
{
    test: /\.s[ac]ss$/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDev,
            reloadAll: true
        },
    },
        'css-loader',
        'sass-loader'
    ]
},
```
Подключаем в index.js
```
import './styles/scss.scss'

```
Создаем файл, приописываем стили

###Babel

установка
npm install --save-dev babel-loader @babel/core
добавляем конфигурацию
```
{ 
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader"
}
```
Также нужно установить пресет
npm install --save-dev @babel/preset-env
И подключить
```
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: {
        loader: "babel-loader",
        options: {
            presets: [
                '@babel/preset-env'
            ]
        }
    }
}
```
также в package.json
нужно подключить совместимость
```
},
"browserslist": [
  "> 0.25%, not dead"
],
```
Устанавливаем полифилл
npm install --save @babel/polyfill
и подключаем его
```
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: {
        main: ['@babel/polyfill','./index.js'],
        analytics: './analytics.js'
    },
```
####Подключение плагинов для Babel
загружаем
```
npm install --save-dev @babel/plugin-proposal-class-properties
```
подключаем
```
options: {
    presets: [
        '@babel/preset-env'
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties"
    ]
}
```
Теперь у нас работает и такой код
```
class Util {
  static id = Date.now()
}

console.log('Util Id:' ,Util.id)

```


####Подключаем TypeScript

загружаем
npm install --save-dev @babel/preset-typescript

Подключаем
```
{
    test: /\.ts$/,
    exclude: /node_modules/,
    loader: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env',
                '@babel/preset-typescript'
            ],
            plugins: [
                '@babel/plugin-proposal-class-properties'
            ]
        }
    }
}
```
Теперь, для примера меняем файл analytics.js -->>-ts
Добавляем код в тайп скрипта

Не забываем менять в конфиге название
```
entry: {
    main: ['@babel/polyfill', './index.js'],
    analytics: './analytics.ts'
},
```

####Еще раз рефакторим код конфига
Создаем функцию
```
const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }
    if (preset) {
        opts.presets.push(preset)
    }
    return opts
}
```

и передаем ее в качестве опций, для ts добавляем пресет
```
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: {
        loader: 'babel-loader',
        options: babelOptions()
    }
},
{
    test: /\.ts$/,
    exclude: /node_modules/,
    loader: {
        loader: 'babel-loader',
        options: babelOptions('@babel/preset-typescript')
    }
},
```

####Подключение React
подключаем
пресет реакта должен быть установлен!!! либо устанавливаем
```
{
    test: /\.jsx$/,
    exclude: /node_modules/,
    loader: {
        loader: 'babel-loader',
        options: babelOptions('@babel/preset-react')
    }
},
```
Конечно, нужно установить и реакт
npm i react react-dom

В данном примере создаем файл react.jsx
```
import React from 'react'
import {render} from 'react-dom'

const App = () => (
    <div id="reactModule">
        <h1 className="react">React js</h1>
    </div>
)
render(<App/>, document.getElementById('reactModule'))
```
Выводим в index.html
```
<div id="reactModule"></div>

```
Подключаем в index.js
```
import './react.jsx'

```
Вуаля!

###Source map
показывает исходный код помимо минимизированного

добавляем в конфиг
вариант конфигураций могут быть разными в данном случае в дев режиме сорс мап есть в прод нет
```
devtool: isDev ? 'source-map' : 'eval',
plugins: [
```

Eslint
загружаем лоадер и сам линт
npm i -D eslint-loader  eslint babel-eslint

создаем функцию
```
const jsLoaders = () => {
    const loaders = [ {
        loader: 'babel-loader',
        options: babelOptions()
    }]
    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders
}
```
Подключаем ее например только для js
```
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: jsLoaders()
},
```
создаем в корне файл .esintrc
одно правило предупреждение о неипользованных переменных
важно что "eslint:recommended" без пробела
```
{
  "parser": "babel-eslint",
  "rules": {
    "no-unused-vars": "warn"
  },
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": [
    "eslint:recommended"
  ]
}
```

##Динамические импорты сторонних библиотек
пример:
###Lodash

загружаем
npm i lodash

И теперь в любом js фале в любом месте 
прописываем импорт
он загружается отдельным чанком оптимизируяку
```
import('lodash').then( _ =>{
  console.log('Lodash', _.random(0, 42, true))

})
```
##WebPack bundle Analizer

загружаем 
npm install --save-dev webpack-bundle-analyzer

создаем функцию
```
const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin([
            {
                from: path.resolve(__dirname, 'src/full.ico'),
                to: path.resolve(__dirname, 'dist')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ]
    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }
    return base
}
```
Передаем эту функцию
```
plugins: plugins(),
```
Теперь при загрузке прод мода будет загружаться статистика в отдельном локальном окне
####Также можно добавить спец скрипт package.json
```
"stats": "webpack --json > stats.json && webpack-bundle-analyzer stats.json"

```
