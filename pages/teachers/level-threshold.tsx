import TeacherLayout from '@/components/layouts/TeacherLayout';
import LevelsThresholdChart from '@/components/parents/threshold/LevelThreshold';
import LevelThresholdComponent from '@/components/parents/threshold/LevelThresholdComponent';
import AddStudentModal from '@/components/Teachers/students/AddStudentModal';
import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { styles } from './students';

export default function TeacherLevelsThreshold() {
    const { students } = useSelector((state: RootState) => state.students);
    const [isOpen, setIsOpen] = useState<boolean>(false);
 
    if (!students || students?.length === 0) {
       return(
          <div className={styles.addDiv} onClick={() => setIsOpen(true)}>
             <FiPlus size={25} className={styles.plusIcon} />
             <p className="sm:block">Add Student</p>
          </div>
       )
    }
  
  return (
    <TeacherLayout>
      <LevelsThresholdChart size="base" />
      <LevelThresholdComponent />
        {isOpen && <AddStudentModal setIsOpen={setIsOpen} />}
    </TeacherLayout>
  );
}