import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuuComponent } from './nuu.component';

describe('NuuComponent', () => {
  let component: NuuComponent;
  let fixture: ComponentFixture<NuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
