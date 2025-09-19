// src/components/UpdatesBell.jsx
import React, { useEffect, useState, useRef } from "react";
import { Bell } from "lucide-react";
import { getUpdatesUnreadCount } from "@/api"; // ensure this is exported

export default function UpdatesBell({ onOpen }) {
  const [count, setCount] = useState(0);
  const mountedRef = useRef(true);

  const fetchCount = async () => {
    try {
      const res = await getUpdatesUnreadCount();
      const unread = res?.data?.unread_count ?? 0;
      if (mountedRef.current) setCount(unread);
    } catch (e) {
      console.debug("UpdatesBell: failed to fetch unread count", e);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    fetchCount();
    const id = setInterval(fetchCount, 60000);
    return () => {
      mountedRef.current = false;
      clearInterval(id);
    };
  }, []);

  const handleOpen = async (evt) => {
    if (typeof onOpen === "function") onOpen(evt);
    // refresh the badge immediately after open
    await fetchCount();
  };

  return (
    <button className="relative" onClick={handleOpen} aria-label="Updates">
      <Bell size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full px-1">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
