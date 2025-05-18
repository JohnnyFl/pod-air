'use server'
// import { initializePaddle } from '@paddle/paddle-js';

// const paddle = await initializePaddle({
//   environment: 'sandbox',
//   token: 'test_7dfbd6c7ea436ff56fb10d749e3' // replace with a client-side token
// });

// export default paddle;
// import { Environment, LogLevel, Paddle } from '@paddle/paddle-node-sdk'


// const paddle = new Paddle('pdl_sdbx_apikey_01jvcmp9n7e0kz1a2v7s2jf2kj_9tn6hewkG1nTxgypvEFEjF_AtE', {
//   environment: Environment.sandbox, // or Environment.sandbox for accessing sandbox API
//   logLevel: LogLevel.verbose, // or LogLevel.error for less verbose logging
 
// })

// export default paddle;

import { Environment, LogLevel, Paddle, PaddleOptions } from '@paddle/paddle-node-sdk';

// export function getPaddleInstance() {
//   const paddleOptions: PaddleOptions = {
//     // environment: (process.env.NEXT_PUBLIC_PADDLE_ENV as Environment) ?? Environment.sandbox,
//     environment: Environment.sandbox,
//     logLevel: LogLevel.error,
//   };

//   // if (!process.env.PADDLE_API_KEY) {
//   //   console.error('Paddle API key is missing');
//   // }

//   return new Paddle('pdl_sdbx_apikey_01jvcmp9n7e0kz1a2v7s2jf2kj_9tn6hewkG1nTxgypvEFEjF_AtE', paddleOptions);
// }

const paddle = new Paddle('pdl_sdbx_apikey_01jvcmp9n7e0kz1a2v7s2jf2kj_9tn6hewkG1nTxgypvEFEjF_AtE', {environment: Environment.sandbox, logLevel: LogLevel.error})

async function getSubs() {
    try {
        // Pass the product id get
        const response = await paddle.products.list()
        
        const serializedData = JSON.parse(JSON.stringify(response))
        // Returns a serialized version of the subscription data
        return serializedData
    } catch (e) {
        // Handle Network/API errors
        console.error(e)
    }
}

export default getSubs