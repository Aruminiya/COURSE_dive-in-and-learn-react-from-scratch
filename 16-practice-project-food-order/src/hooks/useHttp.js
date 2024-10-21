import { useState, useEffect, useCallback } from "react";

const requestConfig = {};

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || '获取数据失败');
  }
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async function() {
    setIsLoading(true);
    setError(null);
    try {
      const resData = await sendHttpRequest(url, config);
      setData(resData);
    } catch (error) {
      setError(error.message || '发送请求失败');
    } finally {
      setIsLoading(false);
    }
  }, [url, config]);

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [url, config]);  

  return { data, isLoading, error, sendRequest };
}
