import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "tRPC Todo Demo",
  description: "Next.js + tRPC + Turbo monorepo demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
