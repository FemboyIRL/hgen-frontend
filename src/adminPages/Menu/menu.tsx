import { Button, Col, Row } from "react-bootstrap"
import menuItemsActions from "./reducer/actions"
import { useEffect, useReducer } from "react"
import { initialState, reducer } from "./reducer/reducer"
import LoadingSpinnerContainer from "../../components/LoadingSpinner/loading-spinner"
import ApiConsumer from "../../services/api_consumer"
import './menu.css'
import { MenuItem } from "../../interfaces/MenuItemInterface"
import CreateMenuItemModal from "./modals/menuModal.tsx/menuModal"

const MenuItems = new ApiConsumer({ url: 'menu/' })

const MenuItemsPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        getmenuItems()
    }, [state.loading])

    const filterMenuItemList = () => {
        const menuItemsList = state.menuItems;

        const filteredList = menuItemsList.filter((item: MenuItem) =>
            item.name.toLowerCase().includes(state.searchTerm.toLowerCase())
        );

        return filteredList;
    };

    const getmenuItems = async () => {
        try {
            const { status, data } = await MenuItems.getAll(
                state.searchTerm ? `?search=${state.searchTerm}` : ''
            )
            if (status) {
                const parsedData = data.data.map((menuItem: any) => {
                    try {
                        return {
                            ...menuItem,
                            images: JSON.parse(menuItem.images),
                        };
                    } catch (error) {
                        console.error("Error al parsear las imágenes:", error);
                        return {
                            ...menuItem,
                            images: [],
                        };
                    }
                });
                dispatch({
                    type: menuItemsActions.LOADED_MENU_LIST,
                    payload: parsedData
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: menuItemsActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    const selectmenuItem = (prop: any, data: any, menuItem: MenuItem) => {
        changeValue(prop, data)
        changeValue("currentMenuItem", menuItem)
    }

    const temporal_list = filterMenuItemList();

    return (
        <>
            <div className="moduleContain">
                <div className="moduleInner">
                    <div className="innerContent">
                        <div className="innerContain">
                            <div className="titleContain">
                                <img src="/assets/icons/icon-menu.svg" alt="" width={50} />
                                <div className="title">
                                    <h3>Menu</h3>
                                    <p>Lista de items del menu registrados</p>
                                </div>
                            </div>
                            <div className="searchBarContain">
                                <Row style={{ alignItems: "center" }}>
                                    <Col xs="12" sm="7" md="7" lg="7" xl="8">
                                        <Row>
                                            <form action="">
                                                <img src="/icons/iconSearch.svg" alt="" />
                                                <input
                                                    type="search"
                                                    name="searchBar"
                                                    value={state.searchTerm}
                                                    onChange={(e) => changeValue("searchTerm", e.target.value)}
                                                />
                                            </form>
                                        </Row>
                                    </Col>
                                    <Col xs="12" sm="5" md="5" lg="5" xl="4">
                                        <Row style={{ justifyContent: "end" }}>
                                            <Button onClick={() => changeValue("menuItemModal", !state.menuItemModal)}>
                                                Nuevo Platillo
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            {state.loading ? (
                                <LoadingSpinnerContainer />
                            ) : temporal_list.length === 0 ? (
                                <p>No se encontraron habitaciones</p>
                            ) : (
                                <>
                                    <Row>
                                        {temporal_list.map((menuItem: MenuItem) => (
                                            <Col key={menuItem.id} xs="12" sm="6" md="4" lg="3">
                                                <div className="menuItemCard" onClick={() => selectmenuItem("menuItemModal", !state.menuItemModal, menuItem)}>
                                                    <img
                                                        src={menuItem.images[0]}
                                                        alt={menuItem.name}
                                                        className="menuItemImage"
                                                    />
                                                    <div className="menuItemDetails">
                                                        <h4>{menuItem.name}</h4>
                                                        <p>{menuItem.description}</p>
                                                        <p>
                                                            Disponible:{" "}
                                                            {menuItem.is_available ? (
                                                                <span className="available">Sí</span>
                                                            ) : (
                                                                <span className="notAvailable">No</span>
                                                            )}
                                                        </p>
                                                        <p>$ {menuItem.price}</p>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <CreateMenuItemModal stateReducer={state} dispatch={dispatch} changeModal={() => changeValue("menuItemModal", !state.menuItemModal)} />
        </>
    )
}

export default MenuItemsPage