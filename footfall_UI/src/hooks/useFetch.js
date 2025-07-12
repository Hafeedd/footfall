import { useEffect, useState } from "react";

export const useFetch = (svc, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await svc(options);
      if (!response.success) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = response.data;
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, refetch: fetchData };
};
