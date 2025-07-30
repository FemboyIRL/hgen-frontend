const roomSelectionInitial = {
    roomModal: false,
    occupiedDates: [],
    loading: true,
    selectedRoom: null,
    dateRange: [null, null] as [Date | null, Date | null],
}

export default roomSelectionInitial

export type RoomReducer = typeof roomSelectionInitial;
