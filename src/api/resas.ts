const API_URL = "https://opendata.resas-portal.go.jp/api/v1/";
import fetch from "node-fetch";

const API_KEY = process.env.API_KEY ?? "";

// 都道府県取得API
export const GetPrefecture = async () => {
  const res = await fetch(`${API_URL}prefectures`, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  return await res.json().then((res) => res.result);
};

// 都道府県コードに紐づく人口推移のデータを取得
export const GetPopulation = async (code: number) => {
  const res = await fetch(`${API_URL}population/composition/perYear?cityCode=-&prefCode=${code}`, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  return await res.json().then((res) => res.result.data);
};
