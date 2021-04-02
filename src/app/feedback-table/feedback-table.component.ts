import {Component, OnDestroy, OnInit} from '@angular/core';
import {Feedback} from '../model/Feedback';
import {FeedbackService} from '../service/feedback.service';
import {CommonService} from '../service/common.service';
import {Subscription} from 'rxjs';
import {FeedbackCategory} from '../model/FeedbackCategory';

@Component({
  selector: 'app-feedback-table',
  templateUrl: './feedback-table.component.html',
  styleUrls: ['./feedback-table.component.css']
})
export class FeedbackTableComponent implements OnInit, OnDestroy {
  feedbacks: Feedback[];
  private subscription: Subscription;

  constructor(private feedbackService: FeedbackService,
              private commonService: CommonService) {
    // subscribe to sender component messages
    this.subscription = this.commonService.getUpdate().subscribe(
      _ => {
        this.getFeedbacks();
      }
    );
  }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  private getFeedbacks(): void{
    this.feedbackService.getAllFeedbacks().subscribe( feedbacks => {
      this.feedbacks = feedbacks;
    });
  }

  ngOnDestroy(): void { // It's a good practice to unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  getNames(feedbackCategories: Array<FeedbackCategory>): string {
    let names = '';
    for (const category of feedbackCategories) {
      names += category.name + ', ';
    }
    names = names.substring(0, names.length - 2);
    return names;
  }
}
