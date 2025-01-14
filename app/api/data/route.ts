// app/api/activities/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 全データ取得用API
export async function GET(request: Request) {
  try {
    // Prismaを使用してsmokeの全てのデータを取得
    const activities = await prisma.smoke.findMany()

    // データを整形してレスポンスとして返す
    const activitiesData = activities.map(activity => ({
      id: activity.id,
      many: activity.many,
      cost: activity.cost,
    }))

    return NextResponse.json(activitiesData)
  } catch (err) {
    console.error('Error fetching activities:', err)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  } finally {
    console.log('GETリクエストが完了しました')
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