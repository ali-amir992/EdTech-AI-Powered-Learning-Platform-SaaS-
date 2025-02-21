import { useState, useCallback } from "react";
import { axiosInstance } from "@services/apiConnector";

const useFetch = <T,>(url: string, defaultConfig?: { method: string; headers?: Record<string, string>; bodyData?: any }) => {
    
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const triggerFetch = useCallback(async (config?: { bodyData?: any }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance({
        method: defaultConfig?.method || "GET",
        url,
        headers: defaultConfig?.headers,
        data: config?.bodyData || defaultConfig?.bodyData,
      });
      setData(response.data as T);
    } catch (err) {
      setError((err as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url, defaultConfig?.method, defaultConfig?.headers, defaultConfig?.bodyData]);

  return { data, error, loading, triggerFetch };
};

export default useFetch;