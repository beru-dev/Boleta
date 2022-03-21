const path = require("path"),
    CopyPlugin = require("copy-webpack-plugin"),
    { merge } = require('webpack-merge'),

    common = {
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        entry: "./src/client",
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    use: [ "babel-loader", "ts-loader" ],
                    include: [ path.join(__dirname, "src") ],
                    exclude: [ path.join(__dirname, "src/server") ]
                },
                {
                    test: /\.css$/,
                    use: [ "style-loader", "css-loader" ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg|ico)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: { outputPath: "assets/" }
                        }
                    ]
                }
            ]
        },
    },

    production = {
        output: {
            path: path.join(__dirname, "dist/public")
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: path.join(__dirname, "src/server/public"),
                        to: path.join(__dirname, "dist/public")
                    }
                ]
            })
        ]
    },

    development = {
        output: {
            path: path.join(__dirname, "src/server/public")
        },
    };

module.exports = (env, args) => {
    switch(args.mode) {
        case 'development':
          return merge(common, development);
        case 'production':
          return merge(common, production);
        default:
          throw new Error('No matching configuration was found!');
      }
}

// module.exports = {
//     resolve: {
//         extensions: [".ts", ".tsx", ".js", ".jsx"]
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(ts|tsx|js|jsx)$/,
//                 use: [
//                     "babel-loader",
//                     "ts-loader"
//                 ],
//                 include: [
//                     path.join(__dirname, "src")
//                 ],
//                 exclude: [
//                     path.join(__dirname, "src/server")
//                 ]
//             },
//             {
//                 test: /\.css$/,
//                 use: [
//                     "style-loader",
//                     "css-loader"
//                 ]
//             },
//             {
//                 test: /\.(jpe?g|png|gif|svg|ico)$/i,
//                 use: [
//                     {
//                         loader: "file-loader",
//                         options: { outputPath: "assets/" }
//                     }
//                 ]
//             }
//         ]
//     },
//     name: "client",
//     entry: "./src/client",
//     output: {
//         path: path.join(__dirname, "src/server/public")
//     },
//     plugins: [
//         new CopyPlugin({
//             patterns: [
//                 {
//                     from: path.join(__dirname, "src/server/public"),
//                     to: path.join(__dirname, "dist/public")
//                 }
//             ]
//         })
//     ]
// };