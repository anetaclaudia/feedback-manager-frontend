import { Component, OnInit } from '@angular/core';
import { FeedbackService} from '../service/feedback.service';
import {FormGroup, FormControl, Validators, AbstractControl, FormBuilder} from '@angular/forms';
import {Feedback} from '../model/Feedback';
import {CommonService} from '../service/common.service';
import {FeedbackCategory} from '../model/FeedbackCategory';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit{
  feedbackCategories: FeedbackCategory[];

  feedbackForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private feedbackService: FeedbackService,
              private commonService: CommonService) {

  }
  ngOnInit(): void {
    this.getFeedbackCategories();

    this.feedbackForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[\u00f5\u00d5\u00e4\u00c4\u00f6\u00d6\u00fc\u00dc\u0161\u0160\u017e\u017da-zA-Z -]*')
        ]
      ),
      emailAddress: new FormControl(null, [Validators.required,
        Validators.pattern('[0-9a-zA-Z._-]+@[0-9a-zA-Z._-]+.[a-z]{2,}')]),
      text: new FormControl(null, Validators.required),
      feedbackCategories: new FormControl( null)
    });
  }

  private getFeedbackCategories(): void{
    this.feedbackService.getFeedbackCategories().subscribe( feedbackCategories =>
    {
      this.feedbackCategories = feedbackCategories;
      console.log(feedbackCategories);
    });
  }

  onSubmit(): void{
    const feedback: Feedback = this.feedbackForm.value as Feedback;
    const feedbackCategoryIds: FeedbackCategory[] = [];
    console.log(feedback);
    for (const cat of feedback.feedbackCategories) {
      const category: FeedbackCategory = {
        id: cat as unknown as number
      };
      feedbackCategoryIds.push(category);
    }
    feedback.feedbackCategories = feedbackCategoryIds;
    console.log(feedback);
    this.feedbackService.addFeedback(feedback).subscribe(
      _ => {
        this.commonService.sendUpdate();
      }
    );
    this.feedbackForm.reset();
  }

  get name(): AbstractControl { return this.feedbackForm.get('name'); }
  get emailAddress(): AbstractControl { return this.feedbackForm.get('emailAddress'); }
  get text(): AbstractControl { return this.feedbackForm.get('text'); }
}


