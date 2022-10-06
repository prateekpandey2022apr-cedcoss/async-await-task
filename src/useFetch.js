import { useState } from "react";

const useFetch = (baseUrl) => {
  const [url, setUrl] = useState(baseUrl);

  const _get = (endpoint) => {
    return fetch(baseUrl + endpoint, {
      method: "GET",
    }).then((response) => response.json());
  };

  const _post = (endpoint, payload) => {
    return fetch(baseUrl + endpoint, {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Content-Type": "application/json",
        appTag: "amazon_sales_channel",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk2NTY4MDE3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2U1ZjUxYWRkZGFlMjIyNjczN2E5MiJ9.m5LW1XQ_w6E8Y_ZAWV-SqoqLUpgyeQXe3R7aGKhCfkxA0h0i2oESFxS3NXvsqU2zBWO9iPa5vobjXypZCEo7ZbjieaowfryVym-Yc2Kc-SkfHJfr7a2QrXxfKql0nBX0SvgEfVdWKxmVb3AK7MyT60gVUCCh82H7ExXntXA46oTvIQkK2rMTC1pCAFxFcWPTUEvz2yfuyLf62533dDfbdWwnYBxOYXrTUBN9E6aOsbl8MDfglV7bRIiKCXF1hTRjyOzUzqp_Tns4kg3oT2zXKpv7mLFcPpEPnYveRP4TGi_N5gRjfyA4o7xAxTHIxmhlRrY7ZEFUx-BcW6aZz7tYNw`,
        "Ced-Source-Id": 500,
        "Ced-Source-Name": "shopify",
        "Ced-Target-Id": 530,
        "Ced-Target-Name": "amazon",
      },
    }).then((response) => response.json());
  };

  const _put = (endpoint, payload) => {
    return fetch(baseUrl + endpoint, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => response.json());
  };

  const _delete = (endpoint) => {
    return fetch(baseUrl + endpoint, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => response.json());
  };

  // const _request = (method, endpoint, payload) => {
  //   return fetch(baseUrl + endpoint, {
  //     method: method,
  //     body: JSON.stringify(),
  //   }).then((response) => response.json());
  // };

  //   const _request = ()
  return { _get, _post, _put, _delete };
};

export { useFetch };
