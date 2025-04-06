'use client';

import { ApiCaller } from '@/api';
import { useAppDialog } from '@/context/DialogContext';
import { ICollege } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { TitleText } from '../ui/title';
//new college
const AddCollege = () => {
  const { closeDialog } = useAppDialog();
  const [collegeName, setCollegeName] = useState('');
  const [collegeCode, setCollegeCode] = useState('');
  const [collegeDescription, setCollegeDescription] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    if (!collegeName || !collegeCode || !collegeDescription) {
      toast.error('Please fill all fields');
      return;
    }
    setBusy(true);
    try {
      const college = await ApiCaller.post<ICollege>('/colleges', {
        collegeName,
        collegeCode,
        description: collegeDescription,
      });
      if (college) {
        toast.success('College created successfully');
        setCollegeName('');
        setCollegeCode('');
        setCollegeDescription('');
        await queryClient.invalidateQueries({
            queryKey: ['colleges']
        });
        closeDialog();
        // Optionally redirect or update the UI after successful creation
        await router.push('/colleges');
      } else {
        toast.error('Failed to create college');
      }
    } catch (error) {
      console.error('Error creating college:', error);
      toast.error('Error creating college');
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <TitleText>Create College</TitleText>
      <div className="flex flex-col">
        <label htmlFor="collegeName">College Name</label>
        <input
          type="text"
          id="collegeName"
          placeholder="Enter college name"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          required
          minLength={3}
          maxLength={150}
          pattern="[A-Za-z0-9\s]+"
          title="Only alphanumeric characters and spaces are allowed."
          disabled={busy}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="collegeCode">College Code</label>
        <input
          type="text"
          id="collegeName"
          placeholder="Enter college code"
          value={collegeCode}
          onChange={(e) => setCollegeCode(e.target.value)}
          required
          minLength={3}
          maxLength={50}
          pattern="[A-Za-z0-9\s]+"
          title="Only alphanumeric characters and spaces are allowed."
          disabled={busy}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="collegeDescription">College Description</label>
        <textarea
          id="collegeDescription"
          className="p-4"
          placeholder="Enter college description"
          value={collegeDescription}
          onChange={(e) => setCollegeDescription(e.target.value)}
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
          {busy ? 'Creating College...' : 'Create College'}
        </button>
      </div>
    </form>
  );
};

export default AddCollege;
