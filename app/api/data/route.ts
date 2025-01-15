// app/api/activities/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
// import { auth } from '@clerk/nextjs/server';

// 全データ取得用API
export async function GET() {
  try {

   

    // データベース接続テスト
    await prisma.$connect();
    console.log('Database connected successfully');

    const activities = await prisma.smoke.findMany();
    console.log('Fetched data:', activities);  // データ取得の確認

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        error: 'Database error', 
        stack: process.env.NODE_ENV === 'development'  
      }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


// データ投稿投稿用API
export async function POST(request: Request) {
  try {

    // const { userId } = await auth();
    // console.log("aaaaaaaaaaaaaaaaaaaa"+ userId)

    const body = await request.json();
    const many = Number(body.many);
    const cost = Number(body.cost);
    const userId = String(body.userId);

    // データのバリデーション
    if (!userId || isNaN(many) || isNaN(cost)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid or missing data' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Prismaを使用してデータを作成
    const activities = await prisma.smoke.create({
      data: {
        many,
        cost,
        userId,
      },
    });

    return new NextResponse(
      JSON.stringify({ success: true, data: activities }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (err) {
    // err が null または undefined の場合に対応
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error posting activities:', errorMessage);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to post activities', details: errorMessage }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
