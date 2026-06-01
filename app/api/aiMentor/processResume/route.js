import { NextResponse } from "next/server";
import mammoth from "mammoth";
import PDFParser from "pdf2json";
import { SKILLS } from "../../../../lib/firebase/skills";

function extractSkills(text) {
  const normalizedText = text.toLowerCase();

  return [...new Set(
    SKILLS.filter(skill =>
      normalizedText.includes(skill.toLowerCase())
    )
  )];
}

function parsePDF(buffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", err =>
      reject(err)
    );

    pdfParser.on("pdfParser_dataReady", pdfData => {
      let text = "";

      pdfData.Pages.forEach(page => {
        page.Texts.forEach(t => {
          t.R.forEach(r => {
            try {
              text += decodeURIComponent(r.T) + " ";
            } catch {
              text += r.T + " ";
              }
          });
        });
      });

      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume");

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extractedText = "";

    // PDF
    if (file.type === "application/pdf") {
      extractedText = await parsePDF(buffer);
    }

    // DOCX
    else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result =
        await mammoth.extractRawText({
          buffer
        });

      extractedText = result.value;
    }

    else {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    const extractedSkills =
      extractSkills(extractedText);

    return NextResponse.json({
      success: true,
      extractedSkills
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Resume parsing failed"
      },
      { status: 500 }
    );
  }
}