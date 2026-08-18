// pages/parents/level-threshold.tsx
import ParentLayout from '@/components/layouts/ParentLayout';
import LevelsThresholdChart from '@/components/parents/threshold/LevelThreshold';
import LevelThresholdComponent from '@/components/parents/threshold/LevelThresholdComponent';
import NoChild from '@/components/parents/UI/NoChild';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useTranslation } from 'react-i18next';

export default function LevelThreshold() {
  const { children } = useSelector((state: RootState) => state.parentChild);
  const { t } = useTranslation("parent");
  
  if (!children || children?.length === 0) {
    return <NoChild />;
  }
  
  return (
    <ParentLayout title={t("levelsThreshold")} showChildrenList>
      <LevelsThresholdChart size="base" />
      <LevelThresholdComponent />
    </ParentLayout>
  );
}