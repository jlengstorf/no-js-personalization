import { Context } from 'netlify:edge';

type Product = {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  category: 'food' | 'corgis';
  link: string;
};

export default async (request: Request, _context: Context) => {
  const reqUrl = new URL(request.url);

  console.log(reqUrl.pathname);

  const endpoint = new URL(
    Deno.env.get('URL') || 'https://no-js-personalization.netlify.app/',
  );
  endpoint.pathname = '/api/products';

  const res = await fetch(endpoint.toString());

  if (!res.ok) {
    return;
  }

  const products = await res.json();

  const product = products.find(
    (product: Product) => product.link === reqUrl.pathname,
  );

  const markup = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${product.name}</title>

    <link rel="stylesheet" href="/styles/main.css" />
  </head>
  <body>
    <header>
      <a href="/" rel="home">
        <img
          src="https://res.cloudinary.com/jlengstorf/image/upload/w_200,q_auto,f_auto/v1593378984/jason.af/tv.png"
          alt="Drawing of a TV"
        />
      </a>

      <nav>
        <a href="/corgis">Corgis</a>
        <a href="/food">Food</a>
      </nav>
    </header>

    <main>
      <section class="product-full">
        <h1>${product.name}</h1>
        <div class="product-details">
          <div class="product-image">
            <img src="${product.imageSrc}" alt="${product.imageAlt}" />
          </div>
          <div class="product-info">
            <p>${product.description}</p>
            <a href="/">&larr; back to all products</a>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>
`;

  const response = new Response(markup);

  response.headers.set('Content-Type', 'text/html');

  return response;
};
