import { NextResponse } from "next/server";



const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const assert = require('assert');

const extractText = async (pathStr: string) => {
    assert(fs.existsSync(pathStr), `Path does not exist ${pathStr}`)
    const pdfFile = path.resolve(pathStr)
    const dataBuffer = fs.readFileSync(pdfFile);
    const data = await pdf(dataBuffer)
    return data.text
}
export async function GET() {

    const data = await extractText("https://2mjxtlvg8pbcs1qu.public.blob.vercel-storage.com/Sagarmoy_Sengupta-JGsvwkIVX9xYVlWqJPHMpqDZb2orTU.pdf")
    return NextResponse.json({
        m: data
    })
}