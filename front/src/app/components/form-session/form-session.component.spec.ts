import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSessionComponent } from './form-session.component';

describe('FormLocationComponent', () => {
  let component: FormSessionComponent;
  let fixture: ComponentFixture<FormSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
