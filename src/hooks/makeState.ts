import { GetPopulation } from "@/api/resas";

type populationType = {
  year: number;
  value: number;
};

// usage
// 既に読み込んだ人口データのキャッシュを更新する関数
const updateLoadedPopDataCache = async (
  newPrefCode: number,
  loadedPopDataCache: Map<number, number[]>,
) => {
  const res = await GetPopulation(newPrefCode);
  const newLoadedData = new Map(loadedPopDataCache);
  newLoadedData.set(
    newPrefCode,
    res[0].data.map((item: populationType) => item.value),
  );
  return newLoadedData;
};

// usage
// 現在チェックがついている都道府県の配列を更新する関数
const updateCheckedPrefCodes = (
  isChecked: boolean,
  checkedPrefCodes: number[],
  newPrefCode: number,
) => {
  if (isChecked) {
    return checkedPrefCodes.filter((code) => code !== newPrefCode);
  } else {
    if (!checkedPrefCodes.includes(newPrefCode)) {
      return [...checkedPrefCodes, newPrefCode];
    }
    return checkedPrefCodes;
  }
};

// usage
// ①チェックの入っている都道府県の配列を更新して返す
// ②チェックが入った都道府県の人口データのキャッシュを作成して返す
export const makeStates = async (
  isChecked: boolean,
  newPrefCode: number,
  checkedPrefCodes: number[],
  loadedPopDataCache: Map<number, number[]>,
) => {
  const newStates = {
    newCheckedPrefCodes: checkedPrefCodes,
    newLoadedPrefData: loadedPopDataCache,
  };

  if (!isChecked) {
    newStates.newLoadedPrefData = await updateLoadedPopDataCache(newPrefCode, loadedPopDataCache);
  }

  newStates.newCheckedPrefCodes = updateCheckedPrefCodes(isChecked, checkedPrefCodes, newPrefCode);

  return newStates;
};
