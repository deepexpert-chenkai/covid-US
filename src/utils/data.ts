interface IStateData {
  [key: string]: number
}

interface IDateCount {
  [key: string]: number
}

interface IChartData {
  [key: string]: IDateCount
}

export const getStateCount = (data: IDataItem[]) => {
  const stateData:IStateData = {};
  data.forEach((item) => {
    if (stateData[item.state_name]) {
      stateData[item.state_name] += +item.cases_per_100k_7_day_count || 0;
    } else {
      stateData[item.state_name] = +item.cases_per_100k_7_day_count || 0;
    }
  });

  return Object.keys(stateData).map((stateName) => [stateName, stateData[stateName]]);
};

export const getTableData = (data: IDataItem[]) => data.map((item) => {
  const reportDate = item.report_date.split('T')[0];
  return [
    reportDate,
    item.state_name,
    item.county_name,
    item.cases_per_100k_7_day_count,
    item.percent_test_results_reported,
    item.community_transmission_level,
  ];
});

// chart data devide by state
export const getChartDataByState = (data: IDataItem[]) => {
  const stateData:IChartData = {};
  const dateSet = new Set();
  data.forEach((item) => {
    const reportDate = item.report_date.split('T')[0];
    if (!stateData[item.state_name]) {
      stateData[item.state_name] = {};
    }
    if (!stateData[item.state_name][reportDate]) {
      stateData[item.state_name][reportDate] = 0;
    }
    stateData[item.state_name][reportDate] += +item.cases_per_100k_7_day_count || 0;
    dateSet.add(reportDate);
  });

  const result = [];
  const stateList = Object.keys(stateData);
  const dateList = Array.from(dateSet).sort();
  result.push(['Date', ...stateList]);
  dateList.forEach((date:string) => {
    result.push([date, ...stateList.map((state) => stateData[state][date] || 0)]);
  });
  return result;
};

// chart data for whole US
export const getChartData = (data: IDataItem[]) => {
  const chartData: IDateCount = {};
  const dateSet = new Set();
  data.forEach((item) => {
    const reportDate = item.report_date.split('T')[0];
    if (!chartData[reportDate]) {
      chartData[reportDate] = 0;
    }
    chartData[reportDate] += +item.cases_per_100k_7_day_count || 0;
    dateSet.add(reportDate);
  });

  const dateList = Array.from(dateSet).sort();
  return [
    ['Date', 'US Cases'],
    ...dateList.map((date:string) => [date, chartData[date]]),
  ];
};
