import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  updateProfile(id: number, payload: any) {
    return this.http.put(`https://fakestoreapi.com/users/${id}`, payload);
  }

  

}