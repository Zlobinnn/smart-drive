import { Button, Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import React from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

interface Props {
    open: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
    const [type, setType] = React.useState<"login" | "register">("login");
    
    const onSwithType = () => {
        setType(type === "login" ? "register" : "login");
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[450px] bg-white p-10">
                {
                    type === "login" ? <LoginForm onClose={handleClose} /> : <h1><RegisterForm onClose={handleClose} /></h1>
                }
                <hr />
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => signIn('github' , { callbackUrl: '/', redirect: true})} type="button" className="gap-2 h-12 p-2 flex-1">
                        GitHub
                    </Button>

                    <Button variant="secondary" onClick={() => signIn('google' , { callbackUrl: '/', redirect: true})} type="button" className="gap-2 h-12 p-2 flex-1">
                        
                        Google
                    </Button>
                </div>

                <Button variant="outline" onClick={onSwithType} type="button" className="h-12">
                    {type === "login" ? "Зарегистрироваться" : "Войти"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};