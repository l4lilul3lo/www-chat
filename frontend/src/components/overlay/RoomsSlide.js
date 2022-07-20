import React from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import Rooms from "../rooms/Rooms";

const RoomsSlide = ({ isVisible }) => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isVisible && (
          <m.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            style={{
              height: "calc(100% - 22px)",
              position: "absolute",
              zIndex: 4,
              pointerEvents: "auto",
            }}
          >
            <Rooms slideIn={"slide-in"} />
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default RoomsSlide;
