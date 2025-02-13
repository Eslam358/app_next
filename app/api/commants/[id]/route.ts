
import { NextResponse, NextRequest } from "next/server";
import { Comment } from "@prisma/client";
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
    const comment = await prisma.comment.findUnique({ where: { id: id } });
  if ( !comment ) {
       return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  
    return NextResponse.json({ comment, massage: "fetched successfully" }, { status: 200 });
     
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
        const comment = await prisma.comment.delete({ where: { id: id } });
    if ( !comment ) {
         return NextResponse.json({ error: "comment not found" }, { status: 404 });
        
    }
    
        return  NextResponse.json({massage:" deleted successfully",comment }, { status: 200 });
    
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
        const body = (await request.json()) as Comment;
        const comment = await prisma.comment.update({ where: { id: id }, data: body });
    if ( !comment ) {
         return NextResponse.json({ error: "comment not found" }, { status: 404 });
        
    }
    
        return  NextResponse.json({massage:" updated successfully",comment }, { status: 200 });
    
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }


}

