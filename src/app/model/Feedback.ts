import {FeedbackCategory} from './FeedbackCategory';

export interface Feedback{
  id: number;
  name: string;
  emailAddress: string;
  text: string;
  feedbackCategories: Array<FeedbackCategory>;
}
