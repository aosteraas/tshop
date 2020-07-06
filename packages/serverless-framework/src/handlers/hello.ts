import { APIGatewayProxyHandler } from 'aws-lambda';
import { commonMiddleware } from '../lib/commonMiddleware';

const hello: APIGatewayProxyHandler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ hello: 'world' }),
  };
};

export const handler = commonMiddleware(hello);
