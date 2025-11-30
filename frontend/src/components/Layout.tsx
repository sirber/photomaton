import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { PropsWithChildren } from "react";
import { TopNav } from "./TopNav";

export function Layout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TopNav />

      {/* Provide a toolbar spacer to push content below the fixed AppBar */}
      <Box component="div" sx={{ mt: 8 }} />

      <Box component="main" sx={{ flex: 1, display: "flex", alignItems: "stretch" }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
}

export default Layout;
