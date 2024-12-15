import { MockupDesignStepsModel } from './mockup-design-steps.model'; // Adjust the path according to your structure
import { ClientUserList } from './user.model';

export interface MockupDesignStepsUserRightsModel {
  mockupDesignStepRightId: number;
  userId?: number;
  mockupStepsId?: number;
  mockupSteps?: MockupDesignStepsModel;
  user?: ClientUserList;
}
