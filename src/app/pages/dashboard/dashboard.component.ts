import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
  filterParams: { breedId: string; categoryId: string; };

  selectedBreed: { name: string; id: string; };
  selectedCategory: { name: string; id: string; };

  constructor(
    private catsService: CatsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getQueryParams();
    this.getCatBreeds();
    this.getCatCategories();
  }

  getQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      let breedId = params['breedId'];
      let categoryId = params['categoryId'];

      this.filterParams = {
        breedId,
        categoryId
      }
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
  }

  resetFilters() {
    this.setQueryParams({
      breedId: null,
      categoryId: null
    });
    this.filterParams = {
      breedId: null,
      categoryId: null
    }
    this.resetPagination();
    this.selectedBreed = null;
    this.selectedCategory = null;
    setTimeout(() => {
      this.getCats();
    }, 300);
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
    breedId: this.filterParams.breedId,
    categoryId: this.filterParams.categoryId
  }) {
    this.catsService.getCats(params).subscribe(data => {
      this.cats = this.mapCats(data.body);
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

  getCatCategories() {
    this.catsService.getCatCategories().subscribe(data => {
      this.categories = data.body.map(category => ({ name: category.name, id: category.id }));

      if (this.filterParams.categoryId) {
        this.selectedCategory = this.categories.find(category => category.id == this.filterParams.categoryId)
      }
    })
  }

  onSelectBreed() {
    this.resetPagination();
    this.setQueryParams({ breedId: this.selectedBreed.id });
    this.filterParams.breedId = this.selectedBreed.id;
    this.getCats();
  }

  onSelectCategory(selectedCategory) {
    this.resetPagination();
    this.setQueryParams({
      categoryId: selectedCategory.id
    })
    this.filterParams.categoryId = selectedCategory.id;
    this.getCats();
  }

  loadNext() {
    if (this.loading) { return }
    if ((this.cats.length && this.cats.length < this.pageSize)) { return }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);

    this.catsService.getCats({
      page: this.pageToLoadNext,
      limit: this.pageSize,
      size: 'thumb',
      breedId: this.filterParams.breedId,
      categoryId: this.filterParams.categoryId
    }).subscribe(cats => {
      this.placeholders = [];
      if(!cats.body.length) {
        this.cats = [];
        return
      }
      this.cats.push(...this.mapCats(cats.body));
      this.loading = false;
      this.pageToLoadNext = cats.body.length ? this.pageToLoadNext + 1 : 0;
    });
  }
}
