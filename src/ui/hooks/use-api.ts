import { useState, useCallback } from 'react';
import { sandyToast } from '@/ui/lib/sandy-toast';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  showSuccessToast?: boolean;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: any;
  execute: (...args: any[]) => Promise<void>;
  setData: (data: T) => void; // Allow manual optimistic updates
}

export function useApi<T>(
  apiFunc: (...args: any[]) => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const execute = useCallback(async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFunc(...args);
      setData(response);
      
      if (options.showSuccessToast) {
        sandyToast.success("Success!");
      }
      
      if (options.onSuccess) {
        options.onSuccess(response);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || "An unexpected error occurred";
      setError(errorMessage);
      
      // Sandy's Tone Toast handling is implicit here for all fails
      sandyToast.error(errorMessage);
      
      if (options.onError) {
        options.onError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [apiFunc, options]);

  return { data, loading, error, execute, setData };
}
