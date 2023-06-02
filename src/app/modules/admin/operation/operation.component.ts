import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialogRef } from '@angular/material/dialog';
import { DossierService } from '../dossier/dossier.service';
@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',

})
export class OperationComponent implements OnInit {
  dossierId:any
  constructor(
    public matDialogRef: MatDialogRef<OperationComponent>,private ds : DossierService,
    private http: HttpClient,private route: Router,private router:ActivatedRoute) {

      this.dossierId=ds.dossierId
  }
  operations:any
    selctedOpertaion: boolean=false;


  ngOnInit(): void {
   // let id=this.route.snapshot.queryParamMap.get(id)

    let response=this.http.get("/api/sav/operations")
    response.subscribe((data)=>{
     // console.log(data)
      this.operations=data
      // let id=this.route.snapshot.queryParamMap.get('operationId')
      // console.log(id)
    }
    )
  }
erreur:boolean=false;
  getOperation(operationId: any) {
      if(this.selctedOpertaion==false){
        this.erreur=true
      }
    this.matDialogRef.close()
    this.route.navigate(['sav/dossier/'+this.dossierId+'/operation/'+operationId])
   // console.log(this.dossierId)

  }

}
