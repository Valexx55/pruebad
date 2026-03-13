/*const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
//decimos dónde están los mfe remotos
module.exports = withModuleFederationPlugin({

  remotes: {
    "carrito": "http://localhost:4201/remoteEntry.js",
    "productos": "http://localhost:4203/remoteEntry.js",
    "perfil": "http://localhost:4202/remoteEntry.js",    
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  sharedMappings:["@shared-lib", "@core-lib"]//importante hacer este paso para que los servicios sean Singleton (única instancia en el contexto común)
});*/

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  //ESTE FICHERO sabe dónde está
  /*remotes: {
    "carrito": "http://localhost:4201/remoteEntry.js",
    "productos": "http://localhost:4203/remoteEntry.js",
    "perfil": "http://localhost:4202/remoteEntry.js",    
  },*/

  remotes: {
  "carrito": "/carrito/remoteEntry.js",
  "productos": "/productos/remoteEntry.js",
  "perfil": "/perfil/remoteEntry.js",
},

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  sharedMappings:["@shared-lib", "@core-lib"] // el cel es el módulo raíz y carga estas librerías una sola vez y la comparte con el resto de micros así realmente tenemos una instancia singleton 

});
