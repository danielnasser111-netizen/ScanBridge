from pathlib import Path
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "scanbridge-pre-pilot-poster.pdf"

INK = HexColor("#173C3E")
PAPER = HexColor("#FFFDF8")
MINT = HexColor("#DCEFE7")
MINT_DARK = HexColor("#29595A")
CORAL = HexColor("#EF795E")
SUN = HexColor("#F5C85D")
SOFT = HexColor("#42666A")
LINE = HexColor("#D8E2DC")


def wrap(text, font, size, width):
    words, lines, line = text.split(), [], ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if stringWidth(candidate, font, size) <= width:
            line = candidate
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def paragraph(c, text, x, y, width, font="Helvetica", size=13, leading=18, color=INK):
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrap(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def section(c, title, body, x, y, width, accent=CORAL):
    c.setFillColor(accent)
    c.roundRect(x, y - 8, 24, 5, 2, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(x, y - 28, title)
    return paragraph(c, body, x, y - 54, width, size=12, leading=17, color=SOFT)


def metric(c, value, label, note, x, y, width, pending=False):
    fill = HexColor("#F4F0E8") if pending else white
    c.setFillColor(fill)
    c.setStrokeColor(HexColor("#A9873D") if pending else LINE)
    c.roundRect(x, y, width, 112, 14, fill=1, stroke=1)
    c.setFillColor(CORAL)
    c.setFont("Times-Bold", 34 if value.isdigit() else 27)
    c.drawString(x + 18, y + 67, value)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(x + 18, y + 43, label)
    c.setFillColor(SOFT)
    c.setFont("Helvetica", 9.5)
    c.drawString(x + 18, y + 24, note)


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    page_w, page_h = landscape(A3)
    c = canvas.Canvas(str(OUTPUT), pagesize=(page_w, page_h))
    c.setTitle("ScanBridge pre-pilot research poster")
    c.setAuthor("ScanBridge")
    c.setFillColor(PAPER)
    c.rect(0, 0, page_w, page_h, fill=1, stroke=0)

    c.setFillColor(INK)
    c.rect(0, page_h - 172, page_w, 172, fill=1, stroke=0)
    c.setFillColor(CORAL)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(48, page_h - 46, "PRE-PILOT RESEARCH POSTER | JULY 2026")
    c.setFillColor(white)
    c.setFont("Times-Bold", 37)
    c.drawString(48, page_h - 94, "ScanBridge")
    c.setFont("Helvetica-Bold", 20)
    c.drawString(48, page_h - 124, "A youth-led digital navigation tool for medical imaging in Lebanon")
    c.setFillColor(HexColor("#D8EAE6"))
    c.setFont("Helvetica", 12)
    c.drawString(48, page_h - 148, "Understand. Prepare. Follow up. | Education and navigation, never diagnosis.")

    margin, gap = 48, 20
    col = (page_w - margin * 2 - gap * 2) / 3
    metric_y = page_h - 316
    metric(c, "58", "facilities listed", "source-linked pilot directory", margin, metric_y, col)
    metric(c, "6", "ScanPrep guides", "patient-focused preparation", margin + col + gap, metric_y, col)
    metric(c, "2", "languages available", "English and Arabic", margin + (col + gap) * 2, metric_y, col)

    top_y = metric_y - 32
    left_y = section(c, "Background", "Medical imaging can be confusing before, during, and after an appointment. ScanBridge is designed to make practical next steps easier to find without making medical decisions for patients.", margin, top_y, col)
    left_y = section(c, "Motivation", "The project began after a frightening drive in which a family could not quickly work out where to go for help. That uncertainty inspired a safer, clearer navigation tool.", margin, left_y - 18, col, SUN)

    mid_x = margin + col + gap
    mid_y = section(c, "Intervention", "ScanBridge combines patient-friendly scan guides, a Lebanon imaging-center directory, an emergency preparation card, bilingual support, and Milo, a safety-bounded chat assistant.", mid_x, top_y, col)
    mid_y = section(c, "Safety boundaries", "ScanBridge does not diagnose, interpret images or reports, prescribe treatment, or replace doctors or emergency services. Its purpose is education and navigation.", mid_x, mid_y - 18, col, SUN)

    right_x = margin + (col + gap) * 2
    right_y = section(c, "Planned pilot method", "Recruit 10-15 testers. Each person completes one practical task, then shares anonymous usability feedback about clarity, confidence, and what should improve.", right_x, top_y, col)
    right_y = section(c, "Privacy", "The pilot does not request names, medical reports, symptoms, or other private health information. Findings will be published only as anonymous aggregate results.", right_x, right_y - 18, col, SUN)

    box_y = 70
    c.setFillColor(MINT_DARK)
    c.roundRect(margin, box_y, page_w - margin * 2, 112, 16, fill=1, stroke=0)
    c.setFillColor(SUN)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(margin + 22, box_y + 82, "STATUS: PILOT RECRUITMENT OPEN")
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(margin + 22, box_y + 54, "Results are pending. This poster reports verified baseline work, not participant outcomes.")
    c.setFillColor(HexColor("#D8EAE6"))
    c.setFont("Helvetica", 11)
    c.drawString(margin + 22, box_y + 28, "Next steps: collect feedback, publish aggregate findings, improve the product, and invite school, clinic, and medical reviewers.")

    c.setFillColor(SOFT)
    c.setFont("Helvetica", 8.5)
    c.drawRightString(page_w - margin, 34, "ScanBridge | Pre-pilot poster | scanbridge project repository")
    c.save()


if __name__ == "__main__":
    build()
