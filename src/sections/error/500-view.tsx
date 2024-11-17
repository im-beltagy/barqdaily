"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { RouterLink } from "@/routes/components";

import CompactLayout from "@/layouts/compact";
import { SeverErrorIllustration } from "@/assets/illustrations";

import { varBounce, MotionContainer } from "@/components/animate";
import { Container } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function Page500({ error }: { error?: string }) {
  const t = useTranslations("Pages.Error500");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) enqueueSnackbar(error, { variant: "error" });
  }, [error]);

  return (
    <CompactLayout>
      <Container sx={{ textAlign: "center", paddingTop: 5 }}>
        <MotionContainer>
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
            <SeverErrorIllustration
              sx={{ height: 260, my: { xs: 5, sm: 10 } }}
            />
          </m.div>

          <Button
            component={RouterLink}
            href="/"
            size="large"
            variant="contained"
          >
            {t("button")}
          </Button>
        </MotionContainer>
      </Container>
    </CompactLayout>
  );
}
