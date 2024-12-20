import { Box } from "@mui/material";

import Footer from "../common/footer";
import { HEADER } from "../config-layout";
import Copyrights from "../common/copyrights";
import HeaderSimple from "../common/header-simple";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function CompactLayout({ children }: Props) {
  return (
    <>
      <HeaderSimple />
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "1fr auto",
          gridTemplateColumns: "100%",
          pt: `${HEADER.H_SIMPLE}px`,
          minHeight: "100%", // don't ask me why
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Box>{children}</Box>
        <Box sx={{ flexShrink: 0 }}>
          <Footer />
          <Copyrights />
        </Box>
      </Box>
    </>
  );
}
