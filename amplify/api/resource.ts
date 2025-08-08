// backend/api/resource.ts
import { defineFunction } from "@aws-amplify/backend";

export const helloWorldFunction = defineFunction({
  name: "hello-world",
  entry: "./function/hello-world.ts", // path to your handler
});
