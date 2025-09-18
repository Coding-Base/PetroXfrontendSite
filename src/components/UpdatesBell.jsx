// src/components/UpdatesBell.jsx
import React, { useEffect, useState, useRef } from "react";
import { Bell } from "lucide-react";
import { getUnreadCount } from "@/api"; // uses configured axios instance (baseURL from VITE_SERVER_URL)

export default function UpdatesBell({ onOpen }) {
  const [count, setCount] = useState(0);
  const mountedRef = useRef(true);

  const fetchCount = async () => {
    try {
      const res = await getUnreadCount();
      // expect axios response: res.data.unread_count
      const unread = res?.data?.unread_count ?? 0;
      if (mountedRef.current) setCount(unread || 0);
    } catch (e) {
      // keep silent in UI, but helpful debug log
      // eslint-disable-next-line no-console
      console.debug("UpdatesBell: failed to fetch unread count", e);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    fetchCount();

    const id = setInterval(fetchCount, 60000); // poll every 60s
    return () => {
      mountedRef.current = false;
      clearInterval(id);
    };
  }, []);

  // Optionally refresh count immediately when user clicks/open the bell
  const handleOpen = async (evt) => {
    if (typeof onOpen === "function") onOpen(evt);
    // refresh unread count right away so UI is up-to-date
    await fetchCount();
  };

  return (
    <button className="relative" onClick={handleOpen} aria-label="Updates">
      <Bell size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full px-1">
          {count}
        </span>
      )}
    </button>
  );
}
