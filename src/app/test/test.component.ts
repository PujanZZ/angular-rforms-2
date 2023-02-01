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
        experienceInYears: [
          '',
          [
            Validators.required,
            Validators.maxLength(3),
            Validators.minLength(1),
          ],
        ],
        level: ['Easy', [Validators.required]],
      }),
    });

    this.carForm.get('name').valueChanges.subscribe((val: string) => {
      this.nameLength = val.length;
    });
  }

  logValues(grp: FormGroup): void {
    //console.log(Object.keys(grp.controls));
    Object.keys(grp.controls).forEach((key: string) => {
      const abstractControl = grp.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValues(abstractControl);
      } else {
        console.log('Key: ' + key + ', Value: ' + abstractControl.value);
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
    this.logValues(this.carForm);
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
