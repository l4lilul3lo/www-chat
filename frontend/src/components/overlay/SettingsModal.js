import React from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

import Settings from "../settings/Settings";
const SettingsModal = ({ isVisible }) => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isVisible && (
          <m.div
            initial={{ x: "-50%", y: "-50%", scale: 0 }}
            animate={{ x: "-50%", y: "-50%", scale: 1 }}
            exit={{ scale: 0 }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "80%",
              height: "90%",
              zIndex: 2,
              background: "black",
              pointerEvents: "auto",
            }}
          >
            <Settings />
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default SettingsModal;
