import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibresComponent } from './libres.component';

describe('LibresComponent', () => {
  let component: LibresComponent;
  let fixture: ComponentFixture<LibresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
