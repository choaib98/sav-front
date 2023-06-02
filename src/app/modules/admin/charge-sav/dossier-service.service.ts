import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandeSav } from '../demande-sav';

@Injectable({
  providedIn: 'root'
})
export class DossierServiceService {

    operationId:number
  constructor(private http:HttpClient) {

   }

   getDemandeSavByOperation(id:any){
    return this.http.get<DemandeSav[]>('/api/sav/demandesav/operation/'+id)
  }
}
