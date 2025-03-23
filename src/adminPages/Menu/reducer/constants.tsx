import { MenuItem } from "../../../interfaces/MenuItemInterface";

const initialState = {
    loading: true,
    menuItemModal: false,
    deleteMenuItemModal: false,
    menuItems: [] as MenuItem[],
    searchTerm: '',
    formData: {
        name: '',
        description: '',
        price: 0.0,
        is_available: true,
        images: [],
    },
    currentMenuItem: null as MenuItem | null,
};

export default initialState

export type MenuReducer = typeof initialState