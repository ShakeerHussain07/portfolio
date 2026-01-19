import React, { useState } from "react";
import {
  Modal,
  IconButton,
  Box,
  Typography,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const Certificate = ({ ImgSertif }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Thumbnail */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          cursor: "pointer",
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
            "& .overlay": { opacity: 1 },
            "& .hover-content": { opacity: 1 },
          },
        }}
        onClick={handleOpen}
      >
        {/* Image */}
        <img
          src={ImgSertif}
          alt="Certificate"
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
            filter: "contrast(1.05) brightness(0.95)",
            transition: "all 0.3s ease",
          }}
          onError={(e) => {
            e.target.src = "/certificates/fallback.png";
          }}
        />

        {/* Hover Overlay */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            className="hover-content"
            sx={{
              textAlign: "center",
              color: "#fff",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <FullscreenIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography fontWeight={600}>View Certificate</Typography>
          </Box>
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(4px)",
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: "90vw",
            maxHeight: "90vh",
            outline: "none",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.6)",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.8)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Full Image */}
          <img
            src={ImgSertif}
            alt="Certificate Full View"
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
            onError={(e) => {
              e.target.src = "/certificates/fallback.png";
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Certificate;
