import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './components/chart/index';
import Map from './components/map/index';
import Table from './components/table/index';
import './app.scss';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://data.cdc.gov/resource/8396-v7yb.json').then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  if (!data) {
    return <div className="loading" />;
  }

  return (
    <div>
      <div className="row">
        <div className="topic">
          <h3>New Cases Distribution</h3>
          <Map data={data} />
        </div>
        <div className="topic">
          <h3>Total Number of New Cases in US </h3>
          <Chart data={data} />
        </div>
      </div>
      <div className="topic">
        <h3>Detail Data </h3>
        <Table data={data} />
      </div>
    </div>
  );
}
