import { Component, OnInit } from '@angular/core';
import { FormLocation } from 'src/app/model/form';
import { ServiceService } from 'src/app/providers/service.service';

@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.scss']
})
export class FormLocationComponent implements OnInit {

  form: FormLocation = new FormLocation();

  constructor(private service: ServiceService) {}

  ngOnInit() {
  }

  postLocation() {
    this.service.createLocation(this.form).then((location) => {
      // créer la session
    });
  }

}
