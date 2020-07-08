import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import validator from '@middy/validator';
import { commonMiddleware } from '../lib/commonMiddleware';
import createError from 'http-errors';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { WithBody } from '../lib/WithBody';

interface Body {
  title: string;
  description: string;
}

const taskSchema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
      },
    },
  },
  required: ['body'],
};

const dynamodb = new AWS.DynamoDB.DocumentClient();

const createTask: APIGatewayProxyHandler = async (
  event: WithBody<APIGatewayProxyEvent, Body>,
) => {
  const { title, description } = event.body;
  const createdAt = new Date().toISOString();
  const task = {
    id: uuid(),
    title,
    description,
    createdAt,
  };

  try {
    await dynamodb
      .put({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Item: task,
      })
      .promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError('Something went horribly wrong');
  }
  return {
    statusCode: 201,
    body: JSON.stringify(task),
  };
};

export const handler = commonMiddleware(createTask).use(
  validator({ inputSchema: taskSchema }),
);
