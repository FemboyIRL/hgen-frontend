import { Room } from '../../../types/room.tsx'

const reservationsInitial = {
    rooms: [] as Room[],
    loading: false,
    form: {
        selected_room: null as Room | null,
        date_range: [null, null] as [Date | null, Date | null],
        occupied_dates: [] as Date[],
        numPeople: 1,
        price: 0,
    }
}

export default reservationsInitial