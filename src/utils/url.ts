export interface IParsed {
  [s: string]: string
}

export function parseLocation<T> (location:string, params: string[]) {
  const parsed: IParsed = {};
  const pg = new URLSearchParams(location);
  params.forEach(param => {
    const newParam = pg.get(param);
    if (newParam)
      parsed[param] = newParam;
    else
      parsed[param] = '';
  });
  return parsed as unknown as T;
}
