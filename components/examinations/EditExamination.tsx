'use client';

import { ApiCaller } from '@/api';
import { ICollege, IExamination } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TitleText } from '../ui/title';

const EditExamination = () => {
  const { id } = useParams();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [collegeId, setCollegeId] = useState<string>('');

  const [busy, setBusy] = React.useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: colleges, isLoading: isLoadingColleges } = useQuery({
    queryKey: ['colleges'],
    queryFn: async () => {
      const response = await ApiCaller.get<ICollege[]>('/colleges');
      return response || [];
    },
  });

  // Fetch examination data
  const { data: examination, isLoading } = useQuery({
    queryKey: ['examination', id],
    queryFn: async () => {
      const res = await ApiCaller.get<IExamination>(`/examinations/${id}`);
      return res;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (examination) {
      setTitle(examination.title);
      setDescription(examination.description);
      setCollegeId(examination.collegeId);
    }
  }, [examination]);

  const isBusy = isLoading || busy;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    if (!title || !description || !collegeId) {
      toast.error('Please fill all fields');
      return;
    }
    setBusy(true);
    try {
      const examination = await ApiCaller.patch<IExamination>(
        `/examinations/${id}`,
        {
          title,
          description,
          collegeId,
        },
      );
      if (examination) {
        toast.success('Examination updated successfully');
        await queryClient.invalidateQueries({
          queryKey: ['examination', id],
        });
        setTitle('');
        setDescription('');
        setCollegeId('');
      } else {
        toast.error('Failed to update examination');
      }
    } catch (error) {
      console.error('Error updating examination:', error);
      toast.error('Error updating examination');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <TitleText>Update Examination</TitleText>
      <div className="flex flex-col">
        <label htmlFor="title">Examination Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Exam Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength={3}
          maxLength={150}
          pattern="[A-Za-z0-9\s]+"
          title="Only alphanumeric characters and spaces are allowed."
          disabled={busy}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description">Examination Description</label>
        <textarea
          id="description"
          className="p-4"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          cols={50}
          maxLength={500}
          minLength={10}
          required
          disabled={busy}
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label htmlFor="college">Select College (Code)</label>
        <select
          id="college"
          value={collegeId}
          onChange={(e) => setCollegeId(e.target.value)}
          required
          disabled={busy || isLoadingColleges}
        >
          <option value="" disabled>
            {isLoadingColleges ? 'Loading...' : 'Select College'}
          </option>
          {colleges?.map((college) => (
            <option key={college.id} value={college.id}>
              {college.collegeName} ({college.collegeCode})
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <button disabled={busy} className="btn">
          {busy ? 'Updating Examination...' : 'Update Examination'}
        </button>
      </div>
    </form>
  );
};

export default EditExamination;
