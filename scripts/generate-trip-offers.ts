/**
 * Generates branded PDF offers for every trip into public/offers/
 * Run: npx tsx scripts/generate-trip-offers.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";
import { trips, type Trip } from "../app/data/trips.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "offers");
const PUBLIC = path.join(ROOT, "public");

const INK = "#102b24";
const DEEP = "#09231d";
const FOREST = "#123b32";
const LIME = "#d9f56d";
const SAND = "#f2efe7";
const PAPER = "#fbfaf6";
const MUTED = "#66716c";
const LINE = "#d4d8d0";

const PAGE_W = 595.28; // A4
const PAGE_H = 841.89;
const M = 48;
const CONTENT_W = PAGE_W - M * 2;

function publicPath(urlPath: string) {
  return path.join(PUBLIC, urlPath.replace(/^\//, ""));
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function wrapText(
  doc: PDFKit.PDFDocument,
  text: string,
  x: number,
  y: number,
  width: number,
  options: PDFKit.Mixins.TextOptions = {}
) {
  const h = doc.heightOfString(text, { width, ...options });
  doc.text(text, x, y, { width, ...options });
  return h;
}

function drawFooter(doc: PDFKit.PDFDocument, pageNum: number, total: number, tripTitle: string) {
  const y = PAGE_H - 28;
  doc.save();
  doc.strokeColor(LINE).lineWidth(0.5).moveTo(M, y - 10).lineTo(PAGE_W - M, y - 10).stroke();
  doc.font("Helvetica").fontSize(7).fillColor(MUTED);
  doc.text("Balkan Peaks ADV  ·  Pejë, Kosovo", M, y, { lineBreak: false });
  doc.text(`${tripTitle}`, M, y, { width: CONTENT_W, align: "center", lineBreak: false });
  doc.text(`${pageNum} / ${total}`, PAGE_W - M - 40, y, { width: 40, align: "right", lineBreak: false });
  doc.restore();
}

function drawSectionLabel(doc: PDFKit.PDFDocument, label: string, x: number, y: number) {
  doc.font("Helvetica-Bold").fontSize(8).fillColor(FOREST);
  doc.text(label.toUpperCase(), x, y, { characterSpacing: 1.6 });
  return y + 16;
}

function drawAccentBar(doc: PDFKit.PDFDocument, x: number, y: number, w = 36) {
  doc.save();
  doc.rect(x, y, w, 3).fill(LIME);
  doc.restore();
}

function imageFit(
  doc: PDFKit.PDFDocument,
  imgPath: string,
  x: number,
  y: number,
  w: number,
  h: number
) {
  if (!fs.existsSync(imgPath)) return;
  try {
    doc.image(imgPath, x, y, { cover: [w, h], align: "center", valign: "center" });
  } catch {
    // ignore bad images
  }
}

type PageDrawer = (doc: PDFKit.PDFDocument, pageIndex: number) => void;

async function buildOffer(slug: string, trip: Trip) {
  const fileName = `${slug}-offer.pdf`;
  const outPath = path.join(OUT_DIR, fileName);
  const hero = publicPath(trip.image);
  const secondary = publicPath(trip.secondaryImage || "/images/hero-peaks.jpeg");
  const logo = publicPath("/BALKAN_PEAKS_LOGO.png");
  const gallery = [
    hero,
    secondary,
    publicPath("/images/mountain-pastures.jpeg"),
    publicPath("/images/theth-church.jpeg"),
    publicPath("/images/mountain-lodge.jpeg"),
  ].filter((p, i, arr) => fs.existsSync(p) && arr.indexOf(p) === i);

  const drawers: PageDrawer[] = [];

  // —— Cover ——
  drawers.push((doc) => {
    doc.rect(0, 0, PAGE_W, PAGE_H).fill(DEEP);

    if (fs.existsSync(hero)) {
      imageFit(doc, hero, 0, 0, PAGE_W, PAGE_H * 0.58);
      doc.save();
      doc.rect(0, 0, PAGE_W, PAGE_H * 0.58).fillOpacity(0.42).fill(DEEP);
      doc.restore();
    }

    doc.rect(0, PAGE_H * 0.52, PAGE_W, PAGE_H * 0.48).fill(DEEP);

    if (fs.existsSync(logo)) {
      doc.image(logo, M, 36, { height: 42 });
    } else {
      doc.font("Helvetica-Bold").fontSize(11).fillColor(LIME).text("BALKAN PEAKS ADV", M, 48);
    }

    doc.font("Helvetica-Bold").fontSize(9).fillColor(LIME);
    doc.text("TRIP OFFER", M, PAGE_H * 0.56, { characterSpacing: 2.2 });

    doc.font("Times-Bold").fontSize(34).fillColor("#ffffff");
    const titleH = wrapText(doc, trip.title, M, PAGE_H * 0.56 + 22, CONTENT_W * 0.85, {
      lineGap: 2,
    });

    doc.font("Helvetica").fontSize(10).fillColor("#c1cbc6");
    wrapText(doc, trip.eyebrow, M, PAGE_H * 0.56 + 28 + titleH, CONTENT_W);

    doc.font("Times-Roman").fontSize(12).fillColor("#dce4df");
    wrapText(doc, trip.subtitle, M, PAGE_H * 0.72, CONTENT_W * 0.92, { lineGap: 3 });

    // Stats strip
    const stats = [
      ["Duration", trip.days],
      ["Distance", trip.distance],
      ["Level", trip.difficulty],
      ["From", trip.price],
    ];
    const stripY = PAGE_H - 88;
    doc.rect(0, stripY, PAGE_W, 88).fill(FOREST);
    const colW = CONTENT_W / stats.length;
    stats.forEach(([label, value], i) => {
      const x = M + i * colW;
      doc.font("Helvetica").fontSize(7).fillColor("#95a8a0").text(label.toUpperCase(), x, stripY + 22, {
        characterSpacing: 1.2,
      });
      doc.font("Helvetica-Bold").fontSize(13).fillColor(LIME).text(value, x, stripY + 40);
    });
  });

  // —— Overview ——
  drawers.push((doc) => {
    doc.rect(0, 0, PAGE_W, PAGE_H).fill(PAPER);
    let y = M;

    y = drawSectionLabel(doc, "The experience", M, y);
    drawAccentBar(doc, M, y);
    y += 18;

    doc.font("Times-Bold").fontSize(26).fillColor(INK);
    y += wrapText(doc, "More than a route. A way into the mountains.", M, y, CONTENT_W * 0.9, {
      lineGap: 2,
    });
    y += 18;

    doc.font("Times-Roman").fontSize(11).fillColor("#3f524c");
    for (const para of trip.description) {
      const h = wrapText(doc, para, M, y, CONTENT_W, { lineGap: 3, align: "justify" });
      y += h + 12;
    }

    y += 8;
    doc.roundedRect(M, y, CONTENT_W, 52, 4).fill(SAND);
    doc.font("Helvetica").fontSize(8).fillColor(MUTED).text("BEST SEASON", M + 16, y + 14, {
      characterSpacing: 1.2,
    });
    doc.font("Helvetica-Bold").fontSize(13).fillColor(INK).text(trip.season, M + 16, y + 28);
    doc.font("Helvetica").fontSize(8).fillColor(MUTED).text("COUNTRIES", M + CONTENT_W * 0.45, y + 14, {
      characterSpacing: 1.2,
    });
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor(INK)
      .text(trip.countries, M + CONTENT_W * 0.45, y + 28, { width: CONTENT_W * 0.5 });
    y += 70;

    y = drawSectionLabel(doc, "What stays with you", M, y);
    drawAccentBar(doc, M, y);
    y += 14;

    trip.highlights.forEach((h, i) => {
      doc.roundedRect(M, y, CONTENT_W, 34, 3).fill(i % 2 === 0 ? SAND : "#ebe8df");
      doc.font("Helvetica-Bold").fontSize(10).fillColor(FOREST).text(`0${i + 1}`, M + 14, y + 11);
      doc.font("Helvetica").fontSize(10).fillColor(INK).text(h, M + 48, y + 11, {
        width: CONTENT_W - 64,
      });
      y += 40;
    });

    if (trip.note) {
      y += 8;
      doc.roundedRect(M, y, CONTENT_W, 56, 4).fill(FOREST);
      doc.font("Helvetica").fontSize(9).fillColor("#c1cbc6").text(trip.note, M + 16, y + 14, {
        width: CONTENT_W - 32,
        lineGap: 2,
      });
    }

    // Side image band at bottom if space
    if (y < PAGE_H - 200 && gallery[1]) {
      const imgH = Math.min(150, PAGE_H - y - 50);
      imageFit(doc, gallery[1], M, PAGE_H - 40 - imgH, CONTENT_W, imgH);
    }
  });

  // —— Itinerary pages ——
  const daysPerPage = 3;
  for (let start = 0; start < trip.itinerary.length; start += daysPerPage) {
    const chunk = trip.itinerary.slice(start, start + daysPerPage);
    const isFirst = start === 0;
    drawers.push((doc) => {
      doc.rect(0, 0, PAGE_W, PAGE_H).fill(PAPER);
      let y = M;

      if (isFirst) {
        y = drawSectionLabel(doc, "Day by day", M, y);
        drawAccentBar(doc, M, y);
        y += 14;
        doc.font("Times-Bold").fontSize(24).fillColor(INK);
        y += wrapText(doc, "Your journey, unfolded.", M, y, CONTENT_W);
        y += 16;
      } else {
        y = drawSectionLabel(doc, "Itinerary continued", M, y);
        drawAccentBar(doc, M, y);
        y += 18;
      }

      for (const day of chunk) {
        const boxTop = y;
        doc.rect(M, y, 4, 8).fill(LIME); // placeholder height updated after

        doc.font("Helvetica-Bold").fontSize(8).fillColor(FOREST);
        doc.text(`DAY ${day.id}`, M + 14, y + 2, { characterSpacing: 1.4 });
        y += 16;

        doc.font("Times-Bold").fontSize(14).fillColor(INK);
        y += wrapText(doc, day.title, M + 14, y, CONTENT_W - 20);
        y += 4;

        doc.font("Helvetica-Oblique").fontSize(9).fillColor(MUTED);
        y += wrapText(doc, day.summary, M + 14, y, CONTENT_W - 20);
        y += 6;

        doc.font("Helvetica").fontSize(9).fillColor("#3f524c");
        y += wrapText(doc, day.body, M + 14, y, CONTENT_W - 20, { lineGap: 2, align: "justify" });
        y += 6;

        doc.font("Helvetica-Bold").fontSize(8).fillColor(FOREST);
        y += wrapText(doc, day.meta, M + 14, y, CONTENT_W - 20);
        y += 4;

        if (day.details?.length) {
          for (const fact of day.details) {
            doc.font("Helvetica").fontSize(8).fillColor(MUTED);
            y += wrapText(doc, `•  ${fact}`, M + 14, y, CONTENT_W - 20);
            y += 2;
          }
        }

        const boxH = y - boxTop + 8;
        doc.save();
        doc.rect(M, boxTop, 3, boxH).fill(LIME);
        doc.restore();

        y += 16;
        if (y > PAGE_H - 60) break;
      }
    });
  }

  // —— Included / gallery ——
  drawers.push((doc) => {
    doc.rect(0, 0, PAGE_W, PAGE_H).fill(PAPER);
    let y = M;

    y = drawSectionLabel(doc, "Holiday information", M, y);
    drawAccentBar(doc, M, y);
    y += 14;
    doc.font("Times-Bold").fontSize(24).fillColor(INK);
    y += wrapText(doc, "What's covered. What's not.", M, y, CONTENT_W);
    y += 20;

    const colW = (CONTENT_W - 16) / 2;
    const leftX = M;
    const rightX = M + colW + 16;
    let leftY = y;
    let rightY = y;

    doc.roundedRect(leftX, leftY, colW, 28, 3).fill(FOREST);
    doc.font("Helvetica-Bold").fontSize(10).fillColor(LIME).text("INCLUDED", leftX + 12, leftY + 9);
    leftY += 36;

    for (const item of trip.included) {
      doc.font("Helvetica").fontSize(9).fillColor(INK);
      const h = wrapText(doc, `✓  ${item}`, leftX + 4, leftY, colW - 8, { lineGap: 1 });
      leftY += h + 6;
    }

    doc.roundedRect(rightX, rightY, colW, 28, 3).fill(SAND);
    doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text("NOT INCLUDED", rightX + 12, rightY + 9);
    rightY += 36;

    for (const item of trip.notIncluded) {
      doc.font("Helvetica").fontSize(9).fillColor(MUTED);
      const h = wrapText(doc, `—  ${item}`, rightX + 4, rightY, colW - 8, { lineGap: 1 });
      rightY += h + 6;
    }

    y = Math.max(leftY, rightY) + 24;

    // Photo strip
    if (gallery.length >= 2 && y < PAGE_H - 180) {
      y = drawSectionLabel(doc, "On the trail", M, y);
      drawAccentBar(doc, M, y);
      y += 14;
      const imgH = 140;
      const gap = 10;
      const imgW = (CONTENT_W - gap) / 2;
      imageFit(doc, gallery[0], M, y, imgW, imgH);
      imageFit(doc, gallery[1], M + imgW + gap, y, imgW, imgH);
    }
  });

  // —— Gear & practical ——
  if (trip.gearRequired || trip.practical || trip.faq) {
    drawers.push((doc) => {
      doc.rect(0, 0, PAGE_W, PAGE_H).fill(PAPER);
      let y = M;

      if (trip.gearRequired) {
        y = drawSectionLabel(doc, "Packing", M, y);
        drawAccentBar(doc, M, y);
        y += 14;
        doc.font("Times-Bold").fontSize(22).fillColor(INK);
        y += wrapText(doc, "Gear for the trail.", M, y, CONTENT_W);
        y += 14;

        const colW = (CONTENT_W - 16) / 2;
        let ly = y;
        let ry = y;

        doc.font("Helvetica-Bold").fontSize(9).fillColor(FOREST).text("REQUIRED", M, ly);
        ly += 14;
        for (const item of trip.gearRequired) {
          doc.font("Helvetica").fontSize(8).fillColor(INK);
          ly += wrapText(doc, `•  ${item}`, M, ly, colW) + 3;
        }

        if (trip.gearOptional) {
          doc.font("Helvetica-Bold").fontSize(9).fillColor(FOREST).text("OPTIONAL", M + colW + 16, ry);
          ry += 14;
          for (const item of trip.gearOptional.slice(0, 12)) {
            doc.font("Helvetica").fontSize(8).fillColor(MUTED);
            ry += wrapText(doc, `•  ${item}`, M + colW + 16, ry, colW) + 3;
          }
        }

        y = Math.max(ly, ry) + 20;
      }

      if (trip.practical && y < PAGE_H - 120) {
        y = drawSectionLabel(doc, "Before you go", M, y);
        drawAccentBar(doc, M, y);
        y += 14;

        for (const item of trip.practical) {
          if (y > PAGE_H - 70) break;
          doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text(item.label, M, y);
          y += 12;
          doc.font("Helvetica").fontSize(8).fillColor(MUTED);
          y += wrapText(doc, item.text, M, y, CONTENT_W) + 10;
        }
      }
    });
  }

  // —— FAQ (if long) ——
  if (trip.faq && trip.faq.length > 0) {
    drawers.push((doc) => {
      doc.rect(0, 0, PAGE_W, PAGE_H).fill(PAPER);
      let y = M;
      y = drawSectionLabel(doc, "Good to know", M, y);
      drawAccentBar(doc, M, y);
      y += 14;
      doc.font("Times-Bold").fontSize(22).fillColor(INK);
      y += wrapText(doc, "Questions before you book.", M, y, CONTENT_W);
      y += 18;

      for (const item of trip.faq!) {
        if (y > PAGE_H - 90) break;
        doc.font("Helvetica-Bold").fontSize(10).fillColor(INK);
        y += wrapText(doc, item.q, M, y, CONTENT_W) + 4;
        doc.font("Helvetica").fontSize(9).fillColor("#3f524c");
        y += wrapText(doc, item.a, M, y, CONTENT_W, { lineGap: 2 }) + 14;
      }
    });
  }

  // —— Closing CTA ——
  drawers.push((doc) => {
    doc.rect(0, 0, PAGE_W, PAGE_H).fill(DEEP);

    if (gallery[0]) {
      imageFit(doc, gallery[0], 0, 0, PAGE_W, 280);
      doc.save();
      doc.rect(0, 0, PAGE_W, 280).fillOpacity(0.5).fill(DEEP);
      doc.restore();
    }

    if (fs.existsSync(logo)) {
      doc.image(logo, M, 40, { height: 36 });
    }

    let y = 320;
    doc.font("Helvetica-Bold").fontSize(9).fillColor(LIME);
    doc.text("YOUR PLACE ON THE TRAIL", M, y, { characterSpacing: 2 });
    y += 24;

    doc.font("Times-Bold").fontSize(28).fillColor("#ffffff");
    y += wrapText(doc, `Ready for ${trip.title}?`, M, y, CONTENT_W * 0.9);
    y += 16;

    doc.font("Helvetica").fontSize(11).fillColor("#b9c7c1");
    y += wrapText(
      doc,
      "Tell our team when you would like to travel. Share your preferred dates and group size—we usually reply within a few hours.",
      M,
      y,
      CONTENT_W * 0.88,
      { lineGap: 3 }
    );
    y += 28;

    doc.roundedRect(M, y, 220, 44, 4).fill(LIME);
    doc.font("Helvetica-Bold").fontSize(11).fillColor(DEEP).text("Check available dates", M + 20, y + 16);

    y += 70;
    doc.font("Helvetica").fontSize(10).fillColor("#c1cbc6");
    doc.text("hello@balkanpeaksadv.com", M, y);
    y += 16;
    doc.text("+383 49 601 007  ·  WhatsApp", M, y);
    y += 16;
    doc.text("Pejë, Kosovo", M, y);

    y += 40;
    doc.font("Helvetica").fontSize(8).fillColor("#72847d");
    doc.text(`Offer · ${trip.eyebrow} · From ${trip.price} · Group ${trip.group}`, M, y);
    y += 14;
    doc.text("Prices are for the tour only. Flights and travel insurance are separate.", M, y);
    y += 14;
    doc.text("© 2026 Balkan Peaks ADV. Made in the mountains.", M, y);
  });

  // Render with two-pass page count for footers (skip cover & closing)
  const total = drawers.length;
  const doc = new PDFDocument({
    size: "A4",
    margin: 0,
    info: {
      Title: `${trip.title} — Trip Offer | Balkan Peaks ADV`,
      Author: "Balkan Peaks ADV",
      Subject: trip.subtitle,
      Keywords: "Peaks of the Balkans, hiking, Kosovo, Albania, Montenegro",
    },
  });

  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  drawers.forEach((draw, i) => {
    if (i > 0) doc.addPage();
    draw(doc, i);
    // Footer on interior pages only
    if (i > 0 && i < total - 1) {
      drawFooter(doc, i + 1, total, trip.title);
    }
  });

  doc.end();
  await new Promise<void>((resolve, reject) => {
    stream.on("finish", () => resolve());
    stream.on("error", reject);
  });

  return { fileName, outPath, pages: total };
}

async function main() {
  ensureDir(OUT_DIR);
  const results = [];
  for (const [slug, trip] of Object.entries(trips)) {
    const result = await buildOffer(slug, trip);
    results.push({ slug, ...result });
    console.log(`✓ ${result.fileName} (${result.pages} pages)`);
  }

  // Index file for easy sharing
  const index = {
    generatedAt: new Date().toISOString(),
    offers: results.map((r) => ({
      slug: r.slug,
      file: `/offers/${r.fileName}`,
      pages: r.pages,
    })),
  };
  fs.writeFileSync(path.join(OUT_DIR, "index.json"), JSON.stringify(index, null, 2));
  console.log(`\nGenerated ${results.length} offers in public/offers/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
