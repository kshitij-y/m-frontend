import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";

import Button from "../../../components/ui/Button";

import { useCalendarStatus } from "../hooks/useCalendarStatus";
import { useDisconnectCalendar } from "../hooks/useDisconnectCalendar";

export default function CalendarConnectCard() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const { data, isLoading } =
    useCalendarStatus();

  const {
    mutate: disconnect,
    isPending,
  } = useDisconnectCalendar();

  useEffect(() => {
    const status =
      searchParams.get("calendar");

    if (!status) return;

    if (status === "connected") {
      toast.success(
        "Google Calendar connected"
      );
    }

    if (status === "error") {
      toast.error(
        "Google Calendar connection failed"
      );
    }

    const nextParams =
      new URLSearchParams(searchParams);

    nextParams.delete("calendar");

    setSearchParams(nextParams, {
      replace: true,
    });
  }, [searchParams, setSearchParams]);

  const handleConnect = () => {
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL;

    window.location.href =
      `${baseUrl}/calendar/google/connect`;
  };

  const isConnected = data?.connected;

  return (
    <div className="rounded-[32px] border border-slate-200/70 bg-white p-8 shadow-xl shadow-slate-200/40">
      {/* TOP */}
      <div className="space-y-5">
        {/* <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
          <span className="h-2 w-2 rounded-full bg-indigo-600" />
          Optional Integration
        </div> */}

        <div>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900">
            Google Calendar
          </h3>

          <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
            Connect your Google Calendar to
            automate mentorship scheduling,
            availability syncing, and future
            session management.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-10">
        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-sm font-medium text-slate-500">
              Checking calendar connection...
            </p>
          </div>
        ) : isConnected ? (
          <div className="flex flex-col gap-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
              </div>

              <div>
                <h4 className="text-base font-semibold text-emerald-700">
                  Calendar Connected
                </h4>

                <p className="mt-1 text-sm leading-6 text-emerald-600">
                  Your Google Calendar is now
                  connected and ready for
                  scheduling integrations.
                </p>
              </div>
            </div>

            <Button
              type="button"
              disabled={isPending}
              onClick={() => disconnect()}
              className="h-11 rounded-2xl border border-rose-200 bg-white px-5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
            >
              {isPending
                ? "Disconnecting..."
                : "Disconnect"}
            </Button>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-base font-semibold text-slate-900">
                  Connect your calendar
                </h4>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Enable seamless scheduling
                  and future automation for
                  mentorship sessions.
                </p>
              </div>

              <Button
                type="button"
                onClick={handleConnect}
                className="h-11 rounded-2xl bg-indigo-600 px-6 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Connect Google Calendar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}