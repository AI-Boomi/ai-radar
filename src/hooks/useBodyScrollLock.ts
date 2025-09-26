import { useLayoutEffect } from "react";

export function useBodyScrollLock(lock: boolean) {
  useLayoutEffect(() => {
    if (!lock) return;

    const body = document.body;
    const scrollY =
      window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

    // save inline styles we’ll restore
    const orig = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    // lock: prevents background scroll (desktop + iOS)
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      // restore and put user back where they were
      body.style.position = orig.position;
      body.style.top = orig.top;
      body.style.left = orig.left;
      body.style.right = orig.right;
      body.style.width = orig.width;
      body.style.overflow = orig.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [lock]);
}
