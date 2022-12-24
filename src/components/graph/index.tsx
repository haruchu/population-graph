import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export type HighchartsDataType = {
  name: string;
  data: number[];
};

export type GraphProps = {
  populationData: HighchartsDataType[];
};

export const Graph = ({ populationData }: GraphProps) => {
  const options = {
    chart: {
      backgroundColor: "#ECF2FF",
    },
    title: {
      text: "都道府県別の総人口推移",
    },
    lang: {
      noData: "データがありません",
    },
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "20px",
        color: "#000",
      },
    },
    xAxis: {
      categories: Array.from(Array(18).keys(), (x) => 1960 + x * 5),
      title: {
        text: "年度",
      },
    },
    yAxis: {
      title: {
        text: "人口",
      },
    },
    series: populationData,
  };

  return <HighchartsReact highcharts={Highcharts} constructorType={"chart"} options={options} />;
};
