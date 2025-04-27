import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "5a03o7rz", // <- Sanity dashboarddan olgan Project ID
  dataset: "production", // yoki boshqa dataset bo'lsa shuni yoz
  apiVersion: "2023-01-01", // hozirgi yil bo'yicha versiya
  useCdn: false, // tezroq yuklash uchun
  token: import.meta.env.VITE_SANITY_TOKEN, // Sanity tokeningizni o'rnating
});

export default sanityClient;
