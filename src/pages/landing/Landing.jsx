import React from "react";
import MyButton from "../../components/Shared/Button";
import GradientCircle from "../../components/Shared/GradientCircle";
import MobileScreen from "../../components/Shared/MobileScreen";
import InfoCard from "../../components/Shared/InfoCard";
import Icon from "../../components/Shared/icon";
import { IoCameraOutline } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";
import { TbUsers } from "react-icons/tb";
import Footer from './../../components/Footer/Footer';

export default function Landing() {
  const infoCards = [
    {
      icon: (
        <Icon
          color={"bg-linear-to-br from-[#675BED] to-[#8980F1]"}
          size={"size-12 rounded-xl"}
        >
          <IoCameraOutline size={30} color="white" />
        </Icon>
      ),
      headers: "Share moments",
      paragraph:
        "Capture and share your everyday moments with a community that values authenticity over perfection.",
      afterColor: "after:bg-[#EFEFFE]",
    },
    {
      icon: (
        <Icon
          color={"bg-linear-to-br from-[#4DADDF] to-[#73BFE7]"}
          size={"size-12 rounded-xl"}
        >
          <FaRegCommentAlt size={20} color="white" />
        </Icon>
      ),
      headers: "Chat instantly",
      paragraph:
        "Stay connected with real-time messaging. Send texts, voice notes, and reactions to keep the conversation going.",
      afterColor: "after:bg-[#EEF5FC]",
    },
    {
      icon: (
        <Icon
          color={"bg-linear-to-br from-[#797EEE] to-[#4EA4E1]"}
          size={"size-12 rounded-xl"}
        >
          <TbUsers size={20} color="white" />
        </Icon>
      ),
      headers: "Discover people",
      paragraph:
        "Find and connect with people who share your interests. Build meaningful relationships that matter.",
      afterColor: "after:bg-[#F0EFFD]",
    },
  ];

  return (
    <>
      <section className="pt-40 ">
        <div className=" px-5 xl:px-52 mx-auto text-center lg:grid lg:grid-cols-12 lg:text-start ">
         <div className="left-section lg:col-span-8">
           <span className=" rounded-full bg-white relative py-2 px-4 text-xs text-[#5e617a] font-medium border border-gray-300 before:absolute before:bg-[#6054EC] before:w-2 before:h-2 before:rounded-full before:translate-y-1/2 before:bottom-1/2 before:left-2 ps-7 before:animate-pulse ">
            Now available on iOS & Android
          </span>
          <h1 className="text-4xl/tight sm:text-5xl font-bold my-4 lg:text-7xl lg:my-9 ">
            <span className="block sm:inline lg:block">Connect. </span>
            <span className="bg-linear-to-r from-[#5F57EB] to-[#46A7DF] bg-clip-text text-transparent">
              Share.{" "}
            </span>
            <span>Be Real.</span>
          </h1>
          <p className="text-lg md:text-xl  md:w-3/4 text-[#5e617a] mb-5 lg:mb-9  mx-auto lg:mx-0 ">
            A new social experience built for authentic connections. Share your
            moments, chat with friends, and discover people who share your
            passions.
          </p>
          <div className="md:flex md:justify-between md:items-center md:mb-20 lg:block ">
            <div className="flex flex-col gap-4 mb-10 md:mb-0 sm:flex-row lg:mb-8">
            <MyButton target={"/register"} variant={"shadow"} styles={"w-full md:w-fit md:px-9 py-6  rounded-full bg-[#6054EC] font-semibold text-sm md:text-base"}>
              Get Started
            </MyButton>

            <MyButton
            target={"/login"}
              styles={
                "w-full md:w-fit md:px-9 py-6  rounded-full bg-white border  border-gray-300 text-black font-semibold text-sm md:text-base"
              } variant={"shadow"}
            >
              Login
            </MyButton>
          </div>

          <div className="flex justify-between mx-15 mb-20 md:m-0 lg:justify-start">
            <div className="flex relative  w-28 h-7">
              <GradientCircle
                styles={
                  "absolute left-0 bg-gradient-to-bl from-blue-500  to-pink-400 rounded-full size-7"
                }
              />
              <GradientCircle
                styles={
                  "absolute left-5 bg-gradient-to-tr from-blue-800  to-sky-300 rounded-full size-7"
                }
              />
              <GradientCircle
                styles={
                  "absolute left-10 bg-gradient-to-b from-blue-300  to-pink-300 rounded-full size-7"
                }
              />
              <GradientCircle
                styles={
                  "absolute left-15 bg-gradient-to-t from-blue-500 via-violet-500  to-pink-300 rounded-full size-7"
                }
              />
            </div>
            <p className="text-sm text-[#5e617a]">
              <span className="text-black font-semibold">10k+</span> people already joined
            </p>
          </div>
          </div>
         </div>

        <div className="lg:col-span-4  ">
            <MobileScreen  size={"w-68 h-126 mx-auto lg:mx-0 lg:ms-auto"}/>
        </div>
        
        </div>
      </section>

      <section className="pt-40 ">
        <div className="container xl:px-52 mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to stay connected</h2>
          <p className="text-[#5e617a] text-lg md:text-xl mb-5 w-3/4">
            Built with the features that matter most, designed to keep your
            social life simple and genuine.
          </p>
          <div className="grid grid-cols-12 gap-5">
            {infoCards.map((card,index) => (
              <div key={index} className="col-span-12 md:col-span-6  lg:col-span-4 ">
                <InfoCard

                  icon={card.icon}
                  header={card.headers}
                  paragraph={card.paragraph}
                  afterColor={card.afterColor}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40  ">
        <div className="container xl:px-52 mx-auto px-5 text-center lg:grid lg:grid-cols-12 lg:text-start">
         <div className="lg:col-span-8 lg:order-2">
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="lg:block">Your social</span> life, <span className="bg-linear-to-r from-[#5F57EB] to-[#46A7DF] bg-clip-text text-transparent">reimagined</span>
          </h2>
          <p className="text-[#5e617a] text-lg md:text-xl mb-5">
            Experience a feed that puts real connections first. Share photos,
            stories, and conversations with the people who matter most to you.
          </p>

          <div className="md:grid md:grid-cols-3 md:gap-3 md:w-2/3 md:mx-auto md:mb-5 lg:me-auto lg:mx-0">
            <div className="p-2  mb-4 border border-gray-300 rounded-2xl flex items-center gap-4">
            <div className="ms-4 size-2 rounded-full bg-[#6054EC]"></div>
            <div>
              <h4 className="text-sm font-semibold">No ads</h4>
            <span className="text-xs text-[#5e617a]">Ever</span>
            </div>
          </div>
          <div className="p-2 border mb-4 border-gray-300 rounded-2xl flex items-center gap-4">
            <div className="ms-4 size-2 rounded-full bg-[#6054EC]"></div>
            <div>
              <h4 className="text-sm font-semibold">Real people</h4>
            <span className="text-xs text-[#5e617a]">Always </span>
            </div>
          </div>
          <div className="p-2 border mb-4 border-gray-300 rounded-2xl flex items-center gap-4">
            <div className="ms-4 size-2 rounded-full bg-[#6054EC]"></div>
            <div>
              <h4 className="text-sm font-semibold">Data</h4>
            <span className="text-xs text-[#5e617a]">Yours only</span>
            </div>
          </div>
          </div>

           <MyButton target={"/register"}
              styles={
                "w-fit py-6 px-9 text-base font-semibold  rounded-full bg-[#6055EC]  "
              }
            >
              Create account
            </MyButton>

         </div>
            <div className="my-20 lg:col-span-4 lg:order-1 lg:my-0">
              <MobileScreen size={"w-68 h-126 lg:h-95 mx-auto lg:mx-0 lg:me-auto "}/>
            </div>
        </div>
      </section>

       <Footer />
    </>
  );
}
