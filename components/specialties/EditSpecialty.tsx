'use client';

import { ApiCaller } from '@/api';
import { useAppDialog } from '@/context/DialogContext';
import { ICollege, ISpecialty } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { TitleText } from '../ui/title';

const EditSpecialty = ({ id: specialtyId }: { id?: string }) => {
  const { id } = useParams();
  const specialtyIdParam = specialtyId || id;
  const { closeDialog, isOpen } = useAppDialog();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [collegeId, setCollegeId] = useState<string>('');

  const [busy, setBusy] = React.useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();



  const { data: colleges, isLoading:isLoadingColleges } = useQuery({
    queryKey: ['colleges'],
    queryFn: async () => {
      const response = await ApiCaller.get<ICollege[]>('/colleges');
      return response || [];
    },
  });


  const { data: specialty, isLoading } = useQuery({
    queryKey: ['specialty', specialtyIdParam],
    queryFn: async () => {
      const res = await ApiCaller.get<ISpecialty>(
        `/specialties/${specialtyIdParam}`,
      );
      return res;
    },
    enabled: !!specialtyIdParam,
  });

  useEffect(() => {
    if (specialty) {
      setName(specialty.name);
      setDescription(specialty.description);
    }
  }, [specialty]);

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
      const specialty = await ApiCaller.patch<ISpecialty>(
        `/specialties/${specialtyIdParam}`,
        {
          name,
          description,
        },
      );
      if (specialty) {
        toast.success('Specialty updated successfully');
        await queryClient.invalidateQueries({
          queryKey: ['specialty', specialtyIdParam],
        });
        await queryClient.invalidateQueries({
          queryKey: ['specialties'],
        });
        setName('');
        setDescription('');
        if (isOpen) {
          closeDialog();
        }
      } else {
        toast.error('Failed to update Specialty');
      }
    } catch (error) {
      console.error('Error creating Specialty:', error);
      toast.error('Error creating Specialty');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <TitleText>Update Specialty</TitleText>
      <div className="flex flex-col">
        <label htmlFor="name">Specialty Name</label>
        <input
          type="text"
          id="name"
          placeholder="Specialty name"
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
        <label htmlFor="description">Specialty Description</label>
        <textarea
          id="description"
          className="p-4"
          placeholder="Enter Specialty description"
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
        <button disabled={isBusy} className="btn">
          {busy ? 'Updating Specialty...' : 'Update Specialty'}
        </button>
      </div>
    </form>
  );
};

export default EditSpecialty;
