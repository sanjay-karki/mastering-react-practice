import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [fetchPureInfo, setFetchPureInfo] = useState([]);
  const [fetchInfo, setFetchInfo] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getInfoData = async () => {
      await axios
        .get(url)
        .then((response) => {
          setFetchPureInfo(response.data)
          setFetchInfo(response.data.results || []);
        }
        )
        .catch((err) => {
          setError(err);
          console.error(err);
        });
    };
    getInfoData();
  }, [url]);
  return {fetchInfo, setFetchInfo, fetchPureInfo, setFetchPureInfo, error};
};

export default useFetch;
