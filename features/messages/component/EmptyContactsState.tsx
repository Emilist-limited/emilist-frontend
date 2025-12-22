const EmptyContactsState = () => (
  <div className="flex justify-center items-center h-full w-full">
    <div className="flex flex-col items-center justify-center p-12 text-center h-full">
      <div className="text-6xl mb-6 opacity-20">💬</div>
      <h3 className="text-xl font-semibold text-dark-green mb-3">
        No conversations yet
      </h3>
      <p className="text-base-content/60 mb-6 max-w-sm">
        Start a new conversation by messaging job owners, material owners or
        wait for someone to message you.
      </p>
    </div>
  </div>
);

export default EmptyContactsState;
