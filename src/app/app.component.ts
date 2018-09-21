import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Product } from './model';
import { EditService } from './edit.service';

import { map } from 'rxjs/operators/map';

@Component({
  selector: 'my-app',
  template: `
   <div class="col-xs-12 col-sm-7">
                    <div class="pull-right margin-left-default search-xs">
                        <input id="txtSearchActiveSln" class="input-search" placeholder="Search by solution name.." type="search" />
                        <div class='search-input-holder'>
                            <div class="search-icon"></div>
                        </div>
                    </div>
                </div>
                
      <kendo-grid
          [data]="view | async"
          [height]="533"
          [pageSize]="gridState.take" [skip]="gridState.skip" [sort]="gridState.sort"
          [pageable]="true" [sortable]="true"
          (dataStateChange)="onStateChange($event)"
          [navigable]="true"
        >
        <kendo-grid-column field="ProductName" title="Product Name"></kendo-grid-column>
        <kendo-grid-column field="UnitPrice" editor="numeric" title="Price"></kendo-grid-column>
        <kendo-grid-column field="Discontinued" editor="boolean" title="Discontinued"></kendo-grid-column>
        <kendo-grid-column field="UnitsInStock" editor="numeric" title="Units In Stock"></kendo-grid-column>
      </kendo-grid>
  `
})
export class AppComponent implements OnInit {
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    public formGroup: FormGroup;

    private editService: EditService;
    private editedRowIndex: number;

    constructor(@Inject(EditService) editServiceFactory: any) {
        this.editService = editServiceFactory();
    }

    public ngOnInit(): void {
        this.view = this.editService.pipe(map(data => process(data, this.gridState)));

        this.editService.read();
    }

    public onStateChange(state: State) {
        this.gridState = state;

        this.editService.read();
    }
}
