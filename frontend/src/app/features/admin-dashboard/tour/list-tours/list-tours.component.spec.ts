import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListToursComponent } from './list-tours.component';

describe('ListToursComponent', () => {
  let component: ListToursComponent;
  let fixture: ComponentFixture<ListToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListToursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
