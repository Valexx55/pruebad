//modificamos la configuración de QuÉ exponemos publicamente desde este micro, qué compartimos
//tocando el fichero webpackconfig.js del proyecto perfil

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'perfil',

  //esto es lo que hacemos público de este MF lo que compartimos
  exposes: {
    './Module': './projects/perfil/src/app/perfil/perfil.module.ts',
        
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});