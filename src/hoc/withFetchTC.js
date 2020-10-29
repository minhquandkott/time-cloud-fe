import Axios from "axios";
import React, { useState, useEffect } from "react";
import timeCloudAPI from "../apis/timeCloudAPI";

export const initialTypes = {
  STRING: "STRING",
  ARRAY: "ARRAY",
  NUMBER: "NUMBER",
  OBJECT: "OBJECT",
};

const getInitial = (initType) => {
  switch (initType) {
    case initialTypes.ARRAY:
      return [];
    case initialTypes.NUMBER:
      return 0;
    case initialTypes.OBJECT:
      return null;
    case initialTypes.STRING:
      return "";
    default:
      return null;
  }
};
export const withFetchTC = (request, initialType, loading) => (
  WrappedComponent
) => {
  const Container = (props) => {
    const [data, setData] = useState(() => getInitial(initialType));
    const [error, setError] = useState(null);

    useEffect(() => {
      const source = Axios.CancelToken.source();
      timeCloudAPI()
        .get(request, {
          cancelToken: source.token,
        })
        .then((res) => setData(res.data))
        .catch((error) => setError(error.response.data));

      return () => source.cancel();
    }, []);

    return <WrappedComponent data={data} error={error} {...props} />;
  };

  return Container;
};
