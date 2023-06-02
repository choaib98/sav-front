import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dossier } from './dossier';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  constructor(private http:HttpClient) { }
  query = '';
  results = [];
  dossierId:number=null;
  _matDialog: MatDialog=null;
  getAllDossiers(){
    return this.http.get<Dossier[]>('/api/sav/dossiers')
  }

  search(dossierId) {
    // const endpoint = '/dossier/dossierIdorcinoremail?dossierId=' + dossierId;
    // this.http.get(endpoint).subscribe((data: any[]) => {
    //   this.results = data;
    // });

    return this.http.get('/api/sav/dossier/dossierIdorcinoremail?dossierId='+dossierId)
  }

  searchByCIN(cin:string){
    //const params = new HttpParams().set('q', query);
    return this.http.get<Dossier[]>('/api/sav/dossiers/dossier/dossierIdorcinoremail'+cin)
  }

  searchByNomClient(nomClient:any){
    return this.http.get<Dossier[]>('/api/sav/dossiers/dossier/client'+nomClient)
  }

//   addDemandeSav(dossierId){
//     return this.http.get('/api/demandesav/'+dossierId)
//   }
 }
