import { Component, OnInit } from '@angular/core';
import { FormSession } from 'src/app/model/form';
import { ServiceService } from 'src/app/providers/service.service';

@Component({
  selector: 'app-form-session',
  templateUrl: './form-session.component.html',
  styleUrls: ['./form-session.component.scss']
})
export class FormSessionComponent implements OnInit {

  form: FormSession = new FormSession();

  constructor(private service: ServiceService) {}

  ngOnInit() {
  }

  postLocation() {
    this.service.createLocation(this.form).then((location) => {
      // créer la session
    });
  }

}
