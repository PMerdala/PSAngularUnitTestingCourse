import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    service = new InMemoryDataService();
  });

  it('should return object with heroes property', () => {
    expect(service.createDb()).toEqual({
      heroes: [
        { id: 11, name: 'Mr. Nice', strength: 10 },
        { id: 12, name: 'Narco', strength: 5 },
        { id: 13, name: 'Bombasto', strength: 8 },
        { id: 14, name: 'Celeritas', strength: 15 },
        { id: 15, name: 'Magneta', strength: 22 },
        { id: 16, name: 'RubberMan', strength: 50 },
        { id: 17, name: 'Dynama', strength: 43 },
        { id: 18, name: 'Dr IQ', strength: 4 },
        { id: 19, name: 'Magma', strength: 18 },
        { id: 20, name: 'Tornado', strength: 15 }
      ]
    });
  });
});
