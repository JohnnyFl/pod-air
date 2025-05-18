import {
    getAuthenticatedUser,
    lemonSqueezySetup,
    listProducts
  } from "@lemonsqueezy/lemonsqueezy.js";
  
  const apiKey = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY;

  if (!apiKey) {
    throw new Error("Lemon Squeezy API key not found");
  }
  
 lemonSqueezySetup({
    apiKey,
    onError: (error) => console.error("Error!", error),
  });

  export async function getLemonSqueezyUser() {
    const { data, error } = await getAuthenticatedUser();
    

    if (error) {
      console.log(error.message);
    } else {
      console.log("here:", data);
    }
    return data;
  }
  
//   const { data, error } = await getAuthenticatedUser();
  
//   if (error) {
//     console.log(error.message);
//   } else {
//     console.log(data);
//   }