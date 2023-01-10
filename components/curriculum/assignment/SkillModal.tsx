import React, { ChangeEventHandler, MouseEventHandler, useState, useEffect } from 'react';

import { TbMedal } from 'react-icons/tb';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import { Button } from '../../../components';

import { SkillDetails, DynamicChechbox } from '../../../types/interfaces';

import { useDispatch } from 'react-redux';
import { updateSkills, searchSkills } from '../../../store/skillsSlice';

const SkillModal = ({
  skills,
  hideModal,
  handleSkillCheckboxChange,
  skillCheckbox,
}: {
  skills: SkillDetails[];
  hideModal: MouseEventHandler;
  handleSkillCheckboxChange: ChangeEventHandler;
  skillCheckbox: DynamicChechbox;
}) => {
  const [grade, setGrade] = useState('Grade 1');
  const [skillType, setSkillType] = useState('CTSA');
  const [searchParams, setSearchParams] = useState('');
  const [pickerDisplay, setPickerDisplay] = useState({
    grade: false,
    skill: false,
  });
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => e.target.value);
    dispatch(searchSkills({ params: e.target.value, grade, skillType }));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateSkills({ grade, skillType }));
  }, [dispatch, grade, skillType]);
  return (
    <div className="py-8 min-h-[650px] w-fit">
      <div className="flex gap-8 pl-12  h-full items-stretch mb-auto grow">
        <div className="w-[180px] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Select Skill</h3>
            <div className="mt-12 flex flex-col gap-4">
              <div className="px-4 py-2 flex items-center justify-between w-full rounded-lg h-[46px] bg-gray-100 drop-shadow-md">
                <p className="opacity-60 text-sm font-semibold">Computer</p>
              </div>
              <div className="px-4 py-2 flex items-center justify-between w-full relative rounded-lg z-top h-[46px] bg-gray-100 drop-shadow-md">
                <p className="opacity-60 text-sm font-semibold truncate ...">{skillType}</p>
                <span
                  className="opacity-60 text-3xl cursor-pointer"
                  onClick={() => {
                    setPickerDisplay((prev) => {
                      return { grade: false, skill: !prev.skill };
                    });
                  }}
                >
                  <RiArrowDropDownLine />
                </span>
                {pickerDisplay.skill && (
                  <div className="grid grid-cols-1 items-center gap-1 w-[90%] absolute top-10 left-0 rounded-lg overflow-y-auto h-32 bg-gray-100 drop-shadow-md small-scroll-thumb">
                    {['CTSA', 'Kansas', 'New York', 'Missouri'].map((skill) => (
                      <span
                        key={skill}
                        className="opacity-50 text-sm text-center py-2 cursor-pointer hover:bg-gray-300 font-semibold"
                        onClick={() => {
                          setSkillType((prev) => skill);
                          setPickerDisplay((prev) => {
                            return { grade: false, skill: false };
                          });
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="px-4 py-2 flex items-center justify-between w-full rounded-lg h-[46px] relative bg-gray-100 drop-shadow-md">
                <p className="opacity-60 text-sm font-semibold truncate ...">{grade}</p>
                <span
                  className="opacity-60 text-3xl cursor-pointer"
                  onClick={() => {
                    setPickerDisplay((prev) => {
                      return { skill: false, grade: !prev.grade };
                    });
                  }}
                >
                  <RiArrowDropDownLine />
                </span>
                {pickerDisplay.grade && (
                  <div className="grid grid-cols-1 items-center gap-1 w-[90%] absolute top-10 left-0 rounded-lg overflow-y-auto h-48 bg-gray-100 drop-shadow-md small-scroll-thumb">
                    {[
                      'Kindergarden',
                      'Grade 1',
                      'Grade 2',
                      'Grade 3',
                      'Grade 4',
                      'Grade 5',
                      'Grade 6',
                      'Grade 7',
                      'Grade 8',
                    ].map((grade) => (
                      <span
                        key={grade}
                        className="opacity-50 text-sm text-center py-2 cursor-pointer hover:bg-gray-300 font-semibold"
                        onClick={() => {
                          setGrade((prev) => grade);
                          setPickerDisplay((prev) => {
                            return { grade: false, skill: false };
                          });
                        }}
                      >
                        {grade}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <span onClick={hideModal} className="">
            <Button color="#F28E2C" text="Done" />
          </span>
        </div>
        <div>
          <div className="relative max-w-[80%] bg-gray-100 rounded-lg px-16 py-[10px]">
            <input
              type="text"
              className="bg-transparent outline-none border-none placeholder:font-semibold"
              name="search"
              value={searchParams}
              onChange={handleSearchInput}
              placeholder="Search skill"
            />
            <span className="absolute left-4 top-3 text-2xl text-gray-400">
              <HiMagnifyingGlass />{' '}
            </span>
          </div>
          <div className="mt-12 h-[500px] pr-4 scroll-smooth overflow-y-auto grid grid-cols-1 gap-6 small-scroll-thumb">
            {skills.map(({ categoryId, categoryTitle, tests }) => (
              <div
                key={categoryId}
                className="rounded-xl bg-white drop-shadow-md border h-fit max-w-[550px]"
              >
                <div className="border-b h-14 pl-4 pr-[84px] flex justify-between gap-8 items-center relative">
                  <div className="flex items-center gap-4">
                    <div className="text-[#F28E2C] text-3xl">
                      <TbMedal />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{categoryId}</h3>
                      <p
                        className="opacity-60 text-sm font-semibold truncate ... w-[300px] cursor-default"
                        title={categoryTitle}
                      >
                        {categoryTitle}
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#F28E2C]/70 text-xs font-bold opacity-70 rounded-2xl py-1 px-4 absolute right-5 top-4 truncate ...">
                    {tests.length} {tests.length > 1 ? 'skills' : 'skill'}
                  </span>
                </div>
                <div className="divide-y">
                  {tests.map(({ testTitle, testId }) => (
                    <div key={testId} className="flex px-6 h-12 gap-4 items-center">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          name={testId}
                          checked={skillCheckbox[testId]}
                          onChange={handleSkillCheckboxChange}
                        />
                        <span className="checkmark small-checkmark"></span>
                      </label>
                      <p className="opacity-60 text-sm font-semibold truncate ... w-full">
                        {testTitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillModal;
