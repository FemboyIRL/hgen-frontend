import { useReducer } from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import { initialState, registerActions, reducer } from "./reducer/reducer";
import ApiConsumer from "../../services/api_consumer";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Auth = new ApiConsumer({ url: "auth/register/" })

const RegisterPage = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const navigate = useNavigate();

    const changeValueForm = (prop: string, data: any) => {
        dispatch({
            type: registerActions.CHANGE_VALUE_FORM,
            payload: {
                prop,
                data
            }
        })
    }

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {

            const { email, password, fullName, phone } = state!.formData

            const body = {
                email,
                password,
                fullName,
                phone
            }

            const { status, data } = await Auth.petition(body, "POST")

            if (status) {
                toast.success("Cuenta creada de forma exitosa")
                localStorage.setItem("user", data.data)
                localStorage.setItem("token", data.token);
                navigate("/");
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target

        if (name === "rememberMe") {
            changeValueForm(name, checked)
            return
        }

        changeValueForm(name, value)

    }

    return (
        <div className="login-container">
            <div
                className="container d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <div className="row border rounded-5 p-3 bg-white shadow box-area">
                    <div
                        className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
                        style={{ backgroundColor: "#103cbe" }}
                    >
                        <div className="featured-image mb-3">
                            <img
                                src="/assets/images/logo.jpeg"
                                className="img-fluid"
                                alt="LogoHgenSuites"
                            />
                        </div>
                        <div className="box-area-content">
                            <p
                                className="text-white fs-2"
                                style={{
                                    fontFamily: '"Courier New", Courier, monospace',
                                    fontWeight: 600,
                                }}
                            >
                                Tu descanso comienza aquí.
                            </p>
                            <small
                                className="text-white text-wrap text-center"
                                style={{
                                    width: "17rem",
                                    fontFamily: '"Courier New", Courier, monospace',
                                }}
                            >
                                Accede a la mejor experiencia de hospitalidad con nosotros.
                            </small>
                        </div>
                    </div>
                    <div className="d-flex col-md-6 right-box align-items-center justify-content-center">
                        <div className="row">
                            <div className="header-text mb-4">
                                <h1>Hola de nuevo</h1>
                                <p>Nos hace felices volverlo a ver</p>
                            </div>
                            <form id="login-form" onSubmit={handleLogin}>
                                {state && (
                                    <>
                                        <FormGroup className="mb-3">
                                            <FormControl
                                                type="text"
                                                name="email"
                                                value={state.formData.email}
                                                onChange={handleOnChangeInput}
                                                className="form-control-lg bg-light fs-6"
                                                placeholder="Email"
                                                required
                                            />
                                        </FormGroup>

                                        <FormGroup className="mb-3">
                                            <FormControl
                                                type="text"
                                                name="fullName"
                                                value={state.formData.fullName}
                                                onChange={handleOnChangeInput}
                                                className="form-control-lg bg-light fs-6"
                                                placeholder="Nombre"
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <FormControl
                                                type="text"
                                                name="phone"
                                                value={state.formData.phone}
                                                onChange={handleOnChangeInput}
                                                className="form-control-lg bg-light fs-6"
                                                placeholder="Teléfono"
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <FormControl
                                                type="password"
                                                name="password"
                                                value={state.formData.password}
                                                onChange={handleOnChangeInput}
                                                className="form-control-lg bg-light fs-6"
                                                placeholder="Contraseña"
                                                required
                                            />
                                        </FormGroup>


                                        <FormGroup className="mb-3">
                                            <button
                                                type="submit"
                                                className="btn btn-lg btn-primary w-100 fs-6"
                                            >
                                                Registrate
                                            </button>
                                        </FormGroup>
                                    </>

                                )}
                            </form>
                            <div className="row">
                                <small>
                                    Ya tienes una cuenta? <Link to={'/Login'}>Inicia Sesión</Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default RegisterPage