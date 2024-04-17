import ScenarioHeader from '@/app/common/components/chatbot-components/scenario/scenario-header/ScenarioHeader';
import ScenarioList from '@/app/common/components/chatbot-components/scenario/scenario-list/ScenarioList';
import React from 'react';

const page = () => {
  return (
    <div>
      <ScenarioHeader />
      <ScenarioList />
    </div>
  );
};

export default page;
