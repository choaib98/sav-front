
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, Output, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import {  ActivatedRoute, Router } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';
import { DossierService } from './dossier.service';

import { EventEmitter } from '@angular/core';
import { Dossier } from './dossier';
import {OperationService} from "../operation/service/operation.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OperationComponent} from "../operation/operation.component";


@Component({
    selector       : 'dossier',
    templateUrl    : './dossier.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DossierComponent implements AfterViewInit,OnInit
{
    @ViewChildren(FuseCardComponent, {read: ElementRef}) private _fuseCards: QueryList<ElementRef>;

    filters: string[] = ['all', 'article', 'listing', 'list', 'info', 'shopping', 'pricing', 'testimonial', 'post', 'interactive'];
    numberOfCards: any = {};
    selectedFilter: string = 'all';

    /**
     * Constructor
     */
    dossiers:Dossier[]=[];
    searchTerm: any;
    filterTerm!: string;
    private operations: any;
    private _matDialog: MatDialog;
    private dossierId: string;
    constructor(public matDialogRef: MatDialog,private ds: DossierService,private operationService: OperationService,private route: Router,private router: ActivatedRoute)
    {

    }
    ngOnInit(): void {

            this.ds.getAllDossiers().subscribe((res)=>{
                this.dossiers=res;
                console.log(JSON.stringify(this.dossiers));
            });
        this.operationService.getAllOperations().subscribe((resp)=>{
            this.operations=resp;
        })

    }


    operation(){
        this.route.navigate(['sav/operations'])
    }

    naviguer(dossierId: any){
        localStorage.setItem('selectedDossierId',dossierId);
        this.route.navigate(['sav/operations']);
    }


    enteredSearchValue:string=''
    @Output()
    searchTextChanged: EventEmitter<string>=new EventEmitter<string>()








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

    protected readonly Number = Number;
    noCredits: any;
    trackByFn: any;

    openComposeDialog(dossierId:any): void
    {

        this.ds._matDialog=this.matDialogRef;
        this.ds.dossierId=dossierId;

        const dialogRef = this.ds._matDialog.open(OperationComponent);
        dialogRef.afterClosed()
            .subscribe((result) => {
                console.log('Compose dialog was closed!');
            });
    }
    upload(operationId: any,dossierId: string) {

        this.route.navigate(['sav/upload/'+operationId+'/'+dossierId]);

    }

}
