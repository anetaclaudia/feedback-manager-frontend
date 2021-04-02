import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Feedback} from '../model/Feedback';
import {FeedbackCategory} from '../model/FeedbackCategory';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService{
  private feedbackUrl = 'api/feedback';
  private feedbackCategoryUrl = 'api/category';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient) {
  }

  /** GET feedbacks from the server */
  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.feedbackUrl);
  }

  /** GET feedback categories from the server */
  getFeedbackCategories(): Observable<FeedbackCategory[]>{
    return this.http.get<FeedbackCategory[]>(this.feedbackCategoryUrl);
  }

  /** POST - add a new feedback to the server */
  addFeedback(feedback: Feedback): Observable<Feedback>{
    console.log(feedback);
    return this.http.post<Feedback>(this.feedbackUrl, feedback, this.httpOptions);
  }
}
