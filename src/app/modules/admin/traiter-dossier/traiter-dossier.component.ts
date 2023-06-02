
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Output, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import {  ActivatedRoute, Router } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';

import { FormBuilder, FormGroup } from '@angular/forms';
import { OperationService } from '../operation/service/operation.service';
import { HttpClient } from '@angular/common/http';
import { fuseAnimations } from '@fuse/animations';
import { animation } from '@angular/animations';
import { Operation } from '../operation/operation';
import { DossierService } from '../dossier/dossier.service';

import { Dossier } from '../dossier/dossier';
import { DemandeSav } from '../demande-sav';
import { DossierServiceService } from '../charge-sav/dossier-service.service';
import { DemandeSavService } from './demande-sav.service';
import { saveAs } from 'file-saver';
import { MatCheckbox } from '@angular/material/checkbox';
import { TraiterDossierService } from './traiter-dossier.service';
import { Motif } from './motif';
@Component({
    selector       : 'traiter-dossier',
    templateUrl    : './traiter-dossier.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations:fuseAnimations
})
export class  TraiterDossierComponent implements AfterViewInit
{
    @ViewChildren(FuseCardComponent, {read: ElementRef}) private _fuseCards: QueryList<ElementRef>;

    filters: string[] = ['all', 'article', 'listing', 'list', 'info', 'shopping', 'pricing', 'testimonial', 'post', 'interactive'];
    numberOfCards: any = {};
    selectedFilter: string = 'all';

    /**
     * Constructor
     */
    operations:Operation

    isVisible=false
    isV2=true
    docs:any
    demandesSav: DemandeSav[]=[];
    demandeSav: DemandeSav;

    demandeSavId:any;
    isConforme=false
    isNotConforme=false
    operation:any
    motifs:Motif[]

    constructor(private ms:TraiterDossierService, private route:ActivatedRoute, private dss:DemandeSavService, private os:OperationService,private http:HttpClient,private ds:DossierServiceService,private service:OperationService)
    {

    }
    ngOnInit(){

        this.route.params.subscribe(res=>{
            this.demandeSavId=res.demandeSavId
        })
        this.dss.getDemandeSavById(this.demandeSavId).subscribe(res=>{
            this.demandeSav=res as DemandeSav
            this.operation=this.demandeSav.operationId
            // console.log(this.operation)
            // console.log(res)
        })

        // this.ms.getMotifsByOperation(this.operation).subscribe(res=>{
        //     console.log(res)
        // })



}

getMotifsByOperation(){
    console.log(this.demandeSav.operationId)
    this.ms.getMotifsByOperation(this.demandeSav.operationId).subscribe(res=>{
        console.log(res)
        this.motifs=res as Motif[]
    })

}

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

getDemandeSav(id:any){
    this.ds.getDemandeSavByOperation(id).subscribe(res=>{
        console.log(res);
        this.demandesSav=res as DemandeSav[] ;

    })
}
getDemandeSavId(id:number){
     this.dss.getDemandeSavById(1)
}
toggleVisibility() {
    this.isVisible = !this.isVisible;

}

downloadPDF(fileName:string) {
    this.http.get('/api/sav/file/fichierJoint/downoald/'+fileName, { responseType: 'blob' })
      .subscribe((blob: any) => {
        //const blob = new Blob([response.body], { type: 'application/pdf' });
       // const filename = 'Demande Client Financier.pdf';
        saveAs(blob, fileName);
      });




    }

    downloadPDF1(fileName:string) {
        this.http.get('/file/fichierJoint/downoald/'+fileName, { responseType: 'blob' })
          .subscribe((blob: any) => {
            //const blob = new Blob([response.body], { type: 'application/pdf' });

            saveAs(blob, fileName);
          });




        }

        downloadPDF2(fileName:string) {
            this.http.get('/file/fichierJoint/downoald/'+fileName, { responseType: 'blob' })
              .subscribe((blob: any) => {
               // const blob = new Blob([response.body], { type: 'application/pdf' });

                saveAs(blob, fileName);
              });




            }












    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        // Calculate the number of cards
        this._calcNumberOfCards();

        // Filter the cards for the first time
        this._filterCards();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On filter change
     *
     * @param change
     */
    onFilterChange(change: MatButtonToggleChange): void
    {
        // Set the filter
        this.selectedFilter = change.value;

        // Filter the cards
        this._filterCards();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private _calcNumberOfCards(): void
    {
        // Prepare the numberOfCards object
        this.numberOfCards = {};

        // Prepare the count
        let count = 0;

        // Go through the filters
        this.filters.forEach((filter) => {

            // For each filter, calculate the card count
            if ( filter === 'all' )
            {
                count = this._fuseCards.length;
            }
            else
            {
                count = this.numberOfCards[filter] = this._fuseCards.filter(fuseCard => fuseCard.nativeElement.classList.contains('filter-' + filter)).length;
            }

            // Fill the numberOfCards object with the counts
            this.numberOfCards[filter] = count;
        });
    }

    /**
     * Filter the cards based on the selected filter
     *
     * @private
     */
    private _filterCards(): void
    {
        // Go through all fuse-cards
        this._fuseCards.forEach((fuseCard) => {

            // If the 'all' filter is selected...
            if ( this.selectedFilter === 'all' )
            {
                // Remove hidden class from all cards
                fuseCard.nativeElement.classList.remove('hidden');
            }
            // Otherwise...
            else
            {
                // If the card has the class name that matches the selected filter...
                if ( fuseCard.nativeElement.classList.contains('filter-' + this.selectedFilter) )
                {
                    // Remove the hidden class
                    fuseCard.nativeElement.classList.remove('hidden');
                }
                // Otherwise
                else
                {
                    // Add the hidden class
                    fuseCard.nativeElement.classList.add('hidden');
                }
            }
        });
    }
}
