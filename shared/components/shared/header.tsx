"use client";

import { cn } from "@/shared/lib/utils";
import React, { Suspense } from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui";
import { ArrowRight, Car, Heart, UserRound } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { FavouriteButton } from "./favourite-button";
import { useSession, signIn } from "next-auth/react";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth-modal/auth-modal";

interface Props {
    className?: string;
    isCheckout?: boolean;
}

export const Header: React.FC<Props> = ({ className, isCheckout=false }) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false);

    return (
        <header className={cn('border-b', className)}>
            <Container className='flex items-center justify-between py-8'>

                {/* Левая часть */}
                <a href="/">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="Logo" width={70} height={70} />
                        <div>
                            <h1 className="text-2xl uppercase font-black">Smart Drive</h1>
                            <p className="text-sm text-gray-400 leading-3">умная аренда</p>
                        </div>
                    </div>
                </a>

                {!isCheckout && <div className="mx-10 flex-1">
                    <Suspense>
                        <SearchInput />
                    </Suspense>
                </div>}

                {/* Правая часть */}
                <div className="flex items-center gap-3">
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
                    
                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>

                    {!isCheckout && <FavouriteButton />}
                </div>

            </Container>
        </header>
    );
};