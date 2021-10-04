import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CatsService, GetCatsParams } from 'src/app/services/cats/cats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cats = [];
  breeds = [];
  categories = [];
  placeholders = [];
  pageSize = 20;
  pageToLoadNext = 1;
  loading = false;
  filterParams: { breedId: string; };
  selectedBreed: { name: string; id: string; };
  lazyStop: boolean = false;

  constructor(
    private catsService: CatsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getQueryParams();
    this.getCatBreeds();
  }

  getQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const defaultFilter = { breedId: 'abys' }
      let breedId = params['breedId'];

      this.filterParams = breedId ? { breedId } : defaultFilter;
    });
  }

  setQueryParams(queryParams: Params): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  resetPagination() {
    this.pageToLoadNext = 1;
    this.pageSize = 20;
    this.lazyStop = false;
  }

  resetFilter() {
    if(this.selectedBreed) {
      this.loading = true;
      this.setQueryParams({ breedId: null });
      this.filterParams = { breedId: null }
      this.resetPagination();
      this.selectedBreed = null;
      this.getCats();
    }
  }

  mapCats(cats) {
    return cats.map(cat => ({
      url: cat.url,
      breed: cat.breeds.length && cat.breeds[0],
      id: cat.id
    }));
  }

  getNameId(cat) {
    return `ID: ${cat.id}`
  }

  getCats(params: GetCatsParams = {
    size: 'thumb',
    breedId: this.filterParams.breedId
  }) {
    this.catsService.getCats(params).subscribe(data => {
      this.cats = this.mapCats(data.body);
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  getCatBreeds() {
    this.catsService.getCatBreeds().subscribe(data => {
      this.breeds = data.body.map(breed => ({ name: breed.name, id: breed.id }));
      if (this.filterParams.breedId) {
        this.selectedBreed = this.breeds.find(breed => breed.id === this.filterParams.breedId)
      }
    })
  }

  onSelectBreed() {
    this.loading = true;
    this.resetPagination();
    this.setQueryParams({ breedId: this.selectedBreed.id });
    this.filterParams.breedId = this.selectedBreed.id;
    this.getCats();
  }

  loadNext() {
    if (this.loading || this.lazyStop) { return }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);

    this.catsService.getCats({
      page: this.pageToLoadNext,
      limit: this.pageSize,
      size: 'thumb',
      breedId: this.filterParams.breedId
    }).subscribe(cats => {
      this.placeholders = [];

      const firstIdExists = this.cats.find(cat => cat.id === cats.body[0].id)
      if (firstIdExists) {
        this.lazyStop = true;
        this.loading = false;
        return
      }

      this.cats.push(...this.mapCats(cats.body));
      this.loading = false;
      this.pageToLoadNext = cats.body.length ? this.pageToLoadNext + 1 : 0;
    });
  }
}
