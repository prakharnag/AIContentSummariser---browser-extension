const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    // Other webpack configurations...
    plugins: [
        new webpack.DefinePlugin({
            'window.env': {
                OPENAI_API_KEY: JSON.stringify(process.env.OPENAI_API_KEY),
                OPENAI_MODEL: JSON.stringify(process.env.OPENAI_MODEL)
            }
        })
    ]
};