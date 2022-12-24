const API_URL = "https://opendata.resas-portal.go.jp/api/v1/";
import fetch from "node-fetch";

const API_KEY = process.env.API_KEY ?? "";

export const GetPrefecture = async () => {
  const res = await fetch(`${API_URL}prefectures`, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  return await res.json().then((res) => res.result);
};
