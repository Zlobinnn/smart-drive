import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, formRegisterSchema, TFormLoginValues, TFormRegisterValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../../title";
import { FormInput } from "../../../form/form-input";
import { Button } from "@/shared/components/ui";
import { signIn } from "next-auth/react";
import toast from 'react-hot-toast';
import { registerUser } from "@/app/actions";
import { DialogTitle } from "@/shared/components/ui/dialog";

interface Props {
    onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: data.fullName,
                    email: data.email,
                    password: data.password,
                }),
            });

            const resp = await signIn('credentials', {
                ...data, redirect: false
            })

            if (!resp?.ok) {
                throw Error();
            }

            toast.success('Вы успешно зарегистрировали аккаунт', { icon: '✅' });

            onClose?.()
        } catch (error) {
            console.log('Error [SIGNUP]', error);
            toast.error('Не удалось создать аккаунт', { icon: '🚨' });
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <DialogTitle></DialogTitle>
                        <Title text="Регистрация аккаунта" size="md" className="font-bold" />
                        <p className="text-gray-400">Введите данные для регистрации</p>
                    </div>
                </div>

                <FormInput name="email" label="Email" required />
                <FormInput name="fullName" label="Полное имя" required />
                <FormInput name="password" label="Пароль" type="password" required />
                <FormInput name="confirmPassword" label="Повторите пароль" type="password" required />

                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    );
};