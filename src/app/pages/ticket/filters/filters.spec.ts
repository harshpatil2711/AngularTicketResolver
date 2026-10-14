import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Filters } from './filters';

describe('Filters', () => {
  let component: Filters;
  let fixture: ComponentFixture<Filters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filters],
    }).compileComponents();

    fixture = TestBed.createComponent(Filters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit criteria on search', () => {
    component.searchTerm.set('INC-100');
    component.categoryId.set(2);
    component.priorityId.set(1);
    component.statusId.set(3);

    let emitted: unknown;
    component.search.subscribe((v) => (emitted = v));
    component.onSearch();

    expect(emitted).toEqual({
      searchTerm: 'INC-100',
      categoryId: 2,
      priorityId: 1,
      statusId: 3,
    });
  });

  it('should reset values and emit clear', () => {
    component.searchTerm.set('abc');
    component.categoryId.set(5);

    let emitted = false;
    component.clear.subscribe(() => (emitted = true));
    component.onClear();

    expect(emitted).toBe(true);
    expect(component.searchTerm()).toBe('');
    expect(component.categoryId()).toBeNull();
    expect(component.priorityId()).toBeNull();
    expect(component.statusId()).toBeNull();
  });
});