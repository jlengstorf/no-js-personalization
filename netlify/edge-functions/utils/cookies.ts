import { Context } from 'netlify:edge';
import { encode, decode } from 'https://deno.land/std/encoding/base64.ts';

type Score = {
  food: number;
  corgis: number;
};

export function getScoreFromCookie(context: Context): Score {
  const base64Cookie = context.cookies.get('score');

  return base64Cookie
    ? JSON.parse(new TextDecoder().decode(decode(base64Cookie)))
    : { food: 0, corgis: 0 };
}

export async function setScoreCookie(context: Context, score: Score) {
  const encodedScore = encode(JSON.stringify(score));

  await context.cookies.set({
    name: 'score',
    value: encodedScore,
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'Strict',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}
