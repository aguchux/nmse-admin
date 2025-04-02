'use client';

import { ApiCaller } from '@/api';
import { useAppDialog } from '@/context/DialogContext';
import { ICollege } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { TitleText } from '../ui/title';

const EditCollege = ({ id: _id }: { id?: string }) => {
  const { id } = useParams();
  const idParam = _id || id;
  const { closeDialog, isOpen } = useAppDialog();

  const [collegeName, setCollegeName] = React.useState('');
  const [collegeCode, setCollegeCode] = React.useState('');
  const [collegeDescription, setCollegeDescription] = React.useState('');

  const [busy, setBusy] = React.useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch college data
  const { data: college, isLoading } = useQuery({
    queryKey: ['college', idParam],
    queryFn: async () => {
      const res = await ApiCaller.get<ICollege>(`/colleges/${idParam}`);
      return res;
    },
    enabled: !!idParam,
  });

  useEffect(() => {
    if (college) {
      setCollegeName(college.collegeName);
      setCollegeCode(college.collegeCode);
      setCollegeDescription(college.description);
    }
  }, [college]);

  const isBusy = isLoading || busy;

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
      const college = await ApiCaller.patch<ICollege>(`/colleges/${idParam}`, {
        collegeName,
        collegeCode,
        description: collegeDescription,
      });
      if (college) {
        toast.success('College updated successfully');
        await queryClient.invalidateQueries({
          queryKey: ['college', idParam],
        });
        await queryClient.invalidateQueries({
          queryKey: ['colleges'],
        });

        setCollegeName('');
        setCollegeCode('');
        setCollegeDescription('');
        if (isOpen) {
          closeDialog();
        }
        await router.push('/colleges');
      } else {
        toast.error('Failed to update college');
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
          disabled={isBusy}
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
          disabled={isBusy}
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
          disabled={isBusy}
        ></textarea>
      </div>
      <div className="flex flex-col">
        <button disabled={isBusy} className="btn">
          {busy ? 'Updating College...' : 'Update College'}
        </button>
      </div>
    </form>
  );
};

export default EditCollege;
