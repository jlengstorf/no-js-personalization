import { Context } from 'netlify:edge';
import {
  HTMLRewriter,
  Element,
} from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';
import { getScoreFromCookie } from './utils/cookies.ts';

type Product = {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  category: 'food' | 'corgis';
  link: string;
};

export default async (_request: Request, context: Context) => {
  const score = getScoreFromCookie(context);

  if (score.food === 0 && score.corgis === 0) {
    return;
  }

  const endpoint = new URL(
    Deno.env.get('URL') || 'https://no-js-personalization.netlify.app/',
  );
  endpoint.pathname = '/api/products';

  console.log({ endpoint: endpoint.toString() });

  const res = await fetch(endpoint.toString());

  if (!res.ok) {
    return;
  }

  const products = await res.json();

  console.log({ products });

  let prioritize = 'none';
  if (score.food > score.corgis) {
    prioritize = 'food';
  }

  if (score.corgis > score.food) {
    prioritize = 'corgis';
  }

  const sorted = products.sort((a: Product, b: Product) => {
    let cat = 0;
    if (a.category !== b.category) {
      cat = a.category === prioritize ? -1 : 1;
    }

    return cat === 0 ? a.id - b.id : cat;
  });

  const sortedMarkup = sorted.map((product: Product) => {
    return `
      <div class="product" data-category="${product.category}">
        <img
          src="${product.imageSrc}"
          alt="${product.imageAlt}"
        />
        <h2>${product.name}</h2>
        <p>
          ${product.description}
        </p>
        <p class="details-link">
          <a href="${product.link}">Details</a>
        </p>
      </div>
    `;
  });

  return new HTMLRewriter()
    .on('.products', {
      element(element: Element) {
        element.setInnerContent(sortedMarkup.join(''), { html: true });
      },
    })
    .transform(await context.next());
};
