import { AttributesListFilterComponent } from './attributes-list-filter.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('AttributesListFilterComponent', () => {
  let component: AttributesListFilterComponent;
  let fixture: ComponentFixture<AttributesListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributesListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
