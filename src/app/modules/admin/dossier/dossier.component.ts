
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Output, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import {  Router } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';
import { DossierService } from './dossier.service';


import { Dossier } from './dossier';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OperationComponent } from '../operation/operation.component';


@Component({
    selector       : 'dossier',
    templateUrl    : './dossier.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DossierComponent implements AfterViewInit
{
    @ViewChildren(FuseCardComponent, {read: ElementRef}) private _fuseCards: QueryList<ElementRef>;

    filters: string[] = ['all', 'article', 'listing', 'list', 'info', 'shopping', 'pricing', 'testimonial', 'post', 'interactive'];
    numberOfCards: any = {};
    selectedFilter: string = 'all';

    /**
     * Constructor
     */
    dossiers:Dossier[]=[];
    erreur=false
    searchTerm:any
    filterTerm!: string;
    searchForm: FormGroup;
    results: Dossier[]=[];
    met:any;
    check:any
    constructor(
        private _matDialog: MatDialog, 
        private ds:DossierService,private route:Router,private fb: FormBuilder,private ds2:DossierService)
    {
        
    }
    ngOnInit(){
        this.ds.getAllDossiers().subscribe((res)=>{
            
            this.dossiers=res
        })
        this.searchForm = this.fb.group({
            query: '',
            cin:'',
            dossierId:'',
            nomClient:'',
        });
    }
    vis=false
    vis2=false
    onSubmit() {
        
        if(this.results==undefined || this.results==null || this.results.length==0 ){
            this.vis=true

        }else{
            this.vis=false
        }
        
        this.check=this.searchForm.get('nomClient')
        if(this.searchForm.get('cin').value){
            const query = this.searchForm.get('cin').value;
            this.met=this.ds.searchByCIN('?cin='+query)
    }
       else if(this.searchForm.get('dossierId').value){
            const query = this.searchForm.get('dossierId').value;
            this.met=this.ds.searchByCIN('?dossierId='+query)
        }

       else if(this.searchForm.get('nomClient').value){
            const query = this.searchForm.get('nomClient').value;
            this.met=this.ds2.searchByNomClient('?nom='+query)
        }

   
        
       
       return this.met.subscribe((res)=>{
            this.results=<Dossier[]>res
            console.log(this.results)
            if(this.results.length==0){
                this.vis=true
                this.vis2=false
                this.searchForm.get('cin').reset()
                this.searchForm.get('dossierId').reset()
                this.searchForm.get('nomClient').reset()
            }else{
                this.vis=false
                this.vis2=true
                this.searchForm.get('cin').reset()
                this.searchForm.get('dossierId').reset()
                this.searchForm.get('nomClient').reset()
            }
            
          
        },(err)=>{
            
        })
    }


    openComposeDialog(dossierId:any): void
    {
        // Open the dialog
        this.ds.dossierId=dossierId
        this.ds._matDialog=this._matDialog
      //  this.ds._matDialogRef=this._matDialogRef
        const dialogRef = this.ds._matDialog.open(OperationComponent);
        dialogRef.afterClosed()
                 .subscribe((result) => {
                     console.log('Compose dialog was closed!');
                 });
    }
   
    
   
   

   
    faireOperationSav(dossierId:any){
        console.log(dossierId)
        this.route.navigate(['sav/dossier/'+dossierId+'/operations'])
    }

    // addDemandeSav(dossierId){
    //     console.log(dossierId)
    //    return this.ds.addDemandeSav(dossierId)
    // }

     

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
