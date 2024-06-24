// models/Payment.ts

export enum PaymentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
}

class Payment {
    private _payment_id: string;
    private _booking_id: string;
    private _amount: number;
    private _payment_method: string;
    private _payment_status: PaymentStatus;
    private _transaction_date: Date;

    constructor(
        payment_id: string,
        booking_id: string,
        amount: number,
        payment_method: string,
        payment_status: PaymentStatus,
        transaction_date: Date
    ) {
        this._payment_id = payment_id;
        this._booking_id = booking_id;
        this._amount = amount;
        this._payment_method = payment_method;
        this._payment_status = payment_status;
        this._transaction_date = transaction_date;
    }

    // Getters
    get payment_id(): string {
        return this._payment_id;
    }

    get booking_id(): string {
        return this._booking_id;
    }

    get amount(): number {
        return this._amount;
    }

    get payment_method(): string {
        return this._payment_method;
    }

    get payment_status(): PaymentStatus {
        return this._payment_status;
    }

    get transaction_date(): Date {
        return this._transaction_date;
    }

    // Setters
    set payment_id(value: string) {
        this._payment_id = value;
    }

    set booking_id(value: string) {
        this._booking_id = value;
    }

    set amount(value: number) {
        this._amount = value;
    }

    set payment_method(value: string) {
        this._payment_method = value;
    }

    set payment_status(value: PaymentStatus) {
        this._payment_status = value;
    }

    set transaction_date(value: Date) {
        this._transaction_date = value;
    }
}

export default Payment;
