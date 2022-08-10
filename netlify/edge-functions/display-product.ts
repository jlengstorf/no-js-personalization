import { Context } from 'netlify:edge';
import {
  HTMLRewriter,
  Element,
} from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

type Product = {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  category: 'food' | 'corgis';
  link: string;
};

export default async (request: Request, context: Context) => {
  const reqUrl = new URL(request.url);

  const endpoint = new URL("/api/products", request.url)
  console.log({ endpoint });

  const res = await fetch(endpoint.toString());

  if (!res.ok) {
    return;
  }

  const products = await res.json();

  const product = products.find(
    (product: Product) => product.link === reqUrl.pathname,
  );

  console.log({ product });

  return new HTMLRewriter()
    .on('[data-prop]', {
      element(element: Element) {
        const prop = element.getAttribute('data-prop');

        switch (prop) {
          case 'name':
            element.setInnerContent(product.name);
            break;

          case 'description':
            element.setInnerContent(product.description);
            break;

          case 'image':
            element.setAttribute('src', product.imageSrc);
            element.setAttribute('alt', product.imageAlt);
            break;

          default:
            console.log(`Unknown data-prop: ${prop}`);
        }
      },
    })
    .transform(await context.next());
};
