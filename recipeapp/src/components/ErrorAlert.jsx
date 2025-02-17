import React from "react";
import PropTypes from "prop-types";

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="alert alert-danger text-center" role="alert">
      {message}
    </div>
  );
};

ErrorAlert.propTypes = {
  message: PropTypes.string,
};

export default ErrorAlert;