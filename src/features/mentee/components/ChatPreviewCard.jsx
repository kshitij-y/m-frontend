export default function ChatPreviewCard({ chat }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-xs font-semibold text-indigo-700">
          {chat.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {chat.name}
          </p>
          <p className="text-xs text-slate-500">
            {chat.preview}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs text-slate-400">{chat.time}</p>
        {chat.unread > 0 && (
          <span className="mt-2 inline-flex rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white">
            {chat.unread}
          </span>
        )}
      </div>
    </div>
  );
}
