import React, { useRef, useEffect } from 'react';
import { getChartData } from '../../utils/data';

interface IMapProps {
  data: IDataItem[]
}

export default function Chart(props: IMapProps) {
  const el = useRef(null);

  useEffect(() => {
    function drawRegionsMap() {
      const data = window.google.visualization.arrayToDataTable(getChartData(props.data));

      const options = {
        curveType: 'function',
        legend: { position: 'bottom' },
      };
      const chart = new window.google.visualization.LineChart(el.current);

      chart.draw(data, options);
    }

    window.google.charts.load('current', {
      packages: ['corechart'],
    });
    window.google.charts.setOnLoadCallback(drawRegionsMap);
  }, []);

  return <div className="chart" ref={el} />;
}
