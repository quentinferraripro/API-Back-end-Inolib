export type JSON = string | number | boolean | JSON[] | JSONObject | null;

export type JSONObject = {
  [property: string]: JSON;
};
