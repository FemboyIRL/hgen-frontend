import { Form, FormControl, FormGroup } from "react-bootstrap"
import FormModal from "../../../../../components/FormModal/form-modal"
import roomSelectionActions from "../reducer/actions"
import { StateReducer } from "../reducer/constants"
import { toast } from "react-toastify"

interface SetGuestsModalProps {
    stateReducer: StateReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>;
    changeModal: () => void;
}

const SetGuestsModal: React.FC<SetGuestsModalProps> = ({ stateReducer, dispatch, changeModal }) => {

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "rooms" || name === "guests") {
            const numericValue = parseInt(value, 10);

            if (isNaN(numericValue) || numericValue < 1 || numericValue > 20) {
                toast.error("Por favor, ingresa un número válido entre 1 y 20.");
                return;
            }
        }

        dispatch({
            type: roomSelectionActions.CHANGE_VALUE_FORM,
            payload: {
                prop: name,
                data: value,
            },
        });
    };

    const handleSave = () => {
        const { rooms, guests } = stateReducer.form;

        if (isNaN(rooms) || isNaN(guests) || rooms < 1 || guests < 1) {
            toast.error("Por favor, ingresa valores válidos para habitaciones y huéspedes.");
            return;
        }

        const maxGuestsPerRoom = 4;
        if (guests > rooms * maxGuestsPerRoom) {
            toast.error(`El número de huéspedes no puede exceder ${rooms * maxGuestsPerRoom}.`);
            return;
        }

        dispatch({
            type: roomSelectionActions.CHANGE_VALUE,
            payload: {
                prop: "huespedes",
                data: `${stateReducer.form.rooms} hab., ${stateReducer.form.guests} personas`,
            },
        });

        changeModal();
    };

    return (
        <>
            <FormModal
                modalTitle="Seleccionar Habitaciones y Personas"
                status={stateReducer.roomModal}
                onSubmit={handleSave}
                btnText="Confirmar"
                size="lg"
            >
                <div className="subtitle">
                    <p>Selecciona cuántas habitaciones necesitas y para cuántas personas.</p>
                </div>

                <Form>
                    <FormGroup className="mb-3">
                        <label>Habitaciones</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="number"
                                className="textInput"
                                placeholder="Número de habitaciones"
                                value={stateReducer.form.rooms}
                                name="rooms"
                                min="1"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <label>Personas</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="number"
                                className="textInput"
                                placeholder="Número de personas"
                                value={stateReducer.form.guests}
                                name="guests"
                                min="1"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>
                </Form>
            </FormModal>
        </>
    )
}

export default SetGuestsModal