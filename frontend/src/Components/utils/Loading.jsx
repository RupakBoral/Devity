const Loading = () => {
  return (
    <div className="w-screen h-screen bg-base-300 mx-auto flex flex-col items-center pt-20">
      <div className="flex w-72 h-full flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
};

export default Loading;
