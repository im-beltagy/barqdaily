"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

import {
  Box,
  Card,
  Stack,
  Button,
  styled,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";

import { useCurrency } from "@/utils/format-number";

import Iconify from "@/components/iconify";

import { Offer, Product } from "@/types/products";

import IncrementerButton from "./incrementer-button";

interface Props {
  product: Product | Offer;
  href: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  "&.selected": { border: `1px solid ${theme.palette.primary.main}` },
  "&:hover": {
    boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}, 0px 0px 0px 4px ${theme.palette.primary.main}`,
    "&:has(.card-clickable-layer:active)": {
      boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}`,
    },
    zIndex: 9,
  },
}));

export function ProductCard({ product, href }: Props) {
  const t = useTranslations();
  const [quantity, setQuantity] = useState(0);

  const offerPrice = product.offer_price;
  const originalPrice = product.product_price;
  const finalPrice = offerPrice ?? originalPrice;

  const maxQuantity = Math.min(
    product.warehouse_quantity,
    product.offer_quantity ?? product.max_order_quantity
  );

  const currency = useCurrency();

  return (
    <StyledCard className={quantity > 0 ? "selected" : ""}>
      <Box
        className="card-clickable-layer"
        aria-hidden
        sx={{ position: "absolute", inset: 0, cursor: "pointer" }}
        href={href}
        scroll={false}
        component={Link}
      />

      <CardMedia
        src={product.product_logo}
        alt={product.product_name}
        height={180}
        sx={{
          height: { xs: "140px", sm: "250px" },
          objectFit: "cover",
          cursor: "pointer",
        }}
        component="img"
      />
      <CardContent spacing={1} flexGrow={1} component={Stack}>
        <Typography variant="h6" component="p">
          {product.product_name}
        </Typography>
        <Typography variant="caption">{product.measurement_unit}</Typography>
        <Box flexGrow={1} aria-hidden />
        <Typography fontWeight={600} color="primary" suppressHydrationWarning>
          {offerPrice && (
            <Typography component="del" color="text.disabled">
              {currency(originalPrice, false)}
            </Typography>
          )}{" "}
          {currency(finalPrice)}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button variant="outlined">
            <Iconify icon="ph:heart-bold" />
          </Button>

          {quantity === 0 ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="bxs:cart-alt" />}
              onClick={() => setQuantity(product.min_order_quantity)}
              sx={{ flexGrow: 1 }}
            >
              {t("Pages.Home.Product.add_to_cart")}
            </Button>
          ) : (
            <IncrementerButton
              onIncrease={() => setQuantity((prev) => prev + 1)}
              onDecrease={() =>
                setQuantity((prev) =>
                  prev > product.min_order_quantity ? prev - 1 : 0
                )
              }
              sx={{ flexGrow: 1, position: "relative" }}
              quantity={quantity}
              disabledIncrease={quantity >= maxQuantity}
              min={product.min_order_quantity}
            />
          )}
        </Stack>
      </CardContent>
    </StyledCard>
  );
}
