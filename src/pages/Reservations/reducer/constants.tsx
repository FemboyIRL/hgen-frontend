import { Room } from '../../../types/room.tsx'

const reservationsInitial = {
    selectedRoom: null as Room | null,
    rooms: [] as Room[],
    loading: true,
    form: {
        room_number: 101,
        dateRange: [null, null] as [Date | null, Date | null],
        occupiedDates: [] as Date[],
        numPeople: 1,
        totalPrice: 0,
    }
}

export default reservationsInitial