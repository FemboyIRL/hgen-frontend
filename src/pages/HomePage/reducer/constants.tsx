import { Offer } from "../../../types/offer"
import { Room } from "../../../types/room"

const HomeState = {
    reserve_bar: {
        date_range: [null, null] as [Date | null, Date | null],
        selected_room: "",
        occupied_dates: [],
    },
    rooms: [] as Room[],
    room_modal: false,
    offers: [] as Offer[],
    loading: true,
}

export default HomeState

export type HomeReducer = typeof HomeState