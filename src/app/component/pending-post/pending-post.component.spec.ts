import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPostComponent } from './pending-post.component';

describe('PendingPostComponent', () => {
  let component: PendingPostComponent;
  let fixture: ComponentFixture<PendingPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingPostComponent]
    });
    fixture = TestBed.createComponent(PendingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
