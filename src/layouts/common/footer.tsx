import Image from "next/image";
import { useTranslations } from "next-intl";

import { Box, Stack, Container, Typography } from "@mui/material";

export default function Footer() {
  const t = useTranslations("Global.Footer");

  const renderContact = (
    <Box>
      <Typography
        variant="h3"
        fontWeight={500}
        letterSpacing=".02em"
        component="h2"
      >
        {t("contact_title")}
      </Typography>
      <Typography>Address here</Typography>
      <Typography>+1234567890123</Typography>
      <Typography>user@asdasd.com</Typography>
    </Box>
  );

  const renderAppDownload = (
    <Stack spacing={1}>
      <Typography variant="h6" fontWeight={500} letterSpacing=".02em">
        {t("download")}
      </Typography>
      <Image
        src="/assets/images/footer/download-ios.svg"
        width={186}
        height={55}
        alt={t("download_ios")}
      />
      <Image
        src="/assets/images/footer/download-android.svg"
        width={186}
        height={55}
        alt={t("download_android")}
      />
    </Stack>
  );

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: {
          xs: 2,
          md: 3,
        },
      }}
      component="footer"
    >
      <Container>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          textAlign={{ xs: "center", sm: "start" }}
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          {renderContact}
          {renderAppDownload}
        </Stack>
      </Container>
    </Box>
  );
}
