'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Each } from './Each';
import Logo from '../../../../public/images/place.svg';
import playIcon from '../../../../public/images/play-icon.svg';
import imageContainer from '../../../../public/images/imagery-container.png';
import EaseLogo from '../../../../public/images/Ease.svg';
import Jcprestige from '../../../../public/images/jc-logo.svg';
import Oschuna from '../../../../public/images/oschuna_logo.png';
import KanLogo from '../../../../public/images/kan_logo.png';
import SechoirCam from '../../../../public/images/sechoir_logo.png';
import CircleAnimation from '../../../../public/images/circle-animation.png';
import moneyIcon from '../../../../public/images/money-icon.svg';
import phoneContainer from '../../../../public/images/phone-container.png';
import analyticsContainer from '../../../../public/images/analytics-container.png';
import chatbot from '../../../../public/images/Chatbot.png';
import chartSquare from '../../../../public/images/chart-square.svg';
import imagerycontainermobile from '../../../../public/images/imagery-container-mobile.png';
import Marquee from 'react-fast-marquee';
import tickCircle from '../../../../public/images/tick-circle.svg';
import tickCircleWhite from '../../../../public/images/tick-circle-white.svg';
import { Button } from '@/app/common/ui/button/Button';

const links = [
  { id: 1, href: '/about', label: 'Pricing' },
  { id: 2, href: '/blog', label: 'Features' },
  { id: 3, href: '/contact', label: 'Intergrations' },
  { id: 4, href: '/contact', label: 'Affliated Partners' },
];

