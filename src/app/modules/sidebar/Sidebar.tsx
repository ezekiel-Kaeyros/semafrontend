'use client';

import React, { useState } from 'react';

import SidebarToggleIcon from '../../../../public/icons/sidebarToggleIcon.svg';

import HamburgerIcon from '../../../../public/icons/hamburgerMenuIcon.svg';
import { navigation } from '@/app/common/navigation/navigation';
// import Profile from '@/app/common/components/profile/Profile';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import service7Icon from '../../../../public/left_side_bar_icons/service7.png';
import logo from '../../../../public/logo.png';

import messageSolutionIcon from '../../../../public/left_side_bar_icons/messageSolution.png';

import SettingsIcon from '../../../../public/icons/settingsIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleSideBar } from '@/redux/features/chat-bot-slice';
import SidebarMenu from '@/app/common/ui/sidebar-menu/SidebarMenu';
import { Button } from '@/app/common/ui/button/Button';
import { removeUserCookies } from '@/cookies/cookies';

//

const Sidebar = () => {
  // const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);
  const { push } = useRouter();
  const dispatch = useDispatch();
  const sideBarToggle: boolean = useSelector(
    (state: RootState) => state.ChatBotSlice.sideBarToggle
  );

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const pathname = usePathname();
  const programId = pathname.split('/');

  return (
    <div className="relative h-screen">
      <div className=" m-4 md:m-0 ">
        <Image
          onClick={() => setShowMenu((prev) => !prev)}
          className="md:hidden w-12"
          src={HamburgerIcon}
          alt="Hamburger menu"
        />
      </div>

      <div
        className={`flex flex-col  justify-between gap-[3rem] border-r-[0.02px] z-20 ${
          showMenu ? 'absolute w-6/12 top-0 md:w-full md:relative' : 'hidden'
        }  md:block top-0  overflow-auto scrollbar-hide h-screen dark:border-slate-600 dark:bg-mainDark py-6 px-2 ${
          sideBarToggle
            ? 'w-fit transition-all duration-300 ease-in-out delay-150'
            : 'w-full transition-all duration-300 ease-in-out delay-150'
        } sm:h-screen h-fit`}
      >
        {/* Toggle icon */}

        <div className="mb-12 flex items-center ml-5">
          <Image
            onClick={() => setShowMenu((prev) => !prev)}
            className="w-8 h-8 sm:hidden"
            src={logo}
            alt="Hamburger menu"
          />
        </div>

        <div className="">
          {navigation?.map((value: any) => (
            <SidebarMenu
              sidebarToggle={sideBarToggle}
              key={value?.id}
              title={value?.title}
              url={`/${programId[1]}/${value?.url}`}
              submenus={value?.submenus && value?.submenus}
              icon={value?.icon}
              selectedIcon={value?.selectedIcon}
            />
          ))}
        </div>

        <div className=" mt-8">
          <div
            className={` ${sideBarToggle && '[&>a>div>:nth-child(2)]:hidden'} transition-all duration-300 ease-in-out delay-150`}
          >
            {/* <Link
              href={`/settings`}
              className="flex my-8 pl-4 items-center dark:hover:bg-slate-800 py-2 rounded-md"
            >
              <Image
                src={service7Icon}
                className="w-8 h-8 mr-3"
                alt="Settings icon"
              />{' '}
              <h1
                className={`${sideBarToggle && 'hidden transition-all duration-300 ease-in-out delay-150'} transition-all duration-300 ease-in-out delay-150`}
              >
                Service 7
              </h1>
            </Link>

            <Link
              href={`/settings`}
              className="flex my-8 pl-4 items-center dark:hover:bg-slate-800 py-2 rounded-md"
            >
              <Image
                src={messageSolutionIcon}
                className="w-8 h-8 mr-3"
                alt="Settings icon"
              />{' '}
              <h1
                className={`${sideBarToggle && 'hidden transition-all duration-300 ease-in-out delay-150'} transition-all duration-300 ease-in-out delay-150`}
              >
                Settings
              </h1>
            </Link> */}

            {/* <Link
              href={`/settings`}
              className="flex my-8 pl-4 items-center dark:hover:bg-slate-800 py-2 rounded-md"
            >
              <Image
                src={SettingsIcon}
                className="w-8 h-8 mr-3"
                alt="Settings icon"
              />{' '}
              <h1
                className={`${sideBarToggle && 'hidden transition-all duration-300 ease-in-out delay-150'} transition-all duration-300 ease-in-out delay-150`}
              >
                Settings
              </h1>
            </Link> */}
          </div>
          <div className="w-10 h-10 z-100 sm:block hidden">
            <Image
              onClick={() => {
                dispatch(toggleSideBar(!sideBarToggle));
                // setSidebarToggle((prev) => !prev);
              }}
              className="cursor-pointer"
              src={SidebarToggleIcon}
              alt="Toggle icon"
            />
          </div>
        </div>
      </div>

      <div className="w-10 h-10 z-100">
        {/* hidden md:block  */}
        <Image
          onClick={() => {}}
          className="cursor-pointer"
          src={SidebarToggleIcon}
          alt="Toggle icon"
        />
      </div>

      <Button
        className="absolute bottom-5 w-fit bg-transparent"
        onClick={() => {
          removeUserCookies();
          push('/login');
        }}
      >
        logout
      </Button>
    </div>
  );
};

export default Sidebar;
