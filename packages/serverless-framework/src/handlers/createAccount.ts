import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { commonMiddleware } from '../lib/commonMiddleware';
import validator from '@middy/validator';
import { WithBody } from '../lib/WithBody';
import createError from 'http-errors';

const schema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  },
  required: ['body'],
};

interface Body {
  username: string;
  password: string;
}

const createAccount: APIGatewayProxyHandler = async (
  event: WithBody<APIGatewayProxyEvent, Body>,
) => {
  const { username, password } = event.body;

  if (!username?.length || !password?.length) {
    throw new createError.BadRequest(`Username and Password required`);
  }
  // do something with this, register account etc.
  return {
    statusCode: 200,
    body: JSON.stringify({ username, password }),
  };
};

export const handler = commonMiddleware(createAccount).use(
  validator({ inputSchema: schema }),
);
