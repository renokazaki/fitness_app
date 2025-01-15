import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  const prisma = new PrismaClient();

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

   // ユーザー作成イベントの処理
   if (evt.type === 'user.created') {
    const userId = evt.data.id; // Clerk からの userId

    try {
      // ユーザーをデータベースに挿入
      await prisma.user.create({
        data: {
          userId: userId,
        },
      });
      console.log(`User with ID ${userId} created successfully.`);
    } catch (err) {
      console.error('Error inserting user into database:', err);
      return new Response('Error: Database operation failed', { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 })
}