//“usa esa configuración como base, pero obliga a webpack a generar un microfrontend ESM real en lugar de un bundle UMD”
//para que la liberría pueda consujmirse como jun impory no con System,import jS

/*Este fichero intercepta la configuración webpack generada por Angular + single-spa-angular y la modifica para que el bundle final 
se genere como un módulo ES (ESM) en lugar de UMD, 
permitiendo que el microfrontend se cargue mediante import() en el root-config de single-spa
*/
// Importamos la función de configuración webpack que proporciona la librería
// single-spa-angular. Esta función recibe la configuración base de Angular
// y la adapta para que la aplicación Angular pueda funcionar como microfrontend
// dentro de single-spa (añadiendo lifecycles bootstrap/mount/unmount, etc.)
const singleSpaAngularWebpack = require("single-spa-angular/lib/webpack").default;

// Exportamos una función que Angular CLI llamará para modificar la configuración
// webpack que genera internamente. Esta función recibe:
// - config: la configuración webpack generada por Angular
// - options: opciones de build que Angular pasa al builder
module.exports = (config, options) => {

  // Aplicamos primero la transformación que necesita single-spa-angular.
  // Esto convierte la aplicación Angular en una microaplicación compatible
  // con single-spa (añadiendo el soporte para los lifecycles).
  const cfg = singleSpaAngularWebpack(config, options);

  // Activamos un "experimento" de webpack que permite generar bundles
  // en formato ES Modules (ESM). Webpack requiere habilitar esto explícitamente
  // para poder emitir módulos en lugar de scripts clásicos.
  cfg.experiments = {
    // Conservamos cualquier configuración previa de experiments
    ...(cfg.experiments || {}),

    // Indicamos a webpack que el bundle final puede generarse como módulo ES.
    outputModule: true,
  };

  // Modificamos la configuración de salida (output) de webpack.
  // Esto controla cómo se genera el fichero final main.js.
  cfg.output = {

    // Conservamos cualquier configuración de salida previa
    ...(cfg.output || {}),

    // Indicamos que el bundle final debe generarse como módulo ES.
    // Esto permite que pueda ser cargado mediante import() dinámico.
    module: true,

    // Indicamos que el script generado debe tratarse como "type=module".
    // Esto refuerza que el código se interprete como ES Module.
    scriptType: "module",

    // Si webpack genera chunks adicionales (por ejemplo por lazy loading),
    // también deben emitirse como módulos ES.
    chunkFormat: "module",

    // Evitamos que webpack envuelva el bundle en un IIFE
    // (Immediately Invoked Function Expression).
    // Ese patrón era común en bundles clásicos pero no es necesario
    // cuando trabajamos con ES Modules.
    iife: false,

    // Indicamos que, si el bundle se expone como librería,
    // el tipo de librería debe ser "module" (ESM) en lugar de UMD.
    library: {
      type: "module",
    },
  };

  // Eliminamos explícitamente cualquier configuración previa que fuerce
  // el uso de UMD (Universal Module Definition). Esto es importante porque
  // Angular CLI o single-spa-angular pueden establecer:
  //
  //    libraryTarget: "umd"
  //
  // Si esa propiedad se mantiene, entraría en conflicto con el nuevo formato
  // de salida "module" que queremos usar.
  delete cfg.output.libraryTarget;

  // Devolvemos la configuración webpack final ya modificada.
  // Angular CLI usará esta configuración para generar el bundle
  // del microfrontend.
  return cfg;
};
