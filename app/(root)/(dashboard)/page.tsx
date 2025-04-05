'use client';

import { ApiCaller } from '@/api';
import DashboardStats from '@/components/dashboard/dashboard-stats';
import { DivContainer } from '@/components/ui/container';
import { useAppDialog } from '@/context/DialogContext';
import { ICollege, ISpecialty, ISubject } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const { openDialog } = useAppDialog();
  const [query, setQuery] = React.useState<string>('');
  const [response, setResponse] = React.useState<string>('');
  const [busy, setBusy] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const [collegeId, setCollegeId] = useState<string>('');
  const [specialtyId, setSpecialtyId] = useState<string>('');
  const [subjectId, setSubjectId] = useState<string>('');

  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  const [lBusy, setLbusy] = useState<boolean>(false);
  const [mBusy, setMbusy] = useState<boolean>(false);

  /// Get colleges
  const { data: colleges, isLoading } = useQuery({
    queryKey: ['colleges'],
    queryFn: async () => {
      const response = await ApiCaller.get<ICollege[]>('/colleges');
      return response || [];
    },
  });

  useEffect(() => {
    //ensure coolegeId is sellected
    if (isLoading || !colleges || !collegeId) return;
    setLbusy(true);
    const getCollegeById = colleges?.find(
      (college) => college.id === collegeId,
    );
    if (getCollegeById) {
      setSpecialties(getCollegeById.specialties);
    }
    setLbusy(false);
  }, [colleges, isLoading, collegeId]);

  useEffect(() => {
    if (lBusy || !specialties || !specialtyId) return;
    setMbusy(true);
    const getSpecialtyById = specialties?.find(
      (specialty) => specialty.id === specialtyId,
    );
    if (getSpecialtyById) {
      setSubjects(getSpecialtyById.subjects);
    }
    setMbusy(false);
  }, [lBusy, specialties, specialtyId]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) {
      alert('Please enter a query');
      return;
    }
    setBusy(true);
    try {
      const res = await ApiCaller.post<string>('/openai/generate_question', {
        college: collegeId,
        specialty: specialtyId,
        subject: subjectId,
        query,
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
          <div className="w-1/3 min-h-40 bg-green-200 border p-4">
            <span>
              <h1 className="text-2xl font-bold">AI Question Builder</h1>
              <p className="text-sm text-gray-700 my-2">
                Generate questions for your examination using AI.
              </p>
            </span>
            <div className="flex flex-col">
              <label htmlFor="college">Select College</label>
              <select
                id="college"
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
                required
                disabled={busy || isLoading}
              >
                <option value="" disabled>
                  {isLoading ? 'Loading...' : 'Select College'}
                </option>
                {colleges?.map((college) => (
                  <option key={college.id} value={college.id}>
                    {college.collegeCode}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="specialty">Select Specialty</label>
              <select
                id="specialty"
                value={specialtyId}
                onChange={(e) => setSpecialtyId(e.target.value)}
                required
                disabled={lBusy || !specialties}
              >
                <option value="" disabled>
                  {lBusy ? 'Loading...' : 'Select Specialty'}
                </option>
                {specialties?.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="subject">Select Subject</label>
              <select
                id="subject"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                required
                disabled={mBusy || !subjects}
              >
                <option value="" disabled>
                  {mBusy ? 'Loading...' : 'Select Subject'}
                </option>
                {subjects?.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="query">Enter Query</label>
              <textarea
                name="query"
                id="query"
                className="p-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your query here..."
              />
            </div>
            <button type="submit" className="btn my-3">
              {busy ? 'Querying AI...' : 'Query AI'}
            </button>
          </div>
          <div className="w-2/3 min-h-40 bg-blue-200 border p-4">
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
