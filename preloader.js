const preloader = () => {
  return new Promise((resolve) => {
    window.onload = resolve;
  });
};

export default preloader;
