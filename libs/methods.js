import {NextRequest, NextResponse} from "next/server"
import pluralToSingular from "./pluralToSingular"
import prisma from "./prisma"

/**
 * @param {NextRequest} req
*/
export async function GET(req) {
	return NextResponse.json({message: "get"})
}

/**
 * @param {NextRequest} req
*/
export async function POST(req) {
	try {
		const input = await req.json()
		const tokens = req.nextUrl.pathname.slice(1).split("/")
		const model = pluralToSingular(tokens[0])
		return NextResponse.json({[model]: prisma[model].create({data: input})})
	}
	catch(e) {
		console.log(e)
		return INTERNAL_SERVER_ERROR
	}
}

/**
 * @param {NextRequest} req
*/
export async function PUT(req) {
	return NextResponse.json({message: "put"})
}

/**
 * @param {NextRequest} req
*/
export async function DELETE(req) {
	return NextResponse.json({message: "delete"})
}

const INTERNAL_SERVER_ERROR = NextResponse.json({error: "Internal server error"}, {status: 500})