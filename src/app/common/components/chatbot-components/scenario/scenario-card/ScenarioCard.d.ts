export type ScenarioCardProps = {
  id: string | number;
  name: string;
  isActive?: boolean;
  numberOfQuestions: string | number;
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (id: string | number) => void;
};
