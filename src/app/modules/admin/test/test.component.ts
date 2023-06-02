import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  formFieldHelpers: string[] = [''];

    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder)
    {
    }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the form field helpers as string
     */
    getFormFieldHelpersAsString(): string
    {
        return this.formFieldHelpers.join(' ');
    }
}
