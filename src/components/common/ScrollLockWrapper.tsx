import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";

interface ScrollLockWrapperProps {
  isGuest: boolean;
  children: React.ReactNode;
  /** Distance in pixels between each lock point. Default is 5000px */
  scrollThreshold?: number;
  /** Inactivity limit in milliseconds before lock triggers. Default is 5 minutes */
  idleTimeoutMs?: number;
}

export const ScrollLockWrapper: React.FC<ScrollLockWrapperProps> = ({
  isGuest,
  children,
  scrollThreshold = 5000,
  idleTimeoutMs = 5 * 60 * 1000,
}) => {
  const [isLocked, setIsLocked] = useState(false);

  // Next scroll position where the lock triggers (5000, 10000, 15000, etc.)
  const [nextLockPosition, setNextLockPosition] = useState(scrollThreshold);

  useEffect(() => {
    if (!isGuest) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll >= nextLockPosition) {
        // At or past threshold: Lock the feed
        setIsLocked(true);
      } else {
        // Scrolled back above the threshold: Unlock automatically
        setIsLocked(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isGuest, nextLockPosition]);

  /* Idle timeout */
  useEffect(() => {
    if (!isGuest) return;

    const timer = setTimeout(() => {
      setIsLocked(true);
    }, idleTimeoutMs);

    return () => clearTimeout(timer);
  }, [isGuest, idleTimeoutMs]);

  const handleCloseLock = () => {
    const currentScroll = window.scrollY;

    // Dismiss the lock overlay
    setIsLocked(false);

    // Bump the lock barrier to the next multiple of scrollThreshold
    const newLockPosition =
      (Math.floor(currentScroll / scrollThreshold) + 1) * scrollThreshold;

    setNextLockPosition(newLockPosition);
  };

  if (!isGuest) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Feed Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isLocked
            ? "filter blur-xs select-none pointer-events-none opacity-50"
            : ""
        }`}
      >
        {children}
      </div>

      {/* Centered Lock Card */}
      {isLocked && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            p-4
            bg-slate-900/30
            backdrop-blur-[2px]
          "
        >
          <div
            className="
              relative
              w-full
              max-w-md
              bg-white
              border
              border-slate-200
              shadow-2xl
              rounded-2xl
              p-6
              text-center
              animate-in
              zoom-in-95
              duration-300
            "
          >
            {/* X Button */}
            <button
              type="button"
              onClick={handleCloseLock}
              aria-label="Close"
              className="
                absolute
                top-3
                right-3
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-slate-400
                hover:bg-slate-100
                hover:text-slate-700
                transition
              "
            >
              <CloseIcon fontSize="small" />
            </button>

            {/* Lock Icon */}
            <div
              className="
                mx-auto
                mb-3
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-slate-100
                text-slate-700
              "
            >
              <LockOutlinedIcon />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-slate-900">
              Unlock Full Feed
            </h2>

            {/* Description */}
            <p className="mt-2 mb-5 text-sm leading-relaxed text-slate-500">
              You’ve reached the preview limit. Sign in to unlock full access,
              or close this message to continue reading.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-3">
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign In
              </Button>

              <Button
                component={Link}
                to="/register"
                variant="outlined"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
