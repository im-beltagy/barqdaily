import { forwardRef } from "react";

import Link from "@mui/material/Link";
import Box, { BoxProps } from "@mui/material/Box";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = (
      <Box
        component="img"
        src="/logo/logo_single.svg"
        sx={{
          width: { xs: 35, sm: 50 },
          height: { xs: 35, sm: 50 },
          cursor: "pointer",
          ...sx,
        }}
      />
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link
        component={RouterLink}
        href={paths.home}
        sx={{ display: "contents" }}
      >
        {logo}
      </Link>
    );
  }
);

export default Logo;
