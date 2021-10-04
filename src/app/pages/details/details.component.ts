import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatsService } from 'src/app/services/cats/cats.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  catData: any = {};
  adaptability: number = 1;
  affectionLevel: number = 1;
  childFriendly: number = 1;

  constructor(
    private catsService: CatsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const catId = this.route.snapshot.paramMap.get('id');
    this.getCatById(catId);
  }

  getCatById(id: string) {
    this.catsService.getCatById(id).subscribe(catData => {
      this.catData = catData.body;
      this.catData.breeds = catData.body.breeds ? catData.body.breeds[0] : null;
      this.adaptability = this.catData.breeds.adaptability;
      this.affectionLevel = this.catData.breeds.affection_level;
      this.childFriendly = this.catData.breeds.child_friendly;
    }, error => {
      console.error(error);
    })
  }

  getNameId(cat) {
    return cat ? `ID: ${cat.id}` : ''
  }

  navigateToWebsite(url) {
    window.open(url, '_blank');
  }

}
