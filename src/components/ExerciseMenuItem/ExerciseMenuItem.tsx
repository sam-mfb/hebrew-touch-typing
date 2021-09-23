import classNames from 'classnames';
import React, {useMemo} from 'react';
import {ExerciseType} from '../../constants/practiceAndReviewLetterSets';
import {LettersExercise} from '../../utils/generateLetterExercises';
import {useExerciseContext} from '../ExerciseContext/ExerciseContext';
import LetterKeycap from '../LetterKeycap/LetterKeycap';
import {useUserDataContext} from '../UserDataProvider/UserDataProvider';
import * as styles from './exercise-menu-item.scss';

interface ExerciseMenuItemProps {
  exercise: LettersExercise;
}

const ExerciseMenuItem: React.FC<ExerciseMenuItemProps> = ({exercise}) => {
  const {userData} = useUserDataContext();
  const {selectedExercise, setSelectedExercise} = useExerciseContext();

  const wpmRecord = useMemo(() => {
    return userData.exercises[exercise.index]?.wpmRecord;
  }, [exercise.index, userData]);

  const isSelected = useMemo(() => {
    return selectedExercise?.index === exercise.index;
  }, [exercise.index, selectedExercise?.index]);

  return (
    <button
      className={classNames(styles.root, {
        [styles.selectedExercise]: isSelected,
      })}
      data-testid="exercise-menu-item"
      onClick={() => setSelectedExercise(exercise)}
    >
      {wpmRecord && (
        <div className={styles.wpm}>{wpmRecord.toFixed(0)} WPM</div>
      )}
      <div className={styles.lessonType}>
        {exercise.type === ExerciseType.PRACTICE ? 'תרגול' : 'שיעור'}
      </div>
      <div className={styles.keycaps}>
        {exercise.newLetters.map(letter => (
          <LetterKeycap key={letter} letter={letter} />
        ))}
      </div>
      <div
        data-testid={`exercise-number-pill-${exercise.index + 1}`}
        className={styles.exerciseNumberPill}
      >
        {exercise.index + 1}
      </div>
    </button>
  );
};

export default ExerciseMenuItem;
