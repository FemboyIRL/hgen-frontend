import { useEffect, useReducer } from "react";
import { FormCheck, FormControl, FormGroup } from "react-bootstrap";
import './login-page.css'
import { initialState, loginActions, reducer } from "./reducer/reducer";
import ApiConsumer from "../../services/api_consumer";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext/user-context";
import { useAuth } from "../../hooks/useAuth";
const Auth = new ApiConsumer({ url: "auth/login/" })

const LoginPage = () => {
    useAuth();
    const [state, dispatch] = useReducer(reducer, initialState)
    const {setUser} = useUser();
    const navigate = useNavigate();

    const changeValueForm = (prop: string, data: any) => {
        dispatch({
            type: loginActions.CHANGE_VALUE_FORM,
            payload: {
                prop,
                data
            }
        })
    }

    const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
        const { email, password, rememberMe } = state!.formData;

        const body = {
            email,
            password
        };

        const { status, data } = await Auth.petition(body, "POST");

        console.log("Respuesta del login:", data);
        
        if (status) {
            toast.success("Sesión iniciada de forma exitosa");
            
            // Guardar token primero
            localStorage.setItem("token", data.token);
            
            if (rememberMe) {
                console.log("Guardando usuario:", data.data);
                setUser(data.data); // Guardar LocalStorage
            } else {
                // Si no es "rememberMe", solo mantenemos en estado, no en localStorage
                setUser(data.data);
            }
            
            navigate("/");
        }
    } catch (e) {
        console.log("Error en login:", e);
        toast.error("Error al iniciar sesión");
    }
};

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

                                        <FormGroup className="mb-1">
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

                                        <FormGroup className="mb-5 d-flex justify-content-between w-100">
                                            <FormCheck
                                                type="checkbox"
                                                name="rememberMe"
                                                id="formCheck"
                                                label="Recordarme"
                                                checked={state.formData.rememberMe}
                                                onChange={handleOnChangeInput}
                                                className="form-check-label text-secondary"
                                            />
                                        </FormGroup>

                                        <FormGroup className="mb-3">
                                            <button
                                                type="submit"
                                                className="btn btn-lg btn-primary w-100 fs-6"
                                            >
                                                Iniciar sesión
                                            </button>
                                        </FormGroup>
                                    </>

                                )}
                            </form>
                            <div className="row">
                                <small>
                                    No tienes una cuenta? <Link to={'/Register'}>Registrate</Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LoginPage