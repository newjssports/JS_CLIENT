import { MockupDesignStepsNameModel } from './mockup-design-steps-name.model'; // Assuming a file structure

export interface MockupDesignStepsModel {
  mockupStepsId: number;
  fromMockupDesignStepId?: number;
  toMockupDesignStepId?: number;
  isMockup?: boolean;
  //isDesign?: boolean;
  //active?: boolean;
  //deleted?: boolean;
  fromMockupDesignStep?: MockupDesignStepsNameModel;
  toMockupDesignStep?: MockupDesignStepsNameModel;
}
