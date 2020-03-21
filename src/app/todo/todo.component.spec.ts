import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Todo } from './models';
import { TodoFacade } from './store/facades';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let service: TodoFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TodoComponent],
      providers: [
        {
          provide: TodoFacade,
          useValue: jasmine.createSpyObj('TodoFacade', [
            'loadAll',
            'showCreateDialog',
            'showEditDialog',
            'showRemoveDialog'
          ])
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TodoFacade);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadAll', () => {
    component.ngOnInit();
    expect(service.loadAll).toHaveBeenCalled();
  });

  it('should call showCreateDialog', () => {
    component.showCreateDialog();
    expect(service.showCreateDialog).toHaveBeenCalled();
  });

  it('should call showEditDialog', () => {
    const todo: Todo = {
      id: '1',
      text: 'test1',
      checked: true,
      createdAt: 1000000,
      updatedAt: 2000000
    };
    component.showEditDialog(todo);
    expect(service.showEditDialog).toHaveBeenCalled();
  });

  it('should call showRemoveDialog', () => {
    const id = '1';
    component.showRemoveDialog(id);
    expect(service.showRemoveDialog).toHaveBeenCalled();
  });
});
