import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface InterfaceItem {
  salle:string;
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: InterfaceItem[] = [
  {id: 1,salle:'A01' ,name: '17/01/2023'},
  {id: 2,salle:'A02' , name: '17/01/2023'},
  {id: 3,salle:'A03' , name: '17/01/2023'},
  {id: 4,salle: 'A04', name: '17/01/2023'},
  {id: 5,salle:'A05' , name: '17/01/2023'},
  {id: 6,salle:'A06' , name: '17/01/2023'},
  {id: 7,salle:'A07' , name: '17/01/2023'},
  {id: 8,salle:'A08' , name: '17/01/2023'},
  {id: 9,salle:'A09' , name: '17/01/2023'},
  {id: 10,salle:'A010' , name: '17/01/2023'},
  {id: 11,salle:'A11' , name: '17/01/2023'},
  {id: 12,salle:'A12' , name: '17/01/2023'},
  {id: 13,salle: 'A13', name: '17/01/2023'},
  {id: 14,salle:'A14' , name: '17/01/2023'},
  {id: 15,salle: 'A15', name: '17/01/2023'},
  {id: 16,salle:'A16' , name: '17/01/2023'},
  {id: 17,salle:'A17' , name: '17/01/2023'},
  {id: 18,salle:'A18' , name: '17/01/2023'},
  {id: 19,salle:'A19' , name: '17/01/2023'},
  {id: 20,salle:'A20' , name: '17/01/2023'},
];

/**
 * Data source for the Interface view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class InterfaceDataSource extends DataSource<InterfaceItem> {
  data: InterfaceItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<InterfaceItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: InterfaceItem[]): InterfaceItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: InterfaceItem[]): InterfaceItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'salle' : return compare(a.salle, b.salle, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
