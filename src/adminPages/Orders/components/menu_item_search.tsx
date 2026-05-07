import { Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import { MenuItem } from "../../../types/menu_item";

const MenuItemSearchSection: React.FC<{
    searchMenuItem: string;
    menuList: MenuItem[];
    onSearchChange: (value: string) => void;
    onSelectItem: (item: MenuItem) => void;
}> = ({ searchMenuItem, menuList, onSearchChange, onSelectItem }) => (
    <InputGroup>
        <Form.Control
            className="input"
            placeholder="Buscar platillo..."
            aria-label="Buscar platillo"
            value={searchMenuItem}
            onChange={(e) => onSearchChange(e.target.value)}
        />
        <DropdownButton
            className="btn"
            title="▼"
            align="end"
            show={searchMenuItem !== ''}
        >
            {menuList.length > 0 ? (
                menuList.map((item) => (
                    <Dropdown.Item
                        onClick={() => onSelectItem(item)}
                        key={`item-${item.id}`}
                    >
                        <div>{item.name}</div>
                        {item.price && (
                            <small className="text-muted">${item.price}</small>
                        )}
                    </Dropdown.Item>
                ))
            ) : (
                <Dropdown.Item disabled>No se encontraron platillos en el menú</Dropdown.Item>
            )}
        </DropdownButton>
    </InputGroup>
);

export default MenuItemSearchSection;