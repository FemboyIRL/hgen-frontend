import { MenuItem } from "./MenuItemInterface"

export type Order = {
    order_id: string,
    order_date: Date,
    total_price: number,
    user_id: string,
    user_name: string,
    user_email: string,
    menu_items: Array<MenuItem>
}