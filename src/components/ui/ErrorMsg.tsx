import { motion } from "framer-motion";

interface IProps
{
    msg:string;
}

const ErrorMsg = ({msg}:IProps) => {
  return (
      <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-red-400 text-[11px] font-medium ml-1"
      >
          {msg}
      </motion.p>
  )
}

export default ErrorMsg