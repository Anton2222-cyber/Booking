import GeniusLogo from "assets/GeniusGenericGiftBox.png";
import { Button } from "components/ui/Button.tsx";
import Label from "components/ui/Label.tsx";

const LoginAdvantages = () => {
    return (
        <div className="flex flex-col container mx-auto mt-5 gap-2">
            <Label variant="title">Подорожуйте більше, витрачайте менше</Label>
            <div className="p-4 flex justify-between items-center border border-lightgray/20 rounded-md overflow-hidden">
                <div className="flex flex-col gap-2 text-black">
                    <h1 className="font-bold">Увійдіть в акаунт і зекономте</h1>
                    <p className="text-sm">
                        Економте від 10% у помешканнях, що беруть участь у програмі, – просто шукайте синій
                        значок Genius
                    </p>
                    <div className="inline-flex gap-2">
                        <Button variant="primary" size="sm" className="text-sm">
                            Увійти
                        </Button>
                        <Button variant="secondary" size="sm" className="hover:bg-sky/10">
                            Зареєструватися
                        </Button>
                    </div>
                </div>

                <img className="object-cover max-w-20" src={GeniusLogo} alt="GeniusLogo" />
            </div>
        </div>
    );
};

export default LoginAdvantages;
