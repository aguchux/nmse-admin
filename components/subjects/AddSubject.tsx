'use client';

import { ApiCaller } from '@/api';
import { useAppDialog } from '@/context/DialogContext';
import { ISpecialty, ISubject } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { TitleText } from '../ui/title';
//new college
const AddSubject = () => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [specialtyId, setSpecialtyId] = React.useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { closeDialog, isOpen } = useAppDialog();

  const { data: specialties, isLoading } = useQuery({
    queryKey: ['specialties'],
    queryFn: async () => {
      const response = await ApiCaller.get<ISpecialty[]>('/specialties');
      return response || [];
    },
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    if (!name || !description) {
      toast.error('Please fill all fields');
      return;
    }
    setBusy(true);
    try {
      const Subject = await ApiCaller.post<ISubject>('/subjects', {
        name,
        description,
        specialtyId,
      });
      if (Subject) {
        toast.success('Subject created successfully');
        setName('');
        setDescription('');
        setSpecialtyId('');
        await queryClient.invalidateQueries({
          queryKey: ['subjects'],
        });
        if (isOpen) {
          closeDialog();
        } else {
          await router.push('/subjects');
        }
      } else {
        toast.error('Failed to create Subject');
      }
    } catch (error) {
      console.error('Error creating Subject:', error);
      toast.error('Error creating Subject');
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <TitleText>Create Subject</TitleText>
      <div className="flex flex-col">
        <label htmlFor="name">Subject Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Subject"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={3}
          maxLength={150}
          pattern="[A-Za-z0-9\s]+"
          title="Only alphanumeric characters and spaces are allowed."
          disabled={busy}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Subject Description</label>
        <textarea
          id="description"
          className="p-4"
          placeholder="Enter subject description"
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
        <label htmlFor="specialty">Select Specialty</label>
        <select
          id="specialty"
          value={specialtyId}
          onChange={(e) => setSpecialtyId(e.target.value)}
          required
          disabled={busy || isLoading}
        >
          <option value="" disabled>
            {isLoading ? 'Loading...' : 'Select Specialty'}
          </option>
          {specialties?.map((specialty) => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.name} ({specialty.name})
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <button disabled={busy} className="btn">
          {busy ? 'Creating Subject...' : 'Create Subject'}
        </button>
      </div>
    </form>
  );
};

export default AddSubject;
