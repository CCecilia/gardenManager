import React, { useEffect, useState } from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { ChartData, getPlantGrowthChartData } from '../../services/ChartData.service';

type Props = {
  plantId: string
};

const PlantGrowthChart: React.FC<Props> = ({plantId}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    (async () => {

      const data = (await getPlantGrowthChartData(plantId)) as ChartData;
      setChartData(data);
    })();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Growth Over Time',
      },
    },
  };

  return <Row>
    <div className="chartjs-size-monitor">
      <div className="chartjs-size-monitor-expand">
        <div className=""></div>
      </div>
      <div className="chartjs-size-monitor-shrink">
        <div className=""></div>
      </div>
    </div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">Growth</h1>
      <div className="btn-toolbar mb-2 mb-md-0">
        <div className="btn-group me-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
          >
            Share
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
          >
            Export
          </button>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary dropdown-toggle"
        >
          <FontAwesomeIcon icon={faCaretDown} />
          This week
        </button>
      </div>
    </div>
    <Row>
      {chartData &&
        <Line
          options={options}
          data={chartData}
          className="my-4 w-100 chartjs-render-monitor chart-size"
          id="myChart"
        />
      }
    </Row>
  </Row>;
};
export default PlantGrowthChart;