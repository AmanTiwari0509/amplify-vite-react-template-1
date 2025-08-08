// backend/backend.ts
import { defineBackend } from "@aws-amplify/backend";
import { Stack } from "aws-cdk-lib";
import { RestApi, LambdaIntegration, Cors } from "aws-cdk-lib/aws-apigateway";

import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { helloWorldFunction } from "./api/resource";

const backend = defineBackend({
  auth,
  data,
  helloWorldFunction,
});

const apiStack = backend.createStack("api-stack");

// Create REST API
const restApi = new RestApi(apiStack, "MyRestApi", {
  restApiName: "MyAmplifyApi",
  deployOptions: { stageName: "dev" },
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
    allowHeaders: Cors.DEFAULT_HEADERS,
  },
});

// Link Lambda to API route
const lambdaIntegration = new LambdaIntegration(
  backend.helloWorldFunction.resources.lambda
);

const helloResource = restApi.root.addResource("hello");
helloResource.addMethod("GET", lambdaIntegration);

// Output endpoint
backend.addOutput({
  custom: {
    API: {
      endpoint: restApi.url,
    },
  },
});
