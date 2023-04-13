export class ShowroomFilters {
  constructor(public minPrice: number,
              public maxPrice: number,
              public carTypes: number[],
              public productTypes: number[]) {
  }
}
