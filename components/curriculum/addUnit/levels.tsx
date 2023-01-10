import React, { FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Props, styles, availableLevels } from '.';
import { ILevels } from 'types/interfaces';
import { updateLevels } from 'store/unitsSlice';
import { FaChevronDown, FaPlus } from 'react-icons/fa';

const Levels: FC<Props> = ({ openedModal, updateOpenedModal }) => {
  const { levels, standard } = useSelector((state: RootState) => state.unit.addUnit);
  return (
    <article className="flex flex-row gap-x-2 relative">
      <div
        className={`${styles.topic} ${
          openedModal === 'level' ? ' outline-mainPurple' : 'outline-transparent'
        }`}
        onClick={(event: any) => {
          if (!event.target.classList.contains('dropdown')) {
            updateOpenedModal('level');
          }
        }}
      >
        <h1>Level(s)</h1>
        <i>
          <FaChevronDown />
        </i>
        {openedModal === 'level' && (
          <div className={styles.preview}>
            {standard === 'Advance' &&
              availableLevels
                .filter((level: ILevels) => level.title === 'Orange')
                .map((level: ILevels, index: number) => {
                  return <LevelsInputContainer level={level} key={index} />;
                })}
            {standard !== 'Advance' &&
              availableLevels.map((level: ILevels, index: number) => (
                <LevelsInputContainer level={level} key={index} />
              ))}
          </div>
        )}
      </div>
      <div className={styles.numbersSelectedContainer}>
        {levels === '' ? (
          `0 levels selected`
        ) : (
          <span className={styles.selectedItems}>{levels}</span>
        )}
      </div>
    </article>
  );
};

const LevelsInputContainer = ({ level }: { level: ILevels }) => {
  const dispatch = useDispatch();
  const { levels } = useSelector((state: RootState) => state.unit.addUnit);
  return (
    <div className={`${styles.inputContainer} relative`}>
      <input
        type="radio"
        name="levels"
        id={level.title}
        onChange={() => {
          dispatch(updateLevels({ value: level.title, type: 'add' }));
        }}
        className="hidden dropdown"
      />
      <label
        htmlFor={level.title}
        className={`hover:text-mainPurple dropdown ${levels === level.title && 'text-mainPurple'}`}
      >
        {level.title}
      </label>
      <p className={`hoverText right-[0px] -top-[10px] bg-mainPurple after:bg-mainPurple`}>
        {level.hoverText}
      </p>
    </div>
  );
};

export default Levels;
