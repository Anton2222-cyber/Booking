import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import GoogleLogo from "assets/googleFlag.png";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";

import React from "react";

const LoginPage: React.FC = () => {
    const authSuccess = async (credentialResponse: CredentialResponse) => {
        console.log(credentialResponse);
    };

    const authError = () => {
        console.log("Error login. Check your Gmail account!");
    };

    return (
        <div className="flex flex-col items-center justify-center ">
            <div className="bg-white p-8 rounded w-full max-w-md font-main">
                <h1 className="text-2xl font-main mb-6 font-extrabold ">Увійдіть або створіть акаунт</h1>

                <div className="flex flex-col gap-4">
                    <div>
                        <label title={"Електронна пошта"} className="mb-1 text-sm block font-semibold">
                            Електронна пошта
                        </label>

                        <Input type="email" placeholder="Введіть свою електронну адресу" />
                    </div>

                    <Button variant="primary" className="w-full mb-6">
                        Продовжити з електронною поштою
                    </Button>
                </div>

                <div className="flex items-center mb-6">
                    <div className="flex-grow border-t text-gray/20"></div>
                    <span className="mx-4 text-sm">або вибрати один із цих варіантів</span>
                    <div className="flex-grow border-t text-gray/20"></div>
                </div>

                <div className="flex justify-center items-center">
                    <Button
                        variant="transparent"
                        className="w-16 h-16 bg-white border border-gray/20 rounded flex items-center justify-center hover:bg-white hover:border-sky duration-500"
                    >
                        <img src={GoogleLogo} alt="Google" className="w-6 h-6" />
                    </Button>

                    <GoogleLogin onSuccess={authSuccess} onError={authError} />
                </div>

                <div className="border-t text-gray/20 mt-8"></div>
            </div>
        </div>
    );
};

export default LoginPage;
// import { CredentialResponse, TokenResponse, useGoogleLogin } from "@react-oauth/google";
// import GoogleLogo from "assets/googleFlag.png";
// import { Button } from "components/ui/Button";
// import { Input } from "components/ui/Input";
//
// import React from "react";
//
// const LoginPage: React.FC = () => {
//     const authSuccess = (credentialResponse: CredentialResponse) => {
//         console.log(credentialResponse);
//     };
//     const authError = () => {
//         console.log("Error login. Check your Gmail account!");
//     };
//
//     const login = useGoogleLogin({
//         onSuccess: authSuccess,
//         onError: authError,
//     });
//
//     return (
//         <div className="flex flex-col items-center justify-center ">
//             <div className="bg-white p-8 rounded w-full max-w-md font-main">
//                 <h1 className="text-2xl font-main mb-6 font-extrabold ">Увійдіть або створіть акаунт</h1>
//
//                 <div className="flex flex-col gap-4">
//                     <div>
//                         <label title={"Електронна пошта"} className="mb-1 text-sm block font-semibold">
//                             Електронна пошта
//                         </label>
//
//                         <Input type="email" placeholder="Введіть свою електронну адресу" />
//                     </div>
//
//                     <Button variant="primary" className="w-full mb-6">
//                         Продовжити з електронною поштою
//                     </Button>
//                 </div>
//
//                 <div className="flex items-center mb-6">
//                     <div className="flex-grow border-t text-gray/20"></div>
//                     <span className="mx-4 text-sm">або вибрати один із цих варіантів</span>
//                     <div className="flex-grow border-t text-gray/20"></div>
//                 </div>
//
//                 <div className="flex justify-center items-center">
//                     <Button
//                         variant="transparent"
//                         className="w-16 h-16 bg-white border border-gray/20 rounded flex items-center justify-center hover:bg-white hover:border-sky duration-500"
//                         onClick={() => login()}
//                     >
//                         <img src={GoogleLogo} alt="Google" className="w-6 h-6" />
//                     </Button>
//                 </div>
//
//                 <div className="border-t text-gray/20 mt-8"></div>
//             </div>
//         </div>
//     );
// };
//
// export default LoginPage;
