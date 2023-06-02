import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandeDoc } from '../creer-demandeSav/demande-doc';
import { Observable } from 'rxjs/internal/Observable';
import { DemandeSav } from '../../demande-sav';
import { Operation } from '../operation';


@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http:HttpClient) { }

  getOneOperation(id:any){
    return this.http.get<Operation>('/api/sav/operation/'+id)
  }

  getAllOperations(){
    return this.http.get('/api/sav/documents')
  }

  getDocumentsByOperation(id:any){
    return this.http.get<Document[]>('/api/sav/documents/operation/'+id)
  }

  getAllDocuments(){
    return this.http.get('/api/sav/documents')
  }


  
  ajouterDemandeSav(ds:DemandeSav){
    return this.http.post('/api/sav/demandesav',ds)
  }
 
  
}
