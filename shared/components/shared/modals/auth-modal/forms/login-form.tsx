import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../../title";
import { FormInput } from "../../../form/form-input";
import { Button } from "@/shared/components/ui";
import { signIn } from "next-auth/react";
import toast from 'react-hot-toast';
import { DialogTitle } from "@/shared/components/ui/dialog";

interface Props {
    onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn('credentials', {
                ...data, redirect: false
            })

            if (!resp?.ok) {
                throw Error();
            }

            toast.success('Вы успешно вошли в аккаунт', { icon: '✅' });

            onClose?.()
        } catch (error) {
            console.log('Error [LOGIN]', error);
            toast.error('Не удалось войти в аккаунт', { icon: '🚨' });
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <DialogTitle></DialogTitle>
                        <Title text="Вход в аккаунт" size="md" className="font-bold" />
                        <p className="text-gray-400">Введите почту и пароль для входа в аккаунт</p>
                    </div>
                </div>

                <FormInput name="email" label="Email" required />
                <FormInput name="password" label="Пароль" type="password" required />

                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                    Войти
                </Button>
            </form>
        </FormProvider>
    );
};