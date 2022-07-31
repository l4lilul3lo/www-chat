import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import ImageUploader from "./ImageUploader";

const AvatarUploader = ({
  handleToggleAvatarUpload,
  avatarUploadIsToggled,
}) => {
  const isVisible = avatarUploadIsToggled;
  const duration = 0.2;
  const variants = {
    initial: {
      top: 10,
      left: 10,
      x: 0,
      y: 0,
      height: "60px",
      width: "60px",

      borderRadius: "50%",
      transition: {
        top: {
          ease: "easeInOut",
          duration: duration,
        },
        left: {
          ease: "easeInOut",
          duration: duration,
        },

        x: {
          duration: duration,
          delay: duration,
        },
        y: { duration: duration, delay: duration },
      },
    },
    animate: {
      top: "30%",
      left: "50%",
      height: "200px",
      width: "90%",
      x: "-50%",
      y: "-50%",
      borderRadius: 0,
      transition: {
        top: {
          ease: "easeInOut",
          duration: duration,
        },
        left: {
          ease: "easeInOut",
          duration: duration,
        },

        x: {
          duration: duration,
        },
        y: {
          duration: duration,
        },
      },
    },
    exit: {
      top: 10,
      left: 10,
      x: 0,
      y: 0,
      height: "60px",
      width: "60px",
      borderRadius: "50%",
      transition: {
        top: {
          ease: "easeInOut",
          duration: duration,
        },
        left: {
          ease: "easeInOut",
          duration: duration,
        },
        x: {
          duration: duration,
        },
        y: {
          duration: duration,
        },
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isVisible && (
          <m.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            style={{
              position: "absolute",
              background: "gray",
              zIndex: 2,
              pointerEvents: "auto",
            }}
          >
            <ImageUploader
              handleToggleAvatarUpload={handleToggleAvatarUpload}
              avatarUploadIsToggled={avatarUploadIsToggled}
            />
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default AvatarUploader;
