const Loading = () => {
  return (
    <div className="w-screen h-full pt-32 bg-base-300 mx-auto flex flex-col items-center">
      <div className="flex w-1/2 h-full flex-col gap-4">
        <div className="skeleton h-24 w-full"></div>
        <div className="skeleton h-4 w-1/4"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex w-1/2 h-full flex-col gap-4">
        <div className="skeleton h-24 w-full"></div>
        <div className="skeleton h-4 w-1/4"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex w-1/2 h-full flex-col gap-4">
        <div className="skeleton h-24 w-full"></div>
        <div className="skeleton h-4 w-1/4"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex w-1/2 h-full flex-col gap-4">
        <div className="skeleton h-24 w-full"></div>
        <div className="skeleton h-4 w-1/4"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex w-1/2 h-full flex-col gap-4">
        <div className="skeleton h-24 w-full"></div>
        <div className="skeleton h-4 w-1/4"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
};

export default Loading;
