import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApiConsumer from '../services/api_consumer';

// Definir el tipo de un cliente
interface Customer {
    id: string;
    email: string;
    phone: string;
    address?: string;
}

// Crear una instancia de ApiConsumer para los clientes
const apiCustomers = new ApiConsumer({ url: "customers/" });

const useCustomers = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await apiCustomers.getAll();

                if (response.status) {
                    setCustomers(response.data);
                } else {
                    setError("Error al obtener los clientes");
                    toast.error("Error al obtener los clientes");
                    console.error("Error en la respuesta:", response.statusText);
                }
            } catch (err) {
                setError("Error desconocido al obtener los clientes");
                toast.error("Error desconocido al obtener los clientes");
                console.error("Error en la solicitud:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    // Función para agregar un nuevo cliente
    const addCustomer = async (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const response = await apiCustomers.create(customerData);

            if (response.status) {
                setCustomers(prev => [...prev, response.data]);
                toast.success("Cliente agregado exitosamente");
                return true;
            } else {
                toast.error("Error al agregar el cliente");
                return false;
            }
        } catch (err) {
            toast.error("Error desconocido al agregar el cliente");
            console.error("Error en la solicitud:", err);
            return false;
        }
    };

    // Función para actualizar un cliente
    const updateCustomer = async (id: string, customerData: Partial<Customer>) => {
        try {
            const response = await apiCustomers.update({ body: customerData, id: id });

            if (response.status) {
                setCustomers(prev =>
                    prev.map(customer =>
                        customer.id === id ? { ...customer, ...response.data } : customer
                    )
                );
                toast.success("Cliente actualizado exitosamente");
                return true;
            } else {
                toast.error("Error al actualizar el cliente");
                return false;
            }
        } catch (err) {
            toast.error("Error desconocido al actualizar el cliente");
            console.error("Error en la solicitud:", err);
            return false;
        }
    };

    // Función para eliminar un cliente
    const deleteCustomer = async (id: string) => {
        try {
            const response = await apiCustomers.delete(id);

            if (response.status) {
                setCustomers(prev => prev.filter(customer => customer.id !== id));
                toast.success("Cliente eliminado exitosamente");
                return true;
            } else {
                toast.error("Error al eliminar el cliente");
                return false;
            }
        } catch (err) {
            toast.error("Error desconocido al eliminar el cliente");
            console.error("Error en la solicitud:", err);
            return false;
        }
    };

    return {
        customers,
        loading,
        error,
        addCustomer,
        updateCustomer,
        deleteCustomer
    };
};

export default useCustomers;