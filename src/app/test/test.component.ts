import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  carForm: FormGroup;
  nameLength = 0;

  validationMessages = {
    name: {
      required: 'name is required',
      minlength: 'Min length 2',
      maxlength: 'Max length 10',
    },
    email: {
      required: 'email is required',
      email: 'invalid email format',
    },
    skillName: {
      required: 'Skill name is required',
    },
    experienceInYears: {
      required: 'Experience is required',
    },
    level: {
      required: 'Select skill level',
    },
  };

  formErrors = {
    name: '',
    email: '',
    skillName: '',
    experienceInYears: '',
    level: '',
  };

  constructor(private fb: FormBuilder) {}

  // ngOnInit() {
  //   this.carForm = new FormGroup({
  //     name: new FormControl(),
  //     email: new FormControl(), //obj 2 form controls of form group
  //     skills: new FormGroup({
  //       skillName: new FormControl(),
  //       experienceInYears: new FormControl(),
  //       level: new FormControl(),
  //     }),
  //   });
  // }

  //using formbuilder class
  ngOnInit() {
    this.carForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      skills: this.fb.group({
        skillName: ['', [Validators.required]],
        experienceInYears: ['', [Validators.required]],
        level: ['', [Validators.required]],
      }),
    });

    // this.carForm.get('name').valueChanges.subscribe((val: string) => {
    //   this.nameLength = val.length;
    // });
  }

  logErrors(grp: FormGroup): void {
    //console.log(Object.keys(grp.controls));
    Object.keys(grp.controls).forEach((key: string) => {
      const abstractControl = grp.get(key);
      if (abstractControl instanceof FormGroup) {
        //to get nested formcontrol key, looping recursively
        this.logErrors(abstractControl);
      } else {
        if (abstractControl && !abstractControl.valid) {
          const msg = this.validationMessages[key];
          // console.log(msg);
          // console.log(abstractControl.valid);
        }
      }
    });
  }

  onSubmit(): void {
    //console.log(this.carForm);
    //console.log(this.carForm.controls.name.status);
    //console.log(this.carForm.get('email').touched);  //.value etc
    //console.log(this.carForm.get('skills').value.level);
  }
  onKey(): void {
    this.logErrors(this.carForm);
  }

  //setvalue for all values,patchvalue to update subset
  onLoad(): void {
    this.carForm.patchValue({
      name: 'xyz',
      email: 'xyz@gmail.com',
      skills: {
        skillName: 'Cricket',
        experienceInYears: '5',
        level: 'Hard',
      },
    });
  }
}
