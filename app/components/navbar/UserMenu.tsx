"use client";

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import { useState, useCallback, useEffect, useRef } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from '@/app/hooks/useRentModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLInputElement>(null);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, []);

  const closeRegisterModal = useCallback(() => {
    toggleOpen();
    registerModal.onOpen();
  }, []);

  const closeLoginModal = useCallback(() => {
    toggleOpen();
    loginModal.onOpen();
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  useEffect(() => {
    const onClickOutOfBounds = (event: any) => {
      if (
        isOpen && menuRef.current &&
        !menuRef.current.contains(event?.target)
        // !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", onClickOutOfBounds);

    return () => {
      document.removeEventListener("click", onClickOutOfBounds);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </button>
        <button
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </button>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ?
              <>
                <MenuItem
                  onClick={() => router.push('/trips')}
                  label="My trips"
                />

                <MenuItem
                  onClick={() => { }}
                  label="My favorites"
                />

                <MenuItem
                  onClick={() => { }}
                  label="My reservations"
                />

                <MenuItem
                  onClick={() => { }}
                  label="My properties"
                />

                <MenuItem
                  onClick={rentModal.onOpen}
                  label="Airbnb my home"
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  label="Logout"
                />
              </>
              :
              <>
                <MenuItem
                  onClick={closeLoginModal}
                  label="Login"
                />

                <MenuItem
                  onClick={closeRegisterModal}
                  label="Sign up"
                />
              </>
            }
          </div>
        </div>
      )}

    </div>
  );
}

export default UserMenu;