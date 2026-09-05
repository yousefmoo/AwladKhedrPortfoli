import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مجموعة أولاد خضر | تصنيع وتوريد الطوب منذ 1983",
  description: "أكثر من 40 عاماً من الخبرة في تصنيع وتوريد كافة أنواع الطوب الطفلي والأسمنتي والوردي والإنترلوك. المورد المعتمد لأكبر المشاريع القومية والهندسية في مصر.",
  keywords: "طوب, طوب طفلي, طوب أسمنتي, طوب وردي, إنترلوك, بردورات, أولاد خضر, تصنيع طوب, مصر",
  authors: [{ name: "Awlad Khedr Group" }],
  openGraph: {
    title: "مجموعة أولاد خضر لتصنيع وتوريد الطوب",
    description: "أكثر من 40 عاماً من الجودة والصلابة في تصنيع وتوريد كافة أنواع الطوب",
    type: "website",
    locale: "ar_EG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
