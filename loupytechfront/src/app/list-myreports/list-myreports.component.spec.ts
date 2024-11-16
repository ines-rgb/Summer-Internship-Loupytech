import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyreportsComponent } from './list-myreports.component';

describe('ListMyreportsComponent', () => {
  let component: ListMyreportsComponent;
  let fixture: ComponentFixture<ListMyreportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMyreportsComponent]
    });
    fixture = TestBed.createComponent(ListMyreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
