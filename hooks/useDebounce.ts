import { useEffect, useMemo, useRef, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface DebouncedFunction<F extends (...args: any[]) => any> {
  (...args: Parameters<F>): void;
  flush(): void;
  cancel(): void;
}

export function useDebouncedCallback<F extends (...args: any[]) => any>(
  callback: F,
  delay: number
): DebouncedFunction<F> {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef(callback);
  const pendingArgsRef = useRef<Parameters<F>>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debounced = useMemo(() => {
    const func = (...args: Parameters<F>) => {
      pendingArgsRef.current = args;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (pendingArgsRef.current) {
          callbackRef.current(...pendingArgsRef.current);
          pendingArgsRef.current = undefined;
        }
      }, delay);
    };

    func.flush = () => {
      if (timeoutRef.current && pendingArgsRef.current) {
        clearTimeout(timeoutRef.current);
        callbackRef.current(...pendingArgsRef.current);
        pendingArgsRef.current = undefined;
      }
    };

    func.cancel = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      pendingArgsRef.current = undefined;
    };

    return func;
  }, [delay]);

  return debounced;
}