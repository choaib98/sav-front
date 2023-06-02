import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dossier } from './dossier';
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class DossierService {
    _matDialog: MatDialog;
    dossierId: string;

  constructor(private http: HttpClient) { }
  query = '';
  results = [];

  getAllDossiers(){
    return this.http.get<Dossier[]>('api/opr/dossiers');
  }
  // getDuree(duree, dureeRestante){
  //   dr = 0;
  //   dr = duree - dureeRestante;
  // }
}
