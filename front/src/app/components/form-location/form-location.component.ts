import { Component, OnInit } from '@angular/core';
import { FormLocation } from 'src/app/model/form';

@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.scss']
})
export class FormLocationComponent implements OnInit {

  form: FormLocation = new FormLocation();

  constructor() {}

  ngOnInit() {
  }

}
