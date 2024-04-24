import React from 'react';
import ScenarioCard from '../scenario-card/ScenarioCard';

const ScenarioList = () => {
  const dummyData = [
    { id: 1, name: 'Program one', numberOfQuestion: '30', isActive: false },
    { id: 2, name: 'Program two', numberOfQuestion: '20', isActive: true },
    { id: 2, name: 'Program two', numberOfQuestion: '20', isActive: true },
    { id: 2, name: 'Program two', numberOfQuestion: '20', isActive: true },
    { id: 2, name: 'Program two', numberOfQuestion: '20', isActive: true },
    { id: 2, name: 'Program two', numberOfQuestion: '20', isActive: true },
    { id: 2, name: 'Program two', numberOfQuestion: '20', isActive: true },
    { id: 2, name: 'Program two', numberOfQuestion: '20', isActive: true },
  ];

  return (
    <div className="flex gap-4 flex-wrap">
      {dummyData?.map((scenario, key) => (
        <ScenarioCard
          key={key}
          id={scenario?.id}
          isActive={scenario?.isActive}
          name={scenario?.name}
          numberOfQuestions={scenario?.numberOfQuestion}
        />
      ))}
    </div>
  );
};

export default ScenarioList;
