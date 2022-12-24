import type { NextPage } from "next";
import Head from "next/head";
import { GetPrefecture } from "@/api/resas";
import { Checkbox } from "@/components/checkbox";
import { Graph } from "@/components/graph";

type PrefectureType = {
  prefCode: number;
  prefName: string;
};

type HomePageProps = {
  prefData: PrefectureType[];
};

const Home: NextPage<HomePageProps> = ({ prefData }) => {
  const exampleData = [
    { name: "test1", data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 6, 4, 3, 3] },
    { name: "test1", data: [2, 5, 6, 8, 4, 2] },
  ];

  return (
    <>
      <Head>
        <title>都道府県人口推移グラフ</title>
        <meta name='description' content='都道府県の人口推移をグラフで見ることができます。' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Graph populationData={exampleData} />
        <ul className='prefLists'>
          {prefData?.map((item) => {
            return (
              <li key={item.prefCode} className='list'>
                <Checkbox text={item.prefName} onChange={() => console.log(item.prefCode)} />
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
  const prefArray = await GetPrefecture().then((data) => data);
  return { props: { prefData: prefArray || null } };
}
