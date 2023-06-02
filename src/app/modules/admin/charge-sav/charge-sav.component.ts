import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OperationService} from '../operation/service/operation.service';
import {HttpClient} from '@angular/common/http';
import {Operation} from '../operation/operation';
import {DossierServiceService} from './dossier-service.service';
import {Dossier} from '../dossier/dossier';
import {DemandeSav} from '../demande-sav';
import {MatDrawer} from "@angular/material/sidenav";
import {DemandeSavService} from "../traiter-dossier/demande-sav.service";
import {Motif} from "../traiter-dossier/motif";
import {TraiterDossierService} from '../traiter-dossier/traiter-dossier.service';
import {saveAs} from "file-saver";

@Component({
    selector       : 'charge-sav',
    templateUrl    : './charge-sav.component.html',
})
export class  ChargeSavComponent implements AfterViewInit
{

    operations:Operation[]
    dossier:Dossier
    isVisible=false
    docs:any
    demandesSav: DemandeSav[]=[];
    isVis3=false
    test:number
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @ViewChild('drawer') drawer: MatDrawer;
    constructor(
        private _router:ActivatedRoute, private dss:DemandeSavService,private ms:TraiterDossierService,
        private os:OperationService,private http:HttpClient,private ds:DossierServiceService,private service:OperationService,private route:Router)
    {

    }
opened:boolean=false
    toggleDrawer() {
        if(this.drawer.opened){
       this.drawer.close();
       this.drawer.open();
   }

        this.drawer.open();
    }
open(){
    this.opened=true;
}

    ngOnInit(){
    let response=this.http.get("/api/sav/operations")
    response.subscribe((data)=>{

    this.operations=<Operation[]>data
    console.log(this.operations)



    })

    this.service.getAllDocuments().subscribe(res=>{
        this.docs=res
    })

}

    demandeSav1: DemandeSav=new DemandeSav();
    getDemandeSavId(demandeSavId:number){
        this.dss.getDemandeSavById(demandeSavId).subscribe(res=>{
            this.demandeSav1=res as DemandeSav

            console.log(this.demandeSav1)
        })

    }


getDemandeSav(id:any){
    this.ds.getDemandeSavByOperation(id).subscribe(res=>{
        console.log(res);
        this.demandesSav=res as DemandeSav[] ;

    })
}

change(){
        this.opened=true
}
toggleVisibility(operationId:number) {

    this.ds.operationId=operationId
    this.getDemandeSav(this.ds.operationId)
    this.isVisible = !this.isVisible;
    this.isVis3=!this.isVis3;
    this.test=operationId

    console.log(this.opened)



  //  this.isV2=!this.isV2;
}

    isConforme=false
    isNotConforme=false

    conforme(){
        if(this.isNotConforme){
            this.isNotConforme=!this.isNotConforme
        }

        if(this.isConforme){
            this.isConforme=true
        }else{
            this.isConforme=false
        }

    }
    isNoConforme(){
        if(this.isConforme){
            this.isConforme=!this.isConforme
        }

        if(this.isNotConforme){
            this.isNotConforme=true
        }else{
            this.isNotConforme=false
        }
    }
    motifs:Motif[];
    getMotifsByOperation(){
        console.log(this.demandeSav1.operationId)
        this.ms.getMotifsByOperation(this.demandeSav1.operationId).subscribe(res=>{
            console.log(res)
            this.motifs=res as Motif[]
        })

    }

    downloadPDF(fileName:string) {
        this.http.get('/api/sav/file/fichierJoint/downoald/'+fileName, { responseType: 'blob' })
            .subscribe((blob: any) => {
                //const blob = new Blob([response.body], { type: 'application/pdf' });
                // const filename = 'Demande Client Financier.pdf';
                saveAs(blob, fileName);
            });




    }











    ngAfterViewInit(): void
    {

    }


    isVisible4: boolean=false;

    toogleVisiblity4(){
        this.isVisible4 = !this.isVisible4;
    }
    fermer() {
        this.drawer.close()
    }
}
