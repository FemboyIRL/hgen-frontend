export type Reservation = {
    id: string,
    customer_data: {
        customer_id: string,
        customer_name: string,
        customer_email: string,
        customer_phone: string,
    },
    room_number: string,
    check_in_date: Date,
    check_out_date: Date,
    total_price: number,
    status: string,
    employee: {
        employee_id: string,
        employee_name: string,
    },
    billing_address: string,
    payment_method: string,
}