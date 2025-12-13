export type User = {
    id: string,
    email: string,
    name: string, 
    role: "customer" | "employee",
    phone: string
}