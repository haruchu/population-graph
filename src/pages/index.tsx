import type { NextPage } from "next";
import Head from "next/head";
import { Checkbox } from "@/components/checkbox";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>都道府県人口推移グラフ</title>
        <meta name='description' content='都道府県の人口推移をグラフで見ることができます。' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Checkbox text='text' onChange={(checked) => console.log(checked)} />
      </main>
    </>
  );
};

export default Home;
