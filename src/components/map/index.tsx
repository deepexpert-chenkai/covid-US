import React, { useRef, useEffect } from 'react';
import { getStateCount } from '../../utils/data';

interface IMapProps {
  data: IDataItem[]
}

export default function Map(props: IMapProps) {
  const el = useRef(null);

  useEffect(() => {
    function drawRegionsMap() {
      const data = window.google.visualization.arrayToDataTable([
        ['State', 'Case'],
        ...getStateCount(props.data),
      ]);

      const options = {
        region: 'US',
        displayMode: 'regions',
        resolution: 'provinces',
        colorAxis: { colors: ['#ffffff', '#C00000'] },
      };
      const chart = new window.google.visualization.GeoChart(el.current);

      chart.draw(data, options);
    }
    window.google.charts.load('current', {
      packages: ['geochart'],
    });
    window.google.charts.setOnLoadCallback(drawRegionsMap);
  }, []);

  return <div className="map" ref={el} />;
}
