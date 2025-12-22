interface ResultMsgProps {
  msg: string;
}

const ResultMsg = ({ msg }: ResultMsgProps) => {
  return <h6 className="text-[#737774] text-sm mb-4">{msg}</h6>;
};

export default ResultMsg;
