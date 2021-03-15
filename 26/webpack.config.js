const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCSSAssetsPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].${ext}`

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: path.resolve(__dirname, 'dist'),

            },
        }
        ,
        {
            loader: 'css-loader',
        }
    ] //webpack идёт справа налево
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }]
    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'), //context это то место, где веб-пакет пытается начать сборку пакета 
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
        // analytics: './analytics.js'
    },
    output: {
        filename: `js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.jpg', '.gif', '.webp'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
        }
    },
    optimization: optimization(),
    devServer: {
        port: 9000,
        watchContentBase: true,
        hot: isDev,
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/img')
                },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: `css/${filename('css')}`
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif|webp)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]',
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
        ]
    }
}