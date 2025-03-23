// src/app/api/todos/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET /api/todos
export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(todos)
}

// POST /api/todos
export async function POST(req: Request) {
  const body = await req.json()
  const newTodo = await prisma.todo.create({
    data: { title: body.title },
  })
  return NextResponse.json(newTodo, { status: 201 })
}
