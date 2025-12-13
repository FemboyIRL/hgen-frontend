export type Offer = {
    id: string,
    images: Array<string>,
    title: string,
    description: string
    original_price: Float64Array,
    discount_price: Float64Array
}