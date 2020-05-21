import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionCardComponent } from './attraction-card.component';

describe('AttractionCardComponent', () => {
  let component: AttractionCardComponent;
  let fixture: ComponentFixture<AttractionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
