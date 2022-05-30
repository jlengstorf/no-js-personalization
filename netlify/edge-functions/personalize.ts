import { Context } from 'netlify:edge';
import {
  HTMLRewriter,
  Element,
} from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';
import { getScoreFromCookie } from './utils/cookies.ts';

export default async (_request: Request, context: Context) => {
  const score = getScoreFromCookie(context);

  if (score.food === 0 && score.corgis === 0) {
    return;
  }

  let prioritize = 'none';
  if (score.food > score.corgis) {
    prioritize = 'food';
  }

  if (score.corgis > score.food) {
    prioritize = 'corgis';
  }

  return new HTMLRewriter()
    .on('.products', {
      element(element: Element) {
        element.setAttribute('data-prioritize', prioritize);
      },
    })
    .transform(await context.next());
};
