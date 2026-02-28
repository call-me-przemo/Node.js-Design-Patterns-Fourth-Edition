import { createCachingFetch } from "./caching-fetch";

const cachingFetch = createCachingFetch(fetch);

const resOne = await cachingFetch("https://jsonplaceholder.typicode.com/posts");
console.log(resOne);

const resTwo = await cachingFetch("https://jsonplaceholder.typicode.com/posts");
console.log(resTwo);
