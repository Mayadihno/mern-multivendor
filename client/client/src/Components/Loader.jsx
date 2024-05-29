import React from "react";
import { Circles } from "react-loader-spinner";
const Loader = () => {
  return (
    <React.Fragment>
      <div className="w-full h-screen flex items-center justify-center">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </React.Fragment>
  );
};

export default Loader;
