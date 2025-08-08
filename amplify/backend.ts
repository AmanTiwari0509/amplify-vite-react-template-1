import { defineBackend } from '@aws-amplify/backend';
import { Stack } from "aws-cdk-lib";
import { RestApi, LambdaIntegration, Cors } from "aws-cdk-lib/aws-apigateway"
import { auth } from './auth/resource';
import { data } from './data/resource';

defineBackend({
  auth,
  data,
});
