import { Context } from 'netlify:edge';
import { encode, decode } from 'https://deno.land/std/encoding/base64.ts';

type Score = {
  food: number;
  corgis: number;
};

export function getScoreFromCookie(context: Context): Score {
  const base64Cookie = context.cookies.get('score');
  const score = base64Cookie
    ? JSON.parse(new TextDecoder().decode(decode(base64Cookie)))
    : { food: 0, corgis: 0 };

  return score;
}

export function setScoreCookie(context: Context, score: Score) {
  const encodedScore = encode(JSON.stringify(score));

  context.cookies.set({
    name: 'score',
    value: encodedScore,
    sameSite: 'Strict',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}
