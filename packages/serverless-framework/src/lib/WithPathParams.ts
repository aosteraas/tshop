export type WithPathParams<T, B> = T &
  Omit<T, 'pathParameters'> & { pathParameters: B };
