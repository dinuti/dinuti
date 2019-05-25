import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormSession } from 'src/app/model/form';
import { ServiceService } from 'src/app/providers/service.service';

@Component({
  selector: 'app-form-session',
  templateUrl: './form-session.component.html',
  styleUrls: ['./form-session.component.scss']
})
export class FormSessionComponent implements OnInit {

  @Output() startSession: EventEmitter<void> = new EventEmitter<void>();
  form: FormSession = new FormSession();

  constructor(private service: ServiceService) {}

  ngOnInit() {
  }

  // call create session service, if success we send to page component an event
  // to start socket session
  postSession() {
    this.service.createSession(this.form).then((session: any) => {
      this.startSession.emit();
    }).catch(err => {
      console.error(err);
    });
  }

}
