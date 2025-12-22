"use client";

import Link from "next/link";
import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { useSocketContext } from "@/lib/context/SocketContext";
import { useGetAllChats } from "@/features/messages/hooks/useGetAllChats";
import DashboardCardSkeleton from "../skeletonLoaders/DashboardCardSkeleton";
import Image from "next/image";
import { formatCreatedAt } from "@/lib/helpers/formatCreatedAt";

const MessageCard = () => {
  const { onlineUsers } = useSocketContext();
  const { currentUser } = useContext(AuthContext);
  const { conversations, isLoading } = useGetAllChats();

  const currentUserId = currentUser?._id;

  return (
    <>
      {isLoading ? (
        <DashboardCardSkeleton />
      ) : (
        <div className="bg-white w-full rounded-lg p-6 max-sm:px-3 max-md:hidden">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <p className="font-medium max-sm:text-sm">Messages</p>
            </div>

            <Link
              href={ROUTES?.MESSAGES}
              className="sm:text-sm font-semibold text-primary-green text-xs"
            >
              View all
            </Link>
          </div>
          <div className="flex flex-col mt-10 gap-4 max-lg:flex-row overflow-x-scroll max-lg:gap-8 hide-scrollbar">
            {conversations
              .slice(0, 3)
              .map((conversation: any, index: number) => {
                const isReceiver = conversation?.participants?.find(
                  (participant: any) => participant?._id !== currentUser?._id
                );
                return (
                  <div className="w-full  min-w-56" key={index}>
                    {conversation?.participants
                      ?.filter(
                        (participant: any) => participant._id !== currentUserId
                      )
                      .map((participant: any, index: number) => (
                        <div className="flex w-full gap-3" key={index}>
                          <div className="w-[40px] h-[40px] rounded-full bg-[#6B7280] flex-c justify-center relative">
                            {participant.profileImage ? (
                              <Image
                                src={participant.profileImage}
                                alt={
                                  participant.fullName || participant.userName
                                }
                                width={40}
                                height={40}
                                className="object-cover w-full h-full min-w-full max-w-full max-h-full min-h-full rounded-full"
                              />
                            ) : (
                              <p className="font-inter text-sm uppercase text-white">
                                {participant.fullName
                                  ? participant.fullName[0].toUpperCase()
                                  : participant.userName[0].toUpperCase()}
                              </p>
                            )}
                            {onlineUsers.includes(isReceiver?._id) && (
                              <div className="w-[9px] h-[9px] bg-primary-green rounded-full absolute bottom-0 right-0" />
                            )}
                          </div>
                          <div className="flex-1 flex flex-col gap-2 border-[#B8B9B8] border-b-1 pb-4">
                            <div className="flex-c-b">
                              <p className="capitalize max-sm:text-sm whitespace-nowrap mr-2 truncate">
                                {participant.fullName || participant.userName}
                              </p>
                              <p className="text-sm text-[#737774] max-sm:text-xs">
                                {formatCreatedAt(
                                  conversation?.lastMessage?.createdAt
                                )}{" "}
                              </p>
                            </div>
                            <p className="text-xs">
                              {conversation?.lastMessage?.content?.length > 15
                                ? `${conversation?.lastMessage?.content.slice(
                                    0,
                                    15
                                  )}...`
                                : conversation?.lastMessage?.content}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageCard;
