import React from 'react';
import { Bar } from 'react-chartjs-2';

const BOOKINGS_BUCKETS = {
  'Free': {
    min: 0,
    max: 0,
    colour: 'rgb(0, 204, 0)'
  },
  '$': {
    min: 0.01,
    max: 9.99,
    colour: 'rgb(255, 255, 0)'
  },
  '$$': {
    min: 10,
    max: 49.99,
    colour: 'rgb(255, 128, 0)'
  },
  '$$$': {
    min: 50,
    max: 1000000,
    colour: 'rgb(255, 0 , 0)'
  },
}

const BookingsChart = props => {
  const { bookings } = props;

  let chartData = {
    labels: [],
    datasets: []
  };

  let values = [];
  let colours = [];
  let labels = [];

  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = bookings.reduce((prev, current) => {
      if (
        current.event.price >= BOOKINGS_BUCKETS[bucket].min &&
        current.event.price <= BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);

    values.push(filteredBookingsCount);
    labels.push(bucket);
    colours.push(BOOKINGS_BUCKETS[bucket].colour);
  }

  chartData.datasets.push({
    data: values,
    backgroundColor: colours,
  })
  chartData.labels = [...labels];

  if (bookings) {
    return <Bar
      data={chartData}
      height={225}
      options={{
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              beginAtZero: true,
              fontColor: 'white',
              maxTicksLimit: 4
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'white'
            }
          }]
        },
        legend: {
          display: false
        }
      }}
    />;
  } else {
    return null;
  }
}

export default BookingsChart;