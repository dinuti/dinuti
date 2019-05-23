import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormSession } from 'src/app/model/form';
import { ServiceService } from 'src/app/providers/service.service';

@Component({
  selector: 'app-form-session',
  templateUrl: './form-session.component.html',
  styleUrls: ['./form-session.component.scss']
})
export class FormSessionComponent implements OnInit {

  @Output() startSession = new EventEmitter<boolean>();
  form: FormSession = new FormSession();

  constructor(private service: ServiceService) {}

  ngOnInit() {
  }

  postLocation() {
    this.service.createSession(this.form).then((location) => {
      this.startSession.emit(true);
    });
  }

}
