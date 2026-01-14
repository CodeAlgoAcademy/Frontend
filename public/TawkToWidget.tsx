import { useEffect } from 'react';

const TawkToWidget = () => {
  useEffect(() => {
    if (document.getElementById('tawk-to-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'tawk-to-script';
    script.async = true;
    script.src = 'https://embed.tawk.to/6936ba94f831981980dd1a73/1jbushl50';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);

    return () => {
      if ((window as any).Tawk_API?.hideWidget) {
        (window as any).Tawk_API.hideWidget();
      }
    };
  }, []);

  return null;
};

export default TawkToWidget;