import type { FlexibleObject } from "./types";

const headers = { 'Content-Type': 'application/json' };
const credentials = 'include';

const fetchDefaults: RequestInit = { method: 'GET', headers, credentials };

export const deleteOpts = { method: 'DELETE', headers, credentials };

export const makeMutateOpts = <T>(data: T, method = 'POST',): RequestInit => ({
  method, headers, credentials, body: JSON.stringify(data),
});

export default async function fetchHelper<ResultType>(
  route: string,
  opts = fetchDefaults
): Promise<{ result: ResultType, metadata: FlexibleObject }> {
  const host = '/api';

  const response = await fetch(host + route, opts);
  const { ok, status, statusText, headers } = response;
  if (!ok) throw new Error(`${status} - Fetch failed`, { cause: { status, statusText } });

  const isJson = (headers.get('content-type') || '').includes('application/json');
  const result = await (isJson ? response.json() : response.text());

  return result;
}