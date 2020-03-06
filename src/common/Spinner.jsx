import React from "react";

const Spinner = () => {
  return (
    <div className="">
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    </div>
  );
};

export default Spinner;
