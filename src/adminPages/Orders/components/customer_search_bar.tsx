import { Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import { Customer } from "../../../types/customer";

// Componente para búsqueda de cliente
const CustomerSearchSection: React.FC<{
    searchCustomer: string;
    selectedCustomer: Customer | null;
    customerList: Customer[];
    onSearchChange: (value: string) => void;
    onSelectCustomer: (customer: Customer) => void;
}> = ({ searchCustomer, selectedCustomer, customerList, onSearchChange, onSelectCustomer }) => (
    <>
        <InputGroup>
            <Form.Control
                className="input"
                placeholder="Buscar cliente..."
                aria-label="Buscar cliente"
                value={searchCustomer}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <DropdownButton
                className="btn"
                title="▼"
                align="end"
                show={searchCustomer !== ''}
            >
                {customerList.length > 0 ? (
                    customerList.map((customer) => (
                        <Dropdown.Item
                            onClick={() => onSelectCustomer(customer)}
                            key={`customer-${customer.user_id}`}
                        >
                            <div>
                                <div>{customer.fullName}</div>
                                <small className="text-muted">{customer.email} | {customer.phone}</small>
                            </div>
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>No se encontraron clientes</Dropdown.Item>
                )}
            </DropdownButton>
        </InputGroup>

        {selectedCustomer && (
            <div className="mt-2 p-2 border rounded bg-light">
                <strong>Cliente seleccionado:</strong>
                <div>{selectedCustomer.fullName}</div>
                <small className="text-muted">
                    {selectedCustomer.email} | {selectedCustomer.phone}
                </small>
            </div>
        )}
    </>
);

export default CustomerSearchSection