import { useCallback, useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);

      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};
