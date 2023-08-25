import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'


// ** Third Party Imports
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from '@core/components/react-apexcharts'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../@store';
import { useEffect, useState } from 'react';
import { fetchSundayServicePresence } from '../../../@store/dashboard';

export const hexToRGBA = (hexCode: string, opacity: number) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}


const SundayServicePresence = () => {
  // ** Hook
  const theme = useTheme()


  const [loadMaximumValue, setLoadMaximumValue] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<any>([]);
  const [maximumValue, setMaximumValue] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchSundayServicePresence({ type: 'Week', amount: 5 }))
      .then(() => {
        const categories: string[] = [];
        const absenceSeries: number[] = [];
        const totalMemberSeries: number[] = [];

        (store.presents as any || [])
          .forEach((present: any) => {

            categories.push(present.date);

            absenceSeries.push(present?.absenceAmount || 0);
            totalMemberSeries.push(present?.memberAmount || 0);

            if (present?.absenceAmount > maximumValue) {
              setMaximumValue(present?.absenceAmount || 0);
            }

            if (present?.memberAmount > maximumValue) {
              setMaximumValue(present?.memberAmount || 0);
            }
          });


        setLoadMaximumValue(false);
        setCategories(categories);

        setSeries([
          {
            type: 'column',
            name: 'Total Members',
            data: totalMemberSeries
          },
          {
            type: 'line',
            name: 'Absent Members',
            data: absenceSeries
          }
        ]);
      });


  }, [dispatch, loadMaximumValue]);

  const options: ApexOptions = {
    chart: {
      offsetY: -9,
      offsetX: -16,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '35%',
        colors: {
          ranges: [
            {
              to: 15,
              from: 0,
              color: hexToRGBA(theme.palette.error.main, 1)
            },
            {
              to: 30,
              from: 16,
              color: hexToRGBA(theme.palette.warning.main, 1)
            },
            {
              to: 60,
              from: 31,
              color: hexToRGBA(theme.palette.success.main, 1)
            },
            {
              to: 61,
              from: 1000,
              color: hexToRGBA(theme.palette.primary.main, 1)
            }
          ]
        }
      }
    },
    markers: {
      size: 3.5,
      strokeWidth: 2,
      fillOpacity: 1,
      strokeOpacity: 1,
      colors: [theme.palette.background.paper],
      strokeColors: hexToRGBA(theme.palette.primary.main, 1)
    },
    stroke: {
      width: [0, 1],
      colors: [
        theme.palette.warning.main
      ]
    },
    legend: { show: false },
    dataLabels: { enabled: false },

    colors: [
      hexToRGBA(theme.palette.primary.main, 1),
      hexToRGBA(theme.palette.warning.main, 1),
    ],
    grid: {
      strokeDashArray: 7,
      borderColor: theme.palette.divider
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    tooltip: {
      theme: theme.palette.mode,
      marker: {
        show: true
      },
      x: {
        show: false
      }
    },
    xaxis: {
      categories,
      tickPlacement: 'on',
      labels: {
        show: true,
        style: {
          fontSize: '0.75rem',
          colors: theme.palette.text.primary,
        }
      },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      min: 0,
      max: maximumValue < 10 ? 10 : maximumValue,
      show: true,
      tickAmount: 3,
      labels: {
        style: {
          fontSize: '0.75rem',
          colors: theme.palette.text.primary,
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title="Sunday Service"
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [0, 0] }
        }}
      />
      <CardContent>
        <ReactApexcharts type="line" height={158} options={options} series={series}/>
      </CardContent>
    </Card>
  )
}

export default SundayServicePresence
