import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTimeoutComponent } from './ng-timeout.component';

describe('NgTimeoutComponent', () => {
  let component: NgTimeoutComponent;
  let fixture: ComponentFixture<NgTimeoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgTimeoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
