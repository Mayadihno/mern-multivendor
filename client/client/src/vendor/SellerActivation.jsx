import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SellerActivation = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const token = activation_token.replaceAll("-", ".");
  useEffect(() => {
    if (token) {
      const sendRequest = async () => {
        await axios
          .post(`/shop/activation`, {
            activation_token: token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);
  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!error ? (
          <p>Your token is expired</p>
        ) : (
          <p>Your account is created successfully </p>
        )}
      </div>
    </React.Fragment>
  );
};

export default SellerActivation;
