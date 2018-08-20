const path = require('path');
// If you start your building process with the flag --prod this will equal "prod" otherwise "dev"

const webpackConfig = require('../node_modules/@ionic/app-scripts/config/webpack.config');


webpackConfig['dev'].resolve.alias = {
  "@env": path.resolve(`./src/env/env.ts`)
}
webpackConfig['prod'].resolve.alias = {
  "@env": path.resolve(`./src/env/env.prod.ts`)
}