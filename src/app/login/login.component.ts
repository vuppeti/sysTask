import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  submitted: boolean;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      
      'email':  ['', [Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3}))$/)]],
      'password': ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }
  get loginFormErrors(){
    return this.loginForm.controls
  }
  loginFormSubmit(){
    this.submitted = true;
    if(this.loginForm.valid){
      this.router.navigate(['/list'])
      console.log('great');  
    }
    else{
      return console.log('Invalid Credentials')
    }
  }
}
