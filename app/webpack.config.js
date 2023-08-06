const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = function(_env, argv) {
    const isProduction = argv.mode === "production";
    const isDevelopment = !isProduction;

    return {
        devtool: isDevelopment && "cheap-module-source-map",
        mode: "development",
        entry: {
            'graph-solver.bundle': path.resolve(__dirname, "src/index.tsx"),
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: '[name].[contenthash].js',
            clean: true,
            publicPath: "/"
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, "dist")
            },
            port: 3009,
            open: true,
            hot: true,
            compress: true,
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            cacheCompression: true,
                            envName: isProduction ? "production" : "development"
                        }
                    }
                },
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "static/media/[name].[hash].[ext]"
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack"]
                }
            ]
        },
        resolve: {
            extensions: [ "*", ".js", ".jsx", ".ts", ".tsx" ]  
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Graph-solver application",
                filename: "index.html",
                template: "public/index.html"
            }),
            isProduction && new MiniCssExtractPlugin({
                filename: "assets/css/[name].[contenthash].css",
                chunkFilename: "assets/css/[name].[contenthash].chunk.css"
            })
        ].filter(Boolean),
        optimization: {
            minimize: isProduction,
            minimizer: [ 
                new TerserWebpackPlugin({
                    terserOptions: {
                        compress: {
                            comparisons: false
                        },
                        mangle: {
                            safari10: true
                        },
                        output: {
                            comments: false,
                            ascii_only: true
                        },
                        warnings: false
                    }
                })
            ]
        }
    }
}