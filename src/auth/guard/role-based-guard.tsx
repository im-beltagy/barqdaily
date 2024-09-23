import { m } from "framer-motion";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Theme, SxProps } from "@mui/material/styles";

import { useMockedUser } from "@/hooks/use-mocked-user";

import { ForbiddenIllustration } from "@/assets/illustrations";

import { varBounce, MotionContainer } from "@/components/animate";
import { useTranslations } from "next-intl";

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function RoleBasedGuard({
  hasContent,
  roles,
  children,
  sx,
}: RoleBasedGuardProp) {
  // Logic here to get current user role
  const { user } = useMockedUser();

  // const currentRole = 'user';
  const currentRole = user?.role; // admin;
  const t = useTranslations("Pages.RoleBasedGuard");
  if (typeof roles !== "undefined" && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container
        component={MotionContainer}
        sx={{ textAlign: "center", ...sx }}
      >
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {t("title")}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            {t("message")}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
