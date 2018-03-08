import {CurrencyMaskConfig} from './currency-config';

export class Transform {


    _optionTemplate: CurrencyMaskConfig = {
        decimal: '.',
        precision: 2,
        thousands: ',',
        prefix: '$',
        defaultValue: true
    };

    constructor(private optionTemplate: CurrencyMaskConfig) {
        this.setOption(this.optionTemplate);
    }

    transform(value: number): string {
        const currencySign = this._optionTemplate['prefix'];
        const decimalLength = this._optionTemplate['precision'];
        const chunkDelimiter = this._optionTemplate['thousands'];
        const decimalDelimiter = this._optionTemplate['decimal'];
        const chunkLength = 3;

        value /= 1;
        const result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
        const num = value.toFixed(Math.max(0, ~~decimalLength));
        return currencySign + (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
    }

    setOption(option: CurrencyMaskConfig) {
        if (option && Object.keys(option).length !== 0) {
            Object.assign(this._optionTemplate, option);
            console.log('i am claeed' + option + '===' + this._optionTemplate);
        }
    }

    getDecimal(): string {
        return this._optionTemplate['decimal'];
    }

    getPrefix(): string {
        return this._optionTemplate['prefix'];
    }

    getDefaultValue(): boolean {
        return this._optionTemplate['defaultValue'];
    }

}
