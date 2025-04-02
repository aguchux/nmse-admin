'use client';

import { ApiCaller } from '@/api';
import DashboardStats from '@/components/dashboard/dashboard-stats';
import { DivContainer } from '@/components/ui/container';
import { useAppDialog } from '@/context/DialogContext';
import React from 'react';

export default function Dashboard() {
  const { openDialog } = useAppDialog();
  const [query, setQuery] = React.useState<string>('');
  const [response, setResponse] = React.useState<string>('');
  const [busy, setBusy] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) {
      alert('Please enter a query');
      return;
    }
    setBusy(true);
    try {
      const res = await ApiCaller.post<string>('/openai/generate_exam', {
        college: 'PLAB 1',
        specialty: 'orthopedics',
        subject: 'orthopedics',
        number_of_questions: 5,
      });
      if (res) {
        setResponse(res);
      }
    } catch (error) {
      setError('An error occurred while querying the AI.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="p-4 w-full flex flex-col gap-4">
        <DashboardStats />
      </div>
      <div className="p-4 w-full flex flex-col gap-4">
        <button
          onClick={() =>
            openDialog({
              title: 'Dialog Title',
              content: <div>Dialog Content</div>,
            })
          }
          className="btn"
        >
          launch dialog
        </button>
      </div>
      <DivContainer>
        <form
          onSubmit={onSubmit}
          className="flex flex-row justify-between items-center gap-3"
        >
          <div className="w-1/2 min-h-40 bg-green-200 border p-4">
            <label htmlFor="query">Enter Query</label>
            <textarea
              name="query"
              id="query"
              className="w-full h-auto border p-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query here..."
            />
            <button type="submit" className="btn my-3">
              {busy ? 'Querying AI...' : 'Query AI'}
            </button>
          </div>
          <div className="w-1/2 min-h-40 bg-blue-200 border p-4">
            <label htmlFor="response">AI Response</label>
            <textarea
              name="response"
              id="response"
              className="w-full h-auto border p-2"
              value={JSON.stringify(response, null, 2)}
              readOnly
              placeholder="AI response will appear here..."
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </DivContainer>
    </>
  );
}
