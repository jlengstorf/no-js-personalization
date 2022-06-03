import { builder, Handler } from '@netlify/functions';
import fetch from 'node-fetch';

type Product = {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  category: 'food' | 'corgis';
  link: string;
};

export const handler: Handler = builder(async () => {
  const res = await fetch(
    'https://zero-js-personalized.hasura.app/v1/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query AllProducts {
            products(order_by: {id: asc}) {
              id
              name
              description
              imageSrc
              imageAlt
              category
              link
            }
          }
        `,
        variables: {},
      }),
    },
  );

  if (!res.ok) {
    console.error(res);

    return {
      statusCode: 500,
      body: 'Error loading data',
    };
  }

  const { data } = (await res.json()) as { data: { products: Product[] } };
  const products = data.products;

  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
});
