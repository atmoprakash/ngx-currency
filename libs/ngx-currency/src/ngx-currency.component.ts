import {AfterViewInit, Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Transform} from './transform';


@Component({
    selector: 'corpay-amount',
    templateUrl: './amount.component.html',
    styleUrls: ['./amount.component.css']
})
export class AmountComponent implements OnInit, AfterViewInit, DoCheck {

    @Output('change') change = new EventEmitter<number>();
    @Input('amountFormControl') amountFormControl: FormControl;
    @Input('option') option: any = {};

    @Input('options')
    set options(opt: any) {

        this.transformer.setOption(opt);
    }

    amount: any = '';

    private transformer: Transform;

    constructor() {
        this.transformer = new Transform(this.option);
    }

    ngAfterViewInit(): void {
    }

    ngDoCheck(): void {

    }

    ngOnInit() {
        this.initDefault();
    }

    paste($data: any) {
        setTimeout(() => {
            this.amount = $data;
            this.clearFormat();
        }, 2);

    }

    valueChange() {
        if (isNaN(this.amount)) {
            this.amountFormControl.setErrors({invalidAmount: 'Number format is invalid'});
            this.amount = this.transformer.transform(0);
        } else {
            this.amount = this.transformer.transform(this.amountFormControl.value);
        }
    }

    initDefault() {
        this.amount = this.transformer.getDefaultValue() ? 0 : '';
    }

    clearFormat() {
        if (this.amount) {
            this.amount = this.amount.replace(/,/g, '');
            this.amount = this.amount.replace(this.transformer.getPrefix(), '');

            if (this.validateAmount()) {
                const newNumber = Number(this.amount);
                if (newNumber === 0) {
                    this.initDefault();
                } else if (this.splitAmountAndGetLength(newNumber.toString()) === 1) {
                    this.amount = newNumber.toString();
                }
            }
        }
    }


    validateAmount() {
        if (isNaN(this.amount)) {
            this.amountFormControl.setErrors({invalidAmount: 'Number format is invalid'});
            this.amount = this.transformer.transform(0);
            return false;
        }
        return true;
    }

    handleKeydown(event: any): void {
        console.log(event);
        const keyCode = event.which || event.charCode || event.keyCode;
        if ([8, 9, 35, 36, 37, 38, 39, 40, 46, 110, 190, 63272].indexOf(keyCode) !== -1 ||
            ( event.ctrlKey && ([67, 86, 88].indexOf(keyCode) !== -1 ))) {
            if ((keyCode === 190 || keyCode === 110) && this.splitAmountAndGetLength(this.amount) > 1) {
                event.preventDefault();
            }
        } else if (isNaN(event.key) || [32].indexOf(keyCode) !== -1) {
            event.preventDefault();
        }
    }

    splitAmountAndGetLength(amount: string): number {
        return amount.split(this.transformer.getDecimal()).length;
    }

}
