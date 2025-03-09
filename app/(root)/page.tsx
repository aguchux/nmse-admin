'use client';

import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const LandingPage = () => {
  const data = useMemo(
    () => [
      {
        name: 'Jan',
        total: 167,
      },
      {
        name: 'Feb',
        total: 245,
      },
      {
        name: 'Mar',
        total: 328,
      },
      {
        name: 'Apr',
        total: 403,
      },
      {
        name: 'May',
        total: 459,
      },
      {
        name: 'Jun',
        total: 512,
      },
      {
        name: 'Jul',
        total: 573,
      },
    ],
    [],
  );

  return (
    <>
      <ResponsiveContainer width="10µvc%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#ff7300"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            contentStyle={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              padding: '8px',
            }}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default LandingPage;
