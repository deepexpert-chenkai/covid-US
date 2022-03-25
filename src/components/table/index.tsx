import React, { useRef, useEffect } from 'react';
import { getTableData } from '../../utils/data';

interface IMapProps {
  data: IDataItem[]
}

export default function Table(props: IMapProps) {
  const el = useRef(null);

  useEffect(() => {
    function drawRegionsMap() {
      const data = new window.google.visualization.DataTable();
      data.addColumn('string', 'Report Date');
      data.addColumn('string', 'State');
      data.addColumn('string', 'County');
      data.addColumn('string', 'Cases Per 100k 7 Day Count');
      data.addColumn('string', 'Percent Test Results Reported');
      data.addColumn('string', 'Community Transmission Level');
      data.addRows(getTableData(props.data));
      const table = new window.google.visualization.Table(el.current);

      table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
    }
    window.google.charts.load('current', {
      packages: ['table'],
    });
    window.google.charts.setOnLoadCallback(drawRegionsMap);
  }, []);

  return <div className="table" ref={el} />;
}
