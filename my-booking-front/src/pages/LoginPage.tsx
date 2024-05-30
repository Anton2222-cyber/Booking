import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { User } from "interfaces/user";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoogleLoginMutation, useLoginMutation } from "services/user.ts";
import { useAppDispatch } from "store/index.ts";
import { setCredentials } from "store/slice/userSlice.ts";
import { jwtParser } from "utils/jwtParser.ts";

import React from "react";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [googleLogin] = useGoogleLoginMutation();
    const [emailLogin] = useLoginMutation();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = async () => {
        const res = await emailLogin({ email, password });

        if (res && "data" in res && res.data) {
            setUser(res.data.token);
        } else {
            console.log("Error login. Check login data!");
        }
    };

    const authSuccess = async (credentialResponse: CredentialResponse) => {
        const res = await googleLogin({
            credential: credentialResponse.credential || "",
        });

        if (res && "data" in res && res.data) {
            console.log(res.data.token);
            setUser(res.data.token);
        } else {
            console.log("Error login. Check login data!");
        }
    };

    const setUser = (token: string) => {
        localStorage.setItem("authToken", token);

        dispatch(
            setCredentials({
                user: jwtParser(token) as User,
                token: token,
            }),
        );
        const { from } = location.state || { from: { pathname: "/" } };
        navigate(from);
    };

    const authError = () => {
        console.log("Error login. Check your Gmail account!");
    };

    return (
        <div className="flex flex-col items-center justify-center ">
            <div className="bg-white p-8 rounded w-full max-w-md font-main">
                <h1 className="text-2xl font-main mb-6 font-extrabold ">Увійдіть або створіть акаунт</h1>

                <form className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="mb-1 text-sm block font-semibold">
                            Електронна пошта
                        </label>

                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id={"email"}
                            type="email"
                            placeholder="Введіть свою електронну адресу"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 text-sm block font-semibold">
                            Пароль
                        </label>

                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            placeholder="Введіть свій пароль"
                        />
                    </div>

                    <Button type="button" onClick={login} variant="primary" className="w-full mb-6">
                        Продовжити з електронною поштою
                    </Button>
                </form>

                <div className="flex items-center mb-6">
                    <div className="flex-grow border-t text-gray/20"></div>
                    <span className="mx-4 text-sm">або вибрати один із цих варіантів</span>
                    <div className="flex-grow border-t text-gray/20"></div>
                </div>

                <div className="flex justify-center items-center">
                    <GoogleLogin
                        useOneTap
                        locale="uk"
                        size="large"
                        onSuccess={authSuccess}
                        onError={authError}
                    />
                </div>

                <div className="border-t text-gray/20 mt-8"></div>
            </div>
        </div>
    );
};

export default LoginPage;
