// Assuming you have a register mutation in your user service
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { User } from "interfaces/user";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "services/user.ts";
import { useAppDispatch } from "store/index.ts";
import { setCredentials } from "store/slice/userSlice.ts";
import { jwtParser } from "utils/jwtParser.ts";

import React, { useState } from "react";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [register] = useRegisterMutation();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleRegister = async () => {
        const res = await register({ firstName, lastName, image, email, username, password });
        if (res && "data" in res && res.data) {
            setUser(res.data.token);
        } else {
            console.log("Error during registration. Check your data!");
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
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded w-full max-w-md font-main">
                <h1 className="text-2xl font-main mb-6 font-extrabold">Створіть акаунт</h1>

                <form className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="firstName" className="mb-1 text-sm block font-semibold">
                            Ім'я
                        </label>
                        <Input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            id="firstName"
                            type="text"
                            placeholder="Введіть своє ім'я"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="mb-1 text-sm block font-semibold">
                            Прізвище
                        </label>
                        <Input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            id="lastName"
                            type="text"
                            placeholder="Введіть своє прізвище"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="mb-1 text-sm block font-semibold">
                            Зображення
                        </label>
                        <input
                            onChange={handleImageChange}
                            id="image"
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="mb-1 text-sm block font-semibold">
                            Електронна пошта
                        </label>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            placeholder="Введіть свою електронну адресу"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="mb-1 text-sm block font-semibold">
                            Ім'я користувача
                        </label>
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            type="text"
                            placeholder="Введіть своє ім'я користувача"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-1 text-sm block font-semibold">
                            Пароль
                        </label>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            placeholder="Введіть свій пароль"
                        />
                    </div>

                    <Button type="button" onClick={handleRegister} variant="primary" className="w-full mb-6">
                        Зареєструватися
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
