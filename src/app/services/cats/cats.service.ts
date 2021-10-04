import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

export interface GetCatsParams {
  page?: number;
  limit?: number;
  breedId?: string;
  size?: string;
  categoryId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(private http: HttpClient) { }

  getCats({page, limit, breedId, size, categoryId}: GetCatsParams): Observable<any> {
    let params = new HttpParams();
    params = params.set("limit", limit ? limit.toString() : "20");
    params = params.set("page", page ? page.toString() : "1");
    params = params.set("size", size ? size.toString() : "small");
    if(breedId) {
      params = params.set("breed_id", breedId.toString());
    }
    if(categoryId) {
      params = params.set("category_ids", categoryId);
    }

    return this.http
      .get(`${environment.api_url}/v1/images/search`, {
        observe: "response",
        headers: { 'x-api-key': environment.api_key },
        params
      });
  }

  getCatBreeds(): Observable<any> {
    return this.http
      .get(`${environment.api_url}/v1/breeds`, {
        observe: "response",
        headers: { 'x-api-key': environment.api_key }
      });
  }
}
