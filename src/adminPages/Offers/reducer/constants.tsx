import { Offer } from "../../../interfaces/OfferInterface";

const initialState = {
    loading: true,
    offerModal: false,
    deleteOfferModal: false,
    offers: [] as Offer[],
    formData: {
        images: [],
        title: '',
        description: '',
        original_price: 0.0,
        discount_price: 0.0
    },
    currentOffer: null as Offer | null,
};

export default initialState

export type OfferReducer = typeof initialState