'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function SmoothScrollManager() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const pendingTop = window.sessionStorage.getItem('pending-scroll-top');
    const pendingHash = window.sessionStorage.getItem('pending-scroll-hash');
    const hash = pendingHash || window.location.hash.replace('#', '');

    if (pendingTop) {
      window.sessionStorage.removeItem('pending-scroll-top');
      window.setTimeout(scrollToTop, 120);
      return;
    }

    if (!hash) {
      return;
    }

    window.sessionStorage.removeItem('pending-scroll-hash');
    window.setTimeout(() => scrollToHash(hash), 120);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[data-smooth-scroll]');

      if (!anchor) {
        return;
      }

      const url = new URL(anchor.href);

      if (url.origin !== window.location.origin) {
        return;
      }

      event.preventDefault();

      const nextPath = `${url.pathname}${url.search}`;
      const currentPath = `${window.location.pathname}${window.location.search}`;
      const hash = url.hash.replace('#', '');

      if (nextPath === currentPath) {
        window.history.pushState(null, '', `${nextPath}${url.hash}`);

        if (hash) {
          scrollToHash(hash);
        } else {
          scrollToTop();
        }

        return;
      }

      if (hash) {
        window.sessionStorage.setItem('pending-scroll-hash', hash);
      } else {
        window.sessionStorage.setItem('pending-scroll-top', '1');
      }

      router.push(`${nextPath}${url.hash}`, { scroll: false });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [router]);

  return null;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function scrollToHash(hash: string) {
  const element = document.getElementById(decodeURIComponent(hash));

  if (!element) {
    return;
  }

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
