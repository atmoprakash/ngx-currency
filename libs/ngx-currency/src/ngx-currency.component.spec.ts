import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AmountComponent} from './amount.component';
import {AmountModule} from './amount.module';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {Component, DebugElement, OnInit, Type, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';

function createTestingModule<T>(component: Type<T>, template: string): ComponentFixture<T> {
    TestBed.configureTestingModule({
        imports: [AmountModule, FormsModule],
        declarations: [component],
        providers: []
    })
        .overrideComponent(component, {
            set: {
                template: template
            }
        })
        .compileComponents();

    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return fixture;
}

describe('AmountComponent', () => {

    function getAmountInputElement(fixture: ComponentFixture<any>) {
        return fixture.debugElement.query(By.css('corpay-amount input'));
    }

    function tickAndDetectChange(fixture: ComponentFixture<any>) {
        fixture.detectChanges();
        tick();
    }

    function triggerKeyPressEvent(amountElement: DebugElement) {
        amountElement.triggerEventHandler('keypress', {
            which: 38,
            preventDefault: () => {
            }
        });
    }


    xit('given customConfiguration then should override default config', fakeAsync(() => {
        const fixture = createTestingModule(AmountTestComponent,
            '<corpay-amount [amountFormControl]="testForm.controls[\'amount\']" ' +
            ' [option]=\'{"precision":3, "suffix": "JOD"}\'>' +
            '</corpay-amount>');
        // expect(fixture.componentInstance.amountComponent._optionTemplate['precision']).toBe(3);
        //  expect(fixture.componentInstance.amountComponent._optionTemplate['suffix']).toBe('JOD');

    }));

    xit('given amountFormControl when amount change then amountFormControl should have be updated', fakeAsync(() => {
        const fixture = createTestingModule(AmountTestComponent,
            '<corpay-amount [amountFormControl]="testForm.controls[\'amount\']" ' +
            ' [option]=\'{"precision":3, "suffix": "JOD"}\'>' +
            '</corpay-amount>');
        const amount = 122.999;
        const amountElement = getAmountInputElement(fixture);
        amountElement.nativeElement.value = amount;
        fixture.detectChanges();
        triggerKeyPressEvent(amountElement);
        tickAndDetectChange(fixture);
        fixture.whenStable().then(() => {
            expect(fixture.componentInstance.testForm.controls['amount'].value).toBe(amount);
        });
    }));


    xit('given amountFormControl when amount change then changed method should be called', fakeAsync(() => {
        const fixture = createTestingModule(AmountTestComponent,
            '<corpay-amount [amountFormControl]="testForm.controls[\'amount\']"  ' +
            ' [option]=\'{"precision":3, "suffix": "JOD"}\' (change)="changed($event)">' +
            '</corpay-amount>');
        const amount = 122.999;
        const amountElement = getAmountInputElement(fixture);
        amountElement.nativeElement.value = amount;
        fixture.detectChanges();
        triggerKeyPressEvent(amountElement);
        tickAndDetectChange(fixture);
        fixture.whenStable().then(() => {
            expect(fixture.componentInstance.amount).toBe(amount);
        });
    }));

});


@Component({
    template: ``
})
class AmountTestComponent implements OnInit {
    @ViewChild(AmountComponent) amountComponent: AmountComponent;

    amount: number;
    testForm: FormGroup;

    ngOnInit() {
        this.testForm = new FormGroup({});
        this.testForm.addControl('amount', new FormControl('', {
            validators: []
        }));
    }

    changed($event: any) {
        this.amount = $event;
    }

}



