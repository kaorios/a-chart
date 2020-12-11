import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, Title } from 'chart.js'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title)
const MAX_ITEM_COUNT = 8

const colorPallet = [
  'rgb(236,119,164)',
  'rgb(200,108,233)',
  'rgb(142,109,226)',
  'rgb(79,183,234)',
  'rgb(78,214,194)',
  'rgb(231,210,167)',
  'rgb(247,189,139)',
  'rgb(239,131,102)',
]
interface Data {
  label: string | null,
  value: number | null,
}

export default function Home() {
  const chartRef = useRef(null)
  const [title, setTitle] = useState<string>('Chart Title')
  const [chart, setChart] = useState<Chart<"doughnut", number[], string> | null>(null)
  const [data, setData] = useState<Data[]>([
    { label: 'Red', value: 100 },
    { label: 'Blue', value: 30 },
  ])

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  const handleChangeData = (i: number) => (event) => {
    const newData = [...data]
    newData[i] = {
      ...newData[i],
      [event.target.name]: event.target.value,
    }
    setData(newData)
  }

  const handleAddItem = () => {
    if (data.length < MAX_ITEM_COUNT) {
      setData([...data, {
        label: 'Item',
        value: 10,
      }])
    }
  }

  const handleDownload = () => {
    const pngUrl = chart.toBase64Image();
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = `${title}.png`;
    a.href = pngUrl;
    a.click();
    a.remove();
  }

  const updateData = () => {
    if (chart) {
      const labels = data.reduce((arr, cur) => [...arr, cur.label], [])
      const values = data.reduce((arr, cur) => [...arr, cur.value], [])
      chart.data.labels = labels
      chart.data.datasets[0].data = values
      chart.update()
    }
  }

  useEffect(() => {
    if (chartRef) {
      if (chart) {
        updateData();
      } else {
        const labels = data.reduce((arr, cur) => [...arr, cur.label], []);
        const values = data.reduce((arr, cur) => [...arr, cur.value], []);
        setChart(new Chart(chartRef.current.getContext('2d'), {
          type: 'doughnut',
          data: {
            labels,
            datasets: [{
              data: values,
              backgroundColor: colorPallet,
              borderWidth: 1,
              hoverOffset: 4,
            }]
          },
          options: {
            interaction: {
              mode: 'nearest'
            },
            plugins: {
              title: {
                display: true,
                text: title,
                padding: {
                  bottom: 24,
                },
                font: {
                  size: 24,
                }
              },
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  font: {
                    size: 14,
                  },
                  generateLabels: (c) => {
                    const { data } = c;
                    const { datasets, labels } = data || {};
                    if (data && labels?.length && datasets?.length) {
                      return data.labels.map((label, i) => {
                        const meta = c.getDatasetMeta(0);
                        const ds = datasets[0];
                        const value = datasets[0].data[i];
                        const { options } = meta.data[i];
                        return {
                          text: `${label} : ${value} (${Math.round(value / meta.total * 10000) / 100}%)`,
                          fillStyle: options?.backgroundColor,
                          lineWidth: 0,
                          hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                          index: i
                        };
                      });
                    } else {
                      return [];
                    }
                  },
                }
              }
            }
          }
        }));
      }
    }
  }, [chartRef]);

  useEffect(() => {
    updateData()
  }, [data])

  useEffect(() => {
    if (chart) {
      chart.options.plugins.title.text = title;
      chart.update()
    }
  }, [title])

  useEffect(() => {
    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-500 mb-4">Chart Title</div>
          <input
            type="text"
            className="w-full border-b mb-8"
            value={title}
            onChange={handleChangeTitle}
          />
          <div className="text-sm text-gray-500 mb-4">Data</div>
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="w-1/2 text-left border-b py-4">Item</th>
                <th className="w-1/2 text-left border-b py-4">Value</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((d, i) => (
                  <tr key={i}>
                    <td className="border-b py-4">
                      <input type="text" name="label" value={d.label || ''} onChange={handleChangeData(i)} />
                    </td>
                    <td className="border-b py-4">
                      <input type="text" name="value" value={d.value || ''} onChange={handleChangeData(i)} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <button
            className="w-full p-4 text-center add-item-button disabled:opacity-30 disabled:cursor-default"
            onClick={handleAddItem}
            disabled={data.length >= MAX_ITEM_COUNT}
          >
            Add Item
          </button>
        </div>
        <div>
          <canvas ref={chartRef} width="400" height="400"></canvas>
          <div className="mt-12 text-center">
            <button
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
