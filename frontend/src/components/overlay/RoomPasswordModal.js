import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import RoomPasswordForm from "../room_password_form/RoomPasswordForm";
const RoomPasswordModal = ({ isVisible }) => {
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
              width: "60%",
              height: "40%",
              maxWidth: "400px",
              zIndex: 2,
              pointerEvents: "auto",
            }}
          >
            <RoomPasswordForm />
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default RoomPasswordModal;
