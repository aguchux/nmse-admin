'use client';

import { ApiCaller } from '@/api';
import { useAppDialog } from '@/context/DialogContext';
import { ISpecialty, ISubject } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { TitleText } from '../ui/title';

const EditSubject = ({ id: subjectId }: { id?: string }) => {
  const { id } = useParams();
  const subjectIdParam = subjectId || id;
  const { closeDialog, isOpen } = useAppDialog();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [specialtyId, setSpecialtyId] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: specialties, isLoading: isLoadingSpecialties } = useQuery({
    queryKey: ['specialties'],
    queryFn: async () => {
      const response = await ApiCaller.get<ISpecialty[]>('/specialties');
      return response || [];
    },
  });

  const { data: subject, isLoading } = useQuery({
    queryKey: ['subject', subjectIdParam],
    queryFn: async () => {
      const res = await ApiCaller.get<ISubject>(`/subjects/${subjectIdParam}`);
      return res;
    },
    enabled: !!subjectIdParam,
  });

  useEffect(() => {
    if (subject && !isLoadingSpecialties) {
      setName(subject.name);
      setDescription(subject.description);
      setSpecialtyId(subject.specialty.id);
    }
  }, [subject, isLoadingSpecialties]);

  const isBusy = isLoading || busy;

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
      const subject = await ApiCaller.patch<ISubject>(
        `/subjects/${subjectIdParam}`,
        {
          name,
          description,
          specialtyId,
        },
      );
      if (subject) {
        toast.success('Subject updated successfully');
        await queryClient.invalidateQueries({
          queryKey: ['subject', subjectIdParam],
        });
        await queryClient.invalidateQueries({
          queryKey: ['subjects'],
        });
        setName('');
        setDescription('');
        if (isOpen) {
          closeDialog();
        }
      } else {
        toast.error('Failed to update Subject');
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
      <TitleText>Update Subject</TitleText>
      <div className="flex flex-col">
        <label htmlFor="name">Subject Name</label>
        <input
          type="text"
          id="name"
          placeholder="Subject name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={3}
          maxLength={150}
          pattern="[A-Za-z0-9\s]+"
          title="Only alphanumeric characters and spaces are allowed."
          disabled={isBusy}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description">Subject Description</label>
        <textarea
          id="description"
          className="p-4"
          placeholder="Enter Subject description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          cols={50}
          maxLength={500}
          minLength={10}
          required
          disabled={isBusy}
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
            {isLoadingSpecialties ? 'Loading...' : 'Select Specialty'}
          </option>
          {specialties?.map((specialty) => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <button disabled={isBusy} className="btn">
          {busy ? 'Updating Subject...' : 'Update Subject'}
        </button>
      </div>
    </form>
  );
};

export default EditSubject;
