const roomSelectionInitial = {
    roomModal: false,
    dateRange: [null, null] as [Date | null, Date | null],
    huespedes: "1 hab., 2 personas",
    form: {
        rooms: 1,
        guests: 1
    }
}

export default roomSelectionInitial

export type RoomReducer = typeof roomSelectionInitial;
