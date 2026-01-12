// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
//export default defineConfig es una variable por default que define seteos para correr los tests.
//export default defineConfig({
//nosotros, para entendero mejor, podemos definirla como:
const config = ({
  //lo q vaya en testDir es lo q se correra como test. Ahora mismo, se correra como test todo lo 
  //que se encuentra alojado en la carpeta tests. Si quisiera correr un test especifico dentro de esta carpeta, 
  //debiera definirlo como './tests/testespecifico'
  testDir: './tests',
  /* Run tests in files in parallel */
  //En Playwright, el execution timeout esta seteado por defaul en 30 segundos globalmente. Si quisiera
  //modificarlo, podria usar:
  timeout: 30 *1000, //tiempo maximo q un test puede correr
  //eso setea el timeout globalmente. Si quisiera definir el tiempo de espera para los assertions, debiera
  //usar:
  expect: {
    timeout: 5 *1000, //tiempo definodo para las assetions
  },
  //para crear reportes en html agrego lo siguiente:
  reporter: 'html',
  use: {

    //seteo el browser q quiero usar en los tests
    browserName : 'chromium',
    headless: false
   //si esta en true, no se veran los borwsers al ejecutar los tests. Si lo pongo en false, si
    
  },

  
});
//y aqui exportamos la variable q creamos 'config' para que este disponible en todo nuestro proyecto
module.exports = config;
