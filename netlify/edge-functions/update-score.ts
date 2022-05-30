import { Context } from 'netlify:edge';
import { getScoreFromCookie, setScoreCookie } from './utils/cookies.ts';

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  if (!['/', '/corgis', '/food'].includes(url.pathname)) {
    return;
  }

  const score = getScoreFromCookie(context);

  if (url.pathname === '/food') {
    score.food += 10;
  }

  if (url.pathname === '/corgis') {
    score.corgis += 10;
  }

  setScoreCookie(context, score);
};
