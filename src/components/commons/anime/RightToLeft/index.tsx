import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

function RightToLeft({ children }: Props) {
  return (
    <>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default RightToLeft;
