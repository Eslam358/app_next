import { NextResponse, NextRequest } from "next/server";
import {  Article } from "@prisma/client";
import prisma from "@/app/_utils/prisma/db";


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
try {
    const id = parseInt(params.id);
    if ( isNaN(id) ) {
      return NextResponse.json({ error: "id must be a number" }, { status: 400 });
    }
    const Article = await prisma.article.findUnique({ where: { id: id } });
  if ( !Article ) {
       return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  
    return NextResponse.json({ Article, massage: "fetched successfully" }, { status: 200 });
     
} catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
}

}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

    try {
        const id = parseInt(params.id);
        if ( isNaN(id) ) {
          return NextResponse.json({ error: "id must be a number" }, { status: 400 });
        }
        const article = await prisma.article.delete({ where: { id: id } });
    if ( !article ) {
         return NextResponse.json({ error: "Article not found" }, { status: 404 });
        
    }
    
        return  NextResponse.json({massage:" deleted successfully",article }, { status: 200 });
    
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

    try {
        const id = parseInt(params.id);
        if ( isNaN(id) ) {
          return NextResponse.json({ error: "id must be a number" }, { status: 400 });
        }
        const body = (await request.json()) as Article;
        const article = await prisma.article.update({ where: { id: id }, data: body });
    if ( !article ) {
         return NextResponse.json({ error: "Article not found" }, { status: 404 });
        
    }
    
        return  NextResponse.json({massage:" updated successfully",article }, { status: 200 });
    
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }


}