export default function Home() {
  const handleChange = (e: any) => {
    console.log(e.target.checked);
  };
  return (
    <>
      <div className="pb-10">
        {/* navigation */}
        <nav className="max-w-full ">
          <div className="links_container flex justify-between py-5">
            <div className="logo">
              <Image src={Logo} width={50} height={50} alt="logo" />
            </div>
            <div className="links flex gap-5 items-center  ">
              <Each
                of={links}
                render={(item: any) => (
                  <Link
                    href={`${item.href}`}
                    className=" font-articulat text-body-text hidden md:block text-base"
                  >
                    {' '}
                    {`${item.label}`}
                  </Link>
                )}
              />

              <div className="btn-contanier w-[300px] hidden md:flex gap-5">
                <Button>Book a demo</Button>

                <Button href="/login">Log In</Button>
              </div>

              <div className="menu space-y-0.5 block md:hidden">
                <div className="menu-line bg-primary-color w-10 h-1"></div>
                <div className="menu-line bg-primary-color w-10 h-1 mx-5"></div>
              </div>
            </div>
          </div>
        </nav>

        {/* section header */}
        <section className="header mt-24 space-y-8 grid place-items-center">
          <div className="title-container space-y-5 grid place-items-center md:max-w-3xl text-center mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-visby-bold text-body-text">
              The Secret Weapon for Growing Your Business
            </h1>
            <button className=" bg-primary-color text-white px-5 py-3 text flex rounded-full">
              <span className="gap-1 flex">
                <Image src={playIcon} alt="icon" />
                <span className=" font-articulate ">
                  <span className="font-bold  font-articulate">Watch </span>how
                  it works
                </span>
              </span>
            </button>
          </div>
          <div className="container grid place-items-center w-full">
            <Image
              priority
              className="mx-auto hidden md:block"
              src={imageContainer}
              alt="container-image"
            />
            <Image
              priority
              className="mx-auto block md:hidden"
              src={imagerycontainermobile}
              alt="container-image"
            />
          </div>
        </section>

        {/* section partners */}
        <section className=" mt-28 ">
          <div className="space-y-5">
            <div className="text-center grid place-items-center md:text-left md:place-items-start">
              <h2 className=" font-visby-regular text-3xl md:text-5xl max-w-sm">
                Take their words as examples
              </h2>
            </div>

            <div className="marquee w-full">
              <Marquee className=" ">
                <div className="flex w-full ">
                  <div className=" bg-[#0B1C40] px-7 py-10 w-full space-y-5 sm:space-y-10 md:space-y-14 rounded-xl mx-5  ">
                    <div className=" max-w-[278px] space-y-5">
                      <Image src={EaseLogo} alt="ease-logo" />
                      <p className="text-lg md:text-2xl font-visby-regular text-white">
                        A must-have tool for any business looking to excel in
                        the digital landscape!
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className=" font-articulat font-bold text-base text-foundation-white">
                        Franck Dakayi
                      </h3>
                      <p className="text-sm font-articulat text-[#808BBC]">
                        Founder & CEO
                      </p>
                    </div>
                  </div>
                  <div className=" bg-[#E4B248] px-7 py-10 w-full space-y-5 sm:space-y-10 md:space-y-14 rounded-xl mx-5  ">
                    <div className=" max-w-[278px] space-y-5">
                      <Image src={Jcprestige} alt="ease-logo" />
                      <p className="text-lg md:text-2xl font-visby-regular text-body-text">
                        A must-have tool for any business looking to excel in
                        the digital landscape!
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className=" font-articulat font-bold text-base text-body-text">
                        Jean Claude
                      </h3>
                      <p className="text-sm font-articulat text-slate-600">
                        Founder & CEO
                      </p>
                    </div>
                  </div>

                  <div className=" bg-[#EFEEF4] px-7 py-10 w-full space-y-5 sm:space-y-10 md:space-y-14 rounded-xl mx-5  ">
                    <div className=" max-w-[278px] space-y-5">
                      <Image src={Oschuna} alt="ease-logo" />
                      <p className="text-lg md:text-2xl font-visby-regular textg-body-text">
                        A must-have tool for any business looking to excel in
                        the digital landscape!
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className=" font-articulat font-bold text-base text-body-text">
                        Elisabeth
                      </h3>
                      <p className="text-sm font-articulat text-[#808BBC]">
                        Founder & CEO
                      </p>
                    </div>
                  </div>
                  <div className=" bg-[#2B2E31] px-7 py-10 w-full space-y-5 sm:space-y-10 md:space-y-14 rounded-xl mx-5  ">
                    <div className=" max-w-[278px] space-y-5">
                      <Image
                        src={KanLogo}
                        width={70}
                        height={70}
                        alt="ease-logo"
                      />
                      <p className="text-lg md:text-2xl font-visby-regular text-white">
                        A must-have tool for any business looking to excel in
                        the digital landscape!
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className=" font-articulat font-bold text-base text-foundation-white">
                        Tonton Kan
                      </h3>
                      <p className="text-sm font-articulat text-[#808BBC]">
                        Founder & CEO
                      </p>
                    </div>
                  </div>
                  <div className=" bg-[#d8f3dc] px-7 py-10 w-full space-y-5 sm:space-y-10 md:space-y-14 rounded-xl mx-5  ">
                    <div className=" max-w-[278px] space-y-5">
                      <Image
                        src={SechoirCam}
                        width={130}
                        height={130}
                        alt="ease-logo"
                      />
                      <p className="text-lg md:text-2xl font-visby-regular text-bodt-text">
                        A must-have tool for any business looking to excel in
                        the digital landscape!
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className=" font-articulat font-bold text-base text-body-text">
                        Mr.Oliver
                      </h3>
                      <p className="text-sm font-articulat text-[#808BBC]">
                        Founder & CEO
                      </p>
                    </div>
                  </div>
                </div>
              </Marquee>
            </div>
          </div>
        </section>

        {/* section circle animation */}
        <section className=" mt-28 grid place-items-center">
          <Image src={CircleAnimation} alt="circle animation" />
        </section>

        {/*  bento features  */}
        <section className=" mt-28 space-y-5 ">
          <h2 className="text-3xl md:text-5xl max-w-2xl text-center font-visby-regular mx-auto w-full ">
            Feel the best experience with our features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2  w-full mx-auto  gap-5  md:max-w-fit">
            <div className="feature-elements col-span-2 md:col-span-1  px-6 pt-8  bg-[#FAF9F9] border-[#6F7D8A] border rounded-2xl space-y-6 ">
              <div className="feature-header space-y-5">
                <Image alt="moneyIcon" src={moneyIcon} />
                <h3 className=" font-visby-regular text-2xl  md:text-5xl max-w-lg">
                  Instant Integration Payment{' '}
                </h3>
              </div>

              <p className=" font-articulat text-body-text text-base max-w-lg">
                Revolutionize transactions instantly! Seamlessly integrate with
                leading payment gateways for swift, secure, and frictionless
                transactions. Elevate your business with our rapid payment
                integration – it&apos;s the future of seamless transactions!
              </p>

              <div className="w-full">
                <Image
                  alt="phoneContainer"
                  className="mx-auto"
                  src={phoneContainer}
                />
              </div>
            </div>
            <div className="feature-elements col-span-2 md:col-span-1 px-6 pt-8 bg-[#FAF9F9] border-[#6F7D8A] border rounded-2xl space-y-6">
              <div className="feature-header space-y-5">
                <Image alt="chartSquare" src={chartSquare} />
                <h3 className=" font-visby-regular text-2xl md:text-5xl max-w-xs ">
                  Analytic Survey
                </h3>
              </div>

              <p className=" text-body-text text-base max-w-lg font-articulat">
                Revolutionize transactions instantly! Seamlessly integrate with
                leading payment gateways for swift, secure, and frictionless
                transactions. Elevate your business with our rapid payment
                integration – it&apos;s the future of seamless transactions!
              </p>
              <div className="w-full ">
                <Image
                  alt="analyticsContainer"
                  className="mx-auto"
                  src={analyticsContainer}
                />
              </div>
            </div>
            <div className="feature-elements px-6 py-8 flex flex-col md:flex-row items-center justify-between w-full bg-[#FAF9F9] border-[#6F7D8A] border rounded-2xl space-y-6  col-span-2">
              <div className="left-container space-y-5">
                <div className="feature-header space-y-5">
                  <Image alt="moneyIcon" src={moneyIcon} />
                  <h3 className=" font-visby-regular text-2xl md:text-5xl max-w-xs ">
                    Automated Chatbot
                  </h3>
                </div>

                <p className=" text-body-text text-base max-w-lg font-articulat">
                  Revolutionize transactions instantly! Seamlessly integrate
                  with leading payment gateways for swift, secure, and
                  frictionless transactions. Elevate your business with our
                  rapid payment integration – it&apos;s the future of seamless
                  transactions!
                </p>
              </div>
              <div className=" ">
                <Image className="mx-auto" alt="chatbot" src={chatbot} />
              </div>
            </div>
          </div>
        </section>

        {/* section pricing */}
        <section className="mt-28 space-y-5 grid place-items-center">
          <h3 className=" text-body-text textg-3xl md:text-5xl font-visby-regular ">
            Pick Your Perfect Plan
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className=" font-articulat text-base text-body-text ">
              Monthly
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={(e) => handleChange(e)}
              />

              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-base  text-body-text">
                Annually:
                <span className=" text-primary-color font-articulat font-bold ">
                  Save 30%{' '}
                </span>
              </span>
            </label>
          </div>

          <div className=" flex flex-col md:flex-row gap-5">
            <div className=" bg-container-surface-color  md:mt-10 px-5 pt-8 pb-5  border rounded-xl border-default-gray flex flex-col space-y-6">
              <div className="header-price max-w-xs space-y-1">
                <h4 className=" font-visby-bold text-3xl md:text-4xl text-body-text ">
                  Single Starter
                </h4>
                <p className=" font-articulat text-base text-body-text">
                  Experience the power of Marketit publish your content or
                  collaborate with others.
                </p>
              </div>
              <div className="price-price max-w-xs space-y-1">
                <h4 className=" font-visby-bold text-3xl md:text-4xl text-body-text ">
                  5,000 XFA
                </h4>
                <p className=" font-articulat text-base text-subtitled-text max-w-xs">
                  Per month, billed annually 7,000 XFA
                </p>
              </div>
              <button className=" bg-primary-color font-articulate px-5 py-3 rounded-full text-white text-base w-full">
                Buy
              </button>

              <div className="checked">
                <h5 className="text-lg text-body-text font-articulat font-bold pb-2">
                  {' '}
                  What&apos;s Included
                </h5>
                <ul className="space-y-2">
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 ">
                    {' '}
                    <Image src={tickCircle} alt="checked" /> Chatbot Service{' '}
                  </li>
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 ">
                    {' '}
                    <Image src={tickCircle} alt="checked" /> Bulk Message{' '}
                  </li>
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 ">
                    {' '}
                    <Image src={tickCircle} alt="checked" /> 1GB storage{' '}
                  </li>
                </ul>
              </div>
            </div>
            <div className=" bg-primary-color  px-5 pt-8 pb-5  border rounded-xl border-default-gray flex flex-col space-y-6">
              <div className="header-price max-w-xs space-y-1">
                <h4 className=" font-visby-bold text-3xl md:text-4xl text-white ">
                  Bundle Starter
                </h4>
                <p className=" font-articulat text-base text-white">
                  Experience the power of Marketit publish your content or
                  collaborate with others.
                </p>
              </div>
              <div className="price-price max-w-xs space-y-1">
                <h4 className=" font-visby-bold text-3xl md:text-4xl  text-white ">
                  10,000 XFA
                </h4>
                <p className=" font-articulat text-base text-white max-w-xs">
                  Per month, billed annually 7,000 XFA
                </p>
              </div>
              <button className=" bg-button-background font-articulate px-5 py-3 rounded-full text-white text-base w-full">
                Buy
              </button>

              <div className="checked">
                <h5 className="text-lg  text-white font-articulat font-bold pb-2">
                  {' '}
                  What&apos;s Included
                </h5>
                <ul className="space-y-2">
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 text-white ">
                    {' '}
                    <Image src={tickCircleWhite} alt="checked" /> Chatbot
                    Service{' '}
                  </li>
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 text-white ">
                    {' '}
                    <Image src={tickCircleWhite} alt="checked" /> Bulk Message{' '}
                  </li>
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 text-white ">
                    {' '}
                    <Image src={tickCircleWhite} alt="checked" /> Bulk Message{' '}
                  </li>
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 text-white ">
                    {' '}
                    <Image src={tickCircleWhite} alt="checked" /> Tombola
                    Program{' '}
                  </li>
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 text-white ">
                    {' '}
                    <Image src={tickCircleWhite} alt="checked" /> Loyalty
                    Program{' '}
                  </li>
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 text-white ">
                    {' '}
                    <Image src={tickCircleWhite} alt="checked" /> 1GB storage{' '}
                  </li>
                </ul>
              </div>
            </div>
            <div className=" bg-container-surface-color  md:mt-10 px-5 pt-8 pb-5  border rounded-xl border-default-gray flex flex-col space-y-6">
              <div className="header-price max-w-xs space-y-1">
                <h4 className=" font-visby-bold text-3xl md:text-4xl text-body-text ">
                  Company Starter
                </h4>
                <p className=" font-articulat text-base text-body-text">
                  Experience the power of Marketit publish your content or
                  collaborate with others.
                </p>
              </div>
              <div className="price-price max-w-xs space-y-1">
                <h4 className=" font-visby-bold text-3xl md:text-4xl text-body-text ">
                  15,000 XFA
                </h4>
                <p className=" font-articulat text-base text-subtitled-text max-w-xs">
                  Per month, billed annually 7,000 XFA
                </p>
              </div>
              <button className=" bg-primary-color font-articulate px-5 py-3 rounded-full text-white text-base w-full">
                Buy
              </button>

              <div className="checked">
                <h5 className="text-lg text-body-text font-articulat font-bold pb-2">
                  {' '}
                  What&apos;s Included
                </h5>
                <ul className="space-y-2">
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 ">
                    {' '}
                    <Image src={tickCircle} alt="checked" /> Chatbot Service{' '}
                  </li>
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 ">
                    {' '}
                    <Image src={tickCircle} alt="checked" /> Bulk Message{' '}
                  </li>
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 ">
                    {' '}
                    <Image src={tickCircle} alt="checked" /> Tombola Program{' '}
                  </li>
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 ">
                    {' '}
                    <Image src={tickCircle} alt="checked" /> Loayalty Program{' '}
                  </li>
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 ">
                    {' '}
                    <Image src={tickCircle} alt="checked" /> Analytics{' '}
                  </li>
                  <li className="flex  gap-1 font-articulat text-base items-end leading-3 ">
                    {' '}
                    <Image src={tickCircle} alt="checked" /> 1GB storage{' '}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
