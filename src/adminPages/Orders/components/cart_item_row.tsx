import { Button, Form } from "react-bootstrap";
import { Plus, Trash2 } from "react-bootstrap-icons";
import { MenuItem } from "../../../types/menu_item";

const CartItemRow: React.FC<{
    item: MenuItem;
    quantity: number;
    categoryKey: string;
    onQuantityChange: (itemId: string, category: string, action: 'increase' | 'decrease' | 'input', value?: number) => void;
    onRemove: (itemId: string, category: string) => void;
}> = ({ item, quantity, categoryKey, onQuantityChange, onRemove }) => {
    const subtotal = (item.price || 0) * quantity;

    return (
        <div className="border rounded p-2 mb-2">
            <div className="d-flex align-items-center">
                {/* Imagen */}
                <div className="me-3" style={{ width: '60px', height: '60px', flexShrink: 0 }}>
                    <img
                        src={item.images?.[0] || '/placeholder-food.jpg'}
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                {/* Info del producto */}
                <div className="flex-grow-1">
                    <div className="fw-semibold">{item.name}</div>
                    <div className="d-flex gap-3 mt-1">
                        <small className="text-muted">${item.price} c/u</small>
                        <small className="text-primary">Subtotal: ${subtotal.toFixed(2)}</small>
                    </div>
                </div>

                {/* Controles de cantidad */}
                <div className="d-flex align-items-center gap-2">
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => onQuantityChange(item.id, categoryKey, 'decrease')}
                        disabled={quantity <= 1}
                    >
                        -
                    </Button>

                    <Form.Control
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => {
                            const newValue = parseInt(e.target.value);
                            if (!isNaN(newValue) && newValue >= 1) {
                                onQuantityChange(item.id, categoryKey, 'input', newValue);
                            }
                        }}
                        className="text-center"
                        style={{ width: '60px' }}
                    />

                    <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => onQuantityChange(item.id, categoryKey, 'increase')}
                    >
                        <Plus size={16} />
                    </Button>

                    <Button
                        variant="outline-danger"
                        size="sm"
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => onRemove(item.id, categoryKey)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartItemRow