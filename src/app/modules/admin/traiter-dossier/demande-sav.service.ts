import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandeSav } from '../demande-sav';

@Injectable({
  providedIn: 'root'
})
export class DemandeSavService {

  constructor(private http:HttpClient) { }

  getDemandeSavById(id:number){
    return this.http.get<DemandeSav>('/api/sav/demandesav/'+id)
  }
}
