import React from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import Users from "../users/Users";

const UsersSlide = ({ isVisible }) => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isVisible && (
          <m.div
            initial={{ x: "100vw" }}
            animate={{ x: "calc(100vw - 260px)" }}
            exit={{ x: "100vw" }}
            style={{
              height: "calc(100% - 22px)",
              position: "absolute",
              zIndex: 2,
              pointerEvents: "auto",
            }}
          >
            <Users slideIn={"slide-in"} />
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default UsersSlide;
