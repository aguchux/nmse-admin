'use client';

import { ApiCaller } from '@/api';
import { useAppDialog } from '@/context/DialogContext';
import { ICollege, ISpecialty, ISubject } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CreateExamination = () => {
  const queryClient = useQueryClient();
  const { closeDialog, isOpen } = useAppDialog();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [collegeId, setCollegeId] = useState<string>('');
  const [specialtyId, setSpecialtyId] = useState<string>('');
  const [subjectId, setSubjectId] = useState<string>('');

  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  const [busy, setBusy] = useState<boolean>(false);
  const [lBusy, setLbusy] = useState<boolean>(false);
  const [mBusy, setMbusy] = useState<boolean>(false);

  const router = useRouter();

  /// Get colleges
  const { data: colleges, isLoading: isLoadingCollege } = useQuery({
    queryKey: ['colleges'],
    queryFn: async () => {
      const response = await ApiCaller.get<ICollege[]>('/colleges');
      return response || [];
    },
  });

  useEffect(() => {
    //ensure coolegeId is sellected
    if (isLoadingCollege || !colleges || !collegeId) return;
    setLbusy(true);
    const getCollegeById = colleges?.find(
      (college) => college.id === collegeId,
    );
    if (getCollegeById) {
      setSpecialties(getCollegeById.specialties);
    }
    setLbusy(false);
  }, [colleges, isLoadingCollege, collegeId]);

  // useEffect(() => {
  //   if (lBusy || !specialties || !specialtyId) return;
  //   setMbusy(true);
  //   const getSpecialtyById = specialties?.find(
  //     (specialty) => specialty.id === specialtyId,
  //   );
  //   if (getSpecialtyById) {
  //     setSubjects(getSpecialtyById.subjects);
  //   }
  //   setMbusy(false);
  // }, [lBusy, specialties, specialtyId]);

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
        specialtyId,
      });
      if (response) {
        toast.success('Examination created successfully!');
        setTitle('');
        setDescription('');
        setCollegeId('');
        setSpecialtyId('');
        setSubjectId('');
        await queryClient.invalidateQueries({
          queryKey: ['examinations'],
        });
        if (isOpen) {
          closeDialog();
        } else {
          router.push('/examinations');
        }
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
          disabled={busy || isLoadingCollege}
        >
          <option value="" disabled>
            {isLoadingCollege ? 'Loading...' : 'Select College'}
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

      {/* <div className="flex flex-col">
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
      </div> */}

      <div className="flex flex-col">
        <button disabled={busy} className="btn">
          {busy ? 'Creating Examination...' : 'Create Examination'}
        </button>
      </div>
    </form>
  );
};

export default CreateExamination;
