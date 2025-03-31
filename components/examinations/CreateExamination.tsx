'use client';

import { ApiCaller } from '@/api';
import { ICollege } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { TitleText } from '../ui/title';

const CreateExamination = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [collegeId, setCollegeId] = useState<string>('');
  const [busy, setBusy] = useState<boolean>(false);

  const router = useRouter();

  const { data: colleges, isLoading } = useQuery({
    queryKey: ['colleges'],
    queryFn: async () => {
      const response = await ApiCaller.get<ICollege[]>('/colleges');
      return response || [];
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    if (!title || !description || !collegeId) {
      toast.error('Please fill all fields');
      return;
    }
    setBusy(true);
    try {
      const response = await ApiCaller.post('/examinations', {
        title,
        description,
        collegeId,
      });
      if (response) {
        toast.success('Examination created successfully!');
        router.push('/examinations');
      } else {
        toast.error('Failed to create examination. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while creating the examination.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <TitleText>Create Examination</TitleText>
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
          disabled={busy || isLoading}
        >
          <option value="" disabled>
            {isLoading ? 'Loading...' : 'Select College'}
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
          {busy ? 'Creating Examination...' : 'Create Examination'}
        </button>
      </div>
    </form>
  );
};

export default CreateExamination;
