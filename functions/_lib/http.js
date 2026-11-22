import { form } from "./form.js";

export const json = (body, status = 200, extraHeaders = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...extraHeaders },
  });

export function adminKeyFrom(request) {
  const url = new URL(request.url);
  return (
    request.headers.get("x-admin-key") ||
    url.searchParams.get("key") ||
    ""
  );
}

/** Sabit zamanli karsilastirma (anahtar uzunlugu sizdirmaz). */
export function safeEqual(a, b) {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  let diff = ab.length ^ bb.length;
  const len = Math.max(ab.length, bb.length);
  for (let i = 0; i < len; i++) {
    diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

export function isAuthorized(request, env) {
  const expected = env.ADMIN_KEY;
  if (!expected) return false;
  const provided = adminKeyFrom(request);
  if (!provided) return false;
  return safeEqual(provided, expected);
}

export const formFields = form.sections.flatMap((s) => s.fields);
