import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Motif } from './motif';

@Injectable({
  providedIn: 'root'
})
export class TraiterDossierService {

  constructor(private http:HttpClient) { }

  getMotifsByOperation(operationId:number){
    return this.http.get<Motif[]>('/api/sav/motifs/operation/'+operationId);
  }
}
