import { Component, OnInit } from '@angular/core';
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
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;

  selectedBreed: {name: string; id: string;};
  selectedCategories: {name: string; id: string}[] = []

  constructor(private catsService: CatsService) { }

  ngOnInit(): void {
    this.getCatBreeds();
    this.getCatCategories();
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

  getCats(params: GetCatsParams = {size: 'thumb'}) {
    this.catsService.getCats(params).subscribe(data => {
      this.cats = this.mapCats(data.body);
    })
  }

  getCatBreeds() {
    this.catsService.getCatBreeds().subscribe(data => {
      this.breeds = data.body.map(breed => ({name: breed.name, id: breed.id}));
    })
  }

  getCatCategories() {
    this.catsService.getCatCategories().subscribe(data => {
      this.categories = data.body.map(category => ({name: category.name, id: category.id}));
    })
  }

  onSelectBreed() {
    this.getCats({breedId: this.selectedBreed.id})
  }

  onSelectCategories() {
    console.log("categories: ", this.selectedCategories)
    this.getCats({categories: this.selectedCategories})
  }

  loadNext() {
    if (this.loading) { return }

    this.loading = true;
    this.catsService.getCats({page: this.pageToLoadNext, limit: this.pageSize, size: 'thumb'})
      .subscribe(cats => {
        this.cats.push(...this.mapCats(cats.body));
        this.loading = false;
        this.pageToLoadNext++;
      });
  }

}
