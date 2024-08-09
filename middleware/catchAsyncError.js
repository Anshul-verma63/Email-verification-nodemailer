const catchAsychError = (props) => {
  return (req, res, next) => {
    Promise.resolve(props(req, res, next)).catch(next);
  };
};

export default catchAsychError;
