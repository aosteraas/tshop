import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { commonMiddleware } from '../lib/commonMiddleware';
import { WithPathParams } from '../lib/WithPathParams';
import createError from 'http-errors';

interface PathParams {
  id: number;
}

const items = ['this', 'is', 'some', 'array'];

const getItem: APIGatewayProxyHandler = async (
  event: WithPathParams<APIGatewayProxyEvent, PathParams>,
) => {
  const { id } = event.pathParameters;

  if (id > items.length) {
    throw new createError.BadRequest();
  }

  const item = items[id - 1];

  return {
    statusCode: 200,
    body: JSON.stringify({ item }),
  };
};

export const handler = commonMiddleware(getItem);
