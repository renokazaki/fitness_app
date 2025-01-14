// app/api/activities/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
const {many,cost} = await request.json()

    // Prismaを使用して全てのデータを取得
    const activities = await prisma.smoke.create({data:{many,cost}})

    return NextResponse.json(activities)
  } catch (err) {
    console.error('Error posting activities:', err)
    return NextResponse.json(
      { error: 'Failed to post activities' },
      { status: 500 }
    )
  } finally {
    console.log('POSTリクエストが完了しました')
  }
}