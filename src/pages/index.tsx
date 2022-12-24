import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { GetPrefecture } from "@/api/resas";
import { Checkbox } from "@/components/checkbox";
import { Graph, HighchartsDataType } from "@/components/graph";
import { makeStates } from "@/hooks/makeState";

type PrefectureType = {
  prefCode: number;
  prefName: string;
};

type HomePageProps = {
  prefData: PrefectureType[];
};

const Home: NextPage<HomePageProps> = ({ prefData }) => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);
  const [loadedPopDataCache, setLoadedPopDataCache] = useState(new Map<number, number[]>());

  // usage
  // チェックが入っている都道府県の人口データのみ取得して、グラフに反映する用のデータ作成
  const graphData: HighchartsDataType[] = checkedPrefCodes
    .map((code) => prefData.find((pref) => pref.prefCode === code))
    .filter((pref): pref is PrefectureType => !!pref)
    .map((pref) => ({
      name: pref.prefName,
      data: [...loadedPopDataCache.get(pref.prefCode)],
    }));

  const onChangeGraphData = (checked: boolean, prefCode: number) => {
    makeStates(checked, prefCode, checkedPrefCodes, loadedPopDataCache).then((res) => {
      setCheckedPrefCodes(res.newCheckedPrefCodes);
      setLoadedPopDataCache(res.newLoadedPrefData);
    });
  };

  return (
    <>
      <Head>
        <title>都道府県人口推移グラフ</title>
        <meta name='description' content='都道府県の人口推移をグラフで見ることができます。' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className='graph-wrapper'>
          <Graph populationData={graphData} />
        </div>
        <ul className='prefLists'>
          {prefData?.map((item) => {
            return (
              <li key={item.prefCode} className='list'>
                <Checkbox
                  text={item.prefName}
                  onChange={(isChecked) => onChangeGraphData(isChecked, item.prefCode)}
                />
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  // 都道府県checkboxの一覧を表示するため、都道府県の一覧を取得
  const prefArray = await GetPrefecture().then((data) => data);
  return { props: { prefData: prefArray || null } };
}
