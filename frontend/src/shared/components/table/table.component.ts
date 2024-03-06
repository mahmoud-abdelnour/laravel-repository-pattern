import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'angular2-smart-table';
import { Subscription } from 'rxjs';
import { IColumnType } from 'angular2-smart-table';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input('showPagination') showPagination = true;
  @Input('settings') settings;
  @Input('apiFunc') apiFunc:Function;
  @Input('per_page') per_page = 10;
  @Input('paginationId') paginationId = 'TablePagination';
  @Input('filterModel') filterModel = {} as any;
  @ViewChild('smartTable') smartTable ;

  source: LocalDataSource = new LocalDataSource();
  page: number = this.route.snapshot.queryParams['page'] || 1;
  offset = 0;
  total;
  filterSubscription:Subscription;

  constructor (
    private route: ActivatedRoute,
    private router:Router
  ) { }

  filterForm:FormGroup;
  hasfilters = false;
  ngOnInit(): void {
    this.settings = {
      noDataMessage: 'لا يوجد بيانات',
      actions: false,
      pager: false,
      // selectedRowIndex: undefined,
      ...this.settings,
    }

    this.filterForm = new FormGroup({});
    for(let key in this.settings.columns) {
      if(this.settings.columns[key].filter) {
        this.filterForm.addControl(key, new FormControl(null))
      }
    }
    this.hasfilters = !!Object.keys(this.filterForm.controls).length;
    console.log(this.hasfilters)


    this.getTableList();
    this.filterSubscription = this.source.onChanged().subscribe(change => {
      if (change.action === 'filter') this.filter(change.filter.filters);
    });

  }

  applyFilters(reset?) {
    if(reset) this.filterForm.reset();

    let filters = [];
    for(let key in this.filterForm.value) {
      filters.push({
        field:key,
        search:this.filterForm.value[key] || ''
      })
    }
    this.source.setFilter(filters);
  }


  reloadTable() {

    // this.page = 1;
    this.page = this.route.snapshot.queryParams['page'] || 1;

    this.getTableList();
  }

  counter(i: number) {
    return Array(i);
  }

  pageChanged(event) {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page:event }});
    this.page = event;
    this.getTableList();
  }

  requestSub:Subscription;
  dataSrc;
  IColumnType = IColumnType;

  getTableList() {
    if(this.requestSub) this.requestSub.unsubscribe();

    this.offset = (this.page - 1) * this.per_page;
    this.requestSub = this.apiFunc({
      offset: this.offset,
      sorting: 'creationtime desc',
      limit: this.per_page,
      per_page: this.per_page,
      ...this.filterModel,
      page:this.page
    }).subscribe( response => {
      this.total = response.total;
      this.source.load(response.data).then((x) => {
        this.deselectRows();
        let newData = [...response.data];
      
        for(let data of newData) {
          data.settings =  JSON.parse(JSON.stringify(this.settings));
          for(let key in data.settings.columns) {
            if(this.settings.columns[key].renderComponent) data.settings.columns[key].renderComponent = this.settings.columns[key].renderComponent
            if(this.settings.columns[key].valuePrepareFunction) data.settings.columns[key].valuePrepareFunction = this.settings.columns[key].valuePrepareFunction
            if(this.settings.columns[key].onComponentInitFunction) data.settings.columns[key].onComponentInitFunction = this.settings.columns[key].onComponentInitFunction
            data.settings.columns[key].rowData = data;
            data.settings.columns[key].value = data.settings.columns[key].valuePrepareFunction ? data.settings.columns[key].valuePrepareFunction(data[key], data) : data[key];
          }
        }
        this.dataSrc = newData;
      });
    })
  }

  deselectRows(): any {
    this.smartTable.grid.dataSet.deselectAll();
    const tr = document.querySelector('angular2-smart-table > table > tbody > tr.angular2-smart-row.selected');
    tr && tr.classList.remove('selected');
  }

  filter(value) {
    value.forEach(element => {
      this.filterModel[element.field] = element.search
    });
    this.page = 1;
    this.getTableList();
  }


  ngOnDestroy(): void {
    if(this.filterSubscription) this.filterSubscription.unsubscribe();
  }

  changePageSize(ev) {
    // if(ev != this.pageSize) {
      this.per_page = ev;
      this.source.setPaging(1, ev, true);
      // this.page = 1;
      this.pageChanged(1)
      this.settings = Object.assign({}, this.settings);
      // this.reloadTable();
    // }
  }


}
