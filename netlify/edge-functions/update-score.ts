import { Context } from 'netlify:edge';
import { getScoreFromCookie, setScoreCookie } from './utils/cookies.ts';

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  if (!['/corgis', '/food'].some((path) => url.pathname.startsWith(path))) {
    return;
  }

  const score = getScoreFromCookie(context);

  if (url.pathname.startsWith('/food')) {
    score.food += 10;
  }

  if (url.pathname.startsWith('/corgis')) {
    score.corgis += 10;
  }

  await setScoreCookie(context, score);
};
