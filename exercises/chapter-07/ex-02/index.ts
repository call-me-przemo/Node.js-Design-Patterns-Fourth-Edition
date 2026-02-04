import { HttpMethod, RequestBuilder } from "./request-builder";

const postResponse = await new RequestBuilder()
  .setMethod(HttpMethod.POST)
  .setUrl("http://jsonplaceholder.typicode.com/posts")
  .setHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
  })
  .setBody(JSON.stringify({ name: "John Doe", role: "USER" }))
  .invoke();

postResponse.pipe(process.stdout);

const getResponse = await new RequestBuilder()
  .setUrl("http://jsonplaceholder.typicode.com/posts/8")
  .invoke();

getResponse.pipe(process.stdout);
