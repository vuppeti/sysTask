import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackForm: FormGroup;
  submitted: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      'name': ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      'email': ['', [Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3}))$/)]],
      'mobile': ['', [Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3}))$/),
                      Validators.pattern('[6-9]\\d{9}'/*"^[0-9]*$"*/)]],
      'fbComment': ['', Validators.required]
    })
  }

  feedbackSubmit(){
    this.submitted = true;
    if(this.feedbackForm.valid){
      sessionStorage.setItem('UserFeedback' , JSON.stringify(this.feedbackForm.value))
      this.submitted = false;
      this.feedbackForm.reset();
      console.log(this.feedbackForm.value);
    }
  }

  get feedbackErrors(){
    return this.feedbackForm.controls
  }

}
