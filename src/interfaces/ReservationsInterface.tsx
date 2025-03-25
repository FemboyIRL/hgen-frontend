export type ReservationsInterface = {
    id: string,
    customer_id: string,
    room_number: string,
    check_in_date: Date,
    check_out_date: Date,
    total_price: Float64Array,
    status: string,
    employee_id: string,
    billing_address: string,
    payment_method: string,
}