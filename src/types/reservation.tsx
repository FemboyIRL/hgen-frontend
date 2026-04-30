import { Customer } from "./customer";
import { Employee } from "./employee";
import { Room } from "./room";

export type Reservation = {
    id: string,
    customer: Customer
    room: Room,
    check_in_date: Date,
    check_out_date: Date,
    total_price: number,
    status: string,
    employee: Employee,
    billing_address: string,
    payment_method: string,
}