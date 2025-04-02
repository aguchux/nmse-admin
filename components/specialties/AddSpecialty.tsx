'use client';

import { ApiCaller } from '@/api';
import { ISpecialty } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { TitleText } from '../ui/title';
//new college
const AddSpecialty = () => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [busy, setBusy] = useState(false);
  const router = useRouter();
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
      const specialty = await ApiCaller.post<ISpecialty>('/specialties', {
        name,
        description,
      });
      if (specialty) {
        toast.success('Specialty created successfully');
        setName('');
        setDescription('');
        await router.push('/specialties');
      } else {
        toast.error('Failed to create Specialty');
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
      <TitleText>Create Specialty</TitleText>
      <div className="flex flex-col">
        <label htmlFor="name">Specialty Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter college name"
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
        <label htmlFor="description">Specialty Description</label>
        <textarea
          id="description"
          className="p-4"
          placeholder="Enter college description"
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
        <button disabled={busy} className="btn">
          {busy ? 'Creating Specialty...' : 'Create Specialty'}
        </button>
      </div>
    </form>
  );
};

export default AddSpecialty;
