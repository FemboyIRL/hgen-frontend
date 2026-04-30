import { Customer } from "../../../types/customer";
import { Employee } from "../../../types/employee";
import { Reservation } from "../../../types/reservation";
import { Room } from "../../../types/room";

const initialState = {
    loading: true,
    reservationModal: false,
    deleteReservationModal: false,
    detailsReservationModal: false,
    reservations: [] as Reservation[],
    customers: [] as Customer[],
    employees: [] as Employee[],
    rooms: [] as Room[],
    searchTerm: '',
    formData: {
        customer: {} as Customer,
        room: {} as Room,
        check_in_date: new Date(),
        check_out_date: new Date(),
        total_price: 0,
        status: '',
        employee: {} as Employee,
        billing_address: '',
        payment_method: '',
    },
    currentReservation: null as Reservation | null,
};

export default initialState

export type ReservationReducer = typeof initialState