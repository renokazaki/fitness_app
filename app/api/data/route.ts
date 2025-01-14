// app/api/activities/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 全データ取得用API
export async function GET() {
  try {
    // Prismaを使用してデータを取得
    const activities = await prisma.smoke.findMany({
      select: {
        id: true,
        many: true,
        cost: true,
      }
    });

    // デバッグ用のログ
    console.log('Fetched activities:', activities);

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    // エラーの詳細を返す
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
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