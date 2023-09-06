import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { addressId } = await req.json()

      const cart = await prisma.cart.findUniqueOrThrow({
         where: {
            userId,
         },
         include: {
            items: {
               include: {
                  product: true,
               },
            },
         },
      })

      const order = await prisma.order.create({
         data: {
            userId,
            status: 'Processing',
            payable: 10,
            discount: 0,
            shipping: 5,
         },
      })

      return NextResponse.json(order)
   } catch (error) {
      console.error('[PRODUCT_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
