import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";

import { useChatToken } from "../hooks/useChatToken";
import { useMentorshipChannel } from "../hooks/useMentorshipChannel";
import { useMyMentorships } from "../../mentorships/hooks/useMyMentorships";

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/);

  const initials = parts
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("");

  return initials.toUpperCase() || "?";
};

const getCounterpart = (mentorship, userId) => {
  const mentorUser = mentorship.mentorProfile?.user;
  const menteeUser = mentorship.mentee;

  if (mentorUser?.id === userId) {
    return {
      id: menteeUser?.id,
      name: menteeUser?.name,
      avatar: menteeUser?.avatar,
      label: "Mentee",
    };
  }

  return {
    id: mentorUser?.id,
    name: mentorUser?.name,
    avatar: mentorUser?.avatar,
    label: "Mentor",
  };
};

export default function MentorshipChat({
  title,
  subtitle,
}) {
  const { user } = useSelector((state) => state.auth);

  const streamApiKey =
    import.meta.env.VITE_STREAM_API_KEY;

  const {
    data: mentorships,
    isLoading: isMentorshipsLoading,
  } = useMyMentorships();

  const {
    data: tokenData,
    isLoading: isTokenLoading,
  } = useChatToken(
    Boolean(user?.id && streamApiKey)
  );

  const createChannel = useMentorshipChannel();

  const [clientReady, setClientReady] =
    useState(false);

  const [channels, setChannels] = useState([]);

  const [activeChannel, setActiveChannel] =
    useState(null);

  const [
    activeMentorshipId,
    setActiveMentorshipId,
  ] = useState(null);

  const client = useMemo(() => {
    if (!streamApiKey) {
      return null;
    }

    return StreamChat.getInstance(
      streamApiKey
    );
  }, [streamApiKey]);

  useEffect(() => {
    if (
      !client ||
      !tokenData?.token ||
      !user?.id
    ) {
      return undefined;
    }

    let cancelled = false;

    const connect = async () => {
      await client.connectUser(
        {
          id: user.id,
          name: user.name,
          image:
            user.avatar || undefined,
        },
        tokenData.token
      );

      if (!cancelled) {
        setClientReady(true);
      }
    };

    connect();

    return () => {
      cancelled = true;

      client.disconnectUser();

      setClientReady(false);
    };
  }, [client, tokenData?.token, user]);

  const channelLookup = useMemo(() => {
    return channels.reduce(
      (acc, channel) => {
        acc[channel.id] = channel;
        return acc;
      },
      {}
    );
  }, [channels]);

  useEffect(() => {
    if (!clientReady || !client) {
      return;
    }

    if (!mentorships?.length) {
      setChannels([]);
      return;
    }

    const channelIds = mentorships.map(
      (mentorship) => {
        return (
          mentorship.streamChannelId ||
          `mentorship-${mentorship.id}`
        );
      }
    );

    const loadChannels = async () => {
      const result =
        await client.queryChannels(
          {
            type: "messaging",
            id: { $in: channelIds },
          },
          {
            last_message_at: -1,
          },
          {
            watch: false,
            state: true,
          }
        );

      setChannels(result);
    };

    loadChannels();
  }, [
    client,
    clientReady,
    mentorships,
  ]);

  const handleOpenChannel = async (
    mentorship
  ) => {
    if (!client) {
      return;
    }

    setActiveMentorshipId(
      mentorship.id
    );

    const channelId =
      mentorship.streamChannelId ||
      `mentorship-${mentorship.id}`;

    let channel =
      channelLookup[channelId];

    if (!channel) {
      const response =
        await createChannel.mutateAsync(
          mentorship.id
        );

      channel = client.channel(
        "messaging",
        response.channelId
      );

      await channel.watch();
    }

    if (
      channel &&
      !channel.initialized
    ) {
      await channel.watch();
    }

    setActiveChannel(channel);
  };

  if (!streamApiKey) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
        Stream Chat is not configured.
        Add VITE_STREAM_API_KEY to
        the frontend environment.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {subtitle}
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(15,23,42,0.04)]">
        <div className="grid min-h-[620px] grid-cols-1 gap-0 lg:grid-cols-[320px_1fr]">
          <aside className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-wide text-slate-700">
                Conversations
              </h2>

              {isMentorshipsLoading && (
                <span className="text-xs text-slate-400">
                  Loading
                </span>
              )}
            </div>

            <div className="space-y-2">
              {!mentorships?.length &&
                !isMentorshipsLoading ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500">
                  No mentorships yet.
                </div>
              ) : (
                mentorships?.map(
                  (mentorship) => {
                    const counterpart =
                      getCounterpart(
                        mentorship,
                        user?.id
                      );

                    const channelId =
                      mentorship.streamChannelId ||
                      `mentorship-${mentorship.id}`;

                    const channel =
                      channelLookup[
                      channelId
                      ];

                    const lastMessage =
                      channel
                        ?.state.messages?.[
                      channel.state
                        .messages.length -
                      1
                      ];

                    const unreadCount =
                      channel
                        ? channel.countUnread()
                        : 0;

                    const isActive =
                      activeMentorshipId ===
                      mentorship.id;

                    return (
                      <button
                        key={
                          mentorship.id
                        }
                        type="button"
                        onClick={() =>
                          handleOpenChannel(
                            mentorship
                          )
                        }
                        className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all duration-200 ${isActive
                            ? "border-indigo-100 bg-indigo-50/60 shadow-sm"
                            : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                          }`}
                      >
                        {counterpart.avatar ? (
                          <img
                            src={
                              counterpart.avatar
                            }
                            alt={
                              counterpart.name ||
                              "User"
                            }
                            className="h-11 w-11 rounded-2xl object-cover ring-1 ring-slate-200"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-sm font-semibold text-indigo-700">
                            {getInitials(
                              counterpart.name
                            )}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {counterpart.name ||
                                "Mentorship"}
                            </p>

                            {unreadCount >
                              0 && (
                                <span className="ml-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
                                  {
                                    unreadCount
                                  }
                                </span>
                              )}
                          </div>

                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            {lastMessage?.text ||
                              `Chat with your ${counterpart.label?.toLowerCase()}`}
                          </p>
                        </div>
                      </button>
                    );
                  }
                )
              )}
            </div>
          </aside>

          <section className="flex min-h-[620px] flex-col bg-white">
            {!clientReady ||
              isTokenLoading ? (
              <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
                Connecting chat...
              </div>
            ) : activeChannel ? (
              <Chat
                client={client}
                theme="messaging light"
              >
                <Channel
                  channel={activeChannel}
                >
                  <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput focus />
                  </Window>
                </Channel>
              </Chat>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-100 to-violet-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-8 w-8 text-indigo-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.97-4.03 9-9 9a8.96 8.96 0 01-4.255-1.067L3 21l1.067-4.745A8.96 8.96 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-base font-semibold text-slate-800">
                    No conversation selected
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Select a mentorship
                    from the sidebar to
                    start chatting.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}