import { TestBed } from '@angular/core/testing';

import { StudentgaurdService } from './studentgaurd.service';

describe('StudentgaurdService', () => {
  let service: StudentgaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentgaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
